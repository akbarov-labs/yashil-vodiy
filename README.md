# Yashil Vodiy Residence

A concept launch site for a residential complex in Tashkent. The story is told as one scroll-driven 3D scene, by [Akbarov Labs](https://akbarovlabs.uz).

**Live demo:** https://akbarov-labs.github.io/yashil-vodiy/

Yashil Vodiy Residence is fictional. The developer, prices, dates and locations are made up for the demo.

## The story

The page follows the questions a buyer asks about a flat that isn't built yet:

1. **Evening over the city:** the complex lit up at dusk.
2. **Location:** the camera rises over the district. Pins and walking routes show the metro, school, park and mall.
3. **Construction:** the towers rewind to the foundation and rise floor by floor, with cranes, safety nets and a dated schedule that marks today.
4. **Courtyard:** a car-free garden with a playground, sports court, kindergarten and the underground car park entrance.
5. **Choose a floor:** tap tower A or use the buttons. Each floor shows its eight flats, their status and the price per m².
6. **The apartment:** the floors above the chosen one lift away, revealing a furnished 3-room apartment of 94.5 m² as a dollhouse.
7. **Sunlight:** a time-of-day slider and summer/winter switch. The sun position is calculated for Tashkent, so the shadows are real: in summer the loggia shades the rooms, and in winter the sun reaches deep inside. It ends with the view from the window on the chosen floor.

After the story come layout cards, an instalment calculator, and a booking button that explains the demo.

The whole page is in Uzbek, Russian and English.

## How it works

- **Static site, no build step:** ES modules plus [Three.js 0.169](https://threejs.org/) from jsDelivr through an import map.
- **Pinned stage:** the story section is 11.5 screens tall and holds a `position: sticky` stage.
- **Scroll to time:** scroll progress becomes a time `t` from 0 to 70, eased with `time += (target - time) * (1 - Math.exp(-dt * 5))`.
- **One function draws the frame:** `render(t)` reads every keyframe table and computes the whole frame. Scrolling back plays the story in reverse, and the scene only redraws when `t` or a control changes.

| File | What it holds |
| --- | --- |
| `js/data.js` | Chapters, camera path, story clock, construction, floor picker data, prices, layouts |
| `js/i18n.js` | All text in three languages, plus number, money and date formatting |
| `js/sky.js` | Sun position for Tashkent, sky shader, light levels from sun elevation |
| `js/city.js` | Street grid, massing buildings with shader-drawn windows, trees, traffic, pins, mountains |
| `js/complex.js` | The three towers as instanced facade parts, construction, courtyard, floor highlight |
| `js/apartment.js` | The furnished apartment, built from a wall list and merged by material |
| `js/story.js` | Renderer, timeline, labels and chapter controls |
| `js/page.js` | Language switch, layouts, calculator, booking dialog, 3D loading and fallback |

Some techniques worth knowing:

- **Instanced facades:** each tower floor is made of instanced slabs, stone fins, glass and balconies. Construction progress, the floor highlight and the lift-away reveal only change instance matrices.
- **Sun through windows only:** the apartment ceiling is invisible but still casts a shadow, so sunlight enters only through the windows.
- **Light from the sun's height:** sky colour, fog, exposure, window glow and street lights all follow from the sun's elevation. The story clock and the visitor's slider can't disagree.
- **Reflections:** the sky is baked into a reflection map, rebaked whenever the sun moves more than a degree.

## Performance and fallbacks

- Screens narrower than 900 px and devices with 4 or fewer CPU cores get a lighter mode: no bloom, fewer trees and cars, smaller shadow maps.
- Browsers without WebGL 2 show the chapters as plain text.
- With "reduce motion" on, the chapters show as text, plus a button to load the 3D tour.

## Making it a real project

For a real developer, most changes are data:

1. Replace the text in `js/i18n.js` and the tables in `js/data.js`: chapters, schedule, flats per floor, statuses, prices.
2. Export the architect's model (Revit, 3ds Max) to glTF/GLB, load it with Three.js's `GLTFLoader`, and use it in place of the code-built towers and apartment. The camera path and story stay the same.
3. Feed flat statuses and prices from the developer's CRM instead of `flatStatus()`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Add `?debug` to expose `window.__world`. `__world.go(t)` jumps to any moment of the story.

## Design

The visual identity is "Chinar avenue in November": plane-tree bark grounds, solid shade panels, chinar gold as the only warm signal, Geologica (sharp terminals) for display and Golos Text for reading. See `DESIGN.md` for the system and `PRODUCT.md` for the product facts it serves.

## Photo credits

Both photos come from Wikimedia Commons under CC BY-SA 4.0. They are cropped, resized and tinted on the page, and that adaptation is shared under the same licence.

- Plane-tree bark: [City of London Cemetery London plane tree trunk bark 1](https://commons.wikimedia.org/wiki/File:City_of_London_Cemetery_London_plane_tree_trunk_bark_1.jpg) by Acabashi
- Chinar leaves: [Platanus orientalis kz02](https://commons.wikimedia.org/wiki/File:Platanus_orientalis_kz02.jpg) by Krzysztof Ziarnek, Kenraiz

## Related

- [Falak watch story](https://github.com/akbarov-labs/falak-watch-story): the same technique for a luxury watch
- [Paper Boat Voyage](https://github.com/akbarov-labs/paper-boat-voyage): the same technique for a landscape journey
