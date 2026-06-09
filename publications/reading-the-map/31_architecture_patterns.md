# Chapter 31: Architecture Patterns

*Part 3 · The Core Concepts*

---

When an experienced architect looks at a tangle of systems and says, almost immediately, "this is a hub-and-spoke problem" or "you've got an accidental point-to-point mesh here," they are not performing intuition. They are recognising a **pattern** — a recurring shape that has been seen and named before, that comes with a known set of strengths, weaknesses, and failure modes. Pattern recognition is what lets an architect move quickly from "this is a mess" to "this is a specific *kind* of mess, and here is what usually goes wrong with it."

This chapter introduces architecture patterns as a recognition vocabulary. The goal is not to teach you to design with patterns — that is practitioner work — but to teach you to *read* them: to recognise the common shapes when they appear, to know what questions each one prompts, and to understand that naming the pattern you are looking at tells you what its known failure modes are.

---

## What a Pattern Is

A pattern is a reusable solution to a recurring problem in a context. The idea came into software from building architecture, via Christopher Alexander, and then into enterprise architecture from software. At every level the core idea is the same: certain problems recur, certain shapes of solution recur, and capturing the recurring shape — with its trade-offs — lets each new team benefit from the accumulated experience of every team that met the problem before.

A pattern is not a template you copy. It is a named shape with documented consequences. The value is less in the shape itself than in the consequences attached to it: when you recognise that you are looking at a particular pattern, you inherit the whole history of what tends to go right and wrong with it. The name is a handle on a body of experience.

This is why pattern literacy is so useful to a non-architect. You do not need to be able to implement a pattern to benefit from recognising one. Recognising that an integration approach is "point-to-point" immediately tells you to ask about the number of connections and what happens when one breaks — because those are the known failure modes of that pattern, and the pattern's name is what surfaces them.

---

## The Common Enterprise Patterns

A handful of patterns recur often enough across enterprise estates that recognising them covers most of the ground a reader will encounter.

**Point-to-point integration.** Each system connects directly to each other system that it needs to exchange data with. Simple for any single connection, disastrous in aggregate: the number of connections grows roughly with the square of the number of systems, and each connection is a dependency that can break. The known failure mode is the unmanageable mesh — exactly Meridian's 34 integrations. Recognising this pattern prompts the question: *how many connections, and how do we change one system without breaking the others?*

**Hub-and-spoke.** Systems connect not to each other but to a central hub that mediates all exchange. This collapses the connection count and centralises management, monitoring, and error handling. The trade-off is that the hub becomes critical — if it fails, everything fails — and it can become a bottleneck. Recognising hub-and-spoke prompts: *what happens when the hub is down, and is it sized for the load?*

**Event-driven.** Systems communicate by emitting and reacting to events rather than calling each other directly. This decouples systems — a producer does not need to know who consumes its events — and scales well, but it makes the overall flow harder to trace and reason about. The known failure mode is the system whose behaviour nobody can fully follow because it is distributed across many independent reactions. Recognising it prompts: *how do we trace what happens when an event fires, and how do we debug it?*

**Microservices.** A large application is decomposed into many small, independently deployable services. This buys flexibility and independent scaling at the cost of operational complexity and the network sitting between every formerly-internal call. The known failure mode is distributed complexity — a hundred small services that are individually simple and collectively incomprehensible. Recognising it prompts: *what is the operational cost of running this many services, and where are the failure boundaries?*

**API-first.** Capabilities are exposed through well-defined, stable interfaces (APIs) before and independently of the applications that consume them. This enables reuse and clean integration, and it is the healthy answer to the point-to-point problem. Recognising it prompts: *who owns the API, how is it versioned, and what happens to consumers when it changes?*

**Data mesh.** Data is owned and served by the domains that produce it, as products, rather than centralised in one warehouse. It addresses the bottleneck of a single central data team but requires real domain ownership and governance to work. Recognising it prompts: *do the domains actually have the ownership and discipline this pattern assumes?*

---

## Patterns Carry Their Failure Modes

The single most useful thing about patterns, for a reader, is that each one comes with its characteristic way of going wrong. Knowing the pattern is knowing the failure mode to watch for.

Point-to-point fails by proliferation. Hub-and-spoke fails by central-point fragility. Event-driven fails by untraceable flow. Microservices fail by operational sprawl. API-first fails by breaking changes that ripple to unknown consumers. Data mesh fails when the domain ownership it assumes does not actually exist.

This means that naming a pattern is also diagnosing a risk. When someone proposes solving Meridian's integration problem by building a hub, the experienced response is not "good" or "bad" but "so the hub becomes critical — what is our resilience plan for it?" The pattern name surfaces the question that matters. An architect who cannot name the failure mode of the pattern they are proposing has not finished thinking about it.

---

## Meridian's Integration Problem, Named

*Meridian's integration estate is a textbook case of one pattern that needs to become another, and naming the patterns clarifies the whole programme.*

*The current state is an accidental point-to-point mesh. Nobody designed it as a pattern; it emerged, connection by connection, each added because it was the quickest way to move data at the time. But it is unmistakably the point-to-point pattern, and naming it as such immediately imports the known consequences: the connection count is unmanageable, every change is high-risk, and a broken connection fails silently. The EA does not need to discover these problems by investigation — recognising the pattern predicts them.*

*The target, defined as the integration ABB in Chapter 29, is essentially a move to hub-and-spoke with API-first characteristics: a central integration platform that mediates exchange, with systems exposing stable interfaces rather than wiring directly to each other. Naming the target pattern also imports its failure mode — the hub becomes critical — which is precisely why the ABB specified safe degradation and robust monitoring. The resilience requirements that looked like good practice in Chapter 29 are revealed, in pattern terms, as the direct mitigation of hub-and-spoke's known weakness. The pattern vocabulary connects the requirement to the reason.*

*The insight the EA takes to the leadership team is expressible in one sentence once the patterns are named: "We are moving from an accidental point-to-point mesh, whose failure mode is silent breakage at scale, to a managed hub, whose failure mode is central-point fragility — so the investment is not just in the hub, it is in the hub's resilience." That sentence is far more useful than a diagram of 34 lines, and it is available only to someone who can name what they are looking at.*

---

## Reading Patterns in the Field

For a reader, patterns are a listening skill. In an architecture conversation, the patterns are often named explicitly — "we'll use an event-driven approach", "this is really a microservices question" — and recognising the name lets you follow the reasoning and ask the failure-mode question. When the pattern is *not* named but is clearly present, naming it yourself can be a genuine contribution: "isn't this effectively point-to-point? what happens when one of these connections breaks?" is a question that demonstrates architectural thinking without requiring architectural authority (a theme Chapter 48 develops).

The discipline is to treat every pattern as a package of trade-offs rather than a good or bad choice. There is no best pattern. There is the pattern suited to the problem, the constraints, and the organisation's capacity to operate it. Hub-and-spoke is right for Meridian not because it is superior to point-to-point in the abstract but because Meridian's specific problem — too many fragile connections, a need for central monitoring, a patient-safety requirement for detected failure — is exactly the problem hub-and-spoke solves and point-to-point creates.

---

## Translator Panel

> **Architects say:** "This is basically a hub-and-spoke pattern — we should consolidate the integrations through a platform."
>
> **What that means:** They have recognised the shape of the problem and are proposing a known solution with known trade-offs. The useful follow-up is always about the trade-off: hub-and-spoke centralises and simplifies, but it makes the hub critical, so what is the plan for when the hub fails?

> **Vendors say:** "Our platform is event-driven and microservices-based — it's the modern architecture."
>
> **What that means:** These are patterns, not virtues. Event-driven and microservices solve specific problems and create specific costs — distributed complexity and hard-to-trace flows. "Modern" is not a reason; the question is whether the problem you have is the problem these patterns solve, and whether you can operate the complexity they bring.

---

## The Key Idea

Architecture patterns are a recognition vocabulary — named, recurring shapes that carry documented consequences. Their value to a reader is not in designing with them but in reading them: recognising the common shapes (point-to-point, hub-and-spoke, event-driven, microservices, API-first, data mesh) and knowing that each one arrives with its characteristic failure mode. Naming a pattern is therefore also diagnosing a risk, because the name surfaces the question that matters — what happens when the hub fails, how do we trace the event flow, who owns the API when it changes. There is no best pattern, only the pattern suited to the problem and the organisation's capacity to operate it, and the most useful skill is to treat every pattern as a package of trade-offs rather than a verdict.

**Next:** Chapter 32 leaves the technical concepts behind and turns to the dimension the certification courses omit — how architecture actually operates inside the political and human life of an organisation.

---

## Further Reading

- **Gregor Hohpe & Bobby Woolf — Enterprise Integration Patterns** (Addison-Wesley, 2003): The definitive catalogue of integration patterns, including hub-and-spoke (the "message broker") and point-to-point. Two decades old and still the reference; the patterns have not changed.
- **Mark Richards & Neal Ford — Fundamentals of Software Architecture** (O'Reilly, 2020): The clearest modern survey of architectural styles — layered, event-driven, microservices, and others — each presented with its trade-offs, which is exactly the failure-mode framing this chapter advocates.
- **Christopher Alexander — A Pattern Language** (Oxford University Press, 1977): The origin of the pattern idea, from building architecture. Worth reading once to understand why a pattern is a shape-with-consequences rather than a template, and why the idea travelled so well into software.
