const utterances = new WeakMap();

export function showWords(container, target, text) {
  if (target.parentElement !== container) {
    for (const previous of [...container.children]) {
      if (previous.classList.contains('agent-words') || previous.classList.contains('caption')) {
        previous.classList.add('word-exit');
        previous.setAttribute('aria-hidden', 'true');
        setTimeout(() => previous.remove(), 280);
      } else previous.remove();
    }
    container.append(target);
  }
  flowWords(target, text);
}

export function flowWords(target, text) {
  const previous = utterances.get(target);
  if (previous?.text === text) return;
  const pieces = [...text.matchAll(/(\s*)(\S+)/gu)];
  const words = pieces.map(piece => piece[2]);
  let prefix = 0;
  while (prefix < words.length && previous?.words[prefix] === words[prefix]) prefix++;

  const visual = previous?.visual ?? document.createElement('span');
  visual.className = 'flow-visual';
  visual.setAttribute('aria-hidden', 'true');
  target.setAttribute('role', 'group');
  target.setAttribute('aria-label', text);
  const fragment = document.createDocumentFragment();
  const nodes = [];
  const step = Math.min(38, 900 / Math.max(1, words.length - prefix - 1));

  pieces.forEach((piece, index) => {
    if (piece[1]) fragment.append(document.createTextNode(piece[1]));
    const word = index < prefix ? previous.nodes[index] : document.createElement('span');
    word.className = index < prefix ? 'flow-word' : 'flow-word is-new';
    word.textContent = piece[2];
    word.style.setProperty('--word-delay', `${Math.round((index - prefix) * step)}ms`);
    fragment.append(word);
    nodes.push(word);
  });
  const trailing = text.match(/\s+$/u)?.[0];
  if (trailing) fragment.append(document.createTextNode(trailing));
  visual.replaceChildren(fragment);
  if (!previous) target.replaceChildren(visual);
  utterances.set(target, {text, words, visual, nodes});
}
