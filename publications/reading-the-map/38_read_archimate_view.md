# Chapter 38: How to Read an ArchiMate View

*Part 4 · Reading the Diagrams*

---

ArchiMate is the visual language of enterprise architecture — the notation introduced in Chapter 8 as the standard way architects draw the enterprise. Its distinctive feature, and the source of both its power and its intimidating reputation, is that it shows the **business, application, and technology layers simultaneously**, in a single view, with the relationships between them made explicit. A well-drawn ArchiMate view lets you trace from a business capability, down through the application that delivers it, to the infrastructure it runs on — all on one page.

This chapter teaches you to *read* an ArchiMate view without requiring you to *produce* one, which is exactly the literacy most people need. You will not be drawing these. You will be sitting in rooms where they are on the screen, and the goal is to decode them confidently rather than nod past them.

---

## The Three Layers

ArchiMate organises the enterprise into three horizontal layers, conventionally stacked and often colour-coded.

The **business layer** (traditionally yellow) is the top — what the organisation does in business terms. Business services, processes, roles, and functions live here. "Provide community nursing", "manage a referral", "the community nurse role".

The **application layer** (traditionally blue) is the middle — the software that supports the business. Application components, application services, and the data they use live here. "The EPR", "the patient-record service", "the scheduling application".

The **technology layer** (traditionally green) is the bottom — the infrastructure the applications run on. Nodes, devices, system software, networks. "The cloud platform", "the database server", "the network".

The vertical relationship between the layers is the whole point. The business layer is *served by* the application layer, which is *served by* the technology layer. Reading vertically — top to bottom — traces a business need down to the infrastructure that ultimately fulfils it. This is what no other single diagram does, and it is why ArchiMate exists.

---

## Elements and Relationships

Within the layers, ArchiMate has many element types, but a reader does not need them all. A handful cover most views.

An **active element** does something — a business role, an application component, a technology node. A **behaviour element** is something done — a business process, an application service, a technology service. A **passive element** is something acted upon — a business object, a data object. The rough grammar is: active elements *perform* behaviours that *act on* passive elements. A nurse (active) performs a record-update process (behaviour) on a patient record (passive).

The **relationships** — the lines — carry as much meaning as the boxes, and reading them is where ArchiMate literacy lives. The most common are *serving* (one element provides something another uses), *assignment* (an active element is responsible for a behaviour), *realisation* (something concrete fulfils something abstract — an application service realises a business service), and *composition* (something is made of parts). You do not need to memorise the precise line styles; you need to know that the lines mean specific things and to ask, of any line, *what relationship is this, and which direction does the dependency run?*

---

## Reading Vertically: The Trace

The signature ArchiMate reading move is the **vertical trace** — picking a business element and following the relationships down through the layers to see everything it depends on.

This is enormously useful because it answers a question every other diagram answers only partially: *if this infrastructure fails, what business capability is affected?* — and its reverse: *this business capability matters; what does it actually depend on?* The vertical trace connects the boardroom's language (business capabilities) to the engine room's language (infrastructure) through the application layer that links them, and it does so visibly, in one picture.

Reading vertically also exposes **single points of failure that cross layers** — the database node at the bottom that, traced upward, turns out to support three application services that support five business processes. A risk invisible from inside any one layer becomes obvious when the layers are stacked and the lines are followed.

---

## Meridian's Community Nursing View

*Meridian's EA produces an ArchiMate view of the community nursing service specifically to give the leadership team something the capability map and component diagram could not: the whole vertical story on one page.*

*At the business layer sits the "community nursing" business service and the "manage patient caseload" business process, assigned to the "community nurse" role. This is the work, in business terms — what the service is for and who does it.*

*At the application layer, realisation relationships show what delivers the business process. And here the view tells an uncomfortable truth visibly: the "manage patient caseload" business process is realised partly by the EPR and partly by the community nursing caseload tool — the spreadsheet from Chapter 20. On the ArchiMate view, the spreadsheet appears as an application component with a realisation line up to a critical business process, which makes its status undeniable. The diagram refuses the polite fiction that "it's just a spreadsheet"; the line on the page says it realises a clinical business process, and therefore it is part of the architecture whether anyone likes it or not.*

*At the technology layer, serving relationships show what the applications run on. The EPR traces down to the aging on-premises infrastructure (the VMware estate); the caseload tool traces down to a shared file server with no resilience. Reading vertically, the EA can stand in front of the board and trace one line from "community nursing service" at the top to "unsupported file server" at the bottom, and say: this clinical service depends, through a spreadsheet, on a single unresilient file server, and if that server fails, community nurses lose their caseloads. No other diagram makes that sentence available so directly. The capability map showed the service was at risk; the component diagram showed the dependencies; only the ArchiMate view shows the whole chain from business need to fragile infrastructure in a single trace.*

*The view also does the reverse trace usefully. Asked "if we decommission the file server, what breaks?", the EA follows the serving lines upward and arrives, two layers up, at a clinical business process. The cross-layer trace turns an apparently routine infrastructure decision into a visible clinical-risk decision.*

---

## Reading Without Drowning

ArchiMate's reputation for being intimidating comes from views that try to show everything at once — dozens of elements, scores of relationships, every layer fully populated. These are genuinely hard to read, and the honest reader's response is not to pretend otherwise but to *narrow the question*.

The skill is to read a complex ArchiMate view by tracing a *single thread* rather than absorbing the whole. Pick the business element you care about. Follow its lines down one layer at a time. Ignore everything not on that thread. A view with sixty elements becomes legible the moment you stop trying to see all sixty and start following one path through them. The architect who drew it can see the whole; the reader only needs the thread relevant to the decision at hand.

If a view is so dense that even a single thread is hard to follow, that is legitimate feedback to give: "Could you show me just the trace from this capability down to its infrastructure?" A good architect can extract that thread, and the request demonstrates that you know what the view is for.

---

## Translator Panel

> **Architects say:** "This ArchiMate view shows the business service realised by these applications, served by this infrastructure."
>
> **What that means:** The diagram connects what the organisation does (top) to the software that does it (middle) to the kit it runs on (bottom), with the lines showing exactly how. "Realised by" and "served by" are specific relationship types — they mean the application fulfils the business service and the infrastructure supports the application. Following those lines is the whole skill.

> **Stakeholders say:** "This is too complicated, can someone just tell me what it means?"
>
> **What that means:** Usually the view is showing too much at once. The right response is not to give up but to narrow it: ask for the single trace from the capability you care about down to its infrastructure. ArchiMate's value is the vertical thread, and one thread at a time is readable even when the whole view is not.

---

## The Key Idea

ArchiMate is the notation that shows the business, application, and technology layers at once, with explicit relationships between them — and its defining value is the vertical trace, following a business element down through the application that realises it to the infrastructure that serves it. That trace answers questions no single-layer diagram can: what does this capability actually depend on, and if this infrastructure fails, what business service breaks? A reader does not need to memorise every element and line type; they need to know the lines carry specific meanings and to follow one thread at a time. Dense ArchiMate views become legible not by absorbing the whole but by narrowing to the single trace the decision requires — and the willingness to ask for that one trace is itself a mark of literacy.

**Next:** Chapter 39 turns to the Zachman grid — not a diagram you read in the usual sense, but a framework of perspectives, and how the same system looks genuinely different depending on which cell you view it through.

---

## Further Reading

- **The Open Group — ArchiMate 3.2 Specification** (opengroup.org): The full notation. You will not read it cover to cover, but the layer overview and the relationships summary are worth skimming so the line types stop being mysterious.
- **Gerben Wierda — Mastering ArchiMate** (R&A, 3rd ed. 2017): The best practitioner guide — opinionated, clear, and unusually honest about which parts of ArchiMate are useful and which are over-engineered. The chapters on relationships are the ones a reader benefits from most.
- **The Open Group — ArchiMate example models** (opengroup.org): Worked examples to practise the vertical trace on. Reading a few real views with the single-thread technique is the fastest way to build the literacy this chapter describes.
