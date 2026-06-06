# AI Risk and Control Register

## Purpose

Record AI deployment risks, ownership, controls, evidence, and review status.

| ID | Risk | Category | Likelihood | Impact | Owner | Preventive control | Detective control | Evidence | Status | Review date |
|---|---|---|---|---|---|---|---|---|---|---|
| AI-001 | Confidential data enters an unapproved tool | Data |  |  |  | Data classification and approved-tool policy | Prompt/log review |  | Open |  |
| AI-002 | AI output is treated as final advice | Accountability |  |  |  | Mandatory human review gate | Delivery QA sampling |  | Open |  |
| AI-003 | Tool or model cost scales without value | FinOps |  |  |  | Budget, routing, and cost thresholds | Monthly cost/value review |  | Open |  |
| AI-004 | Agent performs an unauthorised action | Agent control |  |  |  | Least-privilege tool permissions | Action logs and exception alerts |  | Open |  |
| AI-005 | Model/tool selection is vendor-led rather than architecture-led | Architecture |  |  |  | Architecture decision record and option comparison | Governance review |  | Open |  |
| AI-006 | Pilot has no controlled production path | Delivery |  |  |  | Readiness gates and exit criteria | Portfolio review |  | Open |  |
| AI-007 | Duplicate tools and subscriptions create sprawl | Portfolio |  |  |  | Tool register and approved patterns | Quarterly estate scan |  | Open |  |
| AI-008 | Output quality drifts or degrades | Model risk |  |  |  | Test set and acceptance criteria | Quality monitoring |  | Open |  |
| AI-009 | Regulatory or contractual obligations are missed | Compliance |  |  |  | Legal/privacy/security review | Audit evidence check |  | Open |  |
| AI-010 | Ownership is unclear after deployment | Operations |  |  |  | Named business, technical, and support owners | Operational review |  | Open |  |

## Rating Guidance

Likelihood and impact may use a 1-5 scale. Any restricted-data, safety-critical, legal, or uncontrolled autonomous-action risk may stop deployment regardless of aggregate score.

## Control Principles

- Human accountability remains explicit.
- Permissions are least-privilege.
- Failure is visible and does not continue silently.
- Every control has evidence.
- Every material change triggers review.
