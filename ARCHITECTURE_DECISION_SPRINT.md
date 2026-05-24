# Architecture Decision Sprint
## A Productised Consulting Offer — ZenCloud Global Consultants

**Classification:** Engagement Offer — Partner and Client Use  
**Version:** 1.0 — May 2026

---

## Purpose

The Architecture Decision Sprint is a bounded, time-boxed engagement that takes one defined architecture decision question and delivers a board-ready output in four weeks.

It is the recommended pilot entry point for new enterprise clients and consultancy partner engagements. It demonstrates the Velocity decision-first operating model in the client's real context — not a hypothetical or a readiness assessment.

**The sprint ends with a concrete deliverable. Not a report on what could be done.**

---

## Ideal Client Situation

The Architecture Decision Sprint is the right engagement when the client has:

- An active architecture decision question that has been unresolved for more than two weeks
- A program or platform that needs a governance-ready architecture recommendation before it can proceed
- An architecture function that is producing documents but cannot easily demonstrate decision quality to SLT or the board
- A governance gate approaching within the next 4–8 weeks
- A need to demonstrate the value of architecture advisory before committing to a longer engagement

**Not suitable when:**
- The architecture question is not yet defined (use the SLT Discovery Workshop first)
- The program is past the point where an architecture decision would change the delivery approach
- The client cannot provide access to relevant program stakeholders for structured sessions

---

## Duration

**Four weeks.** Fixed.

The four-week constraint is not arbitrary. It forces decision discipline. A question that cannot be defined in week one is not ready for a decision sprint.

If the engagement reveals that the decision question is larger than a four-week scope, ZenCloud will identify the bounded sub-question that can be resolved in the sprint and note what follows as a subsequent engagement.

---

## Participants

**From the client:**
- Architecture lead or sponsor — required for kick-off, options review, and board presentation
- Solution architect or technical authority — required for options framing and trade-off analysis
- PMO lead or program director — required for governance context and delivery alignment
- Subject matter experts — available as needed for domain input (data, security, integration, etc.)

**From ZenCloud:**
- Phil Myint — Principal Architect — lead practitioner for the full sprint duration

**From the partner (if applicable):**
- Partner engagement lead — attends kick-off and board presentation, available for escalation during the sprint

---

## Inputs Required

Before the sprint begins, the client provides:

| Input | Description | Required by |
|-------|-------------|------------|
| Decision question | A defined, specific architecture question — not a general problem statement | Week 1 kick-off |
| Program context | Overview of the program, platform, or domain in scope | Week 1 kick-off |
| Existing artefacts | Any current architecture documentation relevant to the decision | Week 1 |
| Stakeholder map | Who needs to be consulted, who has decision authority, who receives the output | Week 1 |
| Governance deadline | The board meeting, milestone, or gate the output must meet | Week 1 kick-off |
| Data and security context | Relevant data classification and security constraints affecting the decision | Week 2 |

**If the client cannot provide a defined decision question, the sprint cannot proceed.** Use the SLT Discovery Workshop first.

---

## Delivery Approach

The sprint applies the Velocity decision-first operating model to one question. The five cross-cutting lenses (Business Value, Data Readiness, Security Risk, AI Readiness, Governance & Traceability) are applied to each option evaluated.

VAF Agentic AI is used to compress drafting time for the trade-off matrix, board pack, and ADR. All AI-generated content is reviewed and validated by Phil before delivery. No client data enters any public AI system.

---

## Phase-by-Phase Plan

---

### Week 1 — Problem Framing

**Goal:** Leave this week with a decision question that is specific enough to evaluate, and a clear set of options to assess.

**Activities:**

- Kick-off session (2 hours) — Phil + architecture lead + program director
  - Confirm the decision question
  - Confirm stakeholder map and governance deadline
  - Confirm input artefacts received and reviewed
  - Agree options to evaluate (3–4 maximum)
  - Agree evaluation criteria (drawn from the five lenses)

- Document review — Phil reviews existing architecture artefacts
- Initial stakeholder interviews (1:1 or small group) — surface constraints and assumptions not visible in documents
- Week 1 close note — decision question confirmed, options defined, constraints and assumptions captured

**Client commitment this week:** 2 hours kick-off + 30–60 minutes per stakeholder interview

---

### Week 2 — Options Analysis

**Goal:** Evaluate each option against the agreed criteria. Surface the trade-offs. Begin populating the decision register.

**Activities:**

- Options analysis sessions (90 minutes × 2) — Phil with architecture and technical leads
  - Each option evaluated against the five lenses
  - Risks identified and classified
  - Assumptions challenged and documented
  - Data readiness and security constraints confirmed

- Trade-off matrix drafted (VAF Agentic AI assisted — Phil reviewed)
- Assumptions Register and Risk Register populated
- SME inputs gathered (data, security, integration as applicable)
- Week 2 checkpoint (30 minutes) — Phil confirms options analysis is complete and trade-offs are clear

**Client commitment this week:** 3 hours analysis sessions + SME availability as needed

---

### Week 3 — Recommendation and Board Pack Draft

**Goal:** Move from trade-off analysis to a board-ready recommendation. Produce the Architecture Decision Record.

**Activities:**

- Recommendation framing session (90 minutes) — Phil + architecture lead
  - Preferred option confirmed
  - Rationale structured against the evaluation criteria
  - Risk and assumption positions confirmed
  - Governance posture for the recommendation agreed

- Architecture Board Pack drafted (VAF Agentic AI assisted — Phil reviewed)
  - Executive summary
  - Decision question and context
  - Options evaluated
  - Trade-off matrix
  - Recommendation with rationale
  - Risks accepted and mitigated
  - Assumptions requiring validation
  - Decision Register entry

- Architecture Decision Record (ADR) drafted
- PMO Governance Snapshot drafted
- Draft review session (60 minutes) — Phil + architecture lead + program director
  - Board pack reviewed for accuracy, tone, and completeness
  - Revisions identified and agreed

**Client commitment this week:** 2.5 hours review sessions

---

### Week 4 — Review, Finalise, and Board Presentation

**Goal:** Deliver the final output. Present to the board or governance committee. Close the sprint.

**Activities:**

- Final revisions incorporated
- All output artefacts finalised and delivered:
  - Architecture Board Pack (final)
  - Architecture Decision Record (final)
  - Trade-off Matrix (final)
  - Risk Register (sprint scope)
  - Assumptions Register (sprint scope)
  - Decision Register (first entry)
  - PMO Governance Snapshot

- Board or governance committee presentation (Phil + architecture lead)
  - 20–30 minute presentation
  - 15–30 minute Q&A
  - Decision confirmed and recorded in Decision Register

- Sprint close-out note (Phil delivers within 48 hours of board presentation)
  - What was decided
  - What follows (open assumptions, subsequent decisions required, recommended next engagement)

**Client commitment this week:** Board presentation (1 hour)

---

## Outputs

| Output | Description |
|--------|-------------|
| **Architecture Board Pack** | Executive-ready decision summary — context, options evaluated, trade-off matrix, recommendation, risks accepted |
| **Architecture Decision Record (ADR)** | Formal record of the decision — context, options, decision, rationale, consequences |
| **Trade-off Matrix** | Options compared against the five lenses and agreed criteria |
| **Risk Register** | Architecture risks for the sprint scope — likelihood, impact, mitigation, owner |
| **Assumptions Register** | Documented assumptions — owner, validation date, status |
| **Decision Register (entry)** | First entry in the client's decision register — or first entry if none existed |
| **PMO Governance Snapshot** | Architecture status aligned to the next program milestone |
| **Sprint Close-out Note** | Summary of the sprint, decision made, and recommended next steps |

All outputs are delivered in Markdown (for version control) and PDF (for board presentation) unless otherwise agreed.

---

## What Is Included

- Phil Myint as lead practitioner for four weeks
- All architecture facilitation and analysis sessions
- VAF Agentic AI tooling for artefact production (under Phil's accountability)
- All output artefacts in final form
- Board or governance presentation delivery
- Sprint close-out note

---

## What Is Excluded

- Implementation of any design recommendation
- Software development or infrastructure deployment
- Ongoing architecture advisory beyond the sprint scope
- Legal, financial, or regulatory advice
- Artefact production for decisions outside the agreed sprint scope
- Client system access beyond document review

Additional weeks, additional decision questions, and broader program advisory are available under separate engagement terms.

---

## AI and Tool Usage Rules

All sprint delivery operates under the ZenCloud AI and Client Data Usage Policy.

| Rule | Application |
|------|------------|
| No confidential client data in public AI tools | All AI-assisted drafting uses anonymised or internal-classified content only |
| AI outputs are draft artefacts | All AI-generated content reviewed by Phil before sharing with the client |
| No automatic decisions | AI never generates a final recommendation — Phil reviews, validates, and owns |
| Client data ownership | All output artefacts are client IP upon delivery |
| Velocity IP | Framework methods, templates, and tool configuration remain ZenCloud IP |
| AI model training | Client data does not train any AI model under current Anthropic enterprise terms |

AI usage in the sprint is disclosed at kick-off. If the client requires specific AI governance conditions (e.g., no AI tooling at all, or enterprise-configured AI only), this is agreed before the sprint begins.

---

## Success Criteria

The Architecture Decision Sprint is successful when:

1. A specific architecture decision question has been answered with documented rationale
2. The board or governance committee has reviewed and confirmed the recommendation
3. The decision has been entered in the Decision Register
4. The client's architecture team can trace the reasoning from business context → options evaluated → risks accepted → decision made
5. The client has a clear picture of what follows — subsequent decisions, unresolved assumptions, and recommended next engagement

**The sprint has not succeeded if:**
- The output is a document filed without a board discussion
- The decision question was never actually answered — only options were listed
- The client cannot trace the decision six months later

---

## Follow-On Options

The Architecture Decision Sprint is designed as an entry point, not a complete engagement.

| Option | Description |
|--------|-------------|
| **Second Decision Sprint** | Apply the same model to the next decision question in the program |
| **Advisory Overlay** | ZenCloud continues alongside the delivery team — attending governance forums, producing decision records on a rolling basis |
| **Architecture Governance Reset** | Broader engagement to establish the decision-first operating model across the EA function |
| **Capability Uplift** | Velocity certification for the client's internal architecture and delivery practitioners |
| **Embedded Architecture Advisor** | Phil operates as architecture decision authority within the program for 1–6 months |

The sprint close-out note will recommend the most appropriate follow-on based on what was learned during the sprint.

---

*ZenCloud Global Consultants — Brisbane*  
*ZenCloud advises. StudioSix produces. Velocity decides.*  
*Architecture Decision Sprint v1.0 — May 2026*
