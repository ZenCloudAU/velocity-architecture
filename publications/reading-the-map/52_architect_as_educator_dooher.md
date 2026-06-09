# Chapter 52: The Architect as Educator — Dooher

*Part 7 · The Practitioner's Compass*

---

The second practitioner argument extends the first. If de Visscher says the architect's job is connection rather than control, Vince Dooher says the deepest form of that connection is *teaching* — that enterprise architecture is, underneath its frameworks and diagrams, a teaching profession in disguise, and that the architect who teaches achieves what the architect who polices cannot.

Dooher is also, in the framing of this book, the target author of its foreword — which is fitting, because his argument is in many ways the book's own. *Reading the Map* exists to teach the territory to people who will never be examined on it, on the premise that an educated organisation makes better decisions than a governed one. This chapter sets out the argument that the book embodies.

---

## The Intent Gap

Dooher's central concept is the **intent gap**: the distance between what was intended and what was understood. A board decides a direction. The decision travels down through layers of the organisation — to the architects, the programme leaders, the delivery teams — and at every handoff, something is lost. By the time the intent reaches the people building the thing, it has been compressed, reinterpreted, and stripped of the reasoning that gave it meaning. The teams build what they understood, which is not quite what was intended, and the gap between the two is where architecture failure lives.

The intent gap is not caused by incompetence or bad faith. It is caused by the ordinary attrition of meaning as it passes through people. Each handoff is a translation, and each translation loses the *why* — the reasoning, the constraints, the trade-offs that made the decision make sense. The teams inherit the *what* without the *why*, and so they cannot adapt the decision sensibly when reality diverges from the plan, because they do not understand what the decision was trying to achieve. They follow the letter and miss the intent, and the result is a faithfully-built wrong thing.

This reframes what architecture failure is. It is not usually a failure of the architecture — the design was often sound. It is a failure of *transmission* — the intent did not survive the journey to the people who realised it. And a transmission failure is, in essence, a teaching failure.

---

## Teaching Versus Correcting

Given the intent gap, there are two things an architect can do, and Dooher's argument is that one of them works far better than the other.

The architect can **correct** — review the work after it is built, catch the deviations from intent, and require them to be fixed. This is the policing model, and it is what governance-as-control naturally becomes. It works, after a fashion, but it works late and expensively: the deviation is caught after the effort to build the wrong thing has been spent, the correction is experienced as criticism, and the underlying cause — the team's lack of understanding of the intent — is untouched, so the next decision produces the same gap again. Correcting treats the symptom, repeatedly, forever.

Or the architect can **teach** — transmit not just the *what* but the *why*, so that the teams understand the intent well enough to realise it faithfully and, crucially, to adapt it sensibly when reality diverges. The taught team does not need to be corrected as often, because it builds the right thing the first time, and when the plan meets an unforeseen obstacle, it can improvise in the direction of the intent rather than against it. Teaching addresses the cause: it closes the intent gap at the source by giving the teams the understanding the policing model never transmits.

The difference compounds. The policing architect is a bottleneck whose capacity to catch deviations limits the organisation — every piece of work must pass through their review. The teaching architect is a **force multiplier** whose understanding, transmitted, lets many teams build faithfully without review. One architect who teaches well makes a hundred people better at realising intent; one architect who only corrects can review only as much as they personally have time to inspect. This is why Dooher frames teaching not as a soft addition to the role but as the difference between an architecture function that scales and one that throttles.

---

## Dooher Applied to Meridian

*Meridian's intent gap is visible the moment you look for it, and the EA's growing effectiveness is, in Dooher's terms, a shift from correcting to teaching.*

*The intent gap shows up first in the principles. The EA establishes "no new bespoke integrations" as a principle, and a project promptly proposes a new bespoke integration (Chapter 28). The naive reading is that the project defied the principle. The Dooher reading is that the project never understood the *why* behind it — the principle arrived as a rule without its reasoning, so the team could not see that their proposal violated its intent, nor adapt their plan toward the intent. They had the what (no bespoke integrations) without the why (every point-to-point connection adds estate-wide fragility and cost). The intent gap, not defiance, produced the violation.*

*The correcting response would have been to catch the violation at the gate and block it — treating the symptom. The teaching response, which is what the EA's conditional-yes actually was, transmitted the why: in working through the exception, she explained the estate-wide cost the principle existed to prevent, so the team left understanding not just that bespoke integrations were discouraged but *why* — and the next time they faced an integration decision, they raised it early themselves, having internalised the intent. One teaching interaction did more than a dozen corrections would have, because it closed the gap rather than catching its consequence.*

*The largest illustration is the EA's realisation that her whole role was being reshaped by the intent gap. The previous rationalisation attempts had failed not only for want of governance but because each had issued directives — the what — without ever teaching the organisation the why, so the directives were followed mechanically until they became inconvenient and then abandoned. Her successful approach inverted this: she taught the organisation to see its own estate (the collaborative baseline of Chapter 50 is teaching), taught the board the language of architecture debt (Chapter 44 is teaching), taught the clinicians why identity mattered (Chapter 48's junior question succeeded because it taught the room). By twelve months, her function's influence rested far more on what the organisation now understood than on what she had the authority to enforce. She had become, in Dooher's sense, an educator — and the organisation made better decisions because it understood, not because it was governed.*

---

## Why This Book Is a Dooher Argument

It is worth being explicit that *Reading the Map* is itself an instance of Dooher's thesis, because the connection illuminates both.

The book does not teach you to be an architect. It teaches you to *understand the territory architects work in* — the intent behind the frameworks, the why beneath the diagrams, the reasoning under the vocabulary — on the premise that an educated participant makes better decisions and better contributions than an uneducated one, regardless of their title. It is an attempt to close the intent gap at the scale of a whole profession: to transmit not just what enterprise architecture does but why, so that everyone in IT can realise architectural intent faithfully and contribute to it sensibly, without first being examined.

This is why the book grounds every abstraction in Meridian, explains the reasoning behind every concept, and refuses to prescribe a single path — because teaching, in Dooher's sense, is the transmission of understanding that lets the learner adapt to their own reality, not the issuing of rules to be followed. The book is built as the architect-as-educator would build it, because that is what it is arguing the discipline should be.

---

## Translator Panel

> **The policing model says:** "The architect reviews delivery to ensure compliance with the architecture."
>
> **What that means:** The architect catches deviations after the fact and requires fixes. It works late and expensively, treats the symptom rather than the cause, and makes the architect a bottleneck whose review capacity limits the organisation. The intent gap that produced the deviation is left intact, so the next decision reproduces it.

> **Dooher's view says:** "Close the intent gap by teaching the why, not just the what."
>
> **What that means:** Transmit the reasoning behind a decision, not just the decision, so teams build faithfully and adapt sensibly when reality diverges. The taught architect is a force multiplier whose understanding scales across many teams, rather than a bottleneck whose corrections are limited to what they can personally inspect.

---

## The Key Idea

Vince Dooher argues that enterprise architecture is a teaching profession in disguise, and that its central problem is the intent gap — the distance between what was intended and what was understood, created by the ordinary attrition of meaning as a decision passes through the people who must realise it. Each handoff loses the why, so teams inherit the what without the reasoning, build a faithfully-wrong thing, and cannot adapt sensibly when reality diverges. Faced with this gap, the architect can correct — police the work after the fact, treating the symptom late and expensively while remaining a bottleneck — or teach, transmitting the why so teams build faithfully the first time and become a force the architect multiplies rather than a queue the architect inspects. Meridian shows the shift from correcting to teaching as the source of the architect's growing effectiveness, and this book is itself a Dooher argument: an attempt to close the intent gap at the scale of a profession by teaching the territory's why to everyone, regardless of title.

**Next:** Chapter 53 takes the third practitioner's argument — Graham Davis on what AI does to the capability model, and what architecture looks like when AI becomes a first-class participant rather than a tool.

---

## Further Reading

- **Vince Dooher — writing on the intent gap and architecture as education** (search his published work and talks): The argument in the author's own words. Dooher is, in this book's framing, the target foreword author, and his thesis is closest to the book's own purpose.
- **Richard Elmore — on instructional leadership** (Harvard Graduate School of Education): The education-research foundation for why transmitting the why outperforms enforcing the what — directly transferable from the classroom to the architecture function.
- **L. David Marquet — Turn the Ship Around!** (Portfolio, 2013): A submarine captain's account of replacing a give-orders model with a transmit-intent model, and the dramatic improvement in outcomes. The clearest practical demonstration of teaching-over-correcting in a high-stakes operational setting.
