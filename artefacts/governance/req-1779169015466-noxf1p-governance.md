# Guardrail Canvas — VP1

**GC-20260101-001 | DataStage and Cognos Platform Uplift to Cloud**

---

## Canvas Identification

| Field | Value |
|-------|-------|
| **Canvas ID** | GC-[YYYYMMDD]-001 |
| **Organisation / Domain / Period** | [Government Agency Name] — DataStage and Cognos Platform Uplift to Cloud — [FY/Period TBD] |
| **Owner** | [Enterprise Architect — Name Required] |
| **Status** | Proposed |
| **Review Date** | [Required — Canvas is inactive without this field] |
| **Supersedes** | N/A — Initial canvas for this programme |

> ⚠ **Missing Information Notice:** Canvas ID, Organisation Name, Owner Name, and Review Date are required fields under CR-X3 and CR-O1. This canvas is in **Proposed** state and cannot transition to **Active** until all identification fields are resolved by the named owner. Decision Latency begins accruing from the date this canvas is first circulated.

---

## Core Optimisation

We prioritise **data platform continuity, sovereign data control, and analyst productivity** over **cost minimisation and feature acceleration** when trade-offs are required.

*Rationale: The current platform is operating on aging hardware with an active Integrity Gap between documented architecture and the state of production systems. Every week without a binding cloud target decision compounds Governance Drag and increases the probability of an unplanned outage that forces a reactive migration — the highest-risk and highest-cost migration mode. Continuity of Cognos reporting and DataStage pipeline operation is non-negotiable during transition. Analyst productivity is the primary business value this platform delivers; it must not degrade during uplift.*

---

## Non-Negotiables

- **Data Sovereignty:** All production data, pipeline outputs, and reporting artefacts must reside within Australian government-approved cloud regions (ap-southeast-2 minimum; GovDC-connected regions where mandated). No exceptions without written ministerial or equivalent authority approval.
- **Security Classification Compliance:** Cloud deployment architecture must meet the agency's applicable ISM controls and PSPF classification handling requirements for all data assets processed by DataStage and surfaced through Cognos. Compliance mapping is mandatory prior to any production workload migration.
- **Continuity of Reporting:** Cognos reports designated as Tier 1 (ministerial, regulatory, or operational critical) must remain available throughout migration. Zero unplanned outage tolerance for Tier 1 reporting during transition windows.
- **Decision Traceability:** Every platform selection, vendor engagement, and architecture decision made during options analysis must be recorded as an ADR or Trade-off Matrix entry. No verbal or email-only decisions are binding. This is a hard rule — not a best practice.
- **Vendor Independence:** No deployment architecture that creates an irrecoverable dependency on a single cloud provider's proprietary services without a documented and approved exit strategy. This applies to both IBM Cloud Pak for Data (DataStage) and any SaaS Cognos Analytics deployment.
- **Options Analysis Closure:** The options analysis phase must produce a binding platform decision within a defined decision window. An options analysis that does not close is a Decision Latency event. If the window expires without resolution, CR-E1 applies immediately.

---

## Explicit Trade-offs

| Tension | Our Position | Rationale |
|---------|-------------|-----------|
| Lift-and-shift vs Re-platform | Lift-and-shift as default; re-platform only where lift-and-shift creates a known future constraint | Re-platform risk during initial uplift is unacceptable. Complexity must be absorbed after the hardware risk is retired, not before. |
| Speed of migration vs Stability of platform | Stability over speed | An accelerated migration that destabilises Cognos reporting produces more organisational harm than a delayed but stable migration. Speed is not velocity. |
| IaaS vs PaaS vs SaaS | PaaS preferred for DataStage; SaaS evaluated for Cognos | PaaS reduces operational burden without introducing irrecoverable lock-in at the data layer. SaaS for Cognos is contingent on ISM compliance verification — not assumed. |
| Cost optimisation vs Operational resilience | Resilience for Tier 1 workloads; cost optimisation for Tier 2–3 | Reporting outage cost (ministerial, regulatory exposure) exceeds hosting cost. Cost is a second-order concern for Tier 1. |
| Single cloud provider vs Multi-cloud | Single primary provider with documented exit strategy | Multi-cloud at programme inception adds operational complexity that the agency does not currently have the capability to absorb. Exit strategy is mandatory. |
| In-house operation vs Managed service | Managed service preferred where ISM-compliant options exist | Current on-prem model carries unquantified operational risk from hardware age and undocumented dependencies. Managed service transfers operational risk where the agency lacks specialist depth. |
| Parallel run vs Big-bang cutover | Parallel run mandatory for Tier 1 workloads | Cutover without parallel validation exposes ministerial reporting to undetected regression. Parallel run duration is a delivery decision, not a governance one — but the obligation to run in parallel is not. |

---

## Decision Authority

> This section declares who holds binding decision authority at each layer. Ambiguity in authority is the primary source of Governance Drag in government technology programmes.

| Decision Class | Authority | Escalation Path | Binding Mechanism |
|----------------|-----------|-----------------|-------------------|
| Cloud provider selection | Enterprise Architect with CTO/CIO sign-off | Executive Committee | Signed Trade-off Matrix + ADR |
| Security classification approval for cloud workloads | Agency CISO | Secretary or equivalent | Written security risk acceptance |
| Budget commitment for cloud infrastructure | CFO / Programme Sponsor | Ministerial (if above delegation threshold) | Approved business case |
| DataStage deployment architecture (IaaS/PaaS/Cloud Pak) | Enterprise Architect | Programme Board | ADR with Trade-off Matrix reference |
| Cognos deployment model (on-cloud IaaS / SaaS / hybrid) | Enterprise Architect + BI Platform Owner | Programme Board | ADR with Trade-off Matrix reference |
| Tier 1 report cutover approval | Business Owner (per report domain) + Programme Director | CIO | Signed cutover acceptance |
| Vendor contract and exit strategy approval | Procurement + Legal + Enterprise Architect | CFO | Executed contract with exit clause |
| Options analysis closure | Programme Board | Executive Committee | Formal decision minute referencing ADR |

> **Governance Drag Warning:** Decision authority is only meaningful when it is exercised within a defined timeframe. All decision classes above are subject to CR-E1 (14-Day Decision Aging Rule). An authority that does not decide within 14 days triggers mandatory escalation. Holding authority is not the same as exercising it.

---

## Governance Drag Analysis

> Governance Drag is the measurable delay between when a decision can be made and when it is made. In government technology programmes, Governance Drag is the dominant cause of cost overrun and scope compression.

### Identified Drag Points

| Drag Point | Description | Risk Rating | Mitigation |
|------------|-------------|-------------|------------|
| Security accreditation sequencing | ISM/PSPF compliance assessment is frequently initiated too late, becoming a blocker at deployment rather than a constraint at design | High | Security architecture review must be initiated at options analysis — not post-selection |
| Options analysis scope creep | Government options analyses frequently expand in scope to avoid commitment, converting a bounded decision into an indefinite research exercise | High | Options analysis must have a declared closure date and decision criteria before it begins |
| Procurement process duration | Cloud provider procurement (panel, open tender, or whole-of-government arrangement) has fixed lead times that are routinely underestimated | High | Procurement pathway must be confirmed during options analysis, not after platform selection |
| Multi-stakeholder sign-off chains | Decisions that require sequential approval from CISO, CTO, CFO, and Programme Board without a defined parallel review pathway stall at each gate | Medium | Decision gates must be parallelised where approval authorities are independent |
| Undocumented legacy dependencies | DataStage pipelines and Cognos reports with undocumented upstream/downstream dependencies create a discovery phase that blocks migration scheduling | High | Dependency mapping is a programme precondition, not a migration activity |
| Velocity of Truth deficit | The current Integrity Gap between documented architecture and production state means that design decisions will be made on inaccurate information until a discovery audit closes the gap | Critical | Architecture discovery audit must be scoped and completed before options analysis conclusions are drawn |

---

## Compliance Mappings

> Compliance obligations are non-negotiable constraints, not implementation considerations. They bound the options space before options analysis begins.

| Obligation | Source | Impact on Options Analysis | Verification Point |
|------------|--------|---------------------------|-------------------|
| Information Security Manual (ISM) | Australian Signals Directorate | Cloud provider must hold IRAP assessment at required classification level; controls mapping required for all data assets | Prior to platform selection |
| Protective Security Policy Framework (PSPF) | Attorney-General's Department | Data classification and handling requirements constrain storage, transit, and access control architecture | Prior to platform selection |
| Whole-of-Government Cloud Policy | DOGE / DISR (as applicable) | Agency may be bound by panel arrangements or preferred provider lists that constrain cloud provider choice | At programme initiation |
| Privacy Act 1988 (Cth) | Commonwealth | Data assets containing personal information require privacy impact assessment for cloud migration; data residency directly implicated | Prior to data migration |
| Public Governance, Performance and Accountability Act (PGPA) | Commonwealth | Expenditure on cloud infrastructure requires approval within delegation limits; business case obligations apply | At budget commitment |
| Agency-specific Data Governance Policy | Internal | Classification of data assets, retention obligations, and access control requirements apply to all migrated workloads | Prior to architecture design |
| IBM Licence Entitlements (DataStage) | IBM | Existing DataStage licence terms may restrict or conditionally permit cloud deployment; licence renegotiation may be required | At options analysis — not post-selection |
| Cognos Licence Entitlements | IBM | SaaS and cloud deployment models carry different licence structures; existing on-prem entitlements are not automatically transferable | At options analysis — not post-selection |

---

## Altitude Collapse Risk

> Altitude Collapse occurs when strategic intent is displaced by operational detail at the wrong layer — typically when solution-level complexity drives enterprise-level decisions, or when enterprise-level constraints are ignored by solution teams operating without visibility of the canvas.

### Risk Assessment

| Collapse Vector | Description | Severity | Indicator |
|-----------------|-------------|----------|-----------|
| Technology selection driving architecture direction | Cloud provider or tooling preference (from vendors or delivery teams) substitutes for a binding enterprise decision | High | Platform selection decision made before options analysis produces a binding Trade-off Matrix |
| Security compliance treated as implementation detail | ISM/PSPF obligations are delegated to the delivery team and not enforced as enterprise constraints | Critical | Security architecture review scheduled after platform selection |
| Migration urgency overriding continuity obligations | Hardware failure risk is used to justify bypassing parallel run or cutover governance | High | Tier 1 reports cut over without signed business owner acceptance |
| Options analysis producing a recommendation instead of a decision | Options analysis output is a document, not a binding authority decision — the programme continues without closure | High | Programme Board receives options paper but no decision minute is produced |
| Licence and procurement treated as post-design activities | IBM licence renegotiation and cloud procurement are initiated after architecture is locked, creating cost and timeline risk | Medium | Procurement lead time not reflected in programme schedule |
| Undocumented dependencies treated as delivery risk, not architecture risk | Legacy pipeline and report dependencies are managed as a project issue log rather than as an architecture constraint | High | Dependency map does not exist or is not owned by the Enterprise Architect |

### Altitude Collapse Prevention

- This canvas must be referenced by all VP2 Trade-off Matrix decisions made during options analysis and migration planning
- The Enterprise Architect is the sole authority for asserting that a solution-level decision is consistent with this canvas (CR-T1)
- Any solution-level decision that conflicts with a Non-Negotiable stated in this canvas must be escalated to Programme Board — it cannot be resolved at delivery team level
- The Programme Director and Enterprise Architect must conduct a joint canvas review at each phase gate to confirm that operational decisions have not displaced the strategic constraints declared here

---

## VAF Concept Application

| VAF Concept | Application to This Programme |
|-------------|-------------------------------|
| **Integrity Gap** | The gap between documented on-prem architecture and actual production state is the single greatest risk to this programme. Design decisions made without closing this gap will be made on false premises. The discovery audit is not optional. |
| **Decision Latency** | Government programmes of this type routinely accumulate Decision Latency in security accreditation, procurement pathway confirmation, and options analysis closure. Each open decision is a compounding cost. The 14-Day Decision Aging Rule (CR-E1) is in effect from programme initiation. |
| **Velocity of Truth** | The rate at which accurate understanding of the production environment is established determines the programme's ability to make binding decisions. Velocity of Truth is currently low — the Integrity Gap has not been measured. Increasing Velocity of Truth is the first programme obligation. |
| **Governance Drag** | Multi-stakeholder sign-off chains, sequential approval processes, and undocumented legacy dependencies are the primary Governance Drag sources for this programme. They must be identified and addressed as architecture concerns — not managed as project risks. |

---

## Review and Supersession

- This canvas must be reviewed at programme phase gates: options analysis closure, architecture design completion, and production cutover
- Any change to a Non-Negotiable requires Programme Board approval and produces a new canvas version (CR-T3)
- A canvas that has passed its Review Date without reaffirmation is inactive. All downstream decisions referencing an inactive canvas must be revalidated
- The owner is responsible for initiating the review. The Architecture Review Board is responsible for enforcing the review obligation

---

*Velocity Architecture Framework™ — VP1 Guardrail Canvas*
*© 2026 Phil Myint / ZenCloud Global Consultants. All rights reserved.*
*ISO/IEC/IEEE 42010:2022 Conformant | TM Class 42, ZenCloud Consulting*
*github.com/ZenCloudAU/velocity-architecture*