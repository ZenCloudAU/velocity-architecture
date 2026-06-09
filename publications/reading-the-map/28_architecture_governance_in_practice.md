# Chapter 28: Architecture Governance in Practice

*Part 3 · The Core Concepts*

---

Every chapter so far has, at some point, run into the same wall. The portfolio identifies an application to retire, and it does not get retired. The roadmap sequences the work, and a project jumps the queue. The principles say no new bespoke integrations, and a new bespoke integration appears. Good analysis produces a correct answer, and the answer does not stick.

The mechanism that makes answers stick is **architecture governance**, and its most visible instrument is the **Architecture Review Board** — the ARB. This chapter is about what governance looks like when it works, which is rarer and less ceremonial than the word "board" suggests, and about its most common failure mode, which has a name: Architecture Theatre.

---

## What Governance Is For

Architecture governance exists to do one thing: ensure that decisions made at the level of the whole are honoured by the parts. Without it, every project optimises locally — picks the technology that suits its timeline, builds the integration that solves its immediate need, procures the tool that fills its gap — and the sum of locally optimal decisions is the uncoordinated estate that produced the architecture debt in the first place.

Governance is the coordinating function. It is not there to slow projects down, though it is often experienced that way. It is there to ensure that the cost a local decision imposes on the whole is considered before the decision is made — to internalise the externality, in the economist's phrase. The project that wants a quick bespoke integration is not wrong about its own needs. It is simply not the body that bears the estate-wide cost of another point-to-point connection. Governance is where that cost gets represented.

This framing matters because it tells you what good governance produces: not documents, not compliance, but *better decisions made visible and accountable*. A governance process that produces lots of paper and no changed decisions is not governing. It is performing.

---

## The Architecture Review Board

The ARB is the standing body that exercises architecture governance. In its healthy form it is small, senior enough to decide, and clear about its authority. Three features distinguish a real ARB from a ceremonial one.

**Clear terms of reference.** What does the ARB review, and what does it not? An ARB that tries to review everything reviews nothing well and becomes a bottleneck everyone learns to route around. A useful ARB reviews decisions above a defined threshold — significant spend, new technology choices, deviations from principle, cross-domain changes — and explicitly delegates everything below the threshold. The boundary is as important as the remit.

**Real authority.** Can the ARB say no, and does no mean no? An ARB whose decisions are advisory — that can recommend but not require — is a discussion group with minutes. The authority can be direct (the ARB approves or rejects) or it can be escalatory (the ARB cannot block, but an unresolved objection escalates to an executive who can). Either works. What does not work is authority that exists on paper and evaporates the moment a powerful project leader pushes back.

**Design authority versus advisory function.** These are two different jobs often confused. A **design authority** owns the architecture and makes binding decisions about it. An **advisory function** offers expert opinion that others may take or leave. An organisation must be honest about which one its ARB is, because an advisory body dressed in design-authority language produces the worst outcome: the appearance of governance with none of its effect.

---

## Architecture Theatre

The pathology that shadows architecture governance has a name, coined by practitioners frustrated with its prevalence: **Architecture Theatre**. It is governance that looks rigorous and produces nothing binding — the performance of control in the absence of control.

Architecture Theatre has recognisable symptoms. There are meetings, and the meetings have agendas, and the agendas are followed, and minutes are produced. There are review templates, and projects fill them in. There are gate reviews, and projects pass through them. And yet the estate continues to fragment, the principles continue to be violated, and the same problems recur — because none of the apparatus actually changes any decision. The theatre consumes the time and attention that real governance would require, while delivering only the reassurance that governance is happening.

The tell is always the same: ask what decision the governance process has *reversed* or *prevented*. Real governance can point to projects it stopped, technologies it rejected, procurements it blocked. Theatre cannot, because its function was never to decide — it was to be seen to deliberate. A review board that has never said no is not a board that always agrees; it is a board that does not actually have the authority to disagree.

---

## Meridian's ARB: The First Three Months

*Meridian has no architecture governance when the EA arrives — which is precisely why every previous rationalisation attempt failed. The case for an ARB is part of the gap analysis, and establishing it is the first wave of the roadmap. Its first three months are instructive because they show governance being tested before it is trusted.*

*Month one is terms of reference. The EA resists the temptation to give the ARB sweeping authority over everything, which would guarantee it becomes a bottleneck and loses credibility in its first quarter. Instead the threshold is set deliberately high: the ARB reviews technology choices above £50,000, any new integration, any deviation from the agreed principles, and any change touching patient data. Everything below the threshold is delegated to delivery teams with a light-touch checklist. The board is five people — the EA, the head of infrastructure, a senior clinician, the information governance lead, and a delivery director — small enough to decide and senior enough to mean it. The authority is escalatory: the ARB cannot unilaterally block a project, but an unresolved ARB objection goes to the IT executive, who can.*

*Month two is the first real decisions, and they are deliberately undramatic — approving the cloud platform pattern, endorsing the migration sequencing, ratifying the principle on patient identity. The board is establishing that it decides things and that its decisions are recorded and followed. Credibility is built on small honoured decisions before it is tested on large contested ones.*

*Month three is the first conflict, and it is the moment the ARB either becomes real or becomes theatre. A community-services project, under its own deadline pressure, has shortlisted a departmental system that would require a new point-to-point integration to the clinical portal — a direct violation of the agreed "no new bespoke integrations" principle. The project leader argues, reasonably, that the integration platform does not exist yet (it is Wave 5) and that waiting would miss their deadline. The principle and the project's reality are in genuine conflict.*

*The ARB does not simply enforce the principle, which would make it look rigid, nor waive it, which would make it look powerless. It does the thing real governance does: it makes the trade-off explicit and decides with the cost visible. It approves a time-boxed exception — the integration may be built, but it is logged as architecture debt with a mandated remediation date in Wave 5, and the project accepts the remediation cost in its own budget. The principle holds, the project proceeds, and the cost of the exception is owned rather than hidden. The board has demonstrated that it can say a conditional yes that is not the same as a surrender — which is the subtlest and most important thing a governance body learns to do.*

---

## Translator Panel

> **TOGAF says:** "Architecture Governance is the practice by which enterprise architectures and other architectures are managed and controlled at an enterprise-wide level, supported by an Architecture Board with the authority and responsibility to ensure compliance."
>
> **What that means:** Someone has to be accountable for whether architecture decisions are honoured, and that someone needs real authority. "Compliance" sounds bureaucratic, but it means something concrete: the principles and roadmap the organisation agreed are actually followed, not quietly abandoned the first time a project finds them inconvenient.

> **Project teams say:** "Do we really have to take this to the ARB? It'll slow us down."
>
> **What that means:** Sometimes the honest answer is no — if the decision is below the threshold, it should never reach the board. When the answer is yes, the slowdown is the point: the review is where the estate-wide cost of a local decision gets considered. A good ARB minimises this friction by setting a high threshold and deciding fast; a bad one earns the complaint by reviewing everything slowly.

---

## The Key Idea

Architecture governance is the mechanism that makes good analysis stick — the coordinating function that ensures decisions made for the whole are honoured by the parts. Its instrument, the Architecture Review Board, works only when three things are real: a clear threshold that says what it reviews and what it delegates, genuine authority so that "no" means no, and honesty about whether it is a design authority or an advisory function. Its characteristic failure is Architecture Theatre — the performance of control without the substance, recognisable by its inability to name a single decision it has prevented or reversed. The mark of a board that is actually governing is not that it always agrees, nor that it always refuses, but that it can make a trade-off explicit and decide with the cost in plain view — including the conditional yes that owns an exception rather than hiding it.

**Next:** Chapter 29 turns to a distinction that governance depends on but that is widely muddled — the difference between what an architecture needs (the building block) and what implements it (the solution) — and why getting the order wrong drives bad procurement.

---

## Further Reading

- **The Open Group — TOGAF Standard: Architecture Governance** (opengroup.org): The formal model of governance, the Architecture Board, and compliance. Read it for the structure, but pair it with this chapter's emphasis on authority and the theatre failure mode, which the standard treats only lightly.
- **Gregor Hohpe — The Software Architect Elevator** (O'Reilly, 2020): Hohpe's chapters on architecture as a control system, and on the difference between making decisions and being seen to make them, are the best available antidote to Architecture Theatre.
- **Niek de Visscher — writing on connection over control** (see Chapter 51): The argument that governance positioned as control produces worse outcomes than governance positioned as connection is directly relevant to designing an ARB that teams cooperate with rather than route around.
