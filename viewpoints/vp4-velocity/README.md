# VP4 — Velocity Viewpoint

**Instruments:** Velocity Dashboard + Architectural Decision Log (ADL)  
**Layer:** Architectural control  
**ISO/IEC/IEEE 42010 conformant viewpoint**

---

## Purpose

The Velocity Viewpoint makes decision movement visible.

It measures and governs decision latency, decision aging, and ownership gaps. It is the control layer — the instrument by which the health of the entire decision system is monitored and managed.

> *Velocity is not speed. It is the rate at which ambiguity expires.*

---

## Concerns Addressed

| Concern | Description |
|---------|-------------|
| C1 — Decision clarity | Whether decisions are clear and acted upon |
| C2 — Decision velocity | The rate at which ambiguity expires |
| C3 — Decision traceability | Whether decisions can be traced over time |
| C7 — Architectural integrity | Whether the architecture remains coherent |
| C8 — Governance effectiveness | Whether governance produces decisions |
| C11 — Decision latency | The interval between recognition and binding resolution |
| C13 — Alignment with intent | Whether outcomes reflect direction |
| C14 — Knowledge preservation | Whether decisions survive personnel change |

---

## Model Kind 1: Architectural Decision Log (ADL)

The ADL is the living spine of all architectural decisions. It is not a template — it is the aggregate of all Trade-off Matrices and ADRs, indexed and searchable.

**Structure:**
```
ADL/
├── INDEX.md              ← Master index of all decisions by ID, date, status, owner
├── canvases/             ← All Guardrail Canvas records
├── decisions/            ← All Trade-off Matrix records
├── adrs/                 ← All Architecture Decision Records
└── superseded/           ← Closed decisions (retained, not deleted)
```

**Fixed folder model** — the structure does not change between engagements. This enables:
- Consistent client handover
- Onboarding without explanation
- Automated governance checks (fitness functions against the ADL itself)

**14-Day Decision Aging Rule:**  
Any significant decision open for more than 14 calendar days without binding resolution triggers a mandatory escalation event (CR-E1).

---

## Model Kind 2: Velocity Dashboard

The Velocity Dashboard is a real-time operational view of decision health. It is not a reporting tool — it is a control surface.

**Required components:**

| Component | What it shows |
|-----------|--------------|
| Decision Velocity Metrics | Decisions made per week, by layer (VP1/VP2/VP3) |
| Decision Aging Monitor | All open decisions colour-coded by age: green (<7d), amber (7–14d), red (>14d) |
| Ownership Map (RACI) | Current named owners for all open decisions |
| Heat Map (System Health) | Domains by decision health — where is ambiguity accumulating? |
| Risk Inventory | Open risks with aging dates |
| Risk Aging | Risks approaching or past their expiry dates |

**Primary metric:** Decisions per week, by layer  
**Secondary metric:** Decision latency — median days between recognition and binding resolution

**Diagnostic test:**  
*How many significant decisions remain open beyond 30 days? How many have passed through more than one review forum without binding? These are structural readings, not performance metrics.*

---

## Correspondence Rules (from this viewpoint)

- **CR-T3:** Superseded decisions retained in ADL, not deleted
- **CR-E1:** 14-Day Decision Aging Rule — triggers mandatory escalation
- **CR-O2:** Ownership Map updated within 5 days of any ownership transfer
- **CR-X1:** Every open question must be assigned an expiry date
- **CR-X3:** Guardrail Canvas review dates enforced through the ADL

---

## ADL Index Template

→ [`adl-template.md`](adl-template.md)  
→ [`velocity-dashboard.md`](velocity-dashboard.md)
