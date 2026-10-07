import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DemoSession,AGENT_ID} from '../src/session.js';

function fixture() {
  let callbacks,resolve,clock = 0;
  const volumes = [],messages = [],changes = [];
  const connection = {ended:0,muted:false,endSession:async () => {connection.ended++;},
    setVolume:async value => volumes.push(value.volume),setMicMuted:value => {connection.muted = value;},
    sendUserMessage:value => messages.push(value)};
  const session = new DemoSession({open:options => {callbacks = options; return new Promise(done => {resolve = done;});},
    changed:state => changes.push(state),now:() => clock});
  return {session,connection,volumes,messages,changes,get callbacks() {return callbacks;},
    connected() {callbacks.onConnect({conversationId:'test'}); resolve(connection);},
    clock:value => {clock = value;}};
}

test('voice starts on with the existing public demo agent and automatic SDK interruption',async () => {
  const f = fixture(); const start = f.session.start();
  assert.equal(f.callbacks.agentId,AGENT_ID);
  assert.equal(f.callbacks.connectionType,'websocket');
  assert.equal(f.callbacks.textOnly,false);
  f.connected(); await start;
  assert.equal(f.session.state.phase,'connected');
  assert.deepEqual(f.volumes,[1]);
  f.callbacks.onModeChange({mode:'speaking'});
  f.callbacks.onInterruption({});
  assert.equal(f.session.state.mode,'listening');
  assert.equal(f.connection.muted,false);
});

test('a provider disconnect during startup cannot leave a zombie active session',async () => {
  const f = fixture(); const start = f.session.start();
  f.callbacks.onDisconnect({reason:'error',message:'network failed'});
  f.connected(); await start;
  assert.equal(f.session.state.phase,'idle');
  assert.equal(f.session.connection,null);
  assert.equal(f.connection.ended,1);
});

test('cancelling a microphone prompt closes a connection that arrives later',async () => {
  const f = fixture(); const start = f.session.start();
  await f.session.stop(); f.connected(); await start;
  assert.equal(f.connection.ended,1);
  assert.equal(f.session.state.phase,'idle');
});

test('old disconnects cannot reset a new call',async () => {
  const f = fixture(); const first = f.session.start();
  const oldCallbacks = f.callbacks; f.connected(); await first;
  await f.session.stop();
  const second = f.session.start(); f.connected(); await second;
  oldCallbacks.onDisconnect({reason:'agent'});
  assert.equal(f.session.state.phase,'connected');
  assert.equal(f.session.connection,f.connection);
});

test('the three-minute provider cutoff becomes a clear completed state',async () => {
  const f = fixture(); const start = f.session.start(); f.connected(); await start;
  f.clock(180000); f.callbacks.onDisconnect({reason:'agent',closeReason:'max_duration'});
  assert.equal(f.session.state.phase,'idle');
  assert.equal(f.session.state.completed,true);
  assert.equal(f.session.state.notice,'');
});

test('manual microphone pause and speech choice do not reset the call',async () => {
  const f = fixture(); const start = f.session.start(); f.connected(); await start;
  f.session.pause(); assert.equal(f.connection.muted,true);
  f.callbacks.onModeChange({mode:'listening'}); assert.equal(f.session.state.paused,true);
  f.session.pause(); assert.equal(f.connection.muted,false);
  await f.session.speech(false); assert.deepEqual(f.volumes,[1,0]);
  assert.equal(f.session.state.phase,'connected');
});

test('arbitrary text can continue through many turns, with no canned translation responses',async () => {
  const f = fixture(); let received = 0;
  f.session.message = () => received++;
  const start = f.session.start(true); f.connected(); await start;
  for (let i=0;i<30;i++) {
    const sentence = `A different arbitrary sentence ${i}.`;
    assert.equal(f.session.send(sentence),true);
    assert.equal(f.session.send('duplicate while waiting'),false);
    f.callbacks.onMessage({source:'ai',message:`Remote response ${i}`});
  }
  assert.equal(received,30); assert.equal(f.messages.length,30);
  assert.equal(f.session.state.phase,'connected');
});
