# Trade-off Matrix

**TOM-20260115-002 | DataStage and Cognos Platform Uplift to Cloud**

> Government Agency — Aging On-Premises Data Warehouse Modernisation
> Prepared under the Velocity Architecture Framework™ VP2 — Decision Viewpoint

---

## Decision Identification

| Field | Value |
|-------|-------|
| **Decision ID** | TOM-20260115-002 |
| **Decision Title** | DataStage and Cognos Platform Uplift to Cloud — Data Platform Modernisation Programme |
| **Date** | 2026-01-15 |
| **Owner** | *[Principal Architect — to be nominated; CR-O1 requires single named owner before status moves to Decided]* |
| **Status** | Proposed |
| **Supersedes** | N/A — first formal decision record for this programme |
| **Governing Canvas** | *[GC reference to be linked when VP1 Guardrail Canvas is produced — CR-T1 pending]* |

---

## Context

A government agency operates a mature on-premises data platform anchored by IBM DataStage (ETL/data integration) and IBM Cognos Analytics (reporting and business intelligence). Both products run on aging server hardware approaching or past end-of-support. The data warehouse they serve is similarly on-premises, likely co-located in an agency or whole-of-government data centre.

The operational risk profile is significant. Hardware failure in this environment is no longer a theoretical concern — it is a latent incident. Every quarter that passes without a decision increases the probability of an unplanned outage that forces a crisis migration under the worst possible conditions: no runway, no testing, no rollback. This is the textbook **Decision Latency** problem the VAF is designed to resolve. The cost of deferral is not zero; it is actively accumulating.

The **Integrity Gap** is also present. On-premises platforms of this vintage tend to accumulate undocumented customisation, pipeline logic embedded in tooling rather than documented in architecture artefacts, and tribal knowledge held by a small number of staff. The longer the uplift is deferred, the wider this gap grows — and the harder a future migration becomes. The **Velocity of Truth** — the rate at which the organisation's understanding of its own platform matches reality — is declining. A deliberate cloud uplift programme is, in part, an exercise in closing this gap before it becomes unrecoverable.

No formal constraints have been declared for this decision. This absence is itself a risk: government programmes of this kind routinely encounter late-breaking constraints around data sovereignty, security classification, procurement frameworks, and budget cycles. The sequencing rationale below explicitly surfaces these as early resolution dependencies.

---

## Options Considered

| Option | Summary | Key Advantage | Key Risk |
|--------|---------|---------------|----------|
| **A — Lift and Shift (IaaS)** | Migrate existing DataStage and Cognos installations to cloud-hosted virtual machines with minimal change to the platform or pipelines | Lowest immediate change management burden; preserves existing skill sets; fastest path off aging hardware | Carries all current technical debt into cloud; does not realise cloud-native economics; IBM licensing model on IaaS may be unfavourable; does not address Integrity Gap |
| **B — Managed Cloud (PaaS/SaaS IBM)** | Adopt IBM DataStage as a Service (DataStage on Cloud Pak for Data / IBM Cloud) and IBM Cognos Analytics on Cloud | Vendor-managed infrastructure; eliminates hardware risk; preserves existing skills and pipeline logic with lower rework; IBM manages upgrades | Vendor dependency deepens; cloud hosting costs may exceed on-prem TCO without rationalisation; data residency requirements must be validated against sovereign cloud obligations |
| **C — Platform Re-platforming (AWS / Azure native)** | Replace DataStage with a cloud-native integration service (e.g. AWS Glue, Azure Data Factory) and replace Cognos with a cloud-native BI tool (e.g. Power BI, Amazon QuickSight, Tableau on cloud) | Maximum cloud-native economics; breaks IBM dependency; enables modern data architecture patterns | Highest pipeline rework effort; significant skills transition; high programme risk if attempted as big-bang; extended delivery runway incompatible with hardware urgency |
| **D — Hybrid Phased Migration** | Phase 1: Lift and shift DataStage and Cognos to IaaS or managed cloud to immediately retire hardware risk. Phase 2: Re-platform to cloud-native services once operational stability is confirmed and pipeline inventory is documented | Decouples the urgent risk (hardware) from the complex risk (re-platforming); creates a controlled window for Integrity Gap closure; preserves optionality for Phase 2 platform selection | Two-phase cost profile; risk of Phase 1 becoming permanent if Phase 2 is never resourced; requires disciplined programme governance to prevent drift |

---

## Decision Drivers

| Driver | Weight | Notes |
|--------|--------|-------|
| **Hardware risk elimination** | Critical | Aging hardware is the immediate forcing function. Any option that does not retire on-premises infrastructure within a defined window fails this driver. |
| **Continuity of reporting and ETL operations** | Critical | Cognos and DataStage serve active business operations. An outage during migration is not acceptable. Migration must maintain service continuity. |
| **Data sovereignty and security classification compliance** | High | Government agencies in most jurisdictions are bound by data residency requirements. Cloud platform selection must be validated against these before commitment. This is an unresolved dependency at time of writing. |
| **Total cost of ownership over 3 years** | High | Cloud platforms can reduce or increase TCO depending on licensing model and consumption pattern. IaaS lift-and-shift often produces cost equivalence or increase without rationalisation. PaaS and re-platforming options require modelling. |
| **Skills and change capacity** | High | The agency's internal capability to execute the migration — and to operate the new platform — constrains option viability. Re-platforming options require skills the current team may not hold. |
| **Procurement and budget cycle alignment** | Medium | Government procurement constraints may restrict vendor selection or require whole-of-government panel arrangements. This is an unresolved dependency. |
| **Integrity Gap closure** | Medium | The migration is an opportunity to document and rationalise pipeline logic and reporting assets. This should be treated as a programme objective, not an optional activity. |
| **Vendor lock-in risk** | Medium | IBM dependency is already present. Deepening it via managed cloud is a known risk; breaking it via re-platforming carries execution risk. Neither extreme is clearly correct without further analysis. |

---

## Decision

**Option D — Hybrid Phased Migration — is the recommended direction.**

The programme should be structured in two phases with a defined gate between them:

**Phase 1 — Hardware Exit (Weeks 0–16):** Migrate the existing DataStage and Cognos installations to a cloud IaaS or IBM managed cloud environment (Option A or Option B mechanics). The primary objective is to retire aging hardware and eliminate the unplanned-outage risk. Operational continuity is the governing constraint. This phase should not attempt platform rationalisation or pipeline redesign.

**Phase 2 — Platform Optimisation (Months 5–18+):** Once Phase 1 is stable and the pipeline inventory is documented, conduct a structured evaluation of re-platforming options (Option C mechanics). Phase 2 decisions are contingent on: confirmed data sovereignty requirements, budget approval, skills capacity assessment, and a completed pipeline inventory. Phase 2 platform selection should be treated as a separate Trade-off Matrix decision.

This sequencing is deliberate. The hardware risk is immediate and binary — the infrastructure either fails or it does not. The re-platforming question is complex and non-urgent relative to that risk. Attempting to solve both simultaneously extends the decision window, increases programme complexity, and risks achieving neither. The VAF principle here is explicit: close the urgent decision now, create the conditions for the complex decision to be made well.

This recommendation cannot be confirmed as **Decided** until the following dependencies are resolved:
1. Data sovereignty and security classification requirements are confirmed against candidate cloud platforms.
2. A single named owner is assigned (CR-O1).
3. A governing Guardrail Canvas (VP1) is produced and referenced (CR-T1).
4. Procurement constraints are validated against shortlisted cloud vendors.

Failure to resolve these within 14 days of programme initiation triggers escalation under CR-E1.

---

## Consequences

### What is gained

- **Hardware risk is retired within a defined window.** The unplanned-outage scenario — a government agency's reporting capability failing due to a hardware event — is eliminated as a near-term operational risk.
- **Programme complexity is managed.** Phasing decouples the urgent from the complex. Delivery teams have a clear, bounded Phase 1 scope they can begin on.
- **Optionality is preserved.** By not committing Phase 2 platform selection now, the programme retains the ability to choose the optimal cloud-native tooling once the pipeline inventory is understood and the skills gap is assessed.
- **Integrity Gap begins to close.** Phase 1 will surface undocumented pipeline logic and configuration that has accumulated on the aging platform. This is a programme asset, not a liability.
- **Velocity of Truth is restored.** A structured migration programme produces documented architecture where previously there was tribal knowledge. The organisation's understanding of its own platform is updated to match reality.

### What is accepted as cost

- **Two-phase cost profile.** The organisation will fund two distinct programme phases. Phase 1 infrastructure costs may not be fully optimised, as the platform has not yet been rationalised. This is the deliberate cost of managing risk sequencing.
- **Phase 1 may not represent the final architecture.** Running DataStage and Cognos on IaaS or managed IBM cloud is not the target state — it is a risk mitigation posture. Teams must understand this to avoid treating Phase 1 as a completed outcome.
- **Phase 2 is not guaranteed.** If programme discipline fails after Phase 1, the organisation may settle permanently in an unoptimised cloud state. Governance must enforce the Phase 2 gate, including resourcing and timeline commitment.
- **IBM licensing costs persist through Phase 1.** Until re-platforming occurs in Phase 2, IBM licensing remains in force. The agency should model whether IBM cloud licensing is more or less favourable than current on-prem arrangements.
- **Data sovereignty validation is a blocker.** If cloud platforms fail to meet sovereignty requirements, this decision must be revisited before Phase 1 can proceed. This is a known unresolved risk.

---

## Sequencing Rationale

The sequencing logic of this decision reflects a specific architectural principle: **not all decisions are equal in urgency, and resolving the urgent decision incorrectly in order to also resolve the complex decision is a failure mode.**

The decisions required for this programme are ordered as follows:

| Sequence | Decision | Why Now / Why Later |
|----------|----------|---------------------|
| 1 | Data sovereignty and security classification confirmation | Prerequisite to any cloud platform selection. No other decision is valid until this is resolved. If skipped, the programme risks a forced re-decision after cloud commitment. |
| 2 | Procurement and budget framework validation | Government procurement constraints may eliminate or require specific vendors. Must be confirmed before shortlisting. |
| 3 | Phase 1 cloud platform selection (IaaS vs IBM managed) | Once sovereignty and procurement are confirmed, the Phase 1 platform can be selected. This is a bounded, lower-risk decision — the platform is temporary, not target state. |
| 4 | Pipeline and reporting asset inventory | Must occur during or immediately after Phase 1. This is the foundation for Phase 2 decisions. Without it, Phase 2 re-platforming cannot be scoped or costed accurately. |
| 5 | Phase 2 platform selection (re-platforming option) | Deferred deliberately. Cannot be made responsibly until the inventory exists, skills capacity is assessed, and Phase 1 cost actuals inform the TCO model. A separate Trade-off Matrix should be produced for this decision. |

Attempting to decide Phase 2 platform selection before Phase 1 is stable represents a Decision Latency trap of a different kind — not the failure to decide, but the failure to sequence decisions correctly. A premature Phase 2 commitment made without pipeline inventory data will be revisited, renegotiated, or abandoned. The cost of that outcome exceeds the cost of phasing.

---

## Investment Profile

*Note: The following profiles are indicative ranges based on comparable government data platform migrations. Actual figures require programme scoping, vendor engagement, and procurement modelling. A formal business case should be produced before Phase 1 commitment.*

| Phase | Activity | Indicative Effort | Indicative Cost Range | Risk Profile |
|-------|----------|------------------|-----------------------|--------------|
| Pre-programme | Data sovereignty assessment, procurement validation, pipeline inventory scoping | 4–6 weeks, 1–2 architects | Low | Low — analysis activity only |
| Phase 1 | IaaS or managed cloud migration of DataStage and Cognos; hardware decommission | 10–16 weeks, 3–5 engineers + architect | $250k–$600k AUD (cloud setup, migration labour, licensing transition) | Medium — migration risk managed by parallel run and rollback planning |
| Phase 1 ongoing | Cloud infrastructure run cost (IaaS or managed) | Ongoing | $80k–$200k AUD/year (depending on platform and consumption) | Low once stable |
| Phase 1 gate | Pipeline inventory and documentation; Phase 2 scoping and business case | 6–8 weeks, 1 architect + 2 analysts | $60k–$120k AUD | Low |
| Phase 2 | Re-platforming to cloud-native integration and BI tooling (scoped separately) | 6–18 months (highly dependent on pipeline complexity and skills) | $400k–$1.2M AUD (indicative; requires scoping) | High — skills transition, pipeline rework, parallel operations |
| Phase 2 ongoing | Cloud-native run cost (rationalised) | Ongoing | $50k–$150k AUD/year (expected reduction vs Phase 1 due to rationalisation) | Low once stable |

**Decision Latency cost:** Every quarter the Phase 1 decision is deferred while aging hardware remains in service carries an estimated unplanned-outage risk that, if realised, would likely exceed the Phase 1 migration cost in incident response, data recovery, and service disruption. The cost of deciding is lower than the cost of not deciding.

---

## Open Dependencies and Risks

| # | Dependency / Risk | Owner | Resolution Required By |
|---|-------------------|-------|------------------------|
| D1 | Data sovereignty and security classification requirements confirmed against candidate cloud platforms | *[Agency Security / CISO]* | Before Phase 1 platform selection |
| D2 | Procurement framework validated — whole-of-government panel, vendor eligibility | *[Agency Procurement]* | Before Phase 1 platform selection |
| D3 | Single named architecture owner assigned (CR-O1) | *[Programme Sponsor]* | Immediately — CR-O1 violation until resolved |
| D4 | Governing Guardrail Canvas (VP1) produced and linked (CR-T1) | *[Principal Architect]* | Before status moves to Decided |
| D5 | IBM licensing model confirmed for cloud deployment (IaaS and managed cloud cost comparison) | *[Vendor Management / Procurement]* | Before Phase 1 platform selection |
| D6 | Skills and change capacity assessment completed | *[Programme / HR]* | Before Phase 2 scoping |
| D7 | Phase 1 parallel-run and rollback plan agreed | *[Delivery Lead]* | Before Phase 1 migration begins |

---

## VAF Compliance Notes

| Rule | Status | Notes |
|------|--------|-------|
| CR-T1 — Governing Canvas reference | ⚠ Pending | No VP1 Guardrail Canvas has been provided. This artefact cannot move to Decided status until a Canvas is produced and referenced. |
| CR-T2 — ADR linkage | Pending | ADRs implementing Phase 1 and Phase 2 decisions must reference this record when produced. |
| CR-T3 — Supersession | N/A | No prior decision record exists for this programme. |
| CR-O1 — Single named owner | ⚠ Pending | Owner field is unfilled. A named individual must be assigned before this record is actionable. |
| CR-E1 — 14-Day Decision Aging | Active | This record enters the aging clock on the date of publication. If unresolved within 14 days, escalation is mandatory. |

---

*Velocity Architecture Framework™ — Trade-off Matrix VP2*
*TOM-20260115-002 | Status: Proposed*
*© 2026 Phil Myint / ZenCloud Global Consultants. All rights reserved.*
*ISO/IEC/IEEE 42010:2022 Conformant | github.com/ZenCloudAU/velocity-architecture*