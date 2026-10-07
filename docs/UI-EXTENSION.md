# Public demo UI extension

Reviewed against `PRODUCT.md`, the inherited `DESIGN.md`, finished source and the finish-review evidence on 2026-10-07. The finish reviewer returned **ship** with no material fixes. This record describes the extension of the approved local interpreter interface. `DESIGN.md` remains the inherited visual authority.

The public entry point is [Changing Tides interpreter demo](https://kolbick.github.io/changing-tides-demo/). The delivery handoff reports a verified HTTP 200 and green deployment CI. Visitors use the existing demonstration agent without a work login or Tailscale; the existing group agent and local interpreter remain preserved in the parent work.

## Established world retained

The full viewport keeps the bright logo-derived beach: an aqua curling wave at left, low sun and reflection, three seabirds, sea oats and warm sand. Landscape and portrait assets remain separate compositions. The supplied circular CT mark remains the floating open/close control.

Actual agent responses appear as one current translucent utterance directly on the scene. The shared renderer preserves complete text and whitespace, reuses unchanged word prefixes during corrections, animates only the new suffix and briefly crossfades the preceding utterance. Navy settled words, ocean-blue arrival, white glyph-local contrast, Open Sans controls and the Yellowtail idle invitation retain the established visual language. Reduced motion renders words immediately and removes outgoing utterances without animation.

Compact green and translucent-white controls retain their pill shapes, visible focus and 44px minimum targets. Optional typing reserves space only while requested. Phone safe-area and keyboard offsets, the portrait composition and short-landscape layout remain in use. The finished interface has no chat box, masthead, creator credit, provider branding, authentication screen or recording banner.

## Public-demo behavior

- **Timer and completion:** the initial status reads “Ready · 3 minute demo.” Active sessions show the current voice/text state and an `mm:ss` remaining-time value. `DEMO_SECONDS` is 180; the provider owns the session cutoff. A duration disconnect becomes “Demo complete · Start again,” with the primary action relabeled “Start again.” A fresh start clears the preceding words and source line.
- **Voice and text:** speech starts enabled. Visitors tap “Start talking” and grant microphone access, or request the optional keyboard input. Voice interruption remains automatic through the existing client. “Pause mic,” “Resume mic” and “End demo” use the inherited controls.
- **Settings:** Translate and Assignment help select the existing agent modes. Full screen, Share demo, caption sizing, Show original words and Speak translations stay in the small scrollable settings menu. Sharing uses the browser share sheet when available and otherwise copies the page URL.
- **Disclosure:** settings contain “Recorded demo · 7-day retention” and “Use fictional examples.” Recording remains enabled; the disclosure is inside settings as required by the current product direction. The public source uses the existing public agent ID, with no API key, account credentials or knowledge documents added to this UI.

These are surface behavior and control additions within the existing world. They establish no new palette, type family, material, page frame or design-system rule.

## Evidence checked

| Evidence | What it establishes |
| --- | --- |
| `PRODUCT.md` and inherited `DESIGN.md` | Public-demo requirements, approved visual authority, established colors/type/forms and explicit exclusions. |
| `index.html` | CT launcher, single word stage, timer/status location, optional composer, settings and settings-only recording disclosure. |
| `src/coastal.css` and `src/demo.css` | Shared beach assets, typography, glyph contrast, control treatment, responsive layout, menu bounds, caption adjustment and reduced motion. |
| `src/app.js` and `src/flowing-words.js` | Remaining-time rendering, restart label, mode/settings actions, optional input, complete response rendering, stable prefixes and bounded word arrival. |
| `src/session.js` and `tests/session.test.mjs` | Existing demo agent connection, 180-second display basis, duration completion, voice defaults and guarded session ownership. Tests were inspected; this documentation pass did not rerun them. |
| `.impeccable/review/desktop.png` (1440 × 900) | Real translated Spanish words directly on the desktop beach with compact active controls and remaining time. |
| `.impeccable/review/mobile.png` (390 × 844) | Complete English utterance, portrait beach, reachable controls and readable remaining time. |
| `.impeccable/review/user-844.png` (844 × 390) | Complete Spanish utterance and separated controls in short landscape. |
| `.impeccable/review/finish-review.md` | `disposition: ship`, valid required captures, inherited-world fidelity and no material fixes. |
| `.impeccable/review/live-voice-check.json` | Recorded generated-speech inputs, actual English/Spanish responses, interruption/correction events and a duration close at approximately three minutes followed by “Demo complete · Start again.” |
| `.impeccable/review/public-voice-check.json` | Public-URL agent responses in both translation directions and an interruption event. |
| `.impeccable/review/detector.json` | Inherited font/declaration warnings and alpha-shadow/type-ramp advisories, assessed below. |

The screenshots were visually inspected at all three required sizes, and their decoded dimensions were verified. The three capture files have `.png` names and contain JPEG data; their content and viewport dimensions are valid. Recorded generated-speech checks establish the documented browser/agent path; they do not establish physical phone microphone acoustics or multi-speaker performance.

## Inherited drift left visible

`DESIGN.md` still contains historical recording-label tokens and prose describing a bottom-left recording label. The user explicitly removed the recording banner; `PRODUCT.md` and the shipped markup place the retention disclosure in settings. This extension follows that confirmed direction while preserving the inherited design file.

The detector flags the inherited Open Sans declaration and a loaded Josefin Sans face. Open Sans is already the approved visible brand face. Josefin Sans remains loaded and unused; it gains no visible role here. Alpha-shadow advisories concern the existing orb/menu shadows, already described in inherited prose. Type-ramp advisories concern inherited phone and short-landscape sizes, also described in that prose. These findings are recorded as inherited declaration/advisory differences, without repairs or new normative tokens.

## Documentation preservation

Only this file was written during the documentation pass. `DESIGN.md` was checked before and after with SHA-256 `064a7e423f2f97e2e219795ed8e2b572bd58e0e034de5f621988832f8c77e5a3`. It remains unchanged. `.impeccable/design.json` was absent and remains absent; no sidecar or system repair was authorized. Implementation, `PRODUCT.md`, `README.md` and assets were outside this pass's write boundary.
