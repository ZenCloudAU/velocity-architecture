# ZenCloud Advisory UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild zencloud.com.au from 12 sections to 7, white/orange brand, single conversion CTA, all targeting LinkedIn ad traffic from CTOs/CIOs.

**Architecture:** Modify existing React + TypeScript + Vite component tree. Remove 5 components from the render tree, rewrite 8 components, add 1 new component (CredibilityBand). No new dependencies required — all styling via inline styles and existing CSS variables.

**Tech Stack:** React 18, TypeScript, Vite, CSS custom properties (App.css), Google Fonts (Playfair Display, DM Sans, DM Mono)

**Repo:** `C:\Users\phill\Documents\GitHub\zencloud-advisory`

**Reference mockup:** `C:\Users\phill\Documents\GitHub\velocity-architecture\.superpowers\brainstorm\868-1780691294\content\full-mockup-v4.html`

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/App.tsx` | Modify | Remove 5 imports/renders; add CredibilityBand |
| `src/App.css` | Modify | Add nav Z-mark token, tighten shadow/border vars |
| `src/components/Nav.tsx` | Rewrite | 4 links, orange Z SVG mark, no mailto nav |
| `src/components/Hero.tsx` | Rewrite | Pain-led copy, single CTA, orange top bar, diagonal pattern |
| `src/components/CredibilityBand.tsx` | **Create** | Partner logos + network wording |
| `src/components/AdvisoryServices.tsx` | Rewrite | Exact descriptions, 3×2 border-grid, hover top-bar |
| `src/components/EngagementOffers.tsx` | Rewrite | All 5 offers, Health Check featured full-width |
| `src/components/AboutSection.tsx` | Rewrite | Two-column: bio left, insights right |
| `src/components/ContactSection.tsx` | Rewrite | Navy bg final CTA, no mailto button |
| `src/components/Footer.tsx` | Rewrite | Three-col navy footer, VAF/tools links |
| `src/components/ClientJourneyBand.tsx` | No edit | Removed from render only |
| `src/components/RoleClarity.tsx` | No edit | Removed from render only |
| `src/components/EcosystemMap.tsx` | No edit | Removed from render only |
| `src/components/VafStrip.tsx` | No edit | Removed from render only |
| `src/components/ToolsSection.tsx` | No edit | Removed from render only |
| `src/components/InsightsSection.tsx` | No edit | Content absorbed into AboutSection |

---

## Task 1: Update App.tsx — remove sections, add CredibilityBand

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Read current App.tsx**

```bash
cat src/App.tsx
```

- [ ] **Step 2: Replace App.tsx with cleaned render tree**

Replace the entire file with:

```tsx
import Nav from './components/Nav'
import Hero from './components/Hero'
import CredibilityBand from './components/CredibilityBand'
import AdvisoryServices from './components/AdvisoryServices'
import EngagementOffers from './components/EngagementOffers'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CredibilityBand />
        <AdvisoryServices />
        <EngagementOffers />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: remove unused sections from render tree, add CredibilityBand slot"
```

---

## Task 2: Update App.css — token additions

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add missing tokens after existing `:root` block**

In `src/App.css`, after the closing `}` of the `:root` block (after line ~61), add:

```css
/* Conversion redesign additions */
:root {
  --orange:          #e8630a;
  --orange-dark:     #c45508;
  --orange-dim:      rgba(232,99,10,0.08);
  --orange-border:   rgba(232,99,10,0.25);
  --navy-dim:        rgba(30,58,95,0.55);
  --navy-muted:      rgba(30,58,95,0.38);
  --navy-bg:         #1e3a5f;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.css
git commit -m "style: add orange/navy token additions for redesign"
```

---

## Task 3: Rewrite Nav.tsx

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Replace Nav.tsx entirely**

```tsx
const LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Offers',   id: 'offers'   },
  { label: 'About',    id: 'about'    },
  { label: 'Contact',  id: 'contact'  },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 62
  window.scrollTo({ top: y, behavior: 'smooth' })
  window.history.replaceState(null, '', `#${id}`)
}

export default function Nav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      padding: '0 3rem', height: 62,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
        {/* Orange Z square mark */}
        <div style={{
          width: 34, height: 34, background: 'var(--accent-amber)',
          borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 4h14L3 16h14" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '-.02em', lineHeight: 1.1,
          }}>ZenCloud Advisory</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '.58rem',
            color: 'var(--navy-muted)', letterSpacing: '.04em',
          }}>Enterprise Architecture · Brisbane</div>
        </div>
      </div>

      {/* Links + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {LINKS.map(({ label, id }) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'var(--font-body)', fontSize: '.75rem',
            color: 'var(--navy-dim)', cursor: 'pointer',
          }}>{label}</button>
        ))}
        <button onClick={() => scrollTo('contact')} style={{
          fontFamily: 'var(--font-mono)', fontSize: '.65rem',
          letterSpacing: '.08em', textTransform: 'uppercase',
          background: 'var(--accent-amber)', color: '#fff',
          padding: '.5rem 1.1rem', borderRadius: 4, border: 'none', cursor: 'pointer',
        }}>Book Health Check</button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: redesign Nav — 4 links, orange Z mark, no mailto"
```

---

## Task 4: Rewrite Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Replace Hero.tsx entirely**

```tsx
function bookConversation() {
  window.location.href = 'mailto:phil@zencloud.com.au?subject=Book%20a%20Conversation'
}

export default function Hero() {
  return (
    <section style={{
      padding: '7rem 3rem 6rem',
      background: '#ffffff',
      borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orange top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: 'var(--accent-amber)',
      }} />
      {/* Diagonal pattern — right side */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '45%',
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(232,99,10,0.03) 0px, rgba(232,99,10,0.03) 1px, transparent 1px, transparent 28px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 820, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '.65rem',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'var(--accent-amber)', marginBottom: '1.75rem',
        }}>Enterprise Architecture Advisory · Brisbane, AU</p>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
          fontWeight: 900, lineHeight: 1.02, letterSpacing: '-.025em',
          color: 'var(--text-primary)', marginBottom: '1.5rem',
        }}>
          Cloud treated as<br />an IT project?
          <em style={{
            color: 'var(--accent-amber)', fontStyle: 'italic',
            fontWeight: 700, display: 'block',
          }}>That's where value stops.</em>
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75,
          color: 'var(--navy-dim)', maxWidth: 540, marginBottom: '2.75rem',
        }}>
          ZenCloud fixes the foundation — governance, architecture decisions,
          and cloud strategy aligned to business outcomes. Not vendor roadmaps.
          Not disconnected artefacts.
        </p>

        {/* CTA */}
        <button onClick={bookConversation} style={{
          fontFamily: 'var(--font-mono)', fontSize: '.72rem',
          letterSpacing: '.1em', textTransform: 'uppercase',
          background: 'var(--accent-amber)', color: '#fff',
          padding: '1rem 2rem', borderRadius: 4, border: 'none', cursor: 'pointer',
        }}>Book a Conversation →</button>
        <p style={{
          marginTop: '.75rem', fontFamily: 'var(--font-mono)',
          fontSize: '.6rem', letterSpacing: '.08em', color: 'var(--navy-muted)',
        }}>15 min · no obligation · we assess where your architecture stands</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite Hero — pain-led copy, single CTA, orange brand treatment"
```

---

## Task 5: Create CredibilityBand.tsx

**Files:**
- Create: `src/components/CredibilityBand.tsx`

- [ ] **Step 1: Create the file**

```tsx
const partners = [
  {
    name: 'Microsoft',
    badge: 'Microsoft Partner Network',
    logo: (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect x="0"    y="0"    width="9.3" height="9.3" fill="#f25022"/>
        <rect x="10.7" y="0"    width="9.3" height="9.3" fill="#7fba00"/>
        <rect x="0"    y="10.7" width="9.3" height="9.3" fill="#00a4ef"/>
        <rect x="10.7" y="10.7" width="9.3" height="9.3" fill="#ffb900"/>
      </svg>
    ),
  },
  {
    name: 'Amazon Web Services',
    badge: 'AWS Partner Network',
    logo: (
      <svg width="38" height="20" viewBox="0 0 38 20">
        <text x="0" y="13" fontFamily="Arial Black,Arial,sans-serif"
          fontSize="12" fontWeight="900" fill="#FF9900">aws</text>
        <path d="M1 16.5 C6 19.5 12 20.5 19 19 C26 17.5 32 18.5 37 16.5"
          stroke="#FF9900" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    badge: 'Google Cloud Partner',
    logo: (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect x="0"  y="0"  width="9.3" height="9.3" fill="#4285F4"/>
        <rect x="10.7" y="0"  width="9.3" height="9.3" fill="#EA4335"/>
        <rect x="0"  y="10.7" width="9.3" height="9.3" fill="#34A853"/>
        <rect x="10.7" y="10.7" width="9.3" height="9.3" fill="#FBBC05"/>
      </svg>
    ),
  },
]

const divider = (
  <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
)

export default function CredibilityBand() {
  return (
    <div style={{
      background: 'var(--navy-bg)',
      padding: '1.75rem 3rem',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '.58rem',
        letterSpacing: '.22em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)', marginBottom: '.85rem',
      }}>Partner ecosystem</p>

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap',
      }}>
        {/* Partner logos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.25rem', flexWrap: 'wrap' }}>
          {partners.map((p, i) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
              {i > 0 && divider}
              <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
                {p.logo}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '.8rem',
                    fontWeight: 600, color: 'rgba(255,255,255,0.72)',
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '.55rem',
                    letterSpacing: '.1em', textTransform: 'uppercase',
                    color: 'rgba(232,99,10,0.9)',
                    border: '1px solid rgba(232,99,10,0.3)',
                    padding: '.12rem .45rem', borderRadius: 2,
                    background: 'rgba(232,99,10,0.08)', display: 'inline-block',
                    marginTop: '.15rem',
                  }}>{p.badge}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: positioning */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '.63rem',
            color: 'rgba(255,255,255,0.38)', letterSpacing: '.05em', lineHeight: 1.65,
          }}>
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Brisbane-based</strong><br />
            National &amp; Asia-Pacific engagements
          </div>
          {divider}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '.63rem',
            color: 'rgba(255,255,255,0.38)', letterSpacing: '.05em', lineHeight: 1.65,
          }}>
            Principal Architect<br />
            <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Enterprise delivery background</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CredibilityBand.tsx
git commit -m "feat: add CredibilityBand — MS/AWS/GCP partner network logos, correct wording"
```

---

## Task 6: Rewrite AdvisoryServices.tsx

**Files:**
- Modify: `src/components/AdvisoryServices.tsx`

- [ ] **Step 1: Replace AdvisoryServices.tsx entirely**

```tsx
const services = [
  {
    num: '01 — ENTERPRISE',
    title: 'Enterprise Architecture Advisory',
    body: 'Target-state direction, decision governance, capability alignment, architecture board support, and transformation framing for complex organisations.',
  },
  {
    num: '02 — SOLUTION',
    title: 'Solution Architecture & Design Authority',
    body: 'Practical solution architecture for delivery teams: options, decisions, risks, constraints, guardrails, and implementation-ready artefacts.',
  },
  {
    num: '03 — CLOUD',
    title: 'Cloud Strategy & Platform Modernisation',
    body: 'Cloud direction, platform governance, operating model design, migration framing, and modernisation roadmaps aligned to business outcomes.',
  },
  {
    num: '04 — SECURITY',
    title: 'Security, Identity & Governance',
    body: 'Security posture, identity, access, control design, risk framing, and governance embedded into architecture decisions from the start.',
  },
  {
    num: '05 — AI DELIVERY',
    title: 'AI-Assisted Delivery Enablement',
    body: 'Safe adoption of AI-assisted architecture workflows, prompts, artefact generation, review controls, and decision traceability.',
  },
  {
    num: '06 — RECOVERY',
    title: 'Program Recovery & Delivery Governance',
    body: 'Restores clarity in fragmented or at-risk delivery through decision flow, governance cadence, traceability, and executive reporting.',
  },
]

function Card({ num, title, body }: typeof services[0]) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff', padding: '2rem 1.75rem',
        position: 'relative',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'none',
        zIndex: hovered ? 1 : 'auto',
        transition: 'box-shadow 200ms',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: hovered ? 'var(--accent-amber)' : 'transparent',
        transition: 'background 200ms',
      }} />
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '.58rem',
        letterSpacing: '.12em', color: 'var(--accent-amber)', marginBottom: '.85rem',
      }}>{num}</p>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '.88rem',
        fontWeight: 600, color: 'var(--text-primary)', marginBottom: '.6rem', lineHeight: 1.3,
      }}>{title}</p>
      <p style={{
        fontSize: '.78rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--navy-dim)',
      }}>{body}</p>
    </div>
  )
}

import React from 'react'

export default function AdvisoryServices() {
  return (
    <section id="services" style={{
      background: 'var(--bg-alt)', borderTop: '1px solid var(--border)',
    }}>
      <div className="container" style={{ padding: '5.5rem 3rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '.6rem',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'var(--accent-amber)', marginBottom: '.85rem',
        }}>What we provide</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)',
          fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '.75rem',
        }}>Six advisory disciplines. One firm.</h2>
        <p style={{
          fontSize: '.92rem', fontWeight: 300, lineHeight: 1.7,
          color: 'var(--navy-dim)', maxWidth: 520, marginBottom: '2.5rem',
        }}>Senior advisory for organisations that need architecture decisions to become governed execution — not more disconnected artefacts.</p>

        {/* 3×2 border-grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, background: 'var(--border)',
          border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden',
        }}>
          {services.map(s => <Card key={s.num} {...s} />)}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AdvisoryServices.tsx
git commit -m "feat: rewrite AdvisoryServices — exact descriptions, 3x2 grid, hover top-bar"
```

---

## Task 7: Rewrite EngagementOffers.tsx

**Files:**
- Modify: `src/components/EngagementOffers.tsx`

- [ ] **Step 1: Replace EngagementOffers.tsx entirely**

```tsx
function bookConversation(subject = 'Book a Conversation') {
  window.location.href = `mailto:phil@zencloud.com.au?subject=${encodeURIComponent(subject)}`
}

const secondary = [
  {
    num: '02 — SPRINT',
    title: 'Architecture Decision Sprint',
    duration: '4 weeks · Fixed scope',
    body: 'Structured comparison, options analysis, and decision-recording for a specific technology choice your organisation is facing right now.',
  },
  {
    num: '03 — READINESS',
    title: 'AI / Cloud / Cyber Readiness Sprint',
    duration: '1–3 weeks',
    body: 'Readiness evaluation across cloud modernisation, AI adoption, or cybersecurity governance. Clear posture assessment and priority recommendations.',
  },
  {
    num: '04 — RETAINER',
    title: 'Fractional Enterprise Architect',
    duration: 'Monthly · ongoing',
    body: 'Senior architecture support on retainer. Decision governance, board-level reporting, and a principal architect without the full-time cost.',
  },
  {
    num: '05 — PARTNER',
    title: 'Partner Architecture Office',
    duration: 'Scoped or ongoing',
    body: 'White-label or co-branded architecture support for technology partners and resellers alongside your existing delivery team.',
  },
]

export default function EngagementOffers() {
  return (
    <section id="offers" style={{
      background: '#ffffff', borderTop: '1px solid var(--border)',
    }}>
      <div className="container" style={{ padding: '5.5rem 3rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '.6rem',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'var(--accent-amber)', marginBottom: '.85rem',
        }}>How we engage</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)',
          fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '.75rem',
        }}>Every engagement starts<br />with a conversation.</h2>
        <p style={{
          fontSize: '.92rem', fontWeight: 300, lineHeight: 1.7,
          color: 'var(--navy-dim)', maxWidth: 520, marginBottom: '2.5rem',
        }}>Five engagement models. Most organisations start with the Health Check — it's short, scoped, and gives immediate clarity on where the gaps are.</p>

        {/* Entry note */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '.75rem',
          background: 'var(--orange-dim)', border: '1px solid var(--orange-border)',
          borderRadius: 5, padding: '.9rem 1.1rem', marginBottom: '2rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '.85rem',
            color: 'var(--accent-amber)', fontWeight: 700, flexShrink: 0, marginTop: '.05rem',
          }}>→</span>
          <p style={{ fontSize: '.8rem', color: 'var(--navy-dim)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Not sure where to start?</strong>{' '}
            The Architecture Decision Health Check is the recommended entry point. Short, scoped, and gives your organisation immediate clarity on where the gaps are.
          </p>
        </div>

        {/* Health Check — FEATURED full-width */}
        <div style={{
          border: '1px solid var(--accent-amber)',
          boxShadow: '0 0 0 1px var(--orange-border)',
          borderRadius: 6, padding: '2rem 1.75rem',
          marginBottom: '1.25rem', position: 'relative',
          background: '#ffffff',
        }}>
          {/* Recommended badge */}
          <div style={{
            position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent-amber)', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '.58rem',
            letterSpacing: '.12em', textTransform: 'uppercase',
            padding: '.2rem .75rem', borderRadius: '0 0 4px 4px', whiteSpace: 'nowrap',
          }}>Recommended starting point</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '2rem', marginTop: '.75rem' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '.58rem',
                letterSpacing: '.15em', color: 'var(--accent-amber)', marginBottom: '.65rem',
              }}>01 — DIAGNOSTIC</p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                fontWeight: 700, color: 'var(--text-primary)', marginBottom: '.4rem', lineHeight: 1.25,
              }}>Architecture Decision Health Check</h3>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '.6rem',
                letterSpacing: '.1em', color: 'var(--navy-muted)', marginBottom: '1rem',
              }}>5 days → 4 weeks · Fixed scope</p>
              <p style={{
                fontSize: '.82rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--navy-dim)',
              }}>Rapid assessment of how technology decisions are being made, governed, and traced. Identifies the gap between where your architecture is and where it needs to be. Delivered as a clear written report with prioritised recommendations — not a slide deck.</p>
            </div>
            <div>
              <div style={{
                background: 'var(--orange-dim)', border: '1px solid var(--orange-border)',
                borderRadius: 5, padding: '1.1rem', marginBottom: '.75rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '.58rem',
                  letterSpacing: '.12em', color: 'var(--accent-amber)', marginBottom: '.5rem',
                }}>WHAT YOU GET</p>
                <div style={{ fontSize: '.76rem', color: 'var(--navy-dim)', lineHeight: 1.65 }}>
                  Decision flow audit<br />
                  Governance gap analysis<br />
                  Architecture posture review<br />
                  Prioritised recommendations
                </div>
              </div>
              <button
                onClick={() => bookConversation('Architecture Decision Health Check')}
                style={{
                  display: 'block', width: '100%',
                  fontFamily: 'var(--font-mono)', fontSize: '.65rem',
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  color: '#fff', background: 'var(--accent-amber)',
                  border: 'none', padding: '.75rem 1.25rem', borderRadius: 4, cursor: 'pointer',
                }}>Start here →</button>
            </div>
          </div>
        </div>

        {/* Secondary 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {secondary.map(o => (
            <div key={o.num} style={{
              background: 'var(--bg-alt)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '1.5rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '.58rem',
                letterSpacing: '.15em', color: 'var(--accent-amber)', marginBottom: '.65rem',
              }}>{o.num}</p>
              <p style={{
                fontSize: '.88rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '.35rem', lineHeight: 1.3,
              }}>{o.title}</p>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '.6rem',
                letterSpacing: '.1em', color: 'var(--navy-muted)', marginBottom: '1rem',
              }}>{o.duration}</p>
              <p style={{
                fontSize: '.76rem', fontWeight: 300, lineHeight: 1.6,
                color: 'var(--navy-dim)', marginBottom: '1rem',
              }}>{o.body}</p>
              <button
                onClick={() => bookConversation(o.title)}
                style={{
                  display: 'block', width: '100%',
                  fontFamily: 'var(--font-mono)', fontSize: '.62rem',
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  color: 'var(--accent-amber)',
                  border: '1px solid var(--orange-border)',
                  padding: '.55rem 1rem', borderRadius: 4,
                  background: 'var(--orange-dim)', cursor: 'pointer',
                }}>Start with a conversation →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/EngagementOffers.tsx
git commit -m "feat: rewrite EngagementOffers — all 5 offers, Health Check featured"
```

---

## Task 8: Rewrite AboutSection.tsx (with insights)

**Files:**
- Modify: `src/components/AboutSection.tsx`

- [ ] **Step 1: Replace AboutSection.tsx entirely**

```tsx
const insights = [
  {
    tag: 'Cloud Governance',
    title: 'The #1 mistake enterprises make with cloud — and how to fix the foundation',
  },
  {
    tag: 'Architecture Decisions',
    title: 'Why vendor roadmaps are not an architecture strategy',
  },
  {
    tag: 'Decision Velocity',
    title: 'When governance gaps own your cloud spend — not you',
  },
]

const pills = [
  'Microsoft Partner Network',
  'AWS Partner Network',
  'Google Cloud Partner',
  'Brisbane · Asia-Pacific',
]

export default function AboutSection() {
  return (
    <section id="about" style={{
      borderTop: '1px solid var(--border)', background: 'var(--bg-alt)',
    }}>
      <div className="container" style={{
        padding: '5.5rem 3rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start',
      }}>
        {/* Bio */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '.6rem',
            letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--accent-amber)', marginBottom: '.85rem',
          }}>About</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.6rem',
            fontWeight: 700, color: 'var(--text-primary)', marginBottom: '.3rem',
          }}>Phil Myint</h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '.62rem',
            letterSpacing: '.15em', textTransform: 'uppercase',
            color: 'var(--accent-amber)', marginBottom: '1.25rem',
          }}>Principal Architect · ZenCloud Global Consultants</p>
          <p style={{
            fontSize: '.88rem', fontWeight: 300, lineHeight: 1.75,
            color: 'var(--navy-dim)', marginBottom: '1rem',
          }}>
            ZenCloud Advisory is a Brisbane-based enterprise architecture and cloud advisory practice.
            We work with leaders navigating complex technology decisions across cloud, security, AI, and transformation.
          </p>
          <p style={{
            fontSize: '.88rem', fontWeight: 300, lineHeight: 1.75,
            color: 'var(--navy-dim)', marginBottom: '1.25rem',
          }}>
            Every engagement starts with the decision — not a framework presentation. We fix the foundation so your investment actually delivers.
          </p>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {pills.map(p => (
              <span key={p} style={{
                fontFamily: 'var(--font-mono)', fontSize: '.58rem',
                letterSpacing: '.08em', color: 'var(--navy-dim)',
                border: '1px solid var(--border-strong)',
                borderRadius: 3, padding: '.22rem .65rem', background: '#ffffff',
              }}>{p}</span>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '.6rem',
            letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--accent-amber)', marginBottom: '.85rem',
          }}>Insights</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {insights.map(i => (
              <div key={i.tag} style={{
                padding: '1.1rem 1.25rem', background: '#ffffff',
                border: '1px solid var(--border)', borderRadius: 5, cursor: 'pointer',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '.58rem',
                  letterSpacing: '.12em', textTransform: 'uppercase',
                  color: 'var(--accent-amber)', marginBottom: '.4rem',
                }}>{i.tag}</p>
                <p style={{
                  fontSize: '.83rem', fontWeight: 500,
                  color: 'var(--text-primary)', lineHeight: 1.4,
                }}>{i.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AboutSection.tsx
git commit -m "feat: rewrite AboutSection — bio + insights two-column, credentials pills"
```

---

## Task 9: Rewrite ContactSection.tsx

**Files:**
- Modify: `src/components/ContactSection.tsx`

- [ ] **Step 1: Replace ContactSection.tsx entirely**

```tsx
function bookConversation() {
  window.location.href = 'mailto:phil@zencloud.com.au?subject=Book%20a%20Conversation'
}

export default function ContactSection() {
  return (
    <section id="contact" style={{
      padding: '7rem 3rem', borderTop: '1px solid var(--border)',
      background: 'var(--navy-bg)', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Orange radial glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '130%',
        background: 'radial-gradient(ellipse, rgba(232,99,10,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '.6rem',
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'rgba(232,99,10,0.8)', marginBottom: '.85rem',
        }}>Let's talk</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 700, lineHeight: 1.15, color: '#ffffff', marginBottom: '1rem',
        }}>
          Curious where your<br />architecture{' '}
          <em style={{ color: 'var(--accent-amber)', fontStyle: 'italic' }}>actually stands?</em>
        </h2>
        <p style={{
          fontSize: '.92rem', fontWeight: 300, lineHeight: 1.7,
          color: 'rgba(255,255,255,0.5)', marginBottom: '2.25rem',
        }}>
          Book a 15-minute conversation. We'll tell you what we see — and whether we're the right fit. No proposal. No obligation.
        </p>
        <button onClick={bookConversation} style={{
          fontFamily: 'var(--font-mono)', fontSize: '.72rem',
          letterSpacing: '.1em', textTransform: 'uppercase',
          background: 'var(--accent-amber)', color: '#fff',
          padding: '1rem 2.25rem', borderRadius: 4, border: 'none', cursor: 'pointer',
        }}>Book a Conversation →</button>
        <p style={{
          marginTop: '.85rem', fontFamily: 'var(--font-mono)',
          fontSize: '.6rem', letterSpacing: '.08em', color: 'rgba(255,255,255,0.3)',
        }}>phil@zencloud.com.au · Brisbane, Australia</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.tsx
git commit -m "feat: rewrite ContactSection — navy final CTA block, single Book a Conversation action"
```

---

## Task 10: Rewrite Footer.tsx

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx entirely**

```tsx
const externalLinks = [
  { label: 'Velocity Architecture Framework', href: 'https://velocityarchitectureframework.com' },
  { label: 'VAF Agent', href: 'https://velocityarchitectureframework.com' },
  { label: 'StudioSix', href: 'https://studiosix.com.au' },
  { label: 'GitHub', href: 'https://github.com/ZenCloudAU' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/philmyint' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '2rem 3rem',
      background: 'var(--navy-bg)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '.82rem',
        fontWeight: 700, color: 'rgba(255,255,255,0.45)',
      }}>
        Zen<span style={{ color: 'var(--accent-amber)' }}>Cloud</span> Advisory
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {externalLinks.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '.6rem',
              letterSpacing: '.1em', color: 'rgba(255,255,255,0.28)',
              textDecoration: 'none',
            }}>{l.label}</a>
        ))}
      </div>

      {/* Copyright */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '.6rem',
        color: 'rgba(255,255,255,0.22)',
      }}>© 2026 ZenCloud Global Consultants</div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: rewrite Footer — three-col navy, VAF/StudioSix/GitHub/LinkedIn links"
```

---

## Task 11: Build, verify, push

**Files:** none changed — verify only

- [ ] **Step 1: Run the dev server and confirm no TypeScript errors**

```bash
cd C:\Users\phill\Documents\GitHub\zencloud-advisory
npm run dev
```

Open `http://localhost:5173` in browser. Verify:
- Nav: Z logo mark + 4 links + orange CTA button ✓
- Hero: pain-led headline, orange top bar, single CTA ✓
- Credibility band: navy background, 3 partner logos with correct network wording ✓
- Services: 6 cards in 3×2 grid, orange top-bar on hover ✓
- Offers: Health Check featured full-width, 4 secondary in 2×2 grid ✓
- About: two-column, bio left / insights right ✓
- Contact: navy background, single CTA ✓
- Footer: navy, 5 external links ✓

- [ ] **Step 2: Run type check**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 3: Push to main**

```bash
git push origin main
```

- [ ] **Step 4: Confirm deployment via GitHub Actions**

Check `https://github.com/ZenCloudAU/zencloud-advisory/actions` — deployment workflow should trigger and complete green.

---

## Self-Review

**Spec coverage:**
- ✓ 7-section structure
- ✓ Nav: Z mark, 4 links, Book Health Check
- ✓ Hero: pain copy, orange bar, single CTA
- ✓ Credibility band: correct partner wording
- ✓ Services: all 6, exact descriptions, 3×2 grid
- ✓ Offers: all 5, Health Check featured, entry note
- ✓ About: bio + insights two-column
- ✓ Contact: navy final CTA
- ✓ Footer: VAF/tools links
- ✓ Removed: ClientJourneyBand, RoleClarity, EcosystemMap, VafStrip, ToolsSection

**Type consistency:** `bookConversation` defined locally in Hero, ContactSection, EngagementOffers — no shared function needed (each has slightly different subject line). `--navy-bg`, `--navy-dim`, `--navy-muted`, `--orange-dim`, `--orange-border` added to App.css in Task 2 — all referenced in later tasks.

**Placeholder scan:** No TBDs, no "add appropriate" wording. All code blocks complete.
