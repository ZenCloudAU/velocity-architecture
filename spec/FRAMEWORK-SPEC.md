# Velocity Architecture Framework™ — Formal Specification

**ISO/IEC/IEEE 42010:2022 Conformant Architecture Description Framework**  
Version 1.0 | © 2026 Phil Myint / ZenCloud Global Consultants  
TM Class 42, ZenCloud Consulting

---

## Framework Identification

| Field | Value |
|-------|-------|
| Full name | Velocity Architecture Framework™ |
| Abbreviation | VAF |
| Version | 1.0 |
| Status | Published Specification |
| Owner | Phil Myint, Principal Architect, ZenCloud Global Consultants |
| Trademark | TM filed — Class 42, ZenCloud Consulting |
| Primary domain | Enterprise and solution architecture |
| Extended application | Organisational leadership and decision governance |
| Conformance standard | ISO/IEC/IEEE 42010:2022 |
| Repository | github.com/ZenCloudAU/velocity-architecture |

---

## Central Thesis

> *Architecture exists to create clarity that leads to better decisions.*  
> *Velocity is not speed. It is the rate at which ambiguity expires.*

---

## 1. Scope and Conditions of Applicability

### Primary Domain

The VAF applies to the practice of enterprise architecture and solution architecture where:

- Architectural decisions must be made, owned, and acted upon across multiple organisational layers
- Multiple stakeholder groups hold competing or complementary concerns
- Architecture descriptions must be created, maintained, and used to support delivery
- Governance structures exist or are being established to control architectural direction

### Extended Domain

The VAF additionally applies in the leadership and organisational governance domain. In this extended domain:

- The entity of interest is an organisation or programme rather than a technical system
- Architecture descriptions are replaced by decision records and governance artefacts
- The practitioner is a leader, programme director, or governance authority

### Not Applicable When

- The scope is limited to a single technical component with no cross-system concerns
- The organisation has no governance function and no requirement for decision traceability

---

## 2. Stakeholder Register

| ID | Stakeholder | Primary concerns | Role |
|----|------------|-----------------|------|
| S1 | Enterprise Architect | Direction, alignment, governance coherence | Primary |
| S2 | Solution Architect | Decision quality, trade-off visibility, delivery enablement | Primary |
| S3 | Technical Architect / Engineer | Technical truth, assumption validation | Primary |
| S4 | Delivery Lead / Programme Manager | Decision velocity, clarity, rework reduction | Primary |
| S5 | Executive / CIO / CTO | Strategic alignment, governance maturity | Secondary |
| S6 | Architecture Review Board | Governance compliance, risk visibility | Secondary |
| S7 | Organisational Leader | Decision authority, convergence, accountability | Extended domain |
| S8 | Auditor / Compliance Officer | Traceability, rationale capture | Secondary |
| S9 | Delivery Team Member | Clarity of direction, actionable constraints | Secondary |
| S10 | Client / Sponsor | Business value, alignment to intent | Secondary |

---

## 3. Concern Register

| ID | Concern | Description | Addressed by |
|----|---------|-------------|-------------|
| C1 | Decision clarity | Whether decisions are clear, actionable, and acted upon | VP1, VP2, VP3, VP4 |
| C2 | Decision velocity | The rate at which ambiguity expires | VP4, VP5 |
| C3 | Decision traceability | Whether decisions trace to rationale and alternatives | VP3, VP4 |
| C4 | Direction coherence | Whether enterprise-level intent is clear and constraining | VP1 |
| C5 | Layer separation | Whether layers are kept distinct | VP1, VP2, VP3 |
| C6 | Trade-off visibility | Whether options and consequences are explicit | VP2 |
| C7 | Architectural integrity | Whether architecture remains coherent over time | VP4, VP5, VP6 |
| C8 | Governance effectiveness | Whether governance produces decisions | VP4, VP5 |
| C9 | Practitioner integrity | Whether architects operate with authorship and honest refusal | VP6 |
| C10 | Responsibility diffusion | Whether accountability is explicit or dispersed | VP4, VP5, VP6 |
| C11 | Decision latency | Interval between recognition and binding resolution | VP4, VP5 |
| C12 | Technical truth | Whether the system behaves as documented | VP3 |
| C13 | Alignment with intent | Whether delivery reflects architectural direction | VP1, VP4 |
| C14 | Knowledge preservation | Whether decisions survive personnel change | VP3, VP4 |

---

## 4. Architecture Viewpoints

### VP1 — Direction Viewpoint

| Field | Value |
|-------|-------|
| Instrument | Guardrail Canvas |
| Layer | Enterprise architecture |
| Concerns | C1, C4, C5, C13 |
| Stakeholders | S1, S5, S6, S10 |
| Model kind | One-page declaration of intent: Core Optimisation, Non-Negotiables, Explicit Trade-offs, Owner, Status, Review Date |
| Test | Did this remove a debate from a portfolio or funding discussion? |
| Constraint | Must not prescribe solutions, mandate technologies, or describe system structure |

→ Full specification: [`/viewpoints/vp1-direction/README.md`](../viewpoints/vp1-direction/README.md)  
→ Template: [`/viewpoints/vp1-direction/guardrail-canvas.md`](../viewpoints/vp1-direction/guardrail-canvas.md)

---

### VP2 — Decision Viewpoint

| Field | Value |
|-------|-------|
| Instrument | Trade-off Matrix |
| Layer | Solution architecture |
| Concerns | C1, C5, C6, C13 |
| Stakeholders | S1, S2, S4, S9 |
| Model kind | Structured decision record: Context, Options, Decision Drivers (weighted), Decision, Consequences, Owner, Date, Supersedes |
| Test | Could a delivery team begin work the same day this was agreed? |
| Constraint | Must not defer through neutral analysis. Must not require interpretation before delivery |

→ Full specification: [`/viewpoints/vp2-decision/README.md`](../viewpoints/vp2-decision/README.md)  
→ Template: [`/viewpoints/vp2-decision/trade-off-matrix.md`](../viewpoints/vp2-decision/trade-off-matrix.md)

---

### VP3 — Truth Viewpoint

| Field | Value |
|-------|-------|
| Instruments | Architecture Decision Records (ADRs) + Fitness Functions |
| Layer | Technical architecture |
| Concerns | C3, C5, C12, C14 |
| Stakeholders | S2, S3, S8, S9 |
| Model kind 1 | ADR — numbered, immutable, version-controlled: Status, Context, Decision, Consequences, Alternatives |
| Model kind 2 | Fitness Function — executable assertion traceable to an ADR or Trade-off Matrix |
| Test | When challenged, can the team explain why this choice was made? |
| Constraint | Must not redefine organisational intent. Divergence requires escalation, not silent deviation |

→ Full specification: [`/viewpoints/vp3-truth/README.md`](../viewpoints/vp3-truth/README.md)  
→ ADR template: [`/viewpoints/vp3-truth/adr-template.md`](../viewpoints/vp3-truth/adr-template.md)

---

### VP4 — Velocity Viewpoint

| Field | Value |
|-------|-------|
| Instruments | Velocity Dashboard + Architectural Decision Log (ADL) |
| Layer | Architectural control |
| Concerns | C1, C2, C3, C7, C8, C11, C13, C14 |
| Stakeholders | S1, S4, S5, S6, S8 |
| Model kind 1 | ADL — indexed aggregate of all decisions; fixed folder model; client handover artefact |
| Model kind 2 | Dashboard — Decision Velocity Metrics, 14-Day Aging Monitor, Ownership Map, Heat Map, Risk Inventory |
| Primary metric | Decisions per week, by layer |
| Secondary metric | Decision latency — days between recognition and binding resolution |
| Hard rule | 14-Day Decision Aging Rule (CR-E1) |

→ Full specification: [`/viewpoints/vp4-velocity/README.md`](../viewpoints/vp4-velocity/README.md)

---

### VP5 — Rhythm Viewpoint

| Field | Value |
|-------|-------|
| Instrument | Pulse System |
| Layer | Operating rhythm |
| Concerns | C2, C8, C10, C11 |
| Stakeholders | S1, S4, S5, S6 |
| Model kind | Pulse — structured cadence: Pulse Rhythm, Cadence, Briefing, Board, Report |
| Test | Does each Pulse event produce at least one binding decision? |
| Escalation rule | Max two Pulse cycles per decision before mandatory binding at tier above (CR-E4) |

→ Full specification: [`/viewpoints/vp5-rhythm/README.md`](../viewpoints/vp5-rhythm/README.md)  
→ Templates: [`/viewpoints/vp5-rhythm/pulse-system.md`](../viewpoints/vp5-rhythm/pulse-system.md)

---

### VP6 — Practitioner Viewpoint

| Field | Value |
|-------|-------|
| Instrument | Integrity Arc (Auctor Custos) |
| Layer | Human — practitioner integrity |
| Concerns | C7, C9, C10 |
| Stakeholders | S1, S2, S3, S7 |
| Model kind | Integrity Arc — five positions: Authorship, Boundaries, Refusal, Staying, Exit |
| Role name | Auctor Custos — custodian of architectural integrity |
| Extended domain | Applies to leaders without modification |

→ Full specification: [`/viewpoints/vp6-practitioner/README.md`](../viewpoints/vp6-practitioner/README.md)  
→ Instrument: [`/viewpoints/vp6-practitioner/integrity-arc.md`](../viewpoints/vp6-practitioner/integrity-arc.md)

---

## 5. Correspondence Rules (Summary)

Full rules: [`/correspondence-rules/RULES.md`](../correspondence-rules/RULES.md)

| ID | Rule | Status |
|----|------|--------|
| CR-T1 | Trade-off Matrix → Guardrail Canvas traceability | Mandatory |
| CR-T2 | ADR → Trade-off Matrix traceability | Mandatory |
| CR-T3 | Supersession traceability — prior records retained | Mandatory |
| CR-T4 | Fitness Function → ADR/TOM traceability | Mandatory |
| CR-E1 | 14-Day Decision Aging Rule | Hard rule |
| CR-E2 | Scope compression on escalation | Mandatory |
| CR-E3 | Escalation terminal condition | Mandatory |
| CR-E4 | Maximum two Pulse cycles before binding | Mandatory |
| CR-O1 | Single named owner per decision | Mandatory |
| CR-O2 | Ownership Map updated within 5 days of transfer | Mandatory |
| CR-O3 | Practitioner scope declaration | Conditional |
| CR-L1 | Enterprise layer constraint (no solution mandates) | Mandatory |
| CR-L2 | Solution layer decisiveness | Mandatory |
| CR-L3 | Technical layer feedback obligation | Mandatory |
| CR-L4 | No layer substitution | Mandatory |
| CR-X1 | Ambiguity lifespan — every question has an expiry | Mandatory |
| CR-X2 | Revisitation criteria | Mandatory |
| CR-X3 | Guardrail Canvas review date enforcement | Mandatory |

---

## 6. ISO/IEC/IEEE 42010 Ontology Mapping

| 42010 Term | VAF Equivalent |
|-----------|---------------|
| Entity of interest | Enterprise, programme, or system |
| Architecture | Accumulated body of binding decisions |
| Architecture description | VAF artefact set (Canvas, Matrix, ADR, Dashboard) |
| Stakeholder | Stakeholder register — Section 2 |
| Concern | Concern register — Section 3 |
| Architecture viewpoint | VAF viewpoints VP1–VP6 |
| Architecture view | VAF artefact instance |
| Model kind | VAF instrument (Canvas, Matrix, ADR, Fitness Function, Dashboard, Pulse, Integrity Arc) |
| Architecture decision | Trade-off Matrix, ADR |
| Architecture rationale | Rationale field in TOM; Context + Consequences in ADR |
| Correspondence rule | VAF correspondence rules — Section 5 |
| Architecture framework | Velocity Architecture Framework™ |

---

## 7. Conformance Declaration

The Velocity Architecture Framework, Version 1.0, claims conformance with ISO/IEC/IEEE 42010:2022 in respect of the requirements for an architecture description framework.

| Requirement | Status | Reference |
|------------|--------|-----------|
| Framework identification | Satisfied | Section above |
| One or more concerns | Satisfied | Section 3 (14 concerns) |
| Stakeholders with concern mappings | Satisfied | Section 2 (10 stakeholders) |
| One or more viewpoints | Satisfied | Section 4 (6 viewpoints) |
| Correspondence rules | Satisfied | Section 5 (18 rules) |
| Conditions on applicability | Satisfied | Section 1 |
| Consistency with 42010 conceptual model | Satisfied | Section 6 |

---

*Velocity Architecture Framework™ — Formal Specification v1.0*  
*© 2026 Phil Myint / ZenCloud Global Consultants. All rights reserved.*  
*ISO/IEC/IEEE 42010:2022 Conformant | TM Class 42, ZenCloud Consulting*  
*github.com/ZenCloudAU/velocity-architecture*
