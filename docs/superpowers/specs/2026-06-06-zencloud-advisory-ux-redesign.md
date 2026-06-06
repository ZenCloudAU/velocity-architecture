---
name: zencloud-advisory-ux-redesign
description: ZenCloud Advisory site (zencloud.com.au) — Approach A conversion-first redesign. White/orange brand, 7 sections, all 5 offers, Health Check featured. Traffic source LinkedIn ads targeting CTOs/CIOs.
metadata:
  type: project
---

# ZenCloud Advisory — UX Redesign Spec

**Date:** 2026-06-06  
**Repo:** github.com/ZenCloudAU/zencloud-advisory  
**Stack:** React + TypeScript + Vite  
**Approved by:** Phil Myint

---

## Problem

Current site (12 sections, mailto CTAs, 9-item nav) cannot convert LinkedIn ad traffic. Visitors arrive primed by the "cloud as IT project" pain — site does not mirror that or direct to one action.

## Traffic Context

- **Source:** LinkedIn ad targeting CTOs/CIOs
- **Ad hook:** "The #1 mistake enterprises make with cloud? They treat it as an IT project."
- **Goal:** Single action — book a 15-min conversation

---

## Design Decisions

### Approach
Approach A — Conversion-First Rebuild. 12 sections → 7. Each section has one job.

### Brand
- **Background:** white (#ffffff / #f8fafc)
- **Primary accent:** orange #e8630a (matches logo: white background + large orange Z)
- **Text/navy:** #1e3a5f
- **Fonts:** Playfair Display (headings) · DM Sans (body) · DM Mono (labels/mono)

### Logo
Orange square with white Z SVG mark — displayed in nav alongside wordmark.

---

## Section Map (7 sections)

| # | Section | Purpose |
|---|---------|---------|
| 1 | Nav | 4 links (Services, Offers, About, Contact) + Book Health Check CTA |
| 2 | Hero | Pain-led headline mirroring ad · single CTA · no mailto |
| 3 | Credibility Band | Partner logos + Brisbane/Asia-Pacific positioning |
| 4 | Services | All 6 advisory disciplines · 3×2 grid · exact original descriptions |
| 5 | Offers | All 5 engagement models · Health Check featured as entry point |
| 6 | About + Insights | Phil bio + 3 insight cards (thought leadership) |
| 7 | Final CTA + Footer | "Book a Conversation" · VAF/tools links in footer |

**Removed from current site:** ClientJourneyBand, EcosystemMap, VafStrip (→ footer), ToolsSection (→ footer), RoleClarity (→ absorbed into hero).

---

## Hero Copy

```
[eyebrow] Enterprise Architecture Advisory · Brisbane, AU

[h1]
Cloud treated as
an IT project?
That's where value stops.  ← italic gold

[body]
ZenCloud fixes the foundation — governance, architecture decisions,
and cloud strategy aligned to business outcomes. Not vendor roadmaps.
Not disconnected artefacts.

[CTA] Book a Conversation →
[note] 15 min · no obligation · we assess where your architecture stands
```

---

## Credibility Band

Dark navy background. Three partner logos with correct wording:
- Microsoft → **Microsoft Partner Network**
- AWS → **AWS Partner Network**
- Google Cloud → **Google Cloud Partner**

Plus: "Brisbane-based · National & Asia-Pacific engagements"

---

## Services (all 6 — exact descriptions)

3×2 grid. Orange top-border on hover. White cards on light grey background.

01 ENTERPRISE — Enterprise Architecture Advisory  
Target-state direction, decision governance, capability alignment, architecture board support, and transformation framing for complex organisations.

02 SOLUTION — Solution Architecture & Design Authority  
Practical solution architecture for delivery teams: options, decisions, risks, constraints, guardrails, and implementation-ready artefacts.

03 CLOUD — Cloud Strategy & Platform Modernisation  
Cloud direction, platform governance, operating model design, migration framing, and modernisation roadmaps aligned to business outcomes.

04 SECURITY — Security, Identity & Governance  
Security posture, identity, access, control design, risk framing, and governance embedded into architecture decisions from the start.

05 AI DELIVERY — AI-Assisted Delivery Enablement  
Safe adoption of AI-assisted architecture workflows, prompts, artefact generation, review controls, and decision traceability.

06 RECOVERY — Program Recovery & Delivery Governance  
Restores clarity in fragmented or at-risk delivery through decision flow, governance cadence, traceability, and executive reporting.

---

## Offers (all 5 — Health Check featured)

Layout: Health Check full-width featured card with "Recommended starting point" badge + "What you get" sidebar. Below: 2×2 grid for remaining 4 with ghost CTAs.

Entry note banner: "Not sure where to start? The Architecture Decision Health Check is the recommended entry point."

01 DIAGNOSTIC — Architecture Decision Health Check · 5 days → 4 weeks · **Featured / Start here CTA**  
02 SPRINT — Architecture Decision Sprint · 4 weeks  
03 READINESS — AI/Cloud/Cyber Readiness Sprint · 1–3 weeks  
04 RETAINER — Fractional Enterprise Architect · Monthly  
05 PARTNER — Partner Architecture Office · Scoped or ongoing  

All non-featured CTAs: "Start with a conversation →" (ghost button style)

---

## Nav

Sticky · backdrop-blur · 4 links + CTA button  
- Logo: orange Z square + "ZenCloud Advisory" wordmark + sub "Enterprise Architecture · Brisbane"  
- Links: Services | Offers | About | Contact  
- CTA: "Book Health Check" (orange filled button)

---

## Final CTA

Navy background with orange radial glow.  
Headline: "Curious where your architecture *actually stands?*"  
Body: "Book a 15-minute conversation. We'll tell you what we see — and whether we're the right fit. No proposal. No obligation."  
CTA: "Book a Conversation →"  
Note: phil@zencloud.com.au · Brisbane, Australia

---

## Footer

Navy background. Three columns:  
- Logo wordmark  
- Links: Velocity Architecture Framework · VAF Agent · StudioSix · GitHub · LinkedIn  
- © 2026 ZenCloud Global Consultants

---

## Components to Modify

| Component | Change |
|-----------|--------|
| `Nav.tsx` | Reduce to 4 links + CTA · add Z logo mark |
| `Hero.tsx` | New pain-led copy · single CTA · orange top border + diagonal pattern |
| `ClientJourneyBand.tsx` | Remove from App.tsx render |
| `RoleClarity.tsx` | Remove from App.tsx render |
| `AdvisoryServices.tsx` | Exact descriptions restored · 3×2 grid · hover states |
| `EngagementOffers.tsx` | All 5 offers · Health Check featured layout · ghost CTAs |
| `EcosystemMap.tsx` | Remove from App.tsx render |
| `VafStrip.tsx` | Remove from App.tsx render |
| `ToolsSection.tsx` | Remove from App.tsx render |
| `InsightsSection.tsx` | Merge into AboutSection as side column |
| `AboutSection.tsx` | Add insights column · credentials pills |
| `ContactSection.tsx` | Replace with final CTA block (navy bg) |
| `Footer.tsx` | Add VAF/tools links · correct copyright |
| `App.css` | Update tokens: orange primary · white bg · shadow/border updates |

**New component needed:** `CredibilityBand.tsx` — partner logos with correct network wording.

---

## Reference

Visual mockup: `.superpowers/brainstorm/868-1780691294/content/full-mockup-v4.html`  
Services confirmation: `.superpowers/brainstorm/868-1780691294/content/services-check.html`
