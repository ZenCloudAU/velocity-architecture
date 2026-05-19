# ADR-001 | Migrate DataStage, Cognos, and VMware Deprecated On-Premises Platform to Cloud-Native Solution

---

## ADR Identification

| Field | Value |
|-------|-------|
| **ADR ID** | ADR-001 |
| **Title** | Migrate DataStage, Cognos, and VMware Deprecated On-Premises Platform to Cloud-Native Solution |
| **Date** | 2026-01-22 |
| **Owner** | Principal Architect — Cloud Transformation Programme |
| **Status** | Proposed |
| **Supersedes** | N/A |
| **Governing Decision** | Capability Model for Cloud Solution and Decentralisation of On-Premises |

---

## Context

The organisation operates three interdependent platform capabilities on a shared on-premises VMware estate:

1. **IBM DataStage** — batch and near-real-time ETL pipelines serving data warehouse ingestion and downstream reporting feeds
2. **IBM Cognos Analytics** — enterprise BI and reporting layer, consuming DataStage-processed data from a centralised on-premises data warehouse
3. **VMware vSphere / vCenter** — underpinning virtualisation host for both workloads above, as well as other enterprise services

All three components are at or approaching end-of-supportable-life within the organisation's current vendor agreements and operational posture:

- VMware has entered Broadcom ownership with material licence model changes that have increased total cost of ownership for the current on-premises estate and reduced long-term supportability confidence
- IBM DataStage on-premises licensing is expensive to renew at current scale; IBM's strategic direction is DataStage-as-a-Service on IBM Cloud Pak for Data (CP4D) or migration to cloud-native equivalents
- Cognos on-premises is being actively deprioritised by IBM in favour of Cognos Analytics on Cloud and IBM Planning Analytics; remaining on-premises creates an unsustainable support and upgrade dependency

The absence of a binding migration decision is producing an **Integrity Gap**: the organisation's documented capability model describes these platforms as production capabilities, but the underlying platforms are operationally fragile, vendor-unsupported in the medium term, and no longer aligned to the organisation's stated cloud-first strategic direction.

Continued inaction increases the gap between what is documented as the operating architecture and what is actually safe to operate. This is a VAF Truth failure — the technical layer can no longer confirm the assumptions the strategy layer is relying on.

A migration decision is required. This ADR records the decision, its rationale, and the fitness conditions that will confirm the migration has succeeded.

---

## Decision

**We will decommission all on-premises DataStage, Cognos, and VMware workloads and migrate to a cloud-native, decentralised capability model composed of the following target components:**

| Deprecated Capability | Target Capability | Deployment Model |
|---|---|---|
| IBM DataStage (on-premises ETL) | Cloud-native data pipeline tooling (Apache Airflow / AWS Glue / Azure Data Factory — to be confirmed by Trade-off Matrix) | Managed cloud service, decentralised by domain |
| IBM Cognos Analytics (on-premises BI) | Cloud BI platform (Microsoft Power BI / Cognos Analytics on Cloud / Tableau — to be confirmed by Trade-off Matrix) | SaaS or PaaS, federated by business domain |
| VMware vSphere / vCenter (on-premises virtualisation) | Cloud-native compute (containerised workloads on Kubernetes / managed cloud VMs) | IaaS/CaaS, cloud provider TBD |

The decentralisation principle applies: migrated capabilities will not be re-centralised onto a single cloud-hosted monolith. Domain teams will own their pipeline and reporting capabilities within a governed cloud framework, with platform-layer guardrails enforced by the enterprise architecture function.

This decision establishes the **direction and non-negotiable decommission intent**. Specific platform selections for each capability will be governed by subsequent Trade-off Matrix records (VP2) and bound by ADRs at the workload level.

---

## Rationale

### Why migration is the only viable path

**Operational risk:** Continuing on VMware at current licence cost and Broadcom pricing trajectory is not operationally sustainable. The risk of running unsupported or under-licenced infrastructure is a compliance exposure, not merely a technical inconvenience.

**Vendor alignment:** IBM's roadmap for both DataStage and Cognos has structurally shifted to cloud delivery. On-premises versions will receive diminishing investment. Continuing to operate on-premises means accepting compounding technical debt against a vendor who has effectively exited the on-premises market for these products.

**Capability model integrity:** The organisation's capability model for cloud solution and decentralisation cannot be realised while three foundational data and reporting capabilities remain anchored to an on-premises VMware estate. This is a direct architectural contradiction. The capability model documents an intent that the current technical layer actively prevents.

**Truth principle (VAF):** Architecture that documents capabilities the organisation cannot safely rely on is not architecture — it is documentation theatre. The current state creates an Integrity Gap between the capability model (what the organisation says it can do) and the technical truth (what the infrastructure can actually support). This ADR closes that gap by forcing a binding decision.

### Why decentralisation is the correct target model

Centralised re-hosting — lifting DataStage and Cognos onto a single cloud-hosted environment — would replicate the coupling problem in a new location. It would:

- Preserve single-team dependency on centralised pipeline and reporting operations
- Prevent domain teams from owning and evolving their data capabilities independently
- Create a cloud-hosted bottleneck that contradicts the stated capability model for decentralisation
- Reproduce the governance failure mode where one team's release cycle blocks another team's reporting

Decentralised cloud capability ownership, with platform guardrails, achieves the capability model intent: domain teams operate their own pipelines and reports within boundaries enforced by the architecture function, not by shared infrastructure ownership.

### Why the specific tooling selection is deferred

Selecting a specific ETL tool (Glue vs. ADF vs. Airflow) and BI platform (Power BI vs. Cognos on Cloud vs. Tableau) without a Trade-off Matrix would be an architectural decision made without documented rationale. The framework requires that consequence-bearing selections at this level are governed by VP2 instruments. The direction (migrate, decentralise) is binding now. The tooling selection binds at the next decision stage.

---

## Alternatives Considered

| Alternative | Assessment | Why Rejected |
|---|---|---|
| **Renew VMware and extend on-premises life** | Technically feasible short-term | Broadcom licence model increases cost materially; does not resolve DataStage or Cognos supportability; defers the Integrity Gap rather than closing it. Rejected. |
| **Lift-and-shift DataStage and Cognos to cloud VMs** | Reduces VMware dependency | Reproduces on-premises architecture in cloud hosting. Does not achieve decentralisation. Vendor support for lifted on-premises versions does not improve. Rejected. |
| **Migrate to IBM Cloud Pak for Data (DataStage SaaS)** | Retains IBM tooling investment | Vendor lock-in concern deepens. Does not resolve Cognos or VMware. CP4D pricing at scale requires Trade-off Matrix validation before commitment. Not rejected — to be evaluated in subsequent VP2 record. |
| **Centralised cloud data platform (single team ownership)** | Operationally familiar | Directly contradicts the capability model for decentralisation. Creates new single-team bottleneck. Rejected on architectural principle. |
| **Do nothing** | No immediate cost | Operationally and strategically untenable. Compounding licence risk, vendor support decay, and Integrity Gap. Not a viable architectural option. Rejected. |

---

## Consequences

### Positive

- **Closes the Integrity Gap:** The documented capability model and the technical architecture align. The organisation's cloud-first, decentralised intent is reflected in what is actually built and operated.
- **Removes VMware licence exposure:** Broadcom pricing risk is eliminated for these workloads.
- **Enables domain ownership:** Pipeline and reporting capabilities are owned by domain teams, reducing central bottlenecks.
- **Improves supportability:** Cloud-native and SaaS tooling carries vendor-managed operational support, reducing internal infrastructure burden.
- **Enables elastic scaling:** Cloud-native data pipelines and BI platforms scale on demand without infrastructure pre-provisioning.

### Negative / Risks

- **Migration complexity:** DataStage job logic is often tightly coupled to on-premises data sources, schemas, and scheduling conventions. Re-platforming requires pipeline-by-pipeline assessment before automated lift is feasible. Underestimation is a material delivery risk.
- **Cognos report fidelity:** Cognos reports with complex prompted queries, custom namespaces, or bespoke framework manager models may not migrate cleanly to target BI platforms. A report inventory and fidelity assessment is required before tooling selection.
- **Skills transition:** On-premises DataStage and VMware administration skills are not directly transferable to cloud-native equivalents. Training investment and potential capability gap in the transition window are expected.
- **Decentralisation governance maturity required:** Domain-level pipeline and reporting ownership only works if the governance framework is ready to enforce guardrails without central coordination. If the platform guardrail model is not established before decentralisation, quality and compliance controls will be inconsistently applied.
- **Tooling selection latency:** Deferring ETL and BI platform selection to a subsequent Trade-off Matrix introduces a dependency. If the VP2 process does not resolve within the 14-day decision aging rule (CR-E1), migration planning cannot proceed.

### Obligations Created

- A Trade-off Matrix (VP2) for ETL platform selection must be initiated within 14 days of this ADR being accepted (CR-E1)
- A Trade-off Matrix (VP2) for BI platform selection must be initiated concurrently
- A VMware workload inventory must be completed prior to decommission planning
- A DataStage job inventory and cloud-readiness classification must be completed prior to pipeline migration
- A Cognos report inventory and fidelity risk assessment must be completed prior to BI migration
- Platform guardrail definitions must be authored and accepted before domain teams take ownership of decentralised capabilities

---

## Fitness Functions

All fitness functions carry a reference to this ADR in accordance with CR-T4.

```python
# [ADR-001] — VMware workload reduction: percentage of identified workloads
# decommissioned from on-premises VMware estate
assert vmware_workload_decommission_percentage() >= 100
# Target: 100% decommission within agreed programme timeline

# [ADR-001] — DataStage on-premises pipeline decommission: no active
# DataStage jobs running on-premises infrastructure post-cutover date
assert datastage_onprem_active_jobs() == 0
# Evaluated: post-cutover date per workstream plan

# [ADR-001] — Cognos on-premises active user sessions: no active Cognos
# on-premises sessions post-decommission date
assert cognos_onprem_active_sessions() == 0
# Evaluated: post-decommission date per workstream plan

# [ADR-001] — Decentralisation compliance: all migrated pipelines owned
# by a registered domain team, not a central platform team
assert centralised_pipeline_ownership_count() == 0
# Enforced: domain team registry check against pipeline ownership metadata

# [ADR-001] — Trade-off Matrix dependency: ETL and BI platform Trade-off
# Matrix records must be accepted before pipeline migration commences
assert tom_etl_platform_status() == "Accepted"
assert tom_bi_platform_status() == "Accepted"
# Evaluated: at migration commencement gate

# [ADR-001] — Platform guardrail coverage: all decentralised domain
# capability deployments pass guardrail fitness checks before go-live
assert guardrail_coverage_percentage() == 100
# Enforced: deployment pipeline gate — no domain go-live without passing

# [ADR-001] — Decision aging: ETL and BI Trade-off Matrix records must
# not remain open beyond 14 calendar days (CR-E1)
assert days_open("TOM-ETL-PLATFORM") <= 14
assert days_open("TOM-BI-PLATFORM") <= 14
# Enforced: Velocity Dashboard aging monitor

# [ADR-001] — Integrity Gap closure: capability model documentation
# reflects cloud-native target state, not on-premises current state
assert capability_model_reflects_cloud_target() == True
# Evaluated: architecture review checkpoint at programme milestone
```

---

## Implementation Notes

1. **Sequencing dependency:** VMware decommission cannot complete until DataStage and Cognos workloads are migrated. The VMware workstream is downstream of both data platform workstreams.
2. **Parallel workstreams required:** ETL migration and BI migration must run in parallel under separate workstream owners to avoid serialising a programme that has compounding time pressure from vendor support timelines.
3. **Inventory before tooling:** Both the DataStage job inventory and the Cognos report inventory are prerequisites for Trade-off Matrix completion. These are not optional scoping activities — without them, the tooling selection has no basis.
4. **Guardrails before decentralisation:** Releasing domain ownership without platform guardrails is an architectural risk. The guardrail canvas (VP1) for this programme must be authored and accepted before any domain team takes live ownership of a migrated capability.
5. **CR-T2 compliance:** All subsequent ADRs for ETL tooling, BI tooling, and VMware compute replacement must reference this record as their governing decision.

---

## ADR Status Trail

| Date | Status | Note |
|---|---|---|
| 2026-01-22 | Proposed | Initial authoring — awaiting architecture review |

---

*ADR-001 | Velocity Architecture Framework™ VP3 — Truth Viewpoint*
*© 2026 Phil Myint / ZenCloud Global Consultants. All rights reserved.*
*ISO/IEC/IEEE 42010:2022 Conformant | github.com/ZenCloudAU/velocity-architecture*