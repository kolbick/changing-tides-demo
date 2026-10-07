import {Conversation} from '@elevenlabs/client';
import {DemoSession,friendlyError} from './session.js';
import {showWords} from './flowing-words.js';

const $ = id => document.getElementById(id);
const nodes = new Map();
let sequence = 0, animation = 0, wakeLock, currentMode = 'translation';
let captionSize = 4.5, phoneSize = 32;
const demo = new DemoSession({
  open:options => Conversation.startSession(options),
  changed:state => {
    controls(state);
    if (state.phase === 'idle') {
      cancelAnimationFrame(animation); animation = 0;
      $('launcher').style.setProperty('--level','0');
      void wakeLock?.release().catch(() => {}); wakeLock = undefined;
    }
  },
  message:event => {
    if (event.source === 'user') {
      $('source').textContent = event.message; original(); detectMode(event.message);
    } else caption(event.message,event.response_id ?? event.event_id,event.event_id);
  },
  correction:({corrected_agent_response,event_id}) => caption(corrected_agent_response,event_id),
});
function controls(state = demo.state) {
  const active = state.phase === 'connected', busy = state.phase === 'connecting';
  $('start').hidden = active; $('textStart').hidden = active;
  $('start').disabled = busy; $('textStart').disabled = busy;
  $('startLabel').textContent = state.completed ? 'Start again' : 'Start talking';
  $('end').hidden = !active && !busy;
  $('pause').hidden = !active || state.textOnly;
  $('pause').textContent = state.paused ? 'Resume mic' : 'Pause mic';
  $('form').hidden = !active || !state.textOnly;
  $('input').disabled = !active || state.pending;
  $('send').disabled = !active || state.pending;
  $('translation').disabled = state.pending;
  $('assignment').disabled = state.pending;
  $('speak').checked = state.speak;
  $('launcher').dataset.active = String(active && !state.paused);
  $('launcher').dataset.voiceState = active && !state.textOnly ? state.paused ? 'idle' : state.mode : 'idle';
  $('error').textContent = state.notice;
  const remaining = new Date(demo.remaining * 1000).toISOString().slice(14,19);
  $('status').textContent = busy ? 'Connecting…'
    : !active ? state.completed ? 'Demo complete · Start again' : 'Ready · 3 minute demo'
    : `${state.paused ? 'Mic paused' : state.textOnly ? state.pending ? 'Translating' : 'Text input' : state.mode === 'speaking' ? 'Speaking' : 'Listening'} · ${remaining} remaining`;
}
function caption(text,key,alias) {
  if (!text) return;
  const id = key ?? `message-${++sequence}`;
  let node = nodes.get(id);
  if (node && (!node.isConnected || node.classList.contains('word-exit'))) return;
  if (!node) {node = document.createElement('div'); node.className = 'caption'; nodes.set(id,node);}
  if (alias !== undefined) nodes.set(alias,node);
  if (nodes.size > 64) nodes.delete(nodes.keys().next().value);
  showWords($('captions'),node,text);
}
function original() {$('source').hidden = !$('showOriginal').checked || !$('source').textContent;}
function mode(value) {
  currentMode = value;
  $('translation').setAttribute('aria-pressed',String(value === 'translation'));
  $('assignment').setAttribute('aria-pressed',String(value === 'assignment'));
}
function detectMode(text) {
  const value = text.trim().toLowerCase().replace(/[.!?¿¡]+$/g,'');
  if (['assignment help','help with changing tides assignments','ayuda con las tareas','about changing tides'].includes(value)) mode('assignment');
  if (['start translating','back to translation','empezar a traducir','volver a traducir'].includes(value)) mode('translation');
}
async function start(textOnly = false) {
  if (demo.state.phase !== 'idle') return;
  if (!textOnly && (!isSecureContext || !navigator.mediaDevices?.getUserMedia)) {demo.update({notice:'Microphone access needs a secure browser. Open the shared HTTPS link, or use the keyboard button.'}); return;}
  mode('translation'); nodes.clear(); $('captions').replaceChildren();
  $('source').textContent = ''; original();
  await demo.start(textOnly);
  if (demo.state.phase !== 'connected') return;
  if (textOnly) $('input').focus();
  else {
    function level() {
      const connection = demo.connection;
      if (!connection || demo.state.textOnly) return;
      const volume = Math.max(demo.state.paused ? 0 : connection.getInputVolume(),connection.getOutputVolume());
      $('launcher').style.setProperty('--level',String(Math.min(1,Math.max(0,volume || 0))));
      animation = requestAnimationFrame(level);
    }
    level();
    if (navigator.wakeLock) wakeLock = await navigator.wakeLock.request('screen').catch(() => undefined);
  }
}
$('launcher').onclick = async () => {
  const open = $('widget').hidden;
  if (!open) await demo.stop();
  $('widget').hidden = !open;
  $('launcher').setAttribute('aria-expanded',String(open));
  $('launcher').setAttribute('aria-label',open ? 'Hide interpreter controls' : 'Open interpreter');
  if (open) $('start').focus();
};
$('start').onclick = () => void start();
$('textStart').onclick = () => void start(true);
$('end').onclick = () => void demo.stop();
$('pause').onclick = () => demo.pause();
$('speak').onchange = () => void demo.speech($('speak').checked);
$('showOriginal').onchange = original;
$('form').onsubmit = event => {event.preventDefault(); if (demo.send($('input').value)) $('input').value = '';};
$('input').oninput = () => demo.connection?.sendUserActivity();
async function chooseMode(value) {
  if (demo.state.phase === 'idle') await start(true);
  if (currentMode !== value && demo.send(value === 'assignment' ? 'Assignment help' : 'Start translating')) mode(value);
}
$('translation').onclick = () => void chooseMode('translation');
$('assignment').onclick = () => void chooseMode('assignment');
$('fullscreen').onclick = async () => {
  try {if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();}
  catch {demo.update({notice:'Full screen is unavailable here. You can turn your phone sideways for a wider view.'});}
};
$('share').onclick = async () => {
  try {
    const link = {title:'Changing Tides · Interpreter Demo',url:location.href.split('#')[0]};
    if (navigator.share) await navigator.share(link);
    else {await navigator.clipboard.writeText(link.url); $('share').textContent = 'Link copied'; setTimeout(() => $('share').textContent = 'Share demo',2500);}
  } catch (problem) {if (problem.name !== 'AbortError') demo.update({notice:'Copy this page’s address to share the demo.'});}
};
function resize(delta) {
  captionSize = Math.max(3,Math.min(8,captionSize + delta * .5));
  phoneSize = Math.max(24,Math.min(54,phoneSize + delta * 2));
  document.documentElement.style.setProperty('--caption-size',`${captionSize}vw`);
  document.documentElement.style.setProperty('--phone-caption-size',`${phoneSize}px`);
}
$('bigger').onclick = () => resize(1); $('smaller').onclick = () => resize(-1);
function viewport() {
  const view = window.visualViewport;
  document.documentElement.style.setProperty('--visible-height',`${view?.height ?? innerHeight}px`);
  document.documentElement.style.setProperty('--keyboard-offset',`${view ? Math.max(0,innerHeight-view.height-view.offsetTop) : 0}px`);
}
window.visualViewport?.addEventListener('resize',viewport); window.addEventListener('resize',viewport); viewport();
document.addEventListener('keydown',event => {if (event.key === 'Escape' && !$('widget').hidden) void $('launcher').onclick();});
window.addEventListener('pagehide',() => void demo.stop());
window.addEventListener('offline',() => {if (demo.state.phase !== 'idle') demo.update({notice:friendlyError('offline')});});
setInterval(() => {if (demo.state.phase === 'connected') controls();},1000);
controls();
