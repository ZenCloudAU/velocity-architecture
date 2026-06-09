# Chapter 34: How to Read a Capability Map

*Part 4 · Reading the Diagrams*

---

Part 4 rests on a single premise: you do not need to produce every diagram architects draw, but you need to be able to read them all. Diagram reading is a distinct skill from diagram production, and it is the more widely useful of the two. Most people in an organisation will never draw a capability map. Almost everyone will, at some point, sit in a meeting where one is on the screen — and the difference between following that meeting and nodding along blankly is the ability to read what the diagram is actually saying.

This chapter teaches the reading of the **capability map**, the artefact introduced conceptually in Chapter 18. We take Meridian's map and read it the way a literate practitioner would — element by element, until the picture becomes an argument.

---

## What a Capability Map Shows

A capability map is a structured picture of *what* an organisation does — its capabilities — independent of *how* it does them or *who* does them. A capability is a stable ability the organisation must have: "manage patient records", "schedule appointments", "manage the supply chain". Capabilities change slowly, which is what makes the map useful as a stable backdrop against which faster-changing things — applications, processes, projects — can be assessed.

The map is deliberately not an org chart and not a process diagram. The org chart shows who reports to whom; the process diagram shows the sequence of steps; the capability map shows the abilities, decoupled from both. This decoupling is the source of its power: capabilities outlast reorganisations and process changes, so a map built on them does not need redrawing every time the organisation moves a box or revises a workflow.

---

## The Anatomy: Layers and Levels

A capability map is organised into **levels** of decomposition. Level 1 capabilities are the handful of broad abilities that define what the organisation fundamentally does — for a health provider, things like "deliver clinical care", "manage patients", "manage resources". Each Level 1 capability decomposes into Level 2 sub-capabilities, which may decompose again into Level 3, and so on. The levels let the same map be read at the altitude appropriate to the audience: a board reads Level 1, a programme team reads Level 3.

Reading the levels correctly means resisting two errors. The first is mistaking a low-level capability for a high-level one — treating "operate the appointment-booking system" (which is really an application function) as if it were a business capability. The second is confusing the level you are looking at with the level the conversation needs. A boardroom argument conducted at Level 3 drowns in detail; a delivery decision made at Level 1 is too coarse to act on.

---

## Heat Mapping: What the Colours Mean

The capability map becomes a decision instrument when it is **heat-mapped** — each capability coloured to show its health against some criterion, most often a blend of strategic importance and current performance.

The convention is the traffic light. **Red** means a capability that matters and is performing poorly — a gap between importance and reality. **Amber** means a capability under strain or at risk — working now, fragile soon. **Green** means a capability that matters and is healthy. Some maps add grey or white for capabilities assessed as low importance, where performance matters less.

The crucial reading skill is understanding what the colour is and is not claiming. A red capability is not necessarily a broken system; it is a *business ability* that is not where it needs to be. The cause might be a failing application, but it might equally be a missing process, an absent data foundation, an unclear ownership, or a capacity shortfall. The colour names the symptom at the business level; it does not diagnose the cause. Reading a red cell as "we need to replace that system" is the most common misreading, and it leads to buying technology to fix problems that technology did not cause.

---

## Reading Meridian's Map Step by Step

*Meridian's capability map has eleven Level 1 capabilities, of which the heat map shows seven red or amber. Reading it properly means tracing from colour to cause.*

*Start at Level 1. "Manage patient information" is red. At board altitude, that single red cell is the headline: the organisation's most fundamental ability — knowing who its patients are and holding a trustworthy record of them — is not where it needs to be. A reader who stops at Level 1 knows the what but not the why.*

*Decompose to Level 2. "Manage patient information" breaks into sub-capabilities including "maintain patient identity", "maintain clinical record", and "share information across care settings". The heat map shows "maintain patient identity" as the deepest red. Now the reading sharpens: the problem is not the clinical record per se but the identity foundation beneath it — which connects directly to the data architecture finding (Chapter 19) that patient identity has no master. The map and the data assessment are telling the same story from different angles, and reading the map traces the board-level symptom down to the architectural cause.*

*Trace to the underlying layer. A well-constructed capability map links capabilities to the applications that support them. Following "maintain patient identity" downward reveals the dual EPR and the absent master — the application and data realities that make the capability red. The colour at Level 1 is now fully explained: it is red because, three levels down, identity has no owner and two systems hold conflicting records. The trace from red cell to root cause is the whole reading skill in miniature.*

*Read the pattern across the map, not just the cells. Seven of eleven Level 1 capabilities red or amber is itself a finding: this is not a localised problem in one capability but a systemic condition. And reading which capabilities are green is as informative as reading which are red — Meridian's clinical-care-delivery capabilities are largely green, which says the organisation is good at the medicine and weak at the information underneath it. That contrast is the map's real argument: Meridian does not have a clinical problem, it has an information problem wearing clinical clothing.*

---

## What the Gaps Tell You

The colours tell you where the problems are. The *gaps* — the capabilities that are missing, weak, or unowned — tell you something the colours alone do not.

A capability that is present but red is a known problem being managed badly. A capability that is *absent from the map entirely*, or present but owned by no one, is a problem the organisation has not yet recognised it has. The missing or unowned capability is the more dangerous, because nobody is accountable for it and nothing is being done about it. Reading a capability map for what is *not* there — or what is there but ownerless — is an advanced reading skill and frequently the most valuable one.

At Meridian, the most consequential gap is not a red cell but an ownership void: the identity capability has no owner, which is why no previous attempt to fix it stuck. The map makes the void visible by leaving an ownership field blank, and a literate reader notices the blank as readily as the colour.

---

## Translator Panel

> **Architects say:** "Seven of our eleven Level 1 capabilities are red or amber on the heat map."
>
> **What that means:** Of the eleven fundamental things the organisation must be able to do, seven are either performing poorly or at risk. This is a business statement, not a technology statement — it says the organisation's core abilities are compromised, and it invites the question of why, which is answered by tracing down the levels.

> **Executives say:** "So which systems do we need to replace to turn these green?"
>
> **What that means:** This is the common misreading — treating a business-capability problem as a technology-procurement problem. Some red cells will indeed point to a system, but others point to missing ownership, absent data, or broken process that no new system will fix. The map's value is precisely that it forces the diagnosis before the purchase.

---

## The Key Idea

A capability map shows what an organisation does, decoupled from how and who, organised into levels that let the same picture be read at board or programme altitude. Heat-mapping turns it into a decision instrument, but the colours name symptoms at the business level rather than diagnosing causes — a red capability is a business ability that is not where it needs to be, and reading it as "replace that system" is the classic error. The real reading skill is the trace: following a red Level 1 cell down through the levels to the application, data, process, or ownership reality that explains the colour. And the most valuable reading is often of what is not there — the missing or unowned capability that nobody is accountable for, which the map reveals as a blank where attention should be.

**Next:** Chapter 35 turns to the component diagram — how to read the systems, interfaces, and dependencies of an estate, and how to spot what has been deliberately or accidentally left out.

---

## Further Reading

- **Business Architecture Guild — BIZBOK Guide, Capability Mapping** (businessarchitectureguild.org): The authoritative treatment of capability modelling, levelling, and heat-mapping. Dense, but the definitive source for what a capability is and is not.
- **Ulrich Homann — "A Business-Oriented Foundation for Service Orientation"** (Microsoft, 2006): The early, influential articulation of capabilities as stable business building blocks — still one of the clearest explanations of why capability is the right unit of analysis.
- **Jeff Scott — capability-mapping writing** (various, Accelare/Forrester): Practical, readable guidance on building and using heat-mapped capability models for investment decisions, aimed at practitioners rather than theorists.
