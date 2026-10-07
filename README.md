# Changing Tides interpreter demo

A public phone-friendly demonstration of English/Spanish voice translation, using the existing Changing Tides demo agent and the updated beach-and-widget interface. People can speak arbitrary sentences; the page has no preset translation dialogue or chat history.

Open the CT logo, choose **Start talking**, allow the microphone and speak English or Spanish. Voice and automatic language direction start on. Speak over playback to interrupt it. Optional typing, original words, caption size, assignment help and sharing are under the small controls/settings.

Each demo call lasts up to three minutes. The status counts down, and the page returns to **Start again** when the call finishes. The existing agent permits one conversation at a time and twenty per day. Its recording setting remains on with seven-day retention. Use fictional examples.

The page is static and hosted by GitHub Pages; it does not need the Mac or Tailscale to stay online. Visitors need internet access and a browser with microphone support. It uses a public ElevenLabs agent ID. No API key, login credential, clinical record or knowledge source document is shipped in this repository. The agent's existing knowledge stays in its existing provider workspace. The original demo, separate group agent and local interpreter remain separate.

## Development

Requires Node.js 22 or newer:

```sh
npm ci
npm test
npm run build
npm run preview
```

Open the printed loopback URL to preview on the Mac. The deployed HTTPS URL supports phone microphone access. The page uses relative asset paths so it works under a GitHub Pages project path. The workflow tests and builds the page before publishing only `dist/`.

`src/session.js` owns connection lifecycle and ignores late callbacks from old calls. `src/app.js` connects the SDK to the controls and actual captions. `src/flowing-words.js` and `src/coastal.css` preserve the approved word animation and CT interface. Images and fonts are copied from the existing approved UI; asset origins are in `assets/provenance.json`.
