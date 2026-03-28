# VP3 — Truth Viewpoint

**Instruments:** Architecture Decision Records (ADRs) + Fitness Functions  
**Layer:** Technical architecture  
**ISO/IEC/IEEE 42010 conformant viewpoint**

---

## Purpose

Technical architecture exists to expose truth.

It is concerned with what is built, what runs, and what breaks. Unlike other layers, it cannot negotiate with reality. Its job is to confirm assumptions — or force the system to revisit them.

**ADRs** prevent the same argument from occurring twice by preserving the reasoning behind technical decisions.

**Fitness Functions** enforce architectural intent continuously — they are not documentation, they are enforcement.

---

## Concerns Addressed

| Concern | Description |
|---------|-------------|
| C3 — Decision traceability | Whether decisions can be traced to rationale and alternatives |
| C5 — Layer separation | Technical truth stays at the technical layer |
| C12 — Technical truth | Whether the system behaves as documented |
| C14 — Knowledge preservation | Whether decisions survive personnel change |

## Stakeholders Served

| Stakeholder | Interest |
|-------------|----------|
| S2 — Solution Architect | Alignment of implementation to solution decisions |
| S3 — Technical Architect / Engineer | Technical validity and constraint enforcement |
| S8 — Auditor / Compliance Officer | Decision traceability and rationale capture |
| S9 — Delivery Team Member | Clarity on what was decided and why |

---

## Model Kind 1: Architecture Decision Record (ADR)

An ADR is a numbered, immutable record of a technical architectural decision. Once accepted, it does not change — it is superseded by a new record.

**Stored in:** the codebase (version control), not a separate system.  
**Numbered sequentially:** ADR-001, ADR-002, etc.

**Analytic test:**  
*When challenged later, can the team explain why this choice was made? If not, the ADR is missing.*

**Heuristic for what counts as architectural:**  
*If reversing this decision requires a sprint or more of rework, it is architectural. When in doubt, write it down.*

---

## Model Kind 2: Fitness Function

A fitness function is an executable assertion encoding architectural intent. It runs continuously in the delivery pipeline. When it breaks, it means an upstream assumption is no longer valid — which is a signal to escalate, not ignore.

```
assert p95_latency() < 50ms
assert deployment_success_rate() > 99%
assert no_unauthorised_vendor_dependencies()
```

Every fitness function must be traceable to at least one ADR or Trade-off Matrix that states the intent it enforces (CR-T4).

---

## Correspondence Rules (from this viewpoint)

- **CR-T2:** Must reference the governing Trade-off Matrix record
- **CR-T3:** Superseded ADRs remain visible; they must reference the record that superseded them
- **CR-T4:** Every fitness function must be traceable to an ADR or Trade-off Matrix
- **CR-L3:** Technical findings that invalidate higher-layer assumptions must be escalated within one Pulse window — not absorbed silently
- **CR-L4:** Technical architecture must not redefine organisational intent

---

## Templates

→ [`adr-template.md`](adr-template.md)  
→ [`fitness-function-examples.md`](fitness-function-examples.md)  
→ [`../../examples/adr-example.md`](../../examples/adr-example.md)
