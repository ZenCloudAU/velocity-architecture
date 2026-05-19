# VP4 — Velocity Dashboard + Architectural Decision Log Index

**Velocity Architecture Framework™ | VP4 — Velocity Viewpoint**
**ISO/IEC/IEEE 42010:2022 Conformant**

---

## Dashboard Configuration

| Field | Value |
|-------|-------|
| **Programme / Engagement** | DataStage + Cognos + VMware Deprecated Platform → Cloud Solution |
| **Capability Context** | Cloud Capability Model + Decentralisation of On-Premises Workloads |
| **Dashboard Owner** | Principal Architect |
| **Update Frequency** | Per Pulse Session (weekly minimum) |
| **Last Updated** | 2026-01-27 09:00 |
| **VAF Viewpoint** | VP4 — Velocity (Architectural Control) |
| **Engagement Phase** | Discovery → Architecture Definition |

---

## ⚡ Velocity Signal

| Signal | Level | Rationale |
|--------|-------|-----------|
| **MODERATE → STALLING** | 🟡 | Three platform decisions (VMware hypervisor exit, DataStage runtime target, Cognos BI replacement) are structurally linked and have not been sequenced. Ownership gaps in Data Integration and BI Platform domains are producing latency. No binding resolution on cloud landing zone topology is blocking downstream decisions across all three workstream tracks. |

> **Command signal:** Ambiguity is accumulating at the intersection of platform exit and cloud adoption. The system is not stalled — decisions are in motion — but sequencing failure is creating compounding latency. Landing zone must bind first.

---

## Component 1: Decision Velocity Metrics

| Layer | Decisions This Week | Decisions Last Week | 4-Week Average | Trend |
|-------|--------------------|--------------------|----------------|-------|
| VP1 — Direction (Guardrail Canvases) | 1 | 2 | 1.5 | ↓ |
| VP2 — Decision (Trade-off Matrices) | 3 | 4 | 3.25 | → |
| VP3 — Truth (ADRs) | 1 | 2 | 1.75 | ↓ |
| **Total** | **5** | **8** | **6.5** | ↓ |

**Median Decision Latency (days):** 11
**Target:** < 7 days (VP2/VP3)
**Status:** 🟡 Amber — median has trended up for two consecutive weeks. Structural signal confirmed. Investigation required before next Pulse session.

**Interpretation:** VP3 ADR output has dropped against a background of unresolved VP2 Trade-off Matrices. Solution-level teams are blocked by upstream platform decisions not yet bound. Velocity loss is upstream-caused, not execution-caused.

---

## Component 2: Decision Aging Monitor

| ID | Decision / Question | Layer | Owner | Date Raised | Age (days) | Status |
|----|--------------------|----|-------|-------------|------------|--------|
| TOM-20260106-001 | Cloud landing zone topology: Hub-and-spoke vs. distributed multi-account model | VP2 | Enterprise Architect | 2026-01-06 | 21 | 🔴 |
| TOM-20260110-002 | DataStage migration target: Cloud-native ETL (Azure Data Factory / AWS Glue) vs. DataStage on IaaS lift-and-shift | VP2 | Data Integration Architect | 2026-01-10 | 17 | 🔴 |
| TOM-20260113-003 | Cognos BI platform exit: Retain on managed cloud vs. replace with Power BI / Tableau / Looker | VP2 | BI Platform Owner | 2026-01-13 | 14 | 🟡 |
| TOM-20260115-004 | VMware hypervisor exit sequence: Parallel-run duration and workload priority order | VP2 | Infrastructure Lead | 2026-01-15 | 12 | 🟡 |
| ADR-20260120-001 | Data pipeline orchestration layer: Select orchestration tool post-DataStage | VP3 | Data Integration Architect | 2026-01-20 | 7 | 🟢 |
| TOM-20260121-005 | Identity and access model for decentralised cloud tenancy | VP2 | Security Architect | 2026-01-21 | 6 | 🟢 |
| TOM-20260122-006 | On-premises network exit dependency: SD-WAN vs. direct cloud interconnect | VP2 | Network Architect | 2026-01-22 | 5 | 🟢 |

**Current Red Count:** 2
**CR-E1 Status:** 🔴 TRIGGERED — TOM-20260106-001 and TOM-20260110-002 have exceeded 14-day threshold. Escalation is mandatory in next Pulse session.

> **Control note:** TOM-20260106-001 is a blocking decision. Every other open item in this dashboard has a dependency on landing zone topology. Age of 21 days is unacceptable. Named owner must present binding options — not further analysis — at next Pulse.

---

## Component 3: Ownership Map

| ID | Decision | Named Owner | Role | Assigned | Last Confirmed |
|----|----------|------------|------|----------|---------------|
| TOM-20260106-001 | Cloud landing zone topology | Enterprise Architect | VP2 Decision Authority | 2026-01-06 | 2026-01-20 |
| TOM-20260110-002 | DataStage migration target | Data Integration Architect | VP2 Decision Authority | 2026-01-10 | 2026-01-17 |
| TOM-20260113-003 | Cognos BI platform exit | BI Platform Owner | VP2 Decision Authority | 2026-01-13 | 2026-01-20 |
| TOM-20260115-004 | VMware hypervisor exit sequence | Infrastructure Lead | VP2 Decision Authority | 2026-01-15 | 2026-01-22 |
| ADR-20260120-001 | Data pipeline orchestration layer | Data Integration Architect | VP3 Decision Authority | 2026-01-20 | 2026-01-27 |
| TOM-20260121-005 | Identity and access model | Security Architect | VP2 Decision Authority | 2026-01-21 | 2026-01-27 |
| TOM-20260122-006 | On-premises network exit dependency | Network Architect | VP2 Decision Authority | 2026-01-22 | 2026-01-27 |

**Ownership Gaps:**

| Gap | Missing Owner | Role That Must Own | Risk |
|-----|--------------|-------------------|------|
| Data Governance policy for cloud-migrated data assets | No named owner | Chief Data Officer / Data Governance Lead | Data classification and lineage rules are undefined. ETL migration decisions are proceeding without governance constraint. CR-O1 violation. |
| Cloud FinOps / cost model authority | No named owner | Cloud Financial Architect | Cost model for post-VMware cloud spend has no decision owner. Consumption commitments cannot be validated. |

> **CR-O1 Violation active:** Two decision domains lack a single named owner. These must be named by the Programme Sponsor at or before the next Pulse session. Decisions in these domains are proceeding in an ownership vacuum.

---

## Component 4: System Heat Map — Domain Decision Health

| Domain | Open Decisions | Red Count | Amber Count | Blocking? | Health Signal |
|--------|---------------|-----------|-------------|-----------|---------------|
| Cloud Landing Zone | 1 | 1 | 0 | YES — all tracks | 🔴 Critical |
| DataStage Migration | 2 | 1 | 0 | YES — data pipeline track | 🔴 Critical |
| Cognos BI Platform Exit | 1 | 0 | 1 | Partial — reporting track | 🟡 At Risk |
| VMware Hypervisor Exit | 1 | 0 | 1 | YES — infrastructure track | 🟡 At Risk |
| Identity & Access (Cloud) | 1 | 0 | 0 | Pending landing zone | 🟢 Tracking |
| Data Governance (Cloud) | 0 open / 1 gap | — | — | YES — all data domains | 🔴 Critical (ownership gap) |
| Cloud FinOps / Cost Model | 0 open / 1 gap | — | — | Partial | 🟡 At Risk (ownership gap) |
| Network Exit / Interconnect | 1 | 0 | 0 | Dependency on hypervisor exit | 🟢 Tracking |

**Dominant ambiguity zone:** Cloud Landing Zone + DataStage Migration. These two domains are co-blocking. Resolution sequence: Landing Zone → DataStage runtime target → orchestration tool → Cognos placement decision.

---

## Component 5: Risk Inventory

| Risk ID | Risk Description | Domain | Owner | Date Raised | Expiry Date | Age (days) | Status |
|---------|-----------------|--------|-------|-------------|-------------|------------|--------|
| RSK-001 | VMware licence expiry creates forced migration window that may compress cloud readiness timeline below acceptable architecture quality threshold | VMware Exit / Cloud Landing Zone | Infrastructure Lead | 2026-01-08 | 2026-02-08 | 19 | 🔴 Aging — expiry 12 days |
| RSK-002 | DataStage pipeline logic contains undocumented transformations not captured in current lineage tooling — cloud migration target cannot be validated without lineage audit | DataStage Migration / Data Governance | Data Integration Architect | 2026-01-13 | 2026-02-13 | 14 | 🟡 Active |
| RSK-003 | Cognos report inventory has not been rationalised — migrating full Cognos estate to cloud amplifies licensing cost without business value justification | Cognos BI Platform Exit / FinOps | BI Platform Owner | 2026-01-15 | 2026-03-01 | 12 | 🟡 Active |

**CR-X1 Expiry Discipline:**
- RSK-001 expires in 12 days. If not resolved or explicitly extended with revised mitigation before 2026-02-08, it escalates to a Programme-level risk with mandatory Sponsor notification.
- RSK-002 and RSK-003 are within active window but require owner confirmation at next Pulse session that mitigation is in progress.

---

## Component 6: Fitness Functions Register

| ID | Fitness Function | Enforces | Domain | Owner | Status |
|----|-----------------|----------|--------|-------|--------|
| FF-001 | `test_landing_zone_topology_bound()` — Asserts that cloud landing zone topology decision is in Decided or Active state before any workload migration ADR is created | TOM-20260106-001 / CR-T2 | Cloud Landing Zone | Enterprise Architect | 🔴 Failing — TOM-20260106-001 not yet bound |
| FF-002 | `test_datastage_migration_target_bound()` — Asserts that DataStage runtime target decision is bound before orchestration tool ADR proceeds to Active | TOM-20260110-002 / CR-T1 | DataStage Migration | Data Integration Architect | 🔴 Failing — TOM-20260110-002 not yet bound |
| FF-003 | `test_decision_aging()` — Asserts no VP2/VP3 decision exceeds 14 calendar days without binding resolution | CR-E1 | All domains | Principal Architect | 🔴 Failing — 2 decisions in breach |
| FF-004 | `test_ownership_completeness()` — Asserts every open decision and active risk has a single named owner confirmed within the last 14 days | CR-O1 / CR-O2 | All domains | Principal Architect | 🟡 Partial — 2 ownership gaps unresolved |
| FF-005 | `test_adr_references_tom()` — Asserts every VP3 ADR references a governing VP2 Trade-off Matrix | CR-T2 | Data Pipeline / BI Platform | Data Integration Architect | 🟢 Passing |

---

## Component 7: Velocity Trend

| Week | Total Decisions Bound | Median Latency (days) | Red Count (end of week) | Velocity Signal |
|------|-----------------------|----------------------|------------------------|----------------|
| 2025-W50 | 9 | 6 | 0 | 🟢 High |
| 2025-W51 | 8 | 7 | 0 | 🟢 High |
| 2026-W01 | 6 | 9 | 1 | 🟡 Moderate |
| 2026-W02 | 5 | 11 | 2 | 🟡 Moderate → Stalling |

**Trend interpretation:** Velocity has declined for three consecutive weeks. Median latency has increased from 6 to 11 days. Red count has grown from 0 to 2. The system is not in freefall — but if landing zone and DataStage decisions do not bind in the current week, the velocity signal will cross to 🔴 Stalled at next Pulse reading.

---

---

# Architectural Decision Log — INDEX

**ADL Master Index | DataStage + Cognos + VMware → Cloud Solution**
**VAF VP4 | Velocity Architecture Framework™**

```
ADL/
├── INDEX.md                          ← This document
├── canvases/                         ← VP1 Guardrail Canvas records
│   ├── CANVAS-20251201-001.md        ← Cloud Adoption Guardrails (Active)
│   ├── CANVAS-20251201-002.md        ← Data Platform Principles (Active)
│   └── CANVAS-20260110-003.md        ← On-Premises Exit Constraints (Active)
├── decisions/                        ← VP2 Trade-off Matrix records
│   ├── TOM-20260106-001.md           ← Cloud landing zone topology (OPEN 🔴)
│   ├── TOM-20260110-002.md           ← DataStage migration target (OPEN 🔴)
│   ├── TOM-20260113-003.md           ← Cognos BI platform exit (OPEN 🟡)
│   ├── TOM-20260115-004.md           ← VMware hypervisor exit sequence (OPEN 🟡)
│   ├── TOM-20260121-005.md           ← Identity and access model (OPEN 🟢)
│   └── TOM-20260122-006.md           ← On-premises network exit dependency (OPEN 🟢)
├── adrs/                             ← VP3 Architecture Decision Records
│   └── ADR-20260120-001.md           ← Data pipeline orchestration layer (OPEN 🟢)
└── superseded/                       ← Closed decisions — retained, never deleted
    ├── TOM-20251115-001.md           ← Initial on-premises refresh option (SUPERSEDED)
    └── ADR-20251120-001.md           ← DataStage version upgrade path (SUPERSEDED by TOM-20260110-002)
```

---

## ADL Master Index Table

| ID | Title | Type | Layer | Status | Owner | Date Raised | Date Bound | Supersedes | Superseded By | Canvas Ref |
|----|-------|------|-------|--------|-------|-------------|------------|------------|--------------|------------|
| CANVAS-20251201-001 | Cloud Adoption Guardrails | Guardrail Canvas | VP1 | Active | Enterprise Architect | 2025-12-01 | 2025-12-15 | — | — | — |
| CANVAS-20251201-002 | Data Platform Principles | Guardrail Canvas | VP1 | Active | Chief Data Officer | 2025-12-01 | 2025-12-15 | — | — | — |
| CANVAS-20260110-003 | On-Premises Exit Constraints | Guardrail Canvas | VP1 | Active | Infrastructure Lead | 2026-01-10 | 2026-01-17 | — | — | — |
| TOM-20260106-001 | Cloud landing zone topology | Trade-off Matrix | VP2 | **Open 🔴** | Enterprise Architect | 2026-