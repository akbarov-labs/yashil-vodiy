---
name: Yashil Vodiy Residence
description: A launch site that stands under a Tashkent chinar avenue in November; bark and shade, lit by the same sun as the flat.
colors:
  shade: "#10221f"
  shade-2: "#172e29"
  shade-3: "#22413a"
  bark: "#dcdcc6"
  bark-2: "#cdcfb5"
  bark-light: "#e8e7d6"
  on-shade: "#e9e9d8"
  on-shade-2: "rgba(233, 233, 216, .76)"
  on-bark-2: "#2a3732"
  gold: "#e39a2d"
  gold-hi: "#f0b04e"
  aryk-light: "#7fcbc2"
  rule-dark: "rgba(16, 34, 31, .28)"
  rule-light: "rgba(233, 233, 216, .2)"
  error: "#a5391f"
typography:
  display:
    fontFamily: "Geologica, Golos Text, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'SHRP' 100"
  headline:
    fontFamily: "Geologica, Golos Text, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 2.7vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'SHRP' 100"
  title:
    fontFamily: "Geologica, Golos Text, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'SHRP' 100"
  numeral:
    fontFamily: "Geologica, Golos Text, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.6vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tnum, lnum"
    fontVariation: "'SHRP' 100"
  body:
    fontFamily: "Golos Text, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geologica, Golos Text, system-ui, sans-serif"
    fontSize: ".88rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  none: "0px"
  hair: "2px"
spacing:
  line: "1.5px"
  module: "24px"
  module-2: "48px"
  module-3: "72px"
  module-5: "120px"
  header: "56px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.shade}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hi}"
  button-primary-lg:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.shade}"
    rounded: "{rounded.hair}"
    padding: "0 28px"
    height: "52px"
  button-light:
    backgroundColor: "transparent"
    textColor: "{colors.on-shade}"
    rounded: "{rounded.hair}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.shade}"
    rounded: "{rounded.hair}"
    padding: "0 20px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.shade}"
    textColor: "{colors.bark}"
  toggle-selected:
    backgroundColor: "{colors.on-shade}"
    textColor: "{colors.shade}"
    rounded: "{rounded.none}"
    height: "44px"
  story-card:
    backgroundColor: "{colors.shade}"
    textColor: "{colors.on-shade}"
    rounded: "{rounded.hair}"
    padding: "56px 30px 24px"
    width: "min(440px, 36vw)"
  layout-card:
    backgroundColor: "{colors.bark-light}"
    textColor: "{colors.shade}"
    rounded: "{rounded.none}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.bark-light}"
    textColor: "{colors.shade}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "46px"
  header:
    backgroundColor: "{colors.shade}"
    textColor: "{colors.on-shade}"
    height: "56px"
---

# Design System: Yashil Vodiy Residence

## Overview

**Creative North Star: "Under the Chinar Avenue in November"**

The interface stands in the shade of a Tashkent plane-tree avenue late in the year. Light grounds are the plane tree's camouflage bark, carried as a real photograph under a flat bone tint; text, panels, header and the bands between sections are deep shade ink. Chinar gold is the only warm colour and it behaves like sunlight: it lands where the buyer acts or has chosen. Aryk teal belongs to water, routes and "available".

The system is hard and economical. One line weight (1.5 px) draws every rule, border, focus ring and underline. Corners are square or a 2 px hair. Space comes from a 24 px module and its multiples. Panels are solid, never glass; nothing blurs. The 3D scene carries the atmosphere, and the UI over it stays legible, opaque and still.

The signature is sunlight through leaves: a backlit chinar-leaf photograph, turned to gold light, runs along the top margin and right edge of the dark panels. On the scroll story it is driven by the scene's sun, so it moves with the sun's azimuth and dims with its height.

**Key Characteristics:**
- Bark-and-shade palette with gold as the single warm signal.
- One 1.5 px line weight for every stroke.
- Square or 2 px corners; solid opaque panels.
- 24 px module; sections separated by 48 px solid shade bands.
- Geologica with sharp terminals (SHRP 100) for display and numbers, Golos Text for reading.
- Gold leaf-light along panel margins, coupled to the 3D sun.

## Colors

A muted bark-and-shade field with one warm signal and one cool functional accent.

### Primary
- **Chinar Gold** (gold): the primary action button, the chosen floor (numeral and 3D floor highlight), the selected flat, the active chapter tick, the slider thumb, focus rings on dark grounds, the brand leaf mark, text selection and the build-progress fill. **Sun Gold** (gold-hi) is its hover state only.

### Secondary
- **Aryk Water Light** (aryk-light): POI travel times and the "available" flat status on dark panels. In the 3D scene the same role is played by the bright teal route lines and beams set in the scene code.

### Neutral
- **Shade Ink** (shade): body text on bark, the header, story cards, the payment and closing sections, section bands, footer, solid borders on bark.
- **Shade Lifted** (shade-2): hover fill on dark lists and chips; the payment summary panel.
- **Shade Edge** (shade-3): the 1.5 px border of panels and the header on dark ground.
- **Plane-Tree Bone** (bark): fallback ground under the bark photo; the ink colour of ghost buttons when inverted.
- **Bark Sage** (bark-2): read-only fields and the scrollbar track.
- **Peeled Bark** (bark-light): layout cards, the booking dialog, scene label tags.
- **Bone Ink** (on-shade) and **Bone Ink Muted** (on-shade-2): primary and secondary text on shade.
- **Shade Muted** (on-bark-2): secondary text on bark.
- **Rule Light** / **Rule Dark**: hairline dividers on shade and on bark.
- **Brick Error** (error): invalid field border and error text in the booking form.

### Named Rules
**The One Warm Colour Rule.** Gold appears only where the buyer acts or has chosen: primary action, chosen floor, selected flat, active chapter, slider thumb. Selected toggles that are not the buyer's decision (language, season, instalment term) invert to bone on shade instead.

**The Water-Only Teal Rule.** Teal means water, routes or "available". It is never a button, link or decoration colour.

## Typography

**Display Font:** Geologica (with Golos Text, system-ui)
**Body Font:** Golos Text (with system-ui, -apple-system, Segoe UI)

**Character:** Geologica at full sharpness ('SHRP' 100) gives headlines and numbers leaf-tip terminals; Golos Text reads plainly in Uzbek Latin, Cyrillic and English.

### Hierarchy
- **Display** (700, clamp(2.2rem, 4.4vw, 3.8rem), 1.04, -0.025em): section headlines on bark and shade; the story's opening headline is clamp(2.3rem, 3.7vw, 3.5rem). Balanced wrapping.
- **Headline** (700, clamp(1.8rem, 2.7vw, 2.6rem), 1.04): story chapter titles in the cards.
- **Title** (700, 1.35-1.9rem): layout names, trust terms, dialog title.
- **Numeral** (700-800, 1.6-3.8rem, tabular lining figures, SHRP 100): the chosen floor, monthly payment, build date, clock, stepper value.
- **Body** (400, 16px, 1.55): reading text; ledes cap at 40ch in cards and 46-60ch in sections.
- **Label** (600, .72-.95rem, line-height 1): buttons, chips, toggles, scene tags, rail labels; set in Geologica.

### Named Rules
**The Sharp Numbers Rule.** Every figure the buyer compares (floor, price, area, date, time, phone) is set in Geologica with tabular lining numerals.

**The Sentence-Case Rule.** No uppercase labels and no tracked-out small caps; labels carry at most .04em tracking.

## Layout

A 24 px module governs spacing: in-component gaps are 24 px or fractions of it (10, 12, 14, 16 px), section padding is 120 px (84 px under 860 px), and grid gutters are 48-72 px. Content sits in a 1200 px wrap with clamp(16px, 4vw, 48px) side padding; section heads cap at 720 px.

The page is a 1150svh scroll story with a sticky full-viewport 3D stage, followed by bark and shade sections. Bark sections open with a 48 px solid shade band as their top border, so shade separates every bark section from what precedes it. Story cards sit left at about 440 px; a chapter rail sits right.

Responsive: layout grid 4 columns, 2 under 1100 px, 1 under 760 px; two-column section grids stack under 860 px. Under 760 px the story card becomes a bottom sheet (8 px inset, max 58svh), the rail becomes a top step bar, and touch targets are 44 px. Short landscape phones pin the card left under the header.

## Elevation & Depth

Flat on bark; depth comes from shade versus bark and from the 1.5 px line. Soft, low shadows appear only where an opaque panel floats over the moving 3D scene or a modal sits over the page, and as small text and tick shadows that keep labels legible over the render. There are no hard offset shadows, no glass and no blur.

### Shadow Vocabulary
- **Scene panel** (`box-shadow: 0 18px 40px -18px rgba(0, 0, 0, .55)`): story cards over the 3D stage.
- **Dialog** (`box-shadow: 0 30px 70px -30px rgba(0, 0, 0, .6)`): the booking sheet, over a shade backdrop at 72%.
- **Legibility** (`text-shadow: 0 1px 8px rgba(0, 0, 0, .6)`; `box-shadow: 0 1px 4px rgba(0, 0, 0, .35)`): scroll hint and chapter ticks over the scene.

### Named Rules
**The Solid Panel Rule.** Anything over the scene is opaque shade with a shade-edge border; the scene never shows through UI.

## Shapes

Hard rectangles. Buttons, story cards and the dialog take a 2 px hair radius; fields, chips, toggles, tags and grid cells are square. Grouped controls (language switch, season toggle, chips, flat grid, layout grid, contact method) share borders: a 1.5 px outer edge with 1.5 px internal dividers, so cells read as one ruled board. The few non-rectangular forms are diamonds (slider thumb, amenity marker, the CTA's chevron) and the leaf mark. Floor plans are drawn as thin shade line on bark with gold-tinted loggias.

## Components

### Buttons
Hard, quiet rectangles; gold is spent on one primary per view.
- **Shape:** 2 px hair radius, 1.5 px border, 44 px minimum height (52 px large, 38 px in the header).
- **Primary:** gold fill, shade text, Geologica 600, trailing 1.5 px chevron drawn in CSS.
- **Hover / Focus:** primary lightens to sun gold; focus is a 1.5 px gold outline offset 3 px (shade outline on bark grounds).
- **Light:** transparent on shade with a rule-light border that firms to bone on hover.
- **Ghost:** shade outline on bark, inverting to shade fill with bone text on hover.
- **Text link:** Golos 500 with a 1.5 px underline in rule-light that turns gold on hover.

### Chips and Toggles
- **Style:** transparent cells on a shared 1.5 px ruled board, Geologica 600 label in muted bone.
- **State:** hover lifts to shade-2; selected inverts to bone fill with shade text. Gold is not used for these.

### Cards / Containers
- **Story card:** solid shade, shade-edge border, 2 px radius, 56 px top padding that leaves room for the leaf light, scene-panel shadow. Fades and rises 12 px on chapter change (.45s, cubic-bezier(.16, 1, .3, 1)).
- **Layout card:** peeled bark cells in a shared-border grid, plan on top, 24 px body, hover to a lighter bark.
- **Payment panel:** shade-2 with shade-edge border and the static leaf light.

### Inputs / Fields
- **Style:** 46 px, square, 1.5 px shade border on a pale bark fill; read-only fields in bark sage.
- **Focus:** 1.5 px shade outline offset 2 px.
- **Error:** brick error border and message.
- **Range:** 3 px rule-light track, gold diamond thumb with a shade edge.

### Navigation
- **Header:** 56 px solid shade bar, 1.5 px shade-edge bottom rule, gold leaf mark plus Geologica wordmark. Links in muted bone gain a 1.5 px gold underline on hover. Language switch is a ruled three-cell toggle. A 3 px gold bar under the header tracks chapter progress.
- **Chapter rail:** 16 px bone ticks that grow to 36 px gold for the active chapter, with a shade label tag on hover. On phones, a top step bar with gold for done and active.

### Scene Labels
Hard-edged tags pinned to the 3D scene by a 1.5 px stem: peeled bark with a shade border for places and rooms, gold for the buyer's home, shade with a gold diamond for amenities.

### Leaf Light (signature)
A backlit chinar-leaf photograph turned to gold light (grayscale, sepia, saturate, screen blend) fills a 40 px band across a dark panel's top margin and a 22 px strip down its right edge, clear of the copy. On story cards its position follows the 3D sun (`--sx`, `--sy`) and its opacity follows sun strength (`--sun`), updated every frame; on the payment panel it is static at 90%.

## Do's and Don'ts

### Do:
- **Do** draw every rule, border, underline and focus ring at 1.5 px.
- **Do** reserve gold for the primary action, chosen floor, selected flat, active chapter and slider thumb.
- **Do** set compared figures in Geologica with tabular lining numerals and SHRP 100.
- **Do** keep panels over the 3D scene solid shade with a shade-edge border.
- **Do** separate bark sections from the previous section with a 48 px solid shade band.
- **Do** carry the bark ground as the photo under a flat 80% bone tint, falling back to bone.
- **Do** use the leaf light on dark panels only, along the top margin and right edge, never behind copy.

### Don't:
- **Don't** use glass, backdrop blur or decorative colour gradients; the only gradients are the flat bark tint and the planned-schedule hatch.
- **Don't** use teal for actions, links or decoration.
- **Don't** round corners beyond 2 px.
- **Don't** use hard offset shadows; shadows are soft and only over the scene or under the dialog.
- **Don't** set uppercase or widely tracked labels.
