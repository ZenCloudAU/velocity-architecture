# Appendix C — ADM Phase Reference

*Reading the Map · Reference*

---

TOGAF's Architecture Development Method on one page. For each phase: the question it answers, its primary artefact, a plain-English summary, when to apply it, and — equally important — when to skip it. The ADM is most useful as a *thinking structure*, applied selectively; this reference is built to support that selective use rather than a ceremonial run through every phase.

---

## The Phases

| Phase | Question it answers | Primary artefact | Plain English |
|---|---|---|---|
| **Preliminary** | Are we set up to do architecture at all? | Architecture principles, governance framework | Establish the principles and the governance before you start. |
| **A — Vision** | What is this work for? | Architecture Vision, Statement of Architecture Work | Agree the problem, scope, success, and sponsor on one page. |
| **B — Business** | What does the business need to do? | Business architecture (baseline + target) | Map the capabilities and processes — current and intended. |
| **C — Information Systems (Data + Application)** | What data and applications support it? | Data and application architectures | Map the data and the systems — current and intended. |
| **D — Technology** | What does it all run on? | Technology architecture (baseline + target) | Map the infrastructure and platforms — current and intended. |
| **E — Opportunities & Solutions** | How do we get there, broadly? | Roadmap, transition architectures | Identify the work packages and the safe intermediate states. |
| **F — Migration Planning** | In what order, and is it worth it? | Detailed roadmap, cost/value, dependencies | Sequence the work and confirm it is worth doing. |
| **G — Implementation Governance** | Is delivery building what we designed? | Architecture contracts, compliance reviews | Govern delivery so it honours the architecture. |
| **H — Change Management** | What do we do when reality changes? | Change requests, architecture updates | Keep the architecture current as conditions change. |
| **Requirements Management** | (continuous) What requirements drive every phase? | Requirements repository | Manage requirements across the whole cycle, not as one phase. |

---

## When to Apply, When to Skip

The ADM's reputation for heaviness comes from running every phase in full regardless of need. The skill is selective application. For each phase:

**Preliminary** — *Apply* when establishing or resetting an architecture function (no agreed principles or governance exist). *Skip* when these are already in place and unchanged; do not re-litigate them for every piece of work.

**A — Vision** — *Almost never skip.* This is the cheapest phase and the most expensive to omit (Chapter 22). Even a contained piece of work benefits from a one-page agreement on what it is for. *Lighten* it to a single page for small work; never drop it entirely.

**B/C/D — The domain phases** — *Apply* to the depth the decision requires (Chapter 23). *Skip the depth, not the phase*: for a single-application change you may need only a thin slice of the application and technology architectures, not a full baseline of all four domains. The error is documenting every domain exhaustively for a decision that touches one.

**E — Opportunities & Solutions** — *Apply* whenever the work spans more than one increment or needs transition states. *Skip* for a single, self-contained change with no meaningful intermediate states.

**F — Migration Planning** — *Apply* for any multi-wave programme. *Lighten* to a simple sequence for small work; the discipline is confirming dependencies and value, which matters even when the formal artefacts do not.

**G — Implementation Governance** — *Apply* proportionately to risk and via the ARB (Chapter 28). *Skip the ceremony, not the principle*: low-risk work below the governance threshold should be delegated, not gated. High-risk or principle-deviating work always warrants it.

**H — Change Management** — *Always live, never a one-off.* The architecture is never finished; H is the recognition that conditions change and the architecture must keep pace.

**Requirements Management** — *Always continuous.* Not a phase you do and finish; it runs alongside all the others.

---

## How to Use the ADM Without Being Used by It

Three disciplines keep the ADM an instrument rather than a ritual (Chapter 54).

**Run the phase, not the paperwork.** Each phase is a *question to answer*, not a set of documents to produce. Answer the question to the depth the decision needs, and produce only the artefacts that improve the decision. A phase whose question you can answer in a paragraph does not need a forty-page deliverable.

**Take the phases in the order that helps, not always the alphabet.** The ADM is drawn as a cycle, but real work often loops, skips, and revisits. The lettered order is a default, not a law. If a technology constraint (D) shapes the business options (B), let it.

**Stop when the question is answered.** The pull of the map (Chapter 54) is toward completeness — finishing every phase, populating every artefact. Resist it. The ADM has done its job when the decisions it exists to support can be made well, regardless of how many phases remain formally "incomplete".

---

## The One-Line Version

The ADM, stripped to its essence, is a sound sequence of questions: *What is this for? What does the business need? What data and systems support it? What does it run on? How do we get there? In what order? Is delivery honouring it? What happens when things change?* You can carry those eight questions into any architecture conversation without the framework's apparatus, and asking them in roughly that order is most of the value the ADM provides.
