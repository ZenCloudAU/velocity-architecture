# Chapter 40: How to Read a Wardley Map

*Part 4 · Reading the Diagrams*

---

Most architecture diagrams are static. They show what exists and how it connects, frozen at a moment. A **Wardley map**, introduced conceptually in Chapter 13, adds the dimension the others lack: **movement**. It shows not just what an organisation has but where each piece is heading — what is becoming a commodity, what is still being invented, and therefore what you should stop building yourself and what you should invest in. It is the one diagram in this book that is explicitly about the future.

This chapter teaches the reading of a Wardley map through Meridian's IT landscape. Wardley maps look deceptively simple — boxes and lines on two axes — and the simplicity hides a discipline that takes practice to read well. The payoff is a kind of strategic X-ray: the ability to look at a landscape and see which parts are worth fighting over and which are not.

---

## The Two Axes

A Wardley map has two axes, and almost everything about reading it comes from understanding them.

The **vertical axis is the value chain** — the chain of needs from the visible user need at the top down to the invisible foundations at the bottom. At the top sits the thing a user directly wants; below it, the things that thing depends on; below those, the things *those* depend on, and so on down to raw infrastructure. Height on the map means *closer to the visible user need*; depth means *further toward the invisible foundations*. The vertical axis answers "what depends on what, in terms of user value?"

The **horizontal axis is evolution** — and this is the axis that makes Wardley mapping unique. It runs left to right through four stages: **Genesis** (novel, just invented, uncertain), **Custom-built** (being built bespoke, understood but not standardised), **Product** (productised, available off the shelf, competing on features), and **Commodity** (standardised, utility-like, competing on price and reliability). Position on this axis says how *evolved* — how mature, standardised, and commoditised — each component is. The horizontal axis answers "how settled is this, and which way is it moving?"

The combination is the map: each component placed at a height (its position in the value chain) and a horizontal position (its evolutionary stage), connected by dependency lines.

```
 value
  ▲   [patient-facing service]            (visible need)
  │        │
  │   [clinical applications]
  │        │
  │   [hosting / compute]
  │        │
  │   [electricity / network]              (invisible foundation)
  └────────────────────────────────▶ evolution
     Genesis   Custom   Product   Commodity
```

---

## Reading Position: What Should You Be Doing?

The first reading skill is interpreting a component's **horizontal position**, because position implies how you should treat it.

Components in **Genesis** are novel and uncertain. You treat them with experimentation — you cannot buy them, and building them is a bet. They are where differentiation might come from, and also where most things fail.

Components in **Custom-built** are understood but not yet standardised. You build them, but with the expectation that they will eventually commoditise.

Components in **Product** can be bought off the shelf. Building them yourself is usually a mistake — you would be reinventing something the market already sells.

Components in **Commodity** should be consumed as a utility — bought on price and reliability, like electricity. Building or even buying a bespoke version is waste; the entire point of a commodity is that it is interchangeable and cheap.

The strategic error a Wardley map exposes most sharply is the **mismatch between a component's evolutionary stage and how the organisation is treating it**. Building bespoke what you should buy as a product. Buying a product when a commodity utility would do. Treating as a stable commodity something that is actually still in genesis and changing under you. The map makes these mismatches visible as a gap between where a component sits and how it is being handled.

---

## Reading Movement: What Is Commoditising?

The second and harder reading skill is interpreting **movement** — the tendency of components to drift rightward over time, from genesis toward commodity, as they mature and standardise.

Almost everything evolves rightward eventually. Today's novel genesis capability is tomorrow's product and next decade's commodity. Computing moved from custom-built data centres to commodity cloud utility within a generation. Reading a Wardley map strategically means asking, of each component, *which way is this moving and how fast?* — because a component that is commoditising is one you should be planning to *stop* building and *start* buying, and a component still in genesis is one you cannot yet rely on as stable.

The most valuable insight a Wardley map offers is about **where to invest effort**. Effort spent building or differentiating a commoditising component is effort wasted — you are polishing something that is becoming a cheap utility. Effort spent on the genesis components, where real differentiation lives, is where strategic advantage comes from. The map directs attention away from the settled foundations and toward the moving frontier.

---

## Reading Meridian's Landscape

*Meridian's EA maps the IT landscape on a Wardley map specifically to settle an argument about where to spend and where to stop spending. Reading it resolves three questions.*

*The first is VMware and hosting. On the map, compute and virtualisation sit deep in the value chain (foundational, far from the visible patient need) and well to the right (commodity). They have evolved into a utility. Yet Meridian is treating them as if they were a product to be managed and licensed and maintained in-house — the mismatch the map exposes. The reading is unambiguous: compute is a commodity, and the strategic move is to consume it as a utility (cloud), not to keep running and licensing a bespoke virtualisation estate. The VMware crisis, on the Wardley map, is the visible symptom of treating a commodity as a product. This reframes the cloud migration not as modernisation for its own sake but as moving a commodity to its correct evolutionary treatment.*

*The second is the EPR. On the map, the electronic patient record sits high in the value chain (close to the clinical need) and in the Product stage — there is a competitive market of EPR products. The reading: this is something to *buy and consolidate*, not build, and the dual-EPR situation is a failure to treat a product as a product (running two where one would do). The map supports the consolidation decision and warns against the temptation, which periodically surfaces, to build a bespoke Meridian record system — which would be dragging a Product-stage component backward into Custom-built, the wrong direction entirely.*

*The third is the genuinely interesting one: where might Meridian differentiate? Reading the map for genesis components, the EA identifies that the integration of community and acute care — coordinating a patient's journey across settings — is, for Meridian's specific population, closer to custom/genesis than product. There is no off-the-shelf answer well-suited to its model. This is where bespoke effort might actually be warranted, because it is where the value chain is high and the evolution is early. The map's strategic message is therefore: stop spending bespoke effort on commodity hosting, buy and consolidate the product-stage EPR, and concentrate whatever bespoke capability the organisation has on the genesis-stage care-coordination problem where it might actually create advantage. That sentence is the whole IT strategy, and the Wardley map is what makes it readable in one picture.*

---

## Translator Panel

> **Wardley mappers say:** "Compute has evolved to commodity — we shouldn't be running it as a product."
>
> **What that means:** The thing in question has become a standardised utility, like electricity, so building or bespoke-managing it is waste. The strategic move is to consume it as a utility (typically cloud) and redirect the saved effort toward things that are still evolving, where effort can actually create advantage.

> **Executives say:** "Why does it matter which 'stage' something is in?"
>
> **What that means:** Because the stage tells you how to treat it — experiment with genesis, build custom, buy products, consume commodities as utilities — and the most expensive strategic errors come from treating something as the wrong stage. The map's whole purpose is to make those mismatches, and the direction things are moving, visible enough to act on.

---

## The Key Idea

A Wardley map is the one architecture diagram about the future: it adds an evolution axis to a value chain, placing each component by how close it is to the visible user need (height) and how mature and commoditised it is (left-to-right, from Genesis through Custom-built and Product to Commodity). Reading position tells you how a component should be treated — experiment, build, buy, or consume as a utility — and the sharpest insight is the mismatch between a component's evolutionary stage and how the organisation actually handles it, such as running a commodity as a bespoke product. Reading movement tells you what is commoditising and should be handed off, and where the genesis frontier is, because that frontier is the only place bespoke effort creates advantage. The map's gift is strategic focus: stop spending effort on the settling foundations, and concentrate it on the moving edge.

**Next:** Chapter 41 closes Part 4 by reading the architecture roadmap critically — applying the diagram-reading discipline to the artefact that sequences everything, and learning to tell a governed plan from a wish list.

---

## Further Reading

- **Simon Wardley — Wardley Maps** (available free, medium.com/@swardley and the published book): The original and best source, written serially by the framework's creator. Idiosyncratic but unmatched; the early chapters on the two axes and evolution are essential for reading maps confidently.
- **Learn Wardley Mapping** (learnwardleymapping.com): A structured, free introduction that is gentler than Wardley's own serialised book — the fastest route to reading competence.
- **Ben Mosior — practitioner Wardley mapping guides** (hiredthought.com): Clear, practical material on building and reading maps in real organisations, with worked examples that build the movement-reading skill this chapter emphasises.
