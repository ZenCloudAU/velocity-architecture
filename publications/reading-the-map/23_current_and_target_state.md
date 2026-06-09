# Chapter 23: Current State and Target State

*Part 3 · The Core Concepts*

---

Every piece of architecture work lives in the gap between two pictures: the one you have and the one you want. The current state is the architecture as it actually is — the systems, the data, the integrations, the constraints, in all their accumulated untidiness. The target state is the architecture as you intend it to become. The work of architecture is, in large part, the disciplined management of the distance between them.

This sounds obvious. It is routinely got wrong, in two opposite directions. Some organisations spend so long documenting the current state that the target is never reached — the baseline becomes a six-month archaeology project that exhausts the appetite for change. Others leap to a target state without an honest baseline, and discover halfway through that the migration path they designed was based on a current state that does not exist.

This chapter explains how to hold both pictures honestly, and how to keep either from becoming fiction.

---

## Why You Need Both

A target state without a current state is a wish. You cannot plan a journey if you do not know where you are starting from. The most elegant target architecture is useless if the path to it runs through dependencies you did not know you had.

A current state without a target state is an inventory. It tells you what you have and nothing about where you are going. Documenting the estate in exhaustive detail with no target to orient the work is how architecture functions earn their reputation for producing shelfware — beautiful, accurate, comprehensive descriptions that change nothing.

The two pictures are only useful together, and they are only useful at the right level of detail. This is the discipline most people get wrong: they document the current state at the level of detail appropriate to the target, or the target at the level of detail appropriate to the current state. Both errors waste effort.

---

## The Baseline Trap

The **baseline** — the documented current state — has a gravitational pull towards completeness that must be actively resisted.

The instinct, once you start documenting, is to keep going. Every system has another integration. Every integration has another edge case. Every data flow has another exception. There is always more to document, and the more you document, the more you discover you do not yet understand. An undisciplined baseline exercise can run for six months and still feel incomplete, because completeness is not actually the goal.

The goal of the baseline is **decision support**. You document the current state to the level of detail required to make the decisions in front of you — no more. If you are planning a VMware exit, you need to know which workloads run on VMware, what they depend on, and what depends on them. You do not need to document the internal data model of every application, because that level of detail does not change the migration decision.

The test for whether the baseline is detailed enough is not "have we documented everything?" It is "can we make the decisions the vision requires?" When the answer is yes, the baseline is done, regardless of how much remains undocumented. The rest can be documented later, when a decision requires it.

This is uncomfortable for the completionist temperament that architecture often attracts. But a baseline scoped to the decision is the difference between an architecture function that moves and one that documents.

---

## The Contested Target

If the current state has a pull towards excessive detail, the target state has a pull towards fantasy — and a pull towards disagreement, because different stakeholders want different futures.

The target state is where the organisation's tensions become visible. The CFO's target state is the cheapest one that works. The clinical director's target state is the one that disrupts care the least. The infrastructure team's target state is the one they can actually deliver with the people they have. The digital team's target state is the most modern one. These are not the same picture, and pretending they are is how target states become fiction.

An honest target state does not resolve these tensions by ignoring them. It makes them explicit and forces a decision. The architect's job is not to invent the target alone; it is to surface the competing targets, show their trade-offs, and help the organisation choose one it can actually commit to.

A target state that everyone agreed to instantly is usually a target state that means different things to different people. Real agreement is reached through visible trade-off, and it tends to feel like loss — because choosing one future means declining others.

---

## Holding the Tension at Meridian

*Meridian's current state is, unusually, well understood by the time the EA begins the target-state work. The capability heat map, the application portfolio, the data assessment, and the integration map from the preceding work give an honest baseline: 94 applications, 34 point-to-point integrations, fragmented data with 23 of 31 entities unowned, aging infrastructure, no cloud, dual EPR. The baseline is not complete — eleven applications still have no documented owner — but it is sufficient for the decisions in front of the organisation. The EA resists the pull to make it more complete than the decisions require.*

*The target state is where the difficulty lives. Three are in contention.*

*The infrastructure-led target is a clean cloud platform with the existing applications rehosted onto it — fastest off VMware, lowest disruption, but it carries the fragmented application estate forward unchanged. The data problem and the dual-EPR problem survive into the new world intact.*

*The digital-led target is a consolidated, cloud-native estate with a single EPR, a resolved patient-identity master, and the point-to-point integrations replaced by a managed integration platform. It is the right destination and an implausible near-term plan — it fuses three major programmes into one and assumes a delivery capacity Meridian does not have.*

*The clinically-led target is whatever disrupts patient care the least, which in practice means changing as little as possible — a target state that is really a defence of the current state.*

*The EA's contribution is not to pick a winner. It is to make the three targets visible side by side, with their costs and their consequences, so the leadership team can see that they are choosing between real alternatives rather than discovering a single obvious answer. The chosen target — a cloud platform now, with EPR consolidation and integration modernisation sequenced as later waves — is none of the three in pure form. It is a negotiated target that holds the infrastructure team's urgency, the digital team's destination, and the clinical team's caution in a sequence they can all live with. It became achievable only once the tension was made explicit rather than wished away.*

---

## Levels of Detail

A practical discipline that prevents both the baseline trap and the target fantasy is to keep the current state and the target state at matching, decision-appropriate levels of detail — and to recognise that the target state is usually documented at a *higher* level of abstraction than the baseline.

The current state can be precise because it exists; you can observe it. The target state is necessarily less precise because it does not exist yet; over-specifying it pretends to a certainty you do not have. A target state documented to the same fine grain as the baseline is making promises about a future it cannot actually predict, and it will be wrong in detail in ways that discredit the whole picture.

The useful pattern is: baseline precise enough to support the decision; target clear enough to set direction; and the detail of the target filled in progressively, wave by wave, as each transition is actually designed. This is why transition architectures (Chapter 30) matter — they are how the abstract target becomes concrete in stages, rather than all at once and prematurely.

---

## Translator Panel

> **TOGAF says:** "The Baseline Architecture describes the existing architecture; the Target Architecture describes the desired future state. Phases B, C, and D develop both across the business, data, application, and technology domains."
>
> **What that means:** For each domain, you describe what you have and what you want. The method is deliberately symmetrical, but the practice should not be — document the baseline to the depth the decision needs, and the target to the clarity the direction needs, and stop.

> **Stakeholders say:** "Can't we just fix what we have rather than do all this documentation?"
>
> **What that means:** Sometimes, yes — if the change is small and contained, a full baseline-and-target exercise is overkill. The honest answer depends on scope. For a single-system change, fix it. For anything that touches multiple systems, the few weeks spent establishing where you are and where you are going will save you from designing a path through dependencies you did not know existed.

---

## The Key Idea

Architecture lives in the gap between the current state and the target state, and the discipline is to keep both honest. The baseline has a gravitational pull towards exhaustive completeness that must be resisted: document the current state to the level of detail the decision requires and no further. The target state has a pull towards fantasy and a tendency to mean different things to different stakeholders: surface the competing targets, make their trade-offs explicit, and help the organisation commit to one it can actually reach. Hold the two at matching, decision-appropriate levels of detail, and fill in the target progressively rather than all at once. The gap between the two pictures is not a problem to be eliminated — it is the architecture's actual work.

**Next:** Chapter 24 turns to the instrument that makes the gap visible and actionable — gap analysis — and explains why the most important gaps are rarely the most obvious ones.

---

## Further Reading

- **The Open Group — TOGAF Standard: Phases B–D** (opengroup.org): The architecture-development phases where baseline and target are produced for each domain. The guidance on level of detail is light, which is why this chapter's emphasis on decision-appropriate scoping matters in practice.
- **Gregor Hohpe — The Software Architect Elevator** (O'Reilly, 2020): Hohpe's discussion of operating at different altitudes — from the engine room to the boardroom — is the clearest available treatment of why baseline and target are documented at different levels of abstraction.
- **Eli Goldratt — The Goal** (North River Press, 1984): A novel about constraints and improvement. Its core lesson — that you improve a system by understanding where it actually is before deciding where it should go — is the current-state discipline in narrative form.
