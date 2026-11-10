# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: owners and marketing heads of Tashkent residential developers.** Akbarov Labs shows them this demo to win a contract for a launch site. They judge whether it looks like a real, premium developer site they would put their own project on, and whether it would sell flats.
- **Secondary: home buyers in Tashkent** (families choosing a flat in a new building that is not finished yet), the audience the live site would serve. They read Uzbek or Russian first, often on a phone.

## Product Purpose

A concept launch site for a fictional residential complex, Yashil Vodiy Residence, built to demonstrate what Akbarov Labs can make for a developer. Success: a developer watching the demo wants this for their next project.

## Positioning

"See your exact flat before it exists." The site tells one scroll-driven 3D story that lets a buyer choose their floor and see that flat's sunlight in summer and winter, the view from its window, and the dated build schedule. Most developer sites show renders and a PDF price list; this one turns the 3D tour into proof.

## Operating Context

- Buyers compare several off-plan projects. Their biggest fear is a project that stalls, so schedules, permits and escrow matter.
- Prices are in so'm with a dollar equivalent. Developers sell through interest-free instalments, and buyers expect to book a visit to the sales office.
- The demo is shown live by Akbarov Labs on a laptop, and shared as a link opened on phones.

## Capabilities and Constraints

- Static site with no build step: HTML, CSS and ES modules, Three.js 0.169 from jsDelivr. Published on GitHub Pages under the akbarov-labs organisation.
- Story chapters: dusk overview, location, construction timeline, courtyard, floor picker, dollhouse apartment, and a sunlight study computed for Tashkent that ends in the window view. After the story: layouts, instalment calculator, trust section, sales office and a booking form.
- Fully localised in Uzbek (Latin, with ʻ), Russian and English.
- The booking form is a demo: it validates and never sends data.
- A no-WebGL / reduced-motion fallback shows the chapters as text.

## Brand Commitments

- The name **Yashil Vodiy Residence** ("green valley") is fixed. Fonts, colours, logo and voice are open.

## Evidence on Hand

- Everything is fictional: the developer (Vodiy Qurilish), prices, dates, statuses, distances and the trust facts. The footer and booking form say so.
- There are no real photos, testimonials, customers or press, and none may be invented as if real.

## Product Principles

1. The 3D story is the proof. Every chapter answers a buyer's real question.
2. Honest by construction: planned dates look planned, sold flats look sold, demo parts say they are demo.
3. Tashkent first: Uzbek and Russian are first-class, prices are local, and the place is recognisable.
4. It has to look like a real developer's product, not an agency experiment.

## Accessibility & Inclusion

- WCAG AA contrast, visible focus, keyboard-reachable controls, and touch targets of 44 px on phones.
- The text fallback must stay complete for reduced-motion and no-WebGL visitors.
