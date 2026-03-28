# VP2 — Decision Viewpoint

**Instrument:** Trade-off Matrix  
**Layer:** Solution architecture  
**ISO/IEC/IEEE 42010 conformant viewpoint**

---

## Purpose

Solution architecture exists to choose.

Given enterprise intent and real constraints, solution architecture decides how a specific problem will be solved at a specific point in time. The defining characteristic of good solution architecture is **decisiveness** — it narrows possibilities and commits to a direction delivery can act on.

**What solution architecture must do:**
- Name which option is taken, now
- State explicitly what is gained and what is given up
- Accept risk consciously rather than deferring it
- Enable delivery to begin without further interpretation

**What solution architecture must not do:**
- Restate enterprise principles already declared in VP1
- Defer through neutral analysis and option lists
- Attempt to future-proof every scenario
- Require interpretation before delivery can start

---

## Concerns Addressed

| Concern | Description |
|---------|-------------|
| C1 — Decision clarity | Whether the decision is clear and actionable |
| C5 — Layer separation | Whether solution concerns are kept distinct from enterprise and technical |
| C6 — Trade-off visibility | Whether options and their consequences are explicit before commitment |
| C13 — Alignment with intent | Whether the decision operates within declared enterprise direction |

## Stakeholders Served

| Stakeholder | Interest |
|-------------|----------|
| S1 — Enterprise Architect | Alignment to direction; layer integrity |
| S2 — Solution Architect | Decision quality and trade-off clarity |
| S4 — Delivery Lead | Actionability — can delivery begin today? |
| S9 — Delivery Team Member | Clarity of what to build |

---

## Model Kind: Trade-off Matrix

The Trade-off Matrix is a structured decision record that collapses options into commitment. It is not a neutral analysis document. It exists to produce a binding direction.

**Fields:**
1. **Decision context** — the problem being solved and its constraints
2. **Options considered** — the realistic alternatives evaluated
3. **Decision drivers** — the weighted criteria that determined the outcome
4. **Decision** — the single committed direction
5. **Consequences** — what is gained and what is accepted as cost
6. **Owner** — one named person; no committee ownership
7. **Date** — when the decision was made
8. **Supersedes** — reference to any prior decision this replaces

**Analytic test:**  
*Could a delivery team begin work the same day this was agreed? If not, the decision has not been made.*

---

## Correspondence Rules (from this viewpoint)

- **CR-T1:** Must reference at least one Guardrail Canvas constraint it operates within or explicitly overrides
- **CR-T2:** ADRs implementing this decision must reference this record
- **CR-T3:** If this supersedes a prior decision, it must reference that record explicitly
- **CR-O1:** Must carry a single named owner — no committee ownership
- **CR-L2:** Must produce commitment sufficient for delivery to begin without further interpretation

---

## Template

→ [`trade-off-matrix.md`](trade-off-matrix.md)  
→ [`../../examples/trade-off-matrix-example.md`](../../examples/trade-off-matrix-example.md)
