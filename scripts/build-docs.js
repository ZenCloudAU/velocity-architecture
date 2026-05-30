#!/usr/bin/env node
// build-docs.js — Generate static HTML pages for all shareable Markdown documents
// Run from repo root: node scripts/build-docs.js

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const RAW_BASE = 'https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/';
const GITHUB_BASE = 'https://github.com/ZenCloudAU/velocity-architecture/blob/main/';

// Document manifest: [mdPath, outDir, title, eyebrow, description, backUrl, backLabel, section]
const DOCS = [
  // ── Research ──────────────────────────────────────────────────────────────
  [
    'research/vaf-where-the-frameworks-stop-may-2026.md',
    'research/vaf-where-the-frameworks-stop-may-2026',
    'VAF — Where the Frameworks Stop',
    'Working Paper · May 2026',
    'A decision-first analysis of where the major architecture and governance frameworks stop — and where VAF continues.',
    '../',
    'Research library',
    'Research',
  ],
  [
    'research/zencloud-trans-pacific-addendum-may-2026.md',
    'research/zencloud-trans-pacific-addendum-may-2026',
    'Trans-Pacific Architecture Addendum',
    'Working Paper · Addendum · May 2026',
    'ZenCloud addendum to the IT governance working paper, addressing trans-Pacific architecture practice and decision-making context.',
    '../',
    'Research library',
    'Research',
  ],
  [
    'research/01-artefact-true-purpose.md',
    'research/01-artefact-true-purpose',
    '01 — Artefact True Purpose',
    'Research Series · 01',
    'The first in a four-part research series examining the true purpose of EA artefacts and how they create value.',
    '../',
    'Research library',
    'Research Series',
  ],
  [
    'research/02-ea-value-metrics.md',
    'research/02-ea-value-metrics',
    '02 — EA Value Metrics',
    'Research Series · 02',
    'How enterprise architecture creates measurable value — metrics, evidence, and decision-system outcomes.',
    '../',
    'Research library',
    'Research Series',
  ],
  [
    'research/03-mvp-mlp-empirical.md',
    'research/03-mvp-mlp-empirical',
    '03 — MVP/MLP Empirical Evidence',
    'Research Series · 03',
    'Empirical evidence on Minimum Viable Product and Minimum Loveable Product outcomes in architecture-led delivery.',
    '../',
    'Research library',
    'Research Series',
  ],
  [
    'research/04-value-over-time.md',
    'research/04-value-over-time',
    '04 — Value Over Time',
    'Research Series · 04',
    'How architecture investment compounds value over time — evidence from public and enterprise delivery programmes.',
    '../',
    'Research library',
    'Research Series',
  ],
  [
    'research/EA-Artefacts-True-Purpose-Value-Metrics.md',
    'research/ea-artefacts-true-purpose-value-metrics',
    'EA Artefacts — True Purpose and Value Metrics',
    'Extended Paper',
    'Extended analysis of EA artefact true purpose and value metrics, synthesising the four-part research series.',
    '../',
    'Research library',
    'Research',
  ],
  [
    'research/MVP-MLP-Empirical-Evidence.md',
    'research/mvp-mlp-empirical-evidence',
    'MVP/MLP Empirical Evidence — Extended',
    'Extended Paper',
    'Extended empirical evidence on minimum viable and minimum loveable product outcomes in architecture-led programmes.',
    '../',
    'Research library',
    'Research',
  ],
  [
    'research/EA-Value-Over-Time-Analysis.md',
    'research/ea-value-over-time-analysis',
    'EA Value Over Time — Analysis',
    'Extended Paper',
    'Extended analysis of how enterprise architecture investment compounds organisational value over time.',
    '../',
    'Research library',
    'Research',
  ],
  [
    'research/SOURCES.md',
    'research/sources',
    'Sources and Bibliography',
    'Research · Bibliography',
    'Sources, citations, and bibliography for the Velocity Architecture Framework research programme.',
    '../',
    'Research library',
    'Research',
  ],

  // ── Publications — policy, operating models, engagement (root-level MDs) ──
  [
    'AI_AND_CLIENT_DATA_USAGE_POLICY.md',
    'publications/ai-and-client-data-usage-policy',
    'AI and Client Data Usage Policy',
    'Policy · ZenCloud',
    'ZenCloud policy governing the use of artificial intelligence tools and the handling of client data in delivery engagements.',
    '../',
    'Publication library',
    'Policy',
  ],
  [
    'ECOSYSTEM_OPERATING_MODEL.md',
    'publications/ecosystem-operating-model',
    'Ecosystem Operating Model',
    'Operating Model',
    'The ZenCloud–StudioSix–Velocity Architecture ecosystem operating model — how the firms collaborate, divide, and deliver.',
    '../',
    'Publication library',
    'Operating Model',
  ],
  [
    'PARTNER_ENGAGEMENT_MODEL.md',
    'publications/partner-engagement-model',
    'Partner Engagement Model',
    'Operating Model',
    'How ZenCloud and StudioSix partner to deliver architecture and design engagements.',
    '../',
    'Publication library',
    'Operating Model',
  ],
  [
    'SUBCONTRACTED_PARTNER_OPERATING_MODEL.md',
    'publications/subcontracted-partner-operating-model',
    'Subcontracted Partner Operating Model',
    'Operating Model',
    'Operating model for subcontracted partner delivery — roles, responsibilities, and engagement boundaries.',
    '../',
    'Publication library',
    'Operating Model',
  ],
  [
    'VELOCITY_EXECUTIVE_ARCHITECTURE_FASTSTART.md',
    'publications/velocity-executive-architecture-faststart',
    'Velocity Executive Architecture Fast Start',
    'Engagement · Fast Start',
    'The Velocity Architecture Fast Start — an executive-led architecture accelerator for time-critical delivery programmes.',
    '../',
    'Publication library',
    'Engagement',
  ],
  [
    'VELOCITY_ENTERPRISE_ENGAGEMENT_PACK.md',
    'publications/velocity-enterprise-engagement-pack',
    'Velocity Enterprise Engagement Pack',
    'Engagement',
    'The Velocity Architecture enterprise engagement pack — scope, approach, artefacts, and commercial terms.',
    '../',
    'Publication library',
    'Engagement',
  ],
  [
    'VELOCITY_ENTERPRISE_ONE_PAGER.md',
    'publications/velocity-enterprise-one-pager',
    'Velocity Enterprise One Pager',
    'Engagement · Summary',
    'One-page summary of the Velocity Architecture enterprise engagement for executive and procurement audiences.',
    '../',
    'Publication library',
    'Engagement',
  ],
  [
    'SLT_DISCOVERY_WORKSHOP_AGENDA.md',
    'publications/slt-discovery-workshop-agenda',
    'SLT Discovery Workshop Agenda',
    'Engagement · Workshop',
    'Agenda and facilitation guide for a Senior Leadership Team discovery workshop using the VAF decision system.',
    '../',
    'Publication library',
    'Engagement',
  ],
  [
    'VELOCITY_DECISION_MATURITY_ASSESSMENT.md',
    'publications/velocity-decision-maturity-assessment',
    'Velocity Decision Maturity Assessment',
    'Diagnostic · Assessment',
    'The Velocity Architecture decision maturity assessment — a structured tool for evaluating organisational decision system health.',
    '../',
    'Publication library',
    'Diagnostics',
  ],
  // Trans-Pacific alias under /publications/ (canonical is under /research/)
  [
    'research/zencloud-trans-pacific-addendum-may-2026.md',
    'publications/zencloud-trans-pacific-addendum-may-2026',
    'Trans-Pacific Architecture Addendum',
    'Working Paper · Addendum · May 2026',
    'ZenCloud addendum addressing trans-Pacific architecture practice and decision-making context for the Australian and Asia-Pacific market.',
    '../',
    'Publication library',
    'Research',
  ],

  // ── Diagnostics ────────────────────────────────────────────────────────────
  [
    'diagnostics/organisation-health-check.md',
    'diagnostics/organisation-health-check',
    'Organisation Health Check',
    'Diagnostic',
    'A structured organisation health check using the Velocity Architecture Framework diagnostic lenses.',
    '../',
    'Diagnostics',
    'Diagnostics',
  ],
  [
    'diagnostics/plain-language-guide.md',
    'diagnostics/plain-language-guide',
    'Diagnostics Plain Language Guide',
    'Guide · Diagnostics',
    'Plain language introduction to the Velocity Architecture diagnostics suite.',
    '../',
    'Diagnostics',
    'Diagnostics',
  ],
  [
    'diagnostics/decision-velocity-diagnostic.md',
    'diagnostics/decision-velocity-diagnostic',
    'Decision Velocity Diagnostic',
    'Diagnostic',
    'A diagnostic tool for assessing and improving decision velocity within architecture-led programmes.',
    '../',
    'Diagnostics',
    'Diagnostics',
  ],
  [
    'diagnostics/velocity_diagnostic_one_page.md',
    'diagnostics/velocity-diagnostic-one-page',
    'Velocity Diagnostic — One Page',
    'Diagnostic · Summary',
    'One-page summary version of the Velocity Diagnostic for executive and leadership audiences.',
    '../',
    'Diagnostics',
    'Diagnostics',
  ],

  // ── Guides ─────────────────────────────────────────────────────────────────
  [
    'guides/VAF-Practitioner-Operating-Manual.md',
    'guides/vaf-practitioner-operating-manual',
    'VAF Practitioner Operating Manual',
    'Guide · Practitioner',
    'The complete practitioner operating manual for the Velocity Architecture Framework — 18 artefacts, 3 layers each.',
    '../',
    'Guides',
    'Guides',
  ],
  [
    'guides/plain-language-guide.md',
    'guides/plain-language-guide',
    'Plain Language Guide',
    'Guide · Introduction',
    'A plain language introduction to the Velocity Architecture Framework for non-technical leadership and stakeholders.',
    '../',
    'Guides',
    'Guides',
  ],

  // ── Frameworks ─────────────────────────────────────────────────────────────
  [
    'frameworks/EA-Artefact-Type-Classification.md',
    'frameworks/ea-artefact-type-classification',
    'EA Artefact Type Classification',
    'Framework Reference',
    'Classification system for enterprise architecture artefact types within the Velocity Architecture Framework.',
    '../',
    'Frameworks',
    'Frameworks',
  ],
  [
    'frameworks/Architecture-at-the-Speed-of-the-Decision.md',
    'frameworks/architecture-at-the-speed-of-the-decision',
    'Architecture at the Speed of the Decision',
    'Framework · Core Principle',
    'The foundational principle of the Velocity Architecture Framework — architecture must move at the speed of the decision, not the calendar.',
    '../',
    'Frameworks',
    'Frameworks',
  ],
  [
    'frameworks/VAF-Compression-Map.md',
    'frameworks/vaf-compression-map',
    'VAF Compression Map',
    'Framework Reference',
    'The Velocity Architecture Framework compression map — how the six viewpoints compress into decision outputs.',
    '../',
    'Frameworks',
    'Frameworks',
  ],

  // ── Spec ───────────────────────────────────────────────────────────────────
  [
    'spec/FRAMEWORK-SPEC.md',
    'spec/framework-spec',
    'Framework Specification',
    'Specification · v1.0',
    'The formal specification for the Velocity Architecture Framework — conformance, viewpoints, correspondence, and governance.',
    '../',
    'Framework Spec',
    'Specification',
  ],
  [
    'repository/spec/VIEWPOINT-CATALOGUE.md',
    'spec/viewpoint-catalogue',
    'Viewpoint Catalogue',
    'Specification · Viewpoints',
    'Catalogue of the six VAF viewpoints — definitions, purpose, artefacts, and interrelationships.',
    '../',
    'Framework Spec',
    'Specification',
  ],
  [
    'repository/spec/CONFORMANCE-STATEMENT.md',
    'spec/conformance-statement',
    'Conformance Statement',
    'Specification · Conformance',
    'Conformance statement for the Velocity Architecture Framework — what it means to conform, and at what level.',
    '../',
    'Framework Spec',
    'Specification',
  ],
  [
    'repository/spec/CORRESPONDENCE-MATRIX.md',
    'spec/correspondence-matrix',
    'Correspondence Matrix',
    'Specification · Correspondence',
    'How the Velocity Architecture Framework viewpoints correspond to TOGAF, COBIT, and other major frameworks.',
    '../',
    'Framework Spec',
    'Specification',
  ],

  // ── Templates ──────────────────────────────────────────────────────────────
  [
    'tools/templates/VAF-EA-Artefact-Templates.md',
    'templates/vaf-ea-artefact-templates',
    'VAF EA Artefact Templates',
    'Templates · Full Set',
    'Complete set of Velocity Architecture Framework enterprise architecture artefact templates — all 18 artefacts.',
    '../',
    'Templates',
    'Templates',
  ],
  [
    'templates/adr.md',
    'templates/adr',
    'Architecture Decision Record Template',
    'Template · ADR',
    'VAF Architecture Decision Record template — structured format for capturing and communicating architecture decisions.',
    '../',
    'Templates',
    'Templates',
  ],
  [
    'templates/guardrail-canvas.md',
    'templates/guardrail-canvas',
    'Guardrail Canvas Template',
    'Template · VP1',
    'VAF Guardrail Canvas template — direction-setting artefact for establishing architecture guardrails.',
    '../',
    'Templates',
    'Templates',
  ],
  [
    'templates/pulse-briefing.md',
    'templates/pulse-briefing',
    'Pulse Briefing Template',
    'Template · VP5',
    'VAF Pulse Briefing template — rhythm and cadence artefact for architecture programme governance.',
    '../',
    'Templates',
    'Templates',
  ],
  [
    'templates/trade-off-matrix.md',
    'templates/trade-off-matrix',
    'Trade-Off Matrix Template',
    'Template · VP2',
    'VAF Trade-Off Matrix template — decision artefact for capturing and communicating architecture trade-offs.',
    '../',
    'Templates',
    'Templates',
  ],
];

// Shared CSS (matches existing static pages)
const CSS = `:root{--bg:#F1F5F9;--surface:#FFFFFF;--surface-2:#F8FAFC;--border:#E2E8F0;--text:#0F172A;--text-2:#475569;--text-3:#94A3B8;--orange:#E8630A;--orange-subtle:#FFF7ED;--navy:#1E3A5F;--navy-2:#162D4A;--r:10px;--shadow-md:0 4px 12px rgba(15,23,42,.08),0 2px 4px rgba(15,23,42,.04)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:auto}body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.65}a{color:var(--orange);text-decoration:none}a:hover{text-decoration:underline}nav{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;min-height:60px;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}.brand{font-family:'Playfair Display',serif;font-weight:700;color:var(--text)}.brand sup{font-size:.5rem;color:var(--orange);vertical-align:super}.nav-links{display:flex;gap:1.25rem;flex-wrap:wrap}.nav-links a{font-size:.85rem;color:var(--text-2)}.nav-cta{display:inline-block;padding:.45rem 1rem;background:var(--orange);color:#fff;font-size:.8rem;font-weight:500;text-decoration:none;border-radius:6px}.nav-cta:hover{background:#CC5508}@media(max-width:768px){.nav-links{display:none}.nav-cta{display:none}}main{max-width:980px;margin:0 auto;padding:3rem 2rem}.breadcrumb{font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.08em;color:var(--text-3);margin-bottom:1.5rem}.breadcrumb a{color:var(--text-3)}.breadcrumb a:hover{color:var(--orange)}.hero{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:2rem;box-shadow:var(--shadow-md);margin-bottom:1.5rem}.eyebrow{font-family:'DM Mono',monospace;font-size:.65rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--orange);display:block;margin-bottom:.75rem}h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3rem);line-height:1.1;margin-bottom:.75rem}.lead{color:var(--text-2);max-width:760px;line-height:1.65}.reader-actions{display:flex;flex-wrap:wrap;gap:.75rem;margin:1.5rem 0}.reader-actions a{display:inline-flex;align-items:center;min-height:36px;padding:0 .9rem;border:1px solid var(--border);border-radius:7px;background:var(--surface);font-size:.82rem;color:var(--text-2)}.reader-actions a.primary{background:var(--orange);border-color:var(--orange);color:#fff}.reader-actions a:hover{text-decoration:none;border-color:var(--orange);color:var(--orange)}.reader-actions a.primary:hover{background:#CC5508;color:#fff}.article{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:2.25rem;box-shadow:var(--shadow-md)}.loading,.error{font-family:'DM Mono',monospace;font-size:.85rem;color:var(--text-3)}.md{font-size:.96rem;color:var(--text-2);line-height:1.78}.md h1{font-family:'Playfair Display',serif;font-size:2.15rem;line-height:1.15;color:var(--text);margin-bottom:1rem}.md h2{font-family:'Playfair Display',serif;font-size:1.45rem;color:var(--text);margin:2.2rem 0 .8rem;padding-bottom:.5rem;border-bottom:1px solid var(--border)}.md h3{font-size:1.05rem;font-weight:700;color:var(--text);margin:1.6rem 0 .5rem}.md h4{font-family:'DM Mono',monospace;font-size:.75rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--orange);margin:1.25rem 0 .35rem}.md p{margin-bottom:1rem}.md strong{color:var(--text);font-weight:700}.md ul,.md ol{margin:0 0 1rem 1.4rem}.md li{margin-bottom:.35rem}.md blockquote{border-left:3px solid var(--orange);background:var(--orange-subtle);border-radius:0 6px 6px 0;margin:1.5rem 0;padding:.8rem 1.2rem;color:var(--text)}.md blockquote p{margin:0;font-style:italic}.md hr{border:none;border-top:1px solid var(--border);margin:2rem 0}.md table{width:100%;border-collapse:collapse;margin:1.2rem 0;display:block;overflow-x:auto}.md th,.md td{border:1px solid var(--border);padding:.55rem .75rem;text-align:left}.md th{background:var(--surface-2);font-family:'DM Mono',monospace;font-size:.68rem;color:var(--text-2);text-transform:uppercase}.md code{font-family:'DM Mono',monospace;font-size:.82em;background:var(--surface-2);border:1px solid var(--border);padding:.1em .4em;border-radius:3px}.md pre{background:var(--navy-2);border-radius:8px;padding:1.25rem 1.5rem;overflow-x:auto;margin-bottom:1.25rem}.md pre code{background:none;border:none;padding:0;font-size:.82rem;color:#E2E8F0;line-height:1.6}.md a{color:var(--orange)}.source{margin-top:1.5rem;font-family:'DM Mono',monospace;font-size:.72rem;color:var(--text-3)}footer{margin-top:3rem;background:var(--navy-2);color:rgba(226,232,240,.65);padding:2rem;border-radius:var(--r)}.footer-links{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1rem}.footer-links a{color:#cbd5e1;font-size:.8rem}@media(max-width:720px){nav{align-items:flex-start;padding:1rem}main{padding:2rem 1rem}.article,.hero{padding:1.25rem}}`;

function depthOf(outDir) {
  return outDir.split('/').length; // e.g. 'research/slug' → 2
}

function rootPrefix(depth) {
  return '../'.repeat(depth);
}

function generatePage(mdPath, outDir, title, eyebrow, desc, backUrl, backLabel, section) {
  const depth = depthOf(outDir);
  const root = rootPrefix(depth);
  const faviconPath = root + 'favicon.svg';
  const homeUrl = root + 'index.html';
  // Breadcrumb: compute section display
  const sectionSlug = outDir.split('/')[0]; // e.g. 'research'
  const sectionLabel = sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1);
  const sectionUrl = root + sectionSlug + '/';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Velocity Architecture Framework™</title>
<meta name="description" content="${desc}">
<link rel="icon" type="image/svg+xml" href="${faviconPath}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>
<style>
${CSS}
</style>
</head>
<body>
<nav>
  <a class="brand" href="${homeUrl}">Velocity Architecture Framework<sup>™</sup></a>
  <div class="nav-links">
    <a href="${homeUrl}">Framework</a>
    <a href="${root}research/">Research</a>
    <a href="${root}publications/">Publications</a>
    <a href="${root}guides/">Guides</a>
    <a href="https://github.com/ZenCloudAU/velocity-architecture" target="_blank" rel="noopener">GitHub</a>
  </div>
  <a href="https://velocityarchitectureframework.com/app/portal.html" class="nav-cta" target="_blank" rel="noopener">Open agent ↗</a>
</nav>
<main>
  <div class="breadcrumb">
    <a href="${homeUrl}">Velocity Architecture Framework</a> ›
    <a href="${sectionUrl}">${sectionLabel}</a> ›
    ${title}
  </div>
  <section class="hero">
    <span class="eyebrow">${eyebrow}</span>
    <h1>${title}</h1>
    <p class="lead">${desc}</p>
  </section>
  <div class="reader-actions">
    <a class="primary" href="${backUrl}">← ${backLabel}</a>
    <a href="${homeUrl}">Velocity Framework</a>
    <a href="https://www.zencloud.com.au/" target="_blank" rel="noopener">ZenCloud Advisory</a>
    <a href="https://github.com/ZenCloudAU/velocity-architecture/blob/main/${mdPath}" target="_blank" rel="noopener">View source ↗</a>
  </div>
  <article class="article" id="article"><p class="loading">Loading document…</p></article>
  <p class="source">Source of truth: <a href="${GITHUB_BASE}${mdPath}" target="_blank" rel="noopener">GitHub Markdown</a></p>
  <footer>
    <strong>ZenCloud advises. StudioSix produces. Velocity decides.</strong>
    <div class="footer-links">
      <a href="${sectionUrl}">${sectionLabel}</a>
      <a href="${homeUrl}">Velocity Framework</a>
      <a href="https://www.zencloud.com.au/" target="_blank" rel="noopener">ZenCloud Advisory</a>
      <a href="https://studiosix.com.au/" target="_blank" rel="noopener">StudioSix</a>
      <a href="https://github.com/ZenCloudAU/velocity-architecture" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </footer>
</main>
<script>
const SRC='${RAW_BASE}${mdPath}';
async function load(){
  const el=document.getElementById('article');
  try{
    const r=await fetch(SRC);
    if(!r.ok)throw 0;
    el.innerHTML='<div class="md">'+marked.parse(await r.text())+'</div>';
  }catch{
    el.innerHTML='<p class="error">Could not load document. <a href="${GITHUB_BASE}${mdPath}" target="_blank" rel="noopener">View on GitHub ↗</a></p>';
  }
}
load();
</script>
</body>
</html>`;
}

let created = 0;
let skipped = 0;

for (const [mdPath, outDir, title, eyebrow, desc, backUrl, backLabel, section] of DOCS) {
  const fullOutDir = path.join(REPO_ROOT, outDir);
  const outFile = path.join(fullOutDir, 'index.html');

  // Don't overwrite existing handcrafted pages
  if (fs.existsSync(outFile)) {
    console.log(`SKIP  ${outDir}/index.html (exists)`);
    skipped++;
    continue;
  }

  // Verify source MD exists
  const fullMdPath = path.join(REPO_ROOT, mdPath);
  if (!fs.existsSync(fullMdPath)) {
    console.log(`WARN  ${mdPath} — source file not found, skipping`);
    continue;
  }

  fs.mkdirSync(fullOutDir, { recursive: true });
  const html = generatePage(mdPath, outDir, title, eyebrow, desc, backUrl, backLabel, section);
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`CREATE ${outDir}/index.html`);
  created++;
}

console.log(`\nDone. Created: ${created}, Skipped (exists): ${skipped}`);
