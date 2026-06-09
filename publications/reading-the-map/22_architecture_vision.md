# Chapter 22: The Architecture Vision

*Part 3 · The Core Concepts*

---

There is a phase of architectural work that almost everyone skips, and skipping it is the single most reliable predictor of an expensive failure later. It is the phase that comes before the diagrams, before the gap analysis, before the roadmap — the phase where someone writes down, in language a board can read, what this piece of architecture is actually for.

In TOGAF it is called **Phase A: Architecture Vision**. The name makes it sound grand and optional. It is neither. It is the cheapest phase to do and the most expensive to skip, because it is the phase that decides whether the rest of the work is aimed at the right target.

This chapter explains what an Architecture Vision contains, why organisations skip it, and what skipping it costs — using Meridian's VMware exit programme, which nearly became the wrong programme before anyone wrote its vision down.

---

## What a Vision Is and Is Not

An Architecture Vision is not a mission statement. It is not a slogan. It is a short, concrete document — ideally one page — that establishes the boundary, the purpose, and the success criteria of a specific piece of architectural work before that work begins.

A useful vision answers seven questions.

**What problem are we solving?** Stated as a problem, not a solution. "VMware licensing costs have tripled and our infrastructure is at end of life" is a problem. "We are migrating to Azure" is a solution masquerading as a problem.

**Who are the stakeholders, and what does each of them need?** The CFO needs cost control. The clinical director needs no disruption to patient care. The infrastructure team needs a survivable migration path. A vision that names only one stakeholder's need is the seed of a later conflict.

**What is in scope, and — more importantly — what is out?** Scope boundaries prevent the slow expansion that turns a contained programme into an unbounded one.

**What does success look like?** In measurable terms. Not "modernised infrastructure" but "all production workloads off VMware by Q4 2027, hosting cost reduced by 30%, no Sev-1 clinical incidents attributable to migration."

**What constraints are fixed?** Budget, regulatory obligations, clinical safety requirements, existing contracts. Constraints are not obstacles to be wished away; they are the shape of the solution space.

**What are the major risks?** Named early, while they can still be designed around.

**What is the high-level approach?** One paragraph. Enough to show the work is feasible, not enough to pre-empt the design.

A vision that answers these seven questions fits on a page and takes a few days to produce. That is the entire point. It is a cheap instrument for catching expensive mistakes.

---

## Why It Gets Skipped

The Architecture Vision gets skipped for a reason that is entirely understandable and entirely wrong: it feels like overhead before the real work.

When an organisation has a burning platform — a licensing crisis, an end-of-life system, a regulator's deadline — the instinct is to act. Writing a one-page vision feels like delay. The team that produces a migration plan in week one looks decisive. The architect who asks to spend three days agreeing what success means looks like a bureaucrat slowing things down.

This instinct is reinforced by how delivery is rewarded. Project managers are measured on movement. A Gantt chart with bars on it is visible progress. A vision document is not a deliverable anyone is chasing. So the vision is skipped, the migration plan is produced, and the work begins.

The cost arrives later, and it arrives disguised. The migration runs into a clinical-safety objection nobody anticipated because the clinical director was never asked what she needed. The budget overruns because the scope quietly expanded — every adjacent system got swept in because there was no boundary to point to. The programme delivers something, and then a stakeholder says "but that's not what we needed", and they are right, because nobody ever wrote down what was needed.

The vision phase is insurance. Like all insurance, it feels like a waste right up until the moment it would have paid out.

---

## What Skipping It Costs at Meridian

*Meridian's VMware exit begins, as these things do, as a procurement decision. The licensing renewal has tripled. The infrastructure team produces a recommendation: migrate the virtual estate to the public cloud, lift-and-shift, starting with the least critical workloads. A delivery plan is drafted. A cloud partner is shortlisted. The programme has momentum before anyone has written down what it is for.*

*The EA, newly in post, asks for three days to produce an Architecture Vision before the procurement proceeds. The request is mildly resented. She produces a one-page document anyway, and the act of writing it surfaces three problems the migration plan had not.*

*The first: the success criteria nobody had agreed. The infrastructure team's measure of success was "off VMware". The CFO's was "lower run cost". These are not the same thing, and a lift-and-shift to cloud can achieve the first while making the second worse — cloud infrastructure billed by consumption can cost more than depreciated on-premises hardware if the workloads are not re-architected. Without a vision, the programme could have succeeded on the infrastructure team's measure and failed on the CFO's, and nobody would have noticed until the first cloud bill arrived.*

*The second: the clinical-safety constraint nobody had named. Two of the "least critical" workloads scheduled for early migration turned out to feed the community nursing caseload tool — the spreadsheet from Chapter 20 — which clinicians relied on daily in the field. Migrating them first, before understanding the dependency, would have created a clinical risk in week one of the programme.*

*The third: the scope boundary nobody had drawn. The migration plan, on inspection, had quietly absorbed the EPR consolidation question, because two of the EPR-adjacent systems ran on the VMware estate. A VMware exit and an EPR consolidation are different programmes with different stakeholders, different risks, and different timescales. Fusing them by accident would have made both harder.*

*None of these problems were exotic. All three were visible the moment someone wrote down what the programme was for. The vision did not require special insight. It required the discipline to spend three days answering seven questions before spending three million pounds answering none of them.*

---

## The One-Page Format

The discipline of the one-page constraint matters as much as the content. A vision that runs to forty pages is not a vision; it is a design document wearing a vision's name, and it defeats the purpose — which is to be read, agreed, and held in mind by people who will never read forty pages.

A workable one-page format has a heading for each of the seven questions and a few sentences under each. The problem statement. The stakeholders and their needs. The scope, in and out. The success criteria, measurable. The fixed constraints. The principal risks. The high-level approach. A signature line for the sponsor who agrees it.

That signature line is doing quiet work. A vision that nobody has agreed is just an architect's opinion. A vision the sponsor has signed is a contract about what the work is for — and when the scope starts to expand or the success criteria start to drift, the signed vision is the document you return to. *"This is what we agreed this programme was for. The thing being proposed now is a different programme. Do we want to change the vision, or change the proposal?"* That question, asked early, prevents most of the expensive drift that afflicts large programmes.

---

## Translator Panel

> **TOGAF says:** "Phase A: Architecture Vision creates the architecture vision, validates the business context, and creates the Statement of Architecture Work."
>
> **What that means:** Before you do the work, agree what the work is, who it is for, what success looks like, and who is sponsoring it. Write it down. Get it signed. The "Statement of Architecture Work" is just the formal name for the agreement that this is the work and these are its boundaries.

> **Sponsors say:** "Can we just get on with it? We know what the problem is."
>
> **What that means:** Usually they know the symptom, not the agreed problem. The test is simple: if you asked three stakeholders to write down the success criteria separately, would they match? If you are confident they would, you may genuinely be able to move fast. If you are not confident — and you rarely should be — the three days spent agreeing the vision will save the three months spent recovering from its absence.

---

## The Key Idea

The Architecture Vision is the cheapest phase and the most expensive to skip. It is a one-page agreement about what a piece of architectural work is for — the problem, the stakeholders, the scope, the success criteria, the constraints, the risks, and the approach — produced before the work begins and signed by the sponsor. It feels like overhead because it produces no diagrams and moves no Gantt bars, and it is skipped for exactly that reason. The cost of skipping it arrives later and disguised: the right work aimed at the wrong target. An organisation that writes its visions down spends a few days catching the mistakes that an organisation that skips them spends months recovering from.

**Next:** Chapter 23 turns to the two states every architecture has to hold in tension — the current state you actually have and the target state you are trying to reach — and why documenting the first without letting it consume six months is its own discipline.

---

## Further Reading

- **The Open Group — TOGAF Standard: Phase A, Architecture Vision** (opengroup.org): The canonical description of the phase and the Statement of Architecture Work. Read the inputs and outputs sections; the rest is process detail you can apply selectively.
- **Richard Rumelt — Good Strategy / Bad Strategy** (Profile Books, 2011): Not an architecture text, but its account of the "kernel" of good strategy — diagnosis, guiding policy, coherent action — is the clearest available explanation of why a vision must state a problem before it states a solution.
- **Gojko Adzic — Impact Mapping** (Provoking Thoughts, 2012): A practical technique for connecting a goal to the stakeholders, behaviours, and deliverables that would achieve it — effectively a vision-on-a-page method that delivery teams find easier to adopt than the TOGAF template.
