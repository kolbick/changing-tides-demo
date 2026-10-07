export const AGENT_ID = 'agent_7401m4998vjkff4t2dk5jjgwj4mf';
export const DEMO_SECONDS = 180;

export function friendlyError(problem) {
  if (['NotAllowedError','PermissionDeniedError'].includes(problem?.name)) return 'Allow microphone access in your browser, then start again. You can also use the keyboard button.';
  if (problem?.name === 'NotFoundError') return 'No microphone found. Use a phone or connect a microphone, or use the keyboard button.';
  const message = typeof problem === 'string' ? problem : problem?.message || '';
  if (/concurren|quota|daily|limit reached|429/i.test(message)) return 'The demo is busy or has reached its daily limit. Please try again later.';
  return 'The connection was interrupted. Check your internet connection and start again.';
}

// Own each connection until it ends. Late callbacks from an old connection
// cannot reset a newer call or leave an ended call looking active.
export class DemoSession {
  constructor({open,changed = () => {},message = () => {},correction = () => {},interruption = () => {},now = () => performance.now()}) {
    this.open = open;
    this.changed = changed;
    this.message = message;
    this.correction = correction;
    this.interruption = interruption;
    this.now = now;
    this.generation = 0;
    this.connection = null;
    this.state = {phase:'idle',textOnly:false,paused:false,speak:true,pending:false,mode:'listening',startedAt:null,completed:false,notice:''};
  }
  update(patch = {}) {Object.assign(this.state,patch); this.changed({...this.state});}
  get remaining() {return this.state.startedAt === null ? DEMO_SECONDS : Math.max(0,DEMO_SECONDS - Math.floor((this.now()-this.state.startedAt)/1000));}
  async start(textOnly = false) {
    if (this.state.phase !== 'idle') return;
    const token = ++this.generation;
    const current = callback => (...args) => {if (token === this.generation) callback(...args);};
    this.update({phase:'connecting',textOnly,paused:false,pending:false,mode:'listening',startedAt:null,completed:false,notice:''});
    try {
      const opened = await this.open({
        agentId:AGENT_ID,textOnly,connectionType:'websocket',
        onConnect:current(() => this.update({startedAt:this.now()})),
        onMessage:current(event => {if (event.source !== 'user') this.update({pending:false}); this.message(event);}),
        onAgentResponseCorrection:current(event => this.correction(event)),
        onModeChange:current(({mode}) => this.update({mode})),
        onInterruption:current(event => {this.update({mode:'listening'}); this.interruption(event);}),
        onDisconnect:current(details => {
          const complete = this.remaining <= 5 || /duration|max.*time/i.test(details?.closeReason || '');
          ++this.generation; this.connection = null;
          this.update({phase:'idle',paused:false,pending:false,startedAt:null,completed:complete,notice:details?.reason === 'error' && !complete ? friendlyError(details.message || details.closeReason) : ''});
        }),
        onError:current(error => this.update({pending:false,notice:friendlyError(error)})),
      });
      if (token !== this.generation) {await opened.endSession(); return;}
      this.connection = opened;
      if (!textOnly) await opened.setVolume({volume:this.state.speak ? 1 : 0});
      if (token === this.generation) this.update({phase:'connected',startedAt:this.state.startedAt ?? this.now()});
    } catch (error) {
      if (token !== this.generation) return;
      const opened = this.connection;
      ++this.generation; this.connection = null;
      this.update({phase:'idle',paused:false,pending:false,startedAt:null,notice:friendlyError(error)});
      if (opened) await opened.endSession().catch(() => {});
    }
  }
  async stop() {
    const old = this.connection;
    ++this.generation; this.connection = null;
    this.update({phase:'idle',paused:false,pending:false,startedAt:null,notice:''});
    if (old) await old.endSession().catch(() => {});
  }
  pause() {
    if (!this.connection || this.state.textOnly) return;
    const paused = !this.state.paused;
    try {this.connection.setMicMuted(paused); this.update({paused});}
    catch {this.update({notice:'The microphone could not change. End the demo and start again.'});}
  }
  async speech(enabled) {
    this.update({speak:enabled});
    if (this.connection && !this.state.textOnly) {
      try {await this.connection.setVolume({volume:enabled ? 1 : 0});}
      catch {this.update({notice:'The voice could not change. End the demo and start again.'});}
    }
  }
  send(text) {
    if (!this.connection || this.state.pending || !text.trim()) return false;
    try {this.connection.sendUserMessage(text.trim()); this.update({pending:true}); return true;}
    catch {this.update({notice:'That message could not send. Try again or restart the demo.'}); return false;}
  }
}
