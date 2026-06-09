# Chapter 37: How to Read an Activity Diagram

*Part 4 · Reading the Diagrams*

---

An activity diagram shows a process as **flow** — the sequence of activities, the decision points where the flow branches, the parallel paths that happen at the same time, and the start and end states that bound the whole. Where a sequence diagram shows messages between systems over time, an activity diagram shows the steps of a process regardless of who or what performs them. It is the diagram of *how work flows*, and it is the one most likely to reveal a process problem that no amount of system analysis would find: the decision point that nobody owns.

This chapter teaches the reading of an activity diagram through Meridian's community-services referral process, and explains the practical distinction between activity diagrams and sequence diagrams — which trips up many readers — by showing when each is the right tool.

---

## The Anatomy: Flow, Decisions, and Parallelism

The activity diagram's vocabulary is built around movement through a process.

The **start node** (usually a filled circle) marks where the process begins; the **end node** (a filled circle with a ring) marks where it finishes. Between them, **activities** (rounded boxes) are the steps — "receive referral", "assess eligibility", "assign caseworker". **Flow arrows** connect them, showing the order.

The **decision node** (a diamond) is where the flow branches based on a condition — "eligible?" with a yes-path and a no-path leaving it. Decision nodes are the most important elements to read carefully, because each one represents a choice that someone or something must make, and the quality of a process often comes down to whether its decisions are well-defined and well-owned.

**Parallel paths** are shown by a **fork** (a bar that splits one flow into several that proceed simultaneously) and a **join** (a bar that waits for several flows to complete before continuing). Forks and joins represent things that happen at the same time, and the join is a synchronisation point — the process cannot continue until all the parallel paths have arrived.

```
 (start)
    │
    ▼
 [receive referral]
    │
    ▼
 < eligible? > ──no──▶ [reject + notify] ──▶ (end)
    │ yes
    ▼
 [assign caseworker]
    │
    ▼
  (end)
```

Read top to bottom and along the branches, this is a process you can narrate: a referral arrives, eligibility is checked, ineligible referrals are rejected and the referrer notified, eligible ones get a caseworker assigned.

---

## Reading Decision Points for Ownership

The single most valuable reading skill for activity diagrams is examining each **decision node** and asking two questions: *what determines which way the flow goes?* and *who owns that determination?*

A healthy decision node has a clear, documented criterion and a clear owner — a person or rule that makes the call. An unhealthy one has either no defined criterion (so the decision is made inconsistently, differently by different people on different days) or no owner (so the decision falls into a gap where everyone assumes someone else is making it).

The decision point with no owner is the classic process pathology, and the activity diagram is the artefact that makes it visible. On the diagram, an unowned decision looks exactly like an owned one — a diamond with branches. The diagram does not, by itself, show the ownership void. But reading the diagram *with the ownership question in mind* surfaces it immediately: point at each diamond and ask "who decides this?" The diamonds for which nobody can answer are the process's broken points.

---

## Meridian's Referral Process

*Meridian's activity diagram for the community-services referral process looks, at first glance, like a reasonable process. Read for decision-point ownership, it reveals three decision points with no defined owner — and explains a backlog that had defied every operational fix.*

*The first unowned decision is eligibility. The diagram shows an "eligible?" diamond, but tracing who actually makes the call reveals that no single role owns it. Referrals from GPs are assessed by one team using one informal standard; referrals from hospitals are assessed by another using a different one; self-referrals fall between the two. The diamond looks like one decision; it is really three, made inconsistently, with no owner of the criterion. Patients with identical needs are accepted or rejected depending on who referred them — a fairness problem the activity diagram exposes by asking who owns the diamond.*

*The second unowned decision is prioritisation. After a referral is accepted, the diagram shows an "assign priority" step feeding a decision about how quickly the patient is seen. But priority is assigned by whichever caseworker happens to pick up the referral, against no shared rule. The decision point has no owner, so urgent and routine cases queue together and are pulled in an order that depends on individual judgement rather than agreed criteria. The waiting-list problem that operations had tried to solve by adding caseworkers was never a capacity problem; it was an unowned-decision problem, and the diagram showed it.*

*The third unowned decision is the one nobody had even noticed was a decision: what happens to a referral that is neither clearly accepted nor clearly rejected — the ambiguous case. The diagram, drawn honestly, showed these flowing to a "hold for review" state with no exit arrow. A hold state with no defined way out is a decision point with no owner and no criterion — referrals went in and did not reliably come out. This was the source of the genuinely lost referrals that had triggered a complaint. The dangling state was visible on the diagram the moment someone read it asking "and how does a referral leave this box?"*

*The fix in every case was the same shape: assign an owner and a criterion to the decision. No new system, no new capacity — just the closing of the ownership gaps that the activity diagram made visible. This is the activity diagram's particular power: it surfaces process problems that look like resourcing problems but are actually decision-ownership problems.*

---

## Activity Versus Sequence: When to Use Each

Readers frequently confuse activity diagrams and sequence diagrams, because both show "what happens." The distinction is worth holding clearly, because it tells you which diagram to ask for.

A **sequence diagram** shows interaction *between participants* — who sends what message to whom, over time. Its centre of gravity is the systems (or people) and the messages passing between them. You reach for it when the question is about an *integration* or an *interaction*: how do these systems talk, and what happens when the conversation fails?

An **activity diagram** shows the *flow of a process* — the steps, decisions, and parallel paths — often abstracting away exactly who performs each step. Its centre of gravity is the work and how it moves. You reach for it when the question is about a *process*: what are the steps, where does the flow branch, and where does it get stuck?

A useful rule of thumb: if the interesting question is "what happens when system A calls system B and B is slow?", you want a sequence diagram. If the interesting question is "why do referrals get stuck, and who decides what?", you want an activity diagram. The referral problem at Meridian is a flow-and-decision problem, which is why the activity diagram, not the sequence diagram, was the instrument that solved it.

---

## Translator Panel

> **Business analysts say:** "Let's map the process as an activity diagram so we can see where it branches."
>
> **What that means:** They want to see the flow — the steps, the decision points, the parallel paths — to find where work stalls or splits. The branches (decision nodes) are usually where the interesting problems are, because each branch is a choice that has to be defined and owned.

> **Architects say:** "Every decision diamond needs an owner and a criterion — which of these has neither?"
>
> **What that means:** They are reading the diagram for the classic process pathology: the decision point that nobody owns and no rule governs. On the diagram it looks like any other diamond; the question "who decides this, and by what rule?" is what exposes the unowned ones, which are almost always where the process is broken.

---

## The Key Idea

An activity diagram shows a process as flow — start and end states, activities, decision nodes where the flow branches, and forks and joins for parallel paths — abstracting away who performs each step. The most valuable reading skill is interrogating each decision node for ownership: pointing at every diamond and asking who decides this and by what criterion. The decision point with no owner is the classic process pathology, invisible as a shape on the diagram but glaring the moment the ownership question is asked, and it routinely masquerades as a resourcing problem when it is really a decision-ownership problem. Activity diagrams differ from sequence diagrams in centre of gravity — flow-of-work versus interaction-between-participants — and knowing which question you are asking tells you which diagram to reach for.

**Next:** Chapter 38 turns to the ArchiMate view — the notation that shows the business, application, and technology layers of an estate simultaneously, and how to decode it without having to draw it.

---

## Further Reading

- **UML 2.5 specification — Activity Diagrams** (omg.org): The formal notation, including the fork/join and decision/merge nodes. Most business process diagrams borrow this vocabulary loosely, so the formal version helps you read both strict and informal diagrams.
- **OMG — Business Process Model and Notation (BPMN 2.0)** (bpmn.org): The notation most commonly used for business processes in practice, closely related to activity diagrams. If a process diagram in your organisation uses pools and swimlanes, it is probably BPMN, and this is the reference.
- **Geary Rummler & Alan Brache — Improving Performance** (Jossey-Bass, 3rd ed. 2012): The classic on process mapping and, crucially, on the "white space" between functions where unowned decisions and dropped handoffs live — the management-level companion to reading decision ownership on a diagram.
