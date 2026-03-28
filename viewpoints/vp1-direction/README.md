# VP1 — Direction Viewpoint

**Instrument:** Guardrail Canvas  
**Layer:** Enterprise architecture  
**ISO/IEC/IEEE 42010 conformant viewpoint**

---

## Purpose

Enterprise architecture exists to declare direction — not to design systems.

The Direction Viewpoint establishes what the organisation is optimising for, what it is willing to sacrifice, and what it will not compromise. It creates the conditions under which all downstream decisions operate.

**What enterprise architecture must do:**
- Make non-negotiables explicit
- Declare trade-off positions in plain language
- State what the organisation optimises for when options conflict

**What enterprise architecture must not do:**
- Prescribe solution patterns
- Mandate specific technologies
- Describe system structure
- Substitute for solution-level decisions

---

## Concerns Addressed

| Concern | Description |
|---------|-------------|
| C1 — Decision clarity | Whether architectural decisions are clear and actionable |
| C4 — Direction coherence | Whether enterprise-level intent is clear and constraining |
| C5 — Layer separation | Whether enterprise concerns are kept distinct from solution concerns |
| C13 — Alignment with intent | Whether delivery outcomes reflect architectural direction |

## Stakeholders Served

| Stakeholder | Interest |
|-------------|----------|
| S1 — Enterprise Architect | Direction setting and constraint declaration |
| S5 — Executive / CIO / CTO | Strategic alignment and investment coherence |
| S6 — Architecture Review Board | Governance reference point |
| S10 — Client / Sponsor | Alignment of delivery to original intent |

---

## Model Kind: Guardrail Canvas

The Guardrail Canvas is a one-page structured declaration of organisational intent. It is not a vision statement. It is a commitment — a set of constraints that bound all downstream architectural decisions.

**Fields:**
1. **Core Optimisation** — what the organisation prioritises when forced to choose
2. **Non-Negotiables** — constraints that cannot be traded away
3. **Explicit Trade-offs** — named positions on common tensions (speed vs scale, cost vs resilience, etc.)
4. **Owner** — the named authority responsible for this canvas
5. **Status** — Active / Under Review / Superseded
6. **Review Date** — mandatory; a canvas with an expired review date is inactive

**Analytic test:**  
*Did this remove a debate from a portfolio or funding discussion? If not, the canvas is incomplete.*

---

## Correspondence Rules (from this viewpoint)

- **CR-T1:** Every Trade-off Matrix decision must reference at least one Guardrail Canvas constraint it operates within or explicitly overrides
- **CR-L1:** This viewpoint must not prescribe solution patterns, mandate technologies, or describe system structure
- **CR-X3:** Every canvas carries a Review Date; on that date it must be reaffirmed or updated

---

## Template

→ [`guardrail-canvas.md`](guardrail-canvas.md)  
→ [`../../examples/guardrail-canvas-example.md`](../../examples/guardrail-canvas-example.md)
