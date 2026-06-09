# Chapter 47: How to Read an Architecture Conversation

*Part 6 · Navigating the Territory*

---

The diagrams in Part 4 are artefacts you can study at your own pace. An architecture conversation is not. It moves in real time, the vocabulary is dense, several people are pursuing different agendas at once, and the real decision is often not the one named on the agenda. Following such a conversation — knowing what is actually being discussed, where the decision sits, and how to track the argument without understanding every term — is its own skill, and this chapter teaches it.

We do it by transcribing and annotating a Meridian architecture review meeting. The transcript is unremarkable; the annotation is the lesson. Reading a conversation well means hearing the second layer underneath the words.

---

## A Conversation Has Layers

Every architecture conversation runs on at least two layers at once. The **surface layer** is the literal content — the systems, the options, the technical points. The **decision layer** is what is actually being settled — which option will be chosen, what is being traded against what, whose concern will prevail. Beginners track only the surface and get lost; skilled readers track the decision layer and use the surface as evidence for where the decision is heading.

There is often a third layer, the **positional layer** — what each participant is doing for reasons of role, interest, or politics, regardless of the technical merits. The infrastructure lead defending a position partly because his team would own the consequence; the clinician raising safety partly because safety is her accountability. Reading this layer is the organisational-life skill from Chapter 32, applied in real time.

The reader's task is to keep all three in view: what is literally being said, what is actually being decided, and what each person is doing. You do not need to understand every technical term to track the decision and positional layers — and those are usually where the meeting's real outcome is determined.

---

## What Each Contribution Is Doing

A useful habit is to listen to each contribution not only for its content but for its *function* — what move it is making in the conversation. Most contributions are doing one of a few things.

Some are **proposing** — putting an option on the table. Some are **objecting** — raising a problem with an option. Some are **reframing** — changing what the conversation is about, which is the most powerful and least noticed move. Some are **clarifying** — surfacing an assumption or definition. Some are **deferring** — pushing a decision to later (which, per Chapter 30, is itself a decision with a cost). And some are **positioning** — protecting an interest under the cover of a technical point.

Hearing the function rather than just the content lets you follow a conversation whose vocabulary you only partly understand. You may not grasp every technical detail of an objection, but you can hear *that* it is an objection, register what it is objecting to, and watch whether it is answered or absorbed. The structure of the argument is legible even when the content is not, and the structure is usually what determines the outcome.

---

## Meridian's Architecture Review, Annotated

*A Meridian ARB meeting on the integration platform selection. The transcript is condensed; the annotations in brackets read the layers.*

**EA:** "We've defined the integration ABB — the requirement is reliable, monitored, safely-degrading data movement across the clinical systems. Two products meet it on paper. I want to focus today on how they differ on safe degradation."
*[Proposing, and reframing. Notice she has narrowed the conversation from "which product?" to "how do they differ on the one requirement that matters most." Whoever frames the question shapes the answer; she has just made safe degradation the deciding criterion.]*

**Infrastructure lead:** "Product A is cheaper and we already have the skills for it. I'd be cautious about taking on a new platform we'd have to learn."
*[Positioning as much as proposing. The technical points — cost, skills — are real, but the contribution is also defending his team's comfort and ownership. Note he has not engaged with the safe-degradation framing; he is trying to shift the criterion back to cost and familiarity.]*

**EA:** "Both fair. On safe degradation specifically — what happens to a patient record in flight when the connection drops?"
*[Clarifying, and holding the frame. She acknowledges his points without conceding the criterion, and pulls back to the requirement. This is the quiet contest of the meeting: which criterion decides.]*

**Clinician:** "If a record can be silently lost, that's the thing I can't accept. We've had near-misses from exactly that."
*[Objecting, and positioning — legitimately. Safety is her accountability. Crucially, her contribution converts the EA's technical criterion into a patient-safety criterion, which is much harder to argue against. The decision layer has just shifted decisively.]*

**Infrastructure lead:** "Product A can be configured to handle that, I think."
*["I think" is the tell. This is a weakening objection — a retreat from "cheaper and familiar" to "probably adequate on the criterion that now matters." The positional move has lost its ground.]*

**EA:** "That's the thing to test, then. Let's make safe degradation a pass/fail in the evaluation rather than a scored item, given it's a safety issue. Agreed?"
*[Reframing into a decision. She has converted the discussion into a concrete decision rule — pass/fail on safety — that encodes the clinician's concern. The meeting's real outcome is this rule, not the eventual product choice, because the rule determines the choice.]*

*Read on the surface layer, this meeting "discussed two integration products." Read on the decision layer, it settled a far more consequential thing: that safe degradation would be a safety gate rather than one priced feature among many — which effectively decided the outcome before either product was tested. Read on the positional layer, it shows the infrastructure lead's cost-and-familiarity position being out-competed not by a better technical argument but by the reframing of the criterion into patient safety, against which "cheaper and familiar" could not prevail. A reader who tracked only the surface would have missed all of it.*

---

## Following Without Understanding Everything

The liberating message of this chapter is that you do not need to understand every term to follow an architecture conversation usefully — you need to track the structure.

When a term goes past that you do not know, do not stop to decode it and lose the thread. Note its function instead: was it part of a proposal, an objection, a reframe? Hold the unknown term as a labelled box — "some technical thing that is being objected to" — and keep following the decision layer. Very often the term's meaning becomes clear from how it is used, and even when it does not, the decision proceeds on the structure, which you can follow regardless.

The questions to keep live in your head as you listen: *What is actually being decided here, underneath the topic on the agenda?* *Where is the real disagreement — and is it technical or positional?* *Whose criterion is winning, and who reframed the question to make it win?* *What got deferred, and what will the deferral cost?* These are answerable without a complete grasp of the vocabulary, and answering them is what it means to read a conversation rather than merely sit through it.

And when you can answer them, you are positioned to contribute — which is the subject of the two chapters that follow.

---

## Translator Panel

> **On the surface, people say:** "We're choosing between two integration products."
>
> **What that means:** That is the agenda topic. The actual decision is often something else — in the Meridian case, whether safe degradation is a safety gate or a priced feature, which decided the product choice before any product was tested. Reading the conversation means finding the real decision under the stated topic.

> **A skilled reader thinks:** "Who just reframed the question, and whose criterion is now deciding?"
>
> **What that means:** They are tracking the decision and positional layers — watching for the reframing move that quietly determines the outcome, and noticing when a technical point is really a positional one. This is followable even when the technical vocabulary is only half-understood, because the structure of the argument is separate from its content.

---

## The Key Idea

An architecture conversation runs on layers: the surface layer of literal technical content, the decision layer of what is actually being settled, and the positional layer of what each participant is doing for reasons of role and interest. Beginners track only the surface and get lost; skilled readers track the decision and positional layers and treat the surface as evidence. The key technique is to hear each contribution's function — proposing, objecting, reframing, clarifying, deferring, positioning — because the structure of the argument is legible even when the vocabulary is not, and reframing is the most powerful and least noticed move, since whoever sets the deciding criterion usually decides the outcome. You do not need to understand every term to follow a conversation usefully; you need to keep four questions live — what is really being decided, where the real disagreement is, whose criterion is winning and who reframed it to win, and what got deferred at what cost.

**Next:** Chapter 48 turns following into contributing, with the questions that demonstrate architectural thinking regardless of your title.

---

## Further Reading

- **Edgar Schein — Humble Inquiry** (Berrett-Koehler, 2nd ed. 2021): On the art of listening for what is really being said and asking the question that surfaces it — the conversational discipline underneath reading the decision layer.
- **Chris Argyris — "Teaching Smart People How to Learn"** (Harvard Business Review, 1991): On the gap between what people say in a meeting and what is actually driving the discussion — the positional layer, named and dissected.
- **Douglas Stone, Bruce Patton & Sheila Heen — Difficult Conversations** (Penguin, 3rd ed. 2023): On the multiple simultaneous layers in any consequential conversation — the content, the feelings, the identity stakes — which maps directly onto the surface/decision/positional reading this chapter teaches.
