# Appendix D — Diagram Reading Guide

*Reading the Map · Reference*

---

One annotated reference for each diagram type from Part 4, all using Meridian Health Partnership. This is the quick-reference companion to Chapters 34–41: when a diagram appears in a meeting, find its type here for the elements to read and the questions to ask. Each entry gives the anatomy, the reading questions, and the single most important thing to look for.

---

## Capability Map (Chapter 34)

**What it shows:** What the organisation does — capabilities — organised into levels, often heat-mapped for health.

**Read:** Levels (decompose from Level 1 to find causes), colours (red = important but underperforming), ownership (blank owner fields), and the pattern across cells (systemic vs. localised).

**Ask:** What does this colour mean — symptom or cause? Which capabilities are missing or unowned? What does a red Level 1 trace down to?

**Most important thing to look for:** The trace from a red Level 1 cell down to its application, data, or ownership cause — and the unowned capabilities that are blank rather than coloured.

> *Meridian:* "Manage patient information" is red at Level 1 → "maintain patient identity" deepest red at Level 2 → traces to dual EPR and absent master at the application/data layers. Clinical-care capabilities are green: the organisation has an information problem, not a clinical one.

---

## Component Diagram (Chapter 35)

**What it shows:** Systems (boxes), interfaces (connection points), and dependencies (arrows).

**Read:** Arrow direction (A → B usually means A depends on B), incoming-arrow count (single points of failure), outgoing-arrow count (fragile dependents), and cycles (structural warnings).

**Ask:** What has many things depending on it? Are there cycles? What is *not* on this diagram — failure paths, external dependencies, unofficial-but-critical systems?

**Most important thing to look for:** What has been left out — the omitted dependency, the missing failure path, the critical-but-unofficial system.

> *Meridian:* The legacy portal has nine incoming dependencies (a single point of failure); a portal↔departmental-system cycle explains fragile restarts; the community caseload spreadsheet is missing from the official diagram entirely.

---

## Sequence Diagram (Chapter 36)

**What it shows:** Messages between participants over time, read top to bottom. Solid arrows = calls; dashed = responses.

**Read:** The happy path first (narrate it), then read for failure at every message.

**Ask:** What if this step fails? What if it is slow rather than failed? What state is the system left in if the sequence stops here?

**Most important thing to look for:** The failure paths — what the diagram does *not* show happening when each step goes wrong. This is the diagram's whole power.

> *Meridian:* The nurse-in-the-field record access works on the happy path. Read for failure: auth unreachable in poor coverage leaves no record; a slow EPR freezes the screen with no feedback; partial failure leaves a logged-in session with no data. All patient-safety issues invisible on the happy path.

---

## Activity Diagram (Chapter 37)

**What it shows:** A process as flow — start/end nodes, activities, decision diamonds, fork/join for parallel paths.

**Read:** The flow top to bottom and along branches; interrogate each decision diamond for ownership and criterion.

**Ask:** Who owns this decision and by what rule? Where does flow get stuck? Are there states with no exit?

**Most important thing to look for:** The decision point with no owner or no criterion — the classic process pathology, invisible as a shape but glaring once you ask "who decides this?"

> *Meridian:* The referral process has three unowned decisions — eligibility (assessed inconsistently by source), prioritisation (no shared rule), and a "hold for review" state with no exit arrow (the source of genuinely lost referrals). The backlog was a decision-ownership problem, not a capacity problem.

---

## ArchiMate View (Chapter 38)

**What it shows:** Business, application, and technology layers at once, with relationships between them.

**Read:** Vertically — pick a business element and trace down through the application that realises it to the infrastructure that serves it. One thread at a time.

**Ask:** What does this capability actually depend on? If this infrastructure fails, what business service breaks?

**Most important thing to look for:** The vertical trace — the single thread from business need to fragile infrastructure that no other diagram shows in one picture.

> *Meridian:* "Community nursing" business service → realised partly by the caseload spreadsheet (which the view refuses to hide) → served by an unresilient file server. One traceable line from clinical service to single point of failure.

---

## Zachman Cell (Chapter 39)

**What it shows:** Not a diagram but a grid — six interrogatives (What/How/Where/Who/When/Why) × six perspectives (Executive → Enterprise), 36 cells, each a distinct kind of description.

**Read:** Locate any description in the grid first — which interrogative, which perspective — before judging it.

**Ask:** Which cell is this? Are people who seem to disagree actually in different cells describing the same thing?

**Most important thing to look for:** The same-words-different-rows confusion — people talking past each other because they occupy different perspectives on the identical subject.

> *Meridian:* Patient identity seen as a trust problem (clinician/Business row), an incoherent logical model (architect row), an unjoinable schema (engineer row), and a compliance risk (governance/Why column) — four correct descriptions of one root cause, never assembled until read through the grid.

---

## Wardley Map (Chapter 40)

**What it shows:** Components plotted by value-chain position (vertical: closer to user need = higher) and evolution (horizontal: Genesis → Custom → Product → Commodity).

**Read:** Each component's horizontal position (how to treat it) and its direction of movement (what is commoditising).

**Ask:** Are we treating this as its maturity warrants — building what we should buy, or bespoke-managing what we should consume as a utility? Where is the genesis frontier worth investing in?

**Most important thing to look for:** The mismatch between a component's evolutionary stage and how the organisation handles it.

> *Meridian:* Compute is a commodity being run as a bespoke product (the VMware crisis); the EPR is a Product to buy and consolidate, not build; community/acute care coordination is near-genesis — the one place bespoke effort might create advantage.

---

## Architecture Roadmap (Chapter 41)

**What it shows:** A sequence of changes against time — waves, initiatives, dependencies, transition states.

**Read:** Run the four critical questions — transition states, sequence drivers, governance mechanism, vagueness gradient.

**Ask:** Where are the safe stopping points? Why this order — dependency, risk, or value? What stops a project ignoring this? Does precision honestly decrease with distance?

**Most important thing to look for:** The governance mechanism — "what stops a project from ignoring this sequence?" A roadmap without an answer is a wish list.

> *Meridian:* Five waves, dependency-driven (platform+governance → low-risk migration → identity → consolidation → integration), three survivable transition states, ARB enforcement with a track record, and honestly vague later waves. It survives critical reading because it was built to.

---

## The General Reading Discipline

Across all seven diagram types, the same meta-skill applies: **read for what is not shown, not just what is**. The omitted dependency, the absent failure path, the unowned decision, the missing governance, the hidden mismatch. Every diagram is drawn at a level of abstraction that hides something, and the literate reader's most valuable question is always some version of "what has been left out, and does the omission matter?"
