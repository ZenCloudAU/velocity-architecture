# Chapter 25: Architecture Roadmap

*Part 3 · The Core Concepts*

---

A gap analysis tells you what stands between the current state and the target. A roadmap tells you the order in which you are going to close those gaps, and why that order rather than another. It is one of the most frequently produced and most frequently misread artefacts in the whole discipline, because it looks exactly like something it is not: a project plan.

An **architecture roadmap** is not a project plan. A project plan answers "what tasks, in what order, by when, by whom?" A roadmap answers a prior and more strategic question: "what capabilities and transition states, in what sequence, and what does the sequence depend on?" Confusing the two is how roadmaps get treated as commitments they were never meant to be, and how genuine roadmaps get dismissed as too vague to be useful.

This chapter explains what a roadmap contains, how it differs from a plan, and — most usefully for a reader — how to tell a governed roadmap from a wish list when one appears on a screen in a meeting.

---

## Horizons and Waves

A roadmap organises work into **horizons** — broad time bands that get less precise the further out they go. The near horizon is concrete: these are the things we are doing now, scoped and resourced. The middle horizon is directional: these are the things we intend to do next, shaped but not fully detailed. The far horizon is aspirational: this is where we are heading, named but not committed.

The decreasing precision is a feature, not a weakness. A roadmap that claims the same certainty about year three as about this quarter is lying, and an experienced reader knows it. Honest roadmaps get vaguer with distance because the future genuinely is vaguer with distance.

Within the horizons, work is grouped into **waves** — coherent bundles of related change that move the architecture from one stable state to the next. A wave is not a single project; it is a set of changes that make sense to do together and that leave the estate in a defensible condition when complete. The wave structure is what distinguishes a roadmap from a backlog: a backlog is a list, a roadmap is a sequence of states.

---

## Transition States

The most important and least understood feature of a roadmap is the **transition state** (sometimes called a transition architecture, covered in depth in Chapter 30). A transition state is an intermediate, stable configuration of the architecture between the current state and the target — a place the organisation can stop and operate safely while the next wave is planned and funded.

This matters because real organisations cannot move from current to target in one step. The target is reached through a series of intermediate states, and each intermediate state has to be survivable. The roadmap's job is to define those states so that each wave delivers the architecture into a stable configuration, not a half-finished one.

A roadmap with no transition states — one that shows only the current state and the target, with a set of projects between them — is a warning sign. It usually means nobody has thought about what the estate looks like partway through, which is exactly when the risk is highest.

---

## What the Sequence Tells You

The order of the waves on a roadmap is not arbitrary, and reading the order is how you understand the architect's actual thinking.

Some sequencing is driven by **dependency**: this wave cannot start until that one finishes, because it needs something the earlier wave produces. The platform before the migrations. The identity resolution before the EPR consolidation. Dependency-driven sequencing is the strongest kind, because it reflects genuine constraint rather than preference.

Some sequencing is driven by **risk**: do the risky thing early, while there is still time and budget to recover, or do the safe thing early, to build confidence and credibility. Both are defensible, and which one an architect chooses tells you something about the organisation's risk appetite and political situation.

Some sequencing is driven by **value**: front-load the waves that deliver visible benefit, to maintain stakeholder support for the less visible enabling work that has to follow. This is partly political and entirely legitimate — a roadmap that delivers nothing visible for two years will not survive two years of funding decisions.

When you read a roadmap, the question to ask is *why this order?* If the answer is dependency, the sequence is robust. If the answer is value or risk, the sequence is a choice, and choices can be challenged.

---

## Meridian's Five-Wave Roadmap

*Meridian's roadmap covers the VMware exit and the EPR consolidation across five waves and three transition states. Its structure repays close reading because the sequence encodes every hard decision the leadership team made.*

*Wave 1 establishes the cloud platform and the architecture governance function. Neither delivers a visible business outcome. Both are pure enablers — the platform that every later migration lands on, and the Architecture Review Board that makes every later decision stick. The EA places them first on dependency grounds: nothing else can proceed safely until they exist. This is the wave most likely to be questioned by stakeholders impatient for visible results, and the wave whose absence would doom the rest.*

*Wave 2 migrates the low-risk, low-dependency workloads off VMware onto the new platform — deliberately not the clinical systems. This is the risk-driven choice: prove the migration pattern on workloads where a mistake is recoverable before touching anything a clinician relies on. At the end of Wave 2, Meridian is in its first transition state: partially off VMware, with a proven migration capability and a still-intact clinical estate.*

*Wave 3 resolves patient identity — establishing the authoritative master record — before any EPR work begins. This is the dependency the gap analysis surfaced: consolidating EPRs without resolving identity would carry the problem into the new system. Wave 3 produces no new application; it produces a resolved data foundation. The second transition state follows: a single source of patient-identity truth, with both EPRs still running but now reconcilable.*

*Wave 4 migrates the clinical systems and begins EPR consolidation against the resolved identity foundation. This is the highest-risk, highest-value wave, deliberately placed after the platform is proven and the identity foundation is laid. The third transition state follows: a single EPR on the new platform.*

*Wave 5 modernises integration — replacing the 34 point-to-point connections with the managed integration platform, now that the systems they connect have stabilised. It comes last because integrating systems that are still moving would mean integrating twice.*

*The sequence is almost entirely dependency-driven, which is what makes it defensible. The one value-driven concession is a small set of quick wins folded into Wave 2 — visible improvements to reporting — included specifically to sustain executive patience through the long enabling work. The EA is candid that this is a political accommodation, not an architectural necessity, and the roadmap notes it as such.*

---

## How to Read a Roadmap Critically

When a roadmap appears in a meeting, a literate reader can assess its quality in about a minute by asking four questions.

**Where are the transition states?** If there are none, the roadmap has not thought about what the estate looks like partway through. Ask what state the organisation is in at the end of each wave.

**What drives the sequence?** Dependency, risk, or value? A roadmap whose author can explain the sequencing in those terms has thought about it. A roadmap whose sequence is "the order we thought of them" has not.

**What is the governance mechanism?** A roadmap is a plan of intent. What makes it real is the body that holds the organisation to it — that prevents a project from jumping the queue or skipping a transition state. A roadmap with no named governance is a wish list, however well sequenced.

**Where does it get vaguer?** It should get vaguer with distance. A roadmap that is equally precise three years out is either dishonest or has confused itself with a project plan.

---

## Translator Panel

> **TOGAF says:** "The Architecture Roadmap lists individual increments of change and lays them out on a timeline to show progression from the Baseline to the Target Architecture, incorporating Transition Architectures where appropriate."
>
> **What that means:** A roadmap is the ordered set of changes that moves you from where you are to where you want to be, with safe stopping points along the way. The phrase "increments of change" is doing important work — it is not a list of projects, it is a sequence of architectural states.

> **Executives say:** "So when will it be finished and what will it cost?"
>
> **What that means:** This is the project-plan question asked of a roadmap, and the honest answer is that the near horizon can be costed with confidence and the far horizon cannot. A roadmap that pretends to answer the cost-and-date question for year three with the same confidence as for this quarter has stopped being a roadmap and become a fiction.

---

## The Key Idea

A roadmap is not a project plan. It answers a strategic question — what capabilities and transition states, in what sequence, and why — rather than a delivery question. Its defining features are horizons that get less precise with distance, waves that move the architecture between stable states, and transition states that give the organisation safe places to stop. The sequence encodes the real thinking: dependency-driven order is robust, value- and risk-driven order are defensible choices that can be challenged. And a roadmap without a governance mechanism is a wish list, because what makes a roadmap real is not the quality of its sequencing but the existence of a body with the authority to hold the organisation to it.

**Next:** Chapter 26 turns to the thing the roadmap is really trying to pay down — architecture debt — and how to make a structural problem visible to a CFO who only sees the bill.

---

## Further Reading

- **The Open Group — TOGAF Standard: Phases E and F** (opengroup.org): Opportunities and Solutions (E) and Migration Planning (F) are where the roadmap and transition architectures are produced. Read these alongside Chapter 30 of this book.
- **Geoffrey Moore — Zone to Win** (Diversion Books, 2015): Moore's horizon model — managing performance, productivity, incubation, and transformation zones simultaneously — is the clearest business framing of why a roadmap must hold near-term delivery and long-term transformation in the same picture.
- **Martin Fowler — "An Appropriate Use of Metrics"** (martinfowler.com): Indirectly relevant — Fowler's caution about precision implying certainty is exactly the trap a roadmap falls into when its far horizon is drawn as confidently as its near one.
