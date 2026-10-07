---
name: "Changing Tides interpreter widgets"
description: "Translucent translated words flow directly over a bright logo-derived coastal scene, controlled by the floating CT mark."
colors:
  navy: "#0b4680"
  ocean: "#0168ad"
  green: "#b0df7a"
  green-hover: "#9fce69"
  ink: "#173e5b"
  muted: "#526b7c"
  sand: "#f5f1e9"
  danger: "#973b38"
  white: "#fff"
  floating-white: "#ffffffe6"
  field-white: "#ffffffe8"
  utility-white: "#ffffffb8"
  menu-white: "#fffffff2"
  option-wash: "#edf3f6"
  clear: "transparent"
typography:
  body:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  display:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "clamp(32px,4.5vw,72px)"
    fontWeight: 400
    lineHeight: 1.45
  group-display:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "clamp(32px,var(--caption-size,4.5vw),96px)"
    fontWeight: 400
    lineHeight: 1.45
  phone-display:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.45
  idle:
    fontFamily: "\"Yellowtail\", cursive"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.4
  control:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  primary-control:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.5
  label:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  recording:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
  original:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  input:
    fontFamily: "\"Open Sans\", Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  pill: "24px"
  menu: "12px"
  option: "6px"
  status: "4px"
  notice: "3px"
  error: "5px"
  circle: "50%"
spacing:
  control-gap: "8px"
  control-stack: "9px"
  menu-inset: "10px"
  control-inline: "16px"
  phone-inline: "12px"
  beach-edge: "28px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.navy}"
    typography: "{typography.primary-control}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-secondary:
    backgroundColor: "{colors.floating-white}"
    textColor: "{colors.navy}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.white}"
  button-type:
    backgroundColor: "{colors.floating-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0"
    width: "44px"
  button-send:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-send-hover:
    backgroundColor: "{colors.ocean}"
  field-text:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.pill}"
    padding: "12px 17px"
  settings-menu:
    backgroundColor: "{colors.menu-white}"
    rounded: "{rounded.menu}"
    padding: "10px"
  settings-option:
    backgroundColor: "{colors.option-wash}"
    textColor: "{colors.navy}"
    typography: "{typography.control}"
    rounded: "{rounded.option}"
    padding: "9px 12px"
  settings-option-selected:
    backgroundColor: "{colors.green}"
    typography: "{typography.primary-control}"
  status-label:
    backgroundColor: "{colors.utility-white}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.status}"
    padding: "3px 7px"
  recording-label:
    backgroundColor: "{colors.utility-white}"
    textColor: "{colors.navy}"
    typography: "{typography.recording}"
    rounded: "{rounded.notice}"
    padding: "3px 6px"
  word-stage:
    backgroundColor: "{colors.clear}"
  flowing-words:
    textColor: "{colors.navy}"
    typography: "{typography.display}"
    width: "100%"
  group-words:
    textColor: "{colors.navy}"
    typography: "{typography.group-display}"
    width: "100%"
  idle-words:
    textColor: "{colors.navy}"
    typography: "{typography.idle}"
  original-words:
    textColor: "{colors.navy}"
    typography: "{typography.original}"
  logo-launcher:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.circle}"
    padding: "5px"
    size: "86px"
  error-notice:
    backgroundColor: "{colors.floating-white}"
    textColor: "{colors.danger}"
    typography: "{typography.control}"
    rounded: "{rounded.error}"
    padding: "7px 10px"
---

# Design System: Changing Tides interpreter widgets

## Overview

**Creative North Star: "Speech on the Outer Banks Beach"**

A bright photorealistic interpretation of the supplied Changing Tides emblem fills the viewport. A translucent aqua curling wave rises at left; a low golden sun and its reflection anchor the center, with exactly three seabirds above/right and sea oats on the right dune. Pale sky, luminous foam and warm sand keep the scene light behind the words. The generated scene is an illustrative brand interpretation, not a photograph of an actual location. The original CT mark remains the floating source and control; translated words occupy the open beach itself. The user’s confirmed direction is unframed speech: no chat box, card, masthead or caption backdrop.

Large Open Sans words arrive gently in ocean blue and settle into translucent CT navy. A white stroke follows only the glyphs to separate them from the scene. One current utterance replaces its predecessor, keeping the beach open rather than building a transcript. Small green and translucent white controls gather beside the logo; typing and settings appear only when requested.

**Key Characteristics:**
- Bright logo-derived coastal imagery and the supplied circular CT mark.
- One large, translucent utterance directly over the scene.
- Stable corrected prefixes, bounded word arrival and a brief phrase crossfade.
- Small floating controls, optional typing and reduced-motion support.

This handoff describes the current source in `coastal.css`, both route documents and the shared flowing-word renderer. Live verification covered actual typed translations; physical microphone and multi-speaker performance remain unverified.

## Colors

The official CT blues and green remain the identity. Navy carries settled words and controls; ocean blue appears during word arrival and on Send hover. Exact source colors are normative in the frontmatter.

### Primary
- **Changing Tides Navy** (`navy`): translated words, source text, status and focus outlines.
- **Ocean Blue** (`ocean`): arriving words and Send hover.

### Secondary
- **Dune Green** (`green`): start actions, selected settings and the active orb ring.
- **Dune Green Hover** (`green-hover`): start-action hover.

### Tertiary
- **Muted Brick** (`danger`): error text and the small recording dot.

### Neutral
- **White** (`white`): the orb, control hover, reversed Send text and the glyph-local caption stroke and shadow.
- **Floating White** (`floating-white`): ordinary controls and errors.
- **Field White** (`field-white`): the optional input.
- **Utility White** (`utility-white`): small status and recording labels.
- **Menu White** (`menu-white`): the settings menu only.
- **Option Wash** (`option-wash`): settings options.
- **Reading Ink** (`ink`): typed input; **Quiet Slate** (`muted`): placeholders.
- **Warm Sand** (`sand`): the beach scene's fallback background.
- **Clear** (`clear`): the full-screen widget region; it has no visible surface.

The visible word wrapper has opacity (.86); optional original words use (.85), and idle words use (.65). These are implemented component treatments, not alternative color primitives. Sidecar tonal ramps are display metadata only and do not add production colors.

**The Glyph Contrast Rule.** Preserve the implemented white glyph stroke, paint order and compact white text shadow without adding a caption surface.

## Typography

**Display and Controls:** Open Sans, with Arial and sans-serif fallbacks; regular and bold local faces are loaded. Bold is reserved for primary actions and selected settings.

**Idle Invitation:** Yellowtail, with a cursive fallback, for the centered “English ↔ Español” idle words. Josefin Sans remains loaded but has no visible role in this implementation; there is no masthead.

### Hierarchy
- **Demo speech** (`display`): fluid Open Sans translated words, with the desktop clamp recorded in the frontmatter and line height (1.45).
- **Group speech** (`group-display`): the group route’s larger adjustable clamp. Its later inline rule takes precedence over shared caption sizing, including short landscape.
- **Phone speech** (`phone-display`): the demo’s phone size; group phones use `var(--phone-caption-size,32px)`. Group adjustment scales the preferred desktop value from (4.5vw) and phone value from (32px), in (.15) steps, bounded from (.7) to (1.8).
- **Idle words** (`idle`): the handwritten invitation, reduced to (30px) on phones.
- **Controls** (`control`, `primary-control`): compact floating buttons; phone launch/toolbar labels reduce to (12px).
- **Source words** (`original`): a quiet centered original-language line, reduced to (13px) on phones.
- **Utility labels** (`label`, `recording`): status and retention information. Phone recording labels reduce to (11px).
- **Input** (`input`): optional typed text, held at (16px).

Translated words preserve whitespace and wrap long tokens. There is no separate speaker label, chat bubble or message-row type role.

**The Spoken Words Rule.** Render the actual complete response with its whitespace, punctuation, numbers and negation. Reuse unchanged prefix spans during corrections and keep only the current utterance after the crossfade.

## Layout

The beach scene covers the viewport, centered and fixed. Shared CSS uses `assets/changing-tides-coast-daylight-landscape.jpg` by default and switches to `assets/changing-tides-coast-daylight-portrait.jpg` at `(orientation:portrait)`, with `center center/cover` in both orientations. The separate portrait composition keeps the wave, sun/reflection, three birds and dune grass together rather than relying on a crop of the landscape image. Before opening, only the beach and logo orb are visible. Opening unhides a full-screen transparent region with no border, radius or shadow. It passes pointer events through except on words, controls and other interactive elements.

The centered reading stage has a maximum width of (1040px) and desktop insets of (60px 40px) above a reserved lower area of (190px), plus safe-area and keyboard offsets. Current and outgoing utterances share the same grid area. The stage scrolls when needed. The control stack sits left of the orb at right (134px), bottom (46px), with a (9px) stack gap and (8px) control gaps; buttons wrap toward the right.

At the phone breakpoint (maximum width 600px), the stage uses (38px 22px) top/side insets. The orb is (20px) from the right; the control stack is (124px) from the right, and both account for the keyboard and safe area. The optional composer narrows to (16px) side insets.

Short landscape (landscape, maximum height 600px) uses stage insets of (18px 28px) and reserves (120px) below. Demo speech uses `clamp(28px,4.5vw,48px)` there; the group retains its later adjustable route rule. The orb sits (20px) from the bottom and controls at (38px).

The optional composer is centered, capped at (600px), with no wrapper surface. Showing it reserves more stage space: normally the stage’s lower inset becomes (286px) and the source line moves to (202px), plus viewport offsets. Short landscape uses the existing smaller offsets. The source line is capped at (780px) wide and (68px) high, with independent scrolling. The tiny recording label remains at bottom left.

## Elevation & Depth

Depth belongs to the generated coastal scene, floating orb and small settings menu. The caption region has no surface, border or shadow. Its only contrast treatment follows the glyphs: `-webkit-text-stroke:1.5px #fff; paint-order:stroke fill; text-shadow:0 1px 2px #fff`. Do not restore the removed panel shadow.

### Shadow Vocabulary
- **Orb rest** (`0 8px 28px #00000026`): separates the CT mark from the scene.
- **Orb hover** (`0 12px 32px #00000033`): accompanies a small upward hover movement.
- **Settings menu** (`0 8px 28px #00000020`): lifts only the small options menu.

Each new word rises from (.22em), clears a (2px) blur and fades from (.08) opacity over (520ms), using `cubic-bezier(.16,1,.3,1)`. Delays advance by at most (38ms) per new word and are capped at (900ms) across the new suffix. Arrival starts in ocean blue and ends in inherited navy. The previous utterance fades, blurs to (3px) and lifts by (-.12em) over (260ms) with `ease-in`; it is removed after (280ms).

The orb keeps its short transform/shadow transitions and demo level-responsive halo. Reduced motion disables word animations and orb/halo transitions, and hides outgoing utterances immediately.

**The Open Beach Rule.** Keep the translated words directly on the scene. Do not place a box, backdrop, border, masthead or card behind the reading area.

## Shapes

The CT mark is cropped inside the circular orb. Ordinary controls and the optional input use pill corners (`pill`). Menu options use small corners (`option`) inside the softly rounded settings menu (`menu`). Status, recording and error labels use their compact source corners. These shapes belong to utilities; the words have no enclosing geometry.

The orb is (86px) square with (5px) padding around a (76px) circular artwork crop. Its fine outer ring becomes green while active. Open state uses a navy outline. The supplied logo is preserved rather than redrawn.

## Components

### Flowing Speech

One translucent utterance on the beach, with complete text and no chat history. The shared renderer wraps visual words, keeps unchanged prefix spans stable, and applies arrival only to new suffix spans. It crossfades the predecessor beneath the incoming utterance. The complete string is exposed through the utterance’s accessible label; the visual word wrapper is hidden from assistive technology. No claim of a separate screen-reader test is made.

### Floating Controls

Compact pills gather beside the orb. Primary start actions are green with bold navy labels. End, microphone pause and other ordinary controls use floating white and navy. Hover changes ordinary controls to white and primary actions to their green hover color. Controls have a minimum height of (44px). Disabled buttons use opacity (.48) and a default cursor.

The Type control is a (44px) icon button and reveals the input only after a text session is requested. Icons are the source’s small stroked SVGs. Focus uses a (3px) navy outline offset by (4px); the expanded orb uses its existing (2px) navy outline with (1px) offset.

### Inputs / Fields

A translucent white pill with reading-ink text, no border and the input padding from the frontmatter. The placeholder is quiet slate; the caret is navy. Send is a navy pill with white text and ocean hover. The composer wrapper remains clear, without a card or footer surface.

### Settings and Modes

A compact details/summary trigger opens a small menu above the controls. The menu uses menu white, a menu corner and its restrained shadow. Options use wash; pressed options use green and bold text. The demo exposes Translate and Assignment help here. The group exposes caption sizing, original words, full screen and its available voice control here. Checkbox controls are (17px) square with navy accents and touch-sized labels.

### Status and Source Words

Status and recording labels use small utility-white patches, keeping operational information readable without creating a reading panel. Original words remain a translucent line directly over the beach; demo shows received original text, while group visibility is controlled by Show original words. Error text uses brick on a small floating-white notice.

### CT Orb

The supplied logo is the open/close control. Hover lifts it by (3px), and press scales it to (.97). The demo halo responds to the source’s microphone/playback level variable while listening or speaking. This documents the code behavior; live microphone performance has not been tested.

The shipping coastal backgrounds are `assets/changing-tides-coast-daylight-landscape.jpg` and `assets/changing-tides-coast-daylight-portrait.jpg`. Their generation provenance, supplied-logo reference and final bright edit prompts are recorded in `assets/provenance.json`, `docs/design-assets/logo-beach-landscape-bright.prompt.txt` and `docs/design-assets/logo-beach-portrait-bright.prompt.txt`; the exact final edit prompts also travel in the JPEG comments. The official-site beach image remains bundled as unused source material. The fonts and supplied logo retain their recorded origins; the original logo pixels remain unchanged. `coastal.css` governs the responsive background selection. The public build serves versioned, gzipped CSS and bundles; standalone output embeds the referenced assets. These packaging paths must preserve the same visual source values.

## Do's and Don'ts

### Do:
- **Do** use the bright logo-derived landscape and portrait backgrounds and the supplied CT mark with their recorded provenance.
- **Do** keep the translated response directly over the beach, at the implemented opacity and with the glyph-local contrast treatment.
- **Do** preserve real response text, stable corrected prefixes and the bounded word stagger.
- **Do** show the optional input only for a requested text session, and keep settings in the small menu.
- **Do** preserve caption size controls, visible focus, reachable controls and immediate reduced-motion rendering.

### Don't:
- **Don't** restore the obsolete chat panel, white reading card, masthead, caption backdrop or accumulating conversation rows.
- **Don't** replace actual translated words with preset dialogue or shorten a response to fit the animation.
- **Don't** restart the unchanged prefix when an utterance is corrected.
- **Don't** add a rotating gradient ring, visible creator credit or provider attribution.
- **Don't** invent visible heading or identity roles for fonts that are only loaded and currently unused.
