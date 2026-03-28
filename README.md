# Velocity Architecture Framework™

**A decision governance framework for enterprise and solution architecture.**

> *Velocity is not speed. It is the rate at which ambiguity expires.*

---

## What This Is

The Velocity Architecture Framework (VAF) is a formally specified architecture framework conformant with **ISO/IEC/IEEE 42010:2022** — the international standard for architecture description.

It establishes common practice for creating, interpreting, analysing, and using architecture descriptions within:

- **Primary domain:** Enterprise and solution architecture
- **Extended domain:** Organisational leadership and decision governance

The VAF's central claim is simple: **architecture exists to create clarity that leads to better decisions.** Every instrument, rule, and artefact in this framework exists in service of that purpose.

---

## Trademark & IP

**Velocity Architecture Framework™** is a trademark filed under Class 42, ZenCloud Consulting.  
© 2026 Phil Myint / ZenCloud Global Consultants. All rights reserved.

This repository is published for reference and professional use. See [LICENSE](LICENSE) for terms.

---

## Framework Structure

The VAF is organised into seven columns and a foundation layer.

| Column | Name | Purpose |
|--------|------|---------|
| 1 | Trademark | The brand, discipline, and umbrella — everything inherits from this |
| 2 | Operating Model | How the framework runs — Foundation, Operating, Strategic |
| 3 | Operating Rhythm | The engine — Pulse system and escalation cadence |
| 4 | Delivery System | Where it lives — Velocity Vault, folder model, handover |
| 5 | Architectural Control | What stays true — Dashboard, ADL, ADRs, aging rules |
| 6 | Pattern & Playbook | Execution inside the framework — named patterns and playbooks |
| 7 | Practitioner | Who operates it — the integrity arc and Auctor Custos role |

**Foundation Layer** (beneath all columns): the epistemological premises — Velocity of Truth, Integrity Gap, Decision Latency, Expiry, Control Paradox.

---

## Six Viewpoints (ISO/IEC/IEEE 42010 Conformant)

| ID | Viewpoint | Instrument | Layer |
|----|-----------|------------|-------|
| VP1 | Direction | Guardrail Canvas | Enterprise |
| VP2 | Decision | Trade-off Matrix | Solution |
| VP3 | Truth | ADRs + Fitness Functions | Technical |
| VP4 | Velocity | Velocity Dashboard + ADL | Control |
| VP5 | Rhythm | Pulse System | Operating |
| VP6 | Practitioner | Integrity Arc (Auctor Custos) | Human |

---

## Repository Structure

```
velocity-architecture/
│
├── README.md                          ← This file
├── LICENSE
│
├── spec/
│   └── FRAMEWORK-SPEC.md             ← Full ISO/IEC/IEEE 42010 conformant specification
│
├── viewpoints/
│   ├── vp1-direction/
│   │   ├── README.md                 ← Viewpoint specification
│   │   └── guardrail-canvas.md       ← Artefact template
│   ├── vp2-decision/
│   │   ├── README.md
│   │   └── trade-off-matrix.md
│   ├── vp3-truth/
│   │   ├── README.md
│   │   ├── adr-template.md
│   │   └── fitness-function-examples.md
│   ├── vp4-velocity/
│   │   ├── README.md
│   │   ├── adl-template.md           ← Architectural Decision Log
│   │   └── velocity-dashboard.md
│   ├── vp5-rhythm/
│   │   ├── README.md
│   │   └── pulse-system.md
│   └── vp6-practitioner/
│       ├── README.md
│       └── integrity-arc.md
│
├── correspondence-rules/
│   └── RULES.md                      ← All 17 correspondence rules
│
├── templates/                         ← Ready-to-use blank artefacts
│   ├── guardrail-canvas.md
│   ├── trade-off-matrix.md
│   ├── adr.md
│   └── pulse-briefing.md
│
├── diagnostics/
│   ├── decision-velocity-diagnostic.md
│   └── organisation-health-check.md
│
├── foundation/
│   └── EPISTEMOLOGY.md               ← Foundation layer — coined concepts
│
├── leadership/
│   └── LEADERSHIP-EXTENSION.md      ← VAF without the architecture lens
│
└── examples/
    ├── guardrail-canvas-example.md
    ├── trade-off-matrix-example.md
    └── adr-example.md
```

---

## Quick Start

**If you are an architect:**
1. Start with [`/spec/FRAMEWORK-SPEC.md`](spec/FRAMEWORK-SPEC.md) to understand the full framework
2. Use [`/viewpoints/vp1-direction/guardrail-canvas.md`](viewpoints/vp1-direction/guardrail-canvas.md) to declare enterprise direction
3. Use [`/viewpoints/vp2-decision/trade-off-matrix.md`](viewpoints/vp2-decision/trade-off-matrix.md) for solution-level decisions
4. Use [`/viewpoints/vp3-truth/adr-template.md`](viewpoints/vp3-truth/adr-template.md) for technical decisions
5. Review [`/correspondence-rules/RULES.md`](correspondence-rules/RULES.md) to understand how artefacts relate

**If you are a leader (non-architecture context):**
Start with [`/leadership/LEADERSHIP-EXTENSION.md`](leadership/LEADERSHIP-EXTENSION.md)

**If you want a diagnostic:**
Start with [`/diagnostics/decision-velocity-diagnostic.md`](diagnostics/decision-velocity-diagnostic.md)

---

## Core Test

Every artefact in this framework is judged by a single test:

> **Did this help someone decide?**

If it did not, it is not architecture.

---

## Related Publications

- **VAF Book** — 50-chapter manuscript, published serially on Medium [@ZencloudAU](https://medium.com/@ZencloudAU)
- **VAF LinkedIn Series** — Applied articles on decision governance and architectural leadership
- **The Living Bible for Enterprise & Solution Architects** — Domain knowledge reference base

---

*Velocity Architecture Framework™ — © 2026 Phil Myint / ZenCloud Global Consultants*  
*ISO/IEC/IEEE 42010:2022 Conformant | TM Class 42, ZenCloud Consulting*
