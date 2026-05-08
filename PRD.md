# Second Brain Product Requirements

Date: 2026-05-08

## Product Summary

Second Brain is an elderly-first, post-AGI cognitive wellness co-pilot for healthy aging. It protects human cognitive agency in a world where AGI can remember, write, plan, decide, and socialize on a user's behalf.

The product should be designed for older adults from the start: voice-first commands, large readable text, simple confirmation flows, low typing burden, and caregiver/clinician review surfaces. The hackathon MVP demonstrates a full support loop: a role-played elderly persona, daily companion interaction, synthetic longitudinal cognitive-behavioral data, cognitive-domain trend interpretation, and a clinician/caregiver dashboard that shows cognitive performance trends and necessary notices.

Second Brain gathers information from consented personal context sources rather than biological screening. Future integrations may include email, calendar, maps/location patterns, payment history, music or media habits, IoT vital signs, photo galleries or smart glasses, meal records, and conversation context. These data sources help the AGI assistant understand what the user says, does, eats, visits, buys, listens to, and remembers across daily life.

The future product vision expands this into a wellness and clinical-support platform for older adults, especially people at elevated risk of cognitive decline or early mild cognitive impairment.

Second Brain is not a diagnostic system. It identifies changing cognitive-support needs and recommends human-reviewed support actions.

## Problem Statement

Thailand is entering an aged society. National Statistical Office data reported about 13.7 million older persons in 2024, or 20.8% of the population. WHO Thailand also describes Thailand's rapid aging shift, with older persons projected to reach about 31% of the population by 2040.

As people age, cognitive abilities tend to decline in ways that affect daily function. Age-related decline can involve short-term memory, prospective memory, attention, processing speed, language, executive function, judgment, orientation, and social cognition. These changes can make everyday life harder: taking medication, writing messages, managing money, navigating appointments, understanding social cues, and staying connected with family.

Loss of cognitive function does not affect only the older adult. It also increases emotional, logistical, and financial burden for caregivers, children, clinicians, and communities. Families may notice repeated questions, unsafe decisions, missed routines, suspicious financial behavior, or reduced social understanding before formal clinical assessment occurs.

Current research already shows why AI-mediated cognition may create risk. Cognitive offloading research describes how people reduce internal cognitive demand by relying on external tools. Microsoft Research's CHI 2025 study of knowledge workers found that higher confidence in generative AI was associated with less critical-thinking effort during AI-assisted tasks. MIT Media Lab's 2025 "Your Brain on ChatGPT" study reported different neural and behavioral patterns across brain-only, search-assisted, and LLM-assisted essay writing, with LLM use associated with weaker overall brain connectivity in that task. These studies do not prove that AI causes clinical cognitive decline, but they show a plausible mechanism: when tools do more remembering, writing, planning, and reasoning, humans may practice those functions less.

In a post-AGI world, this risk becomes broader and more serious. People will increasingly offload memory, planning, writing, decision-making, and companionship to AGI systems. Cognitive performance decline may accelerate in proportion to dependency on AI, especially when AGI becomes the default answerer, planner, writer, and social companion. This problem can affect the general population, including younger users, but it is most urgent for older adults because age-related cognitive decline and functional vulnerability already exist.

For older adults and people at elevated risk of cognitive decline, this is especially serious. A person may appear to manage medication, messages, schedules, finances, or family communication well because their AGI agent is doing more of the work. Traditional self-report and functional assessment may become less reliable when AGI assistance is invisible.

The user needs a system that preserves useful cognitive effort, detects when AGI is masking declining autonomy, and turns daily interaction patterns into actionable, human-reviewed support recommendations.

## Solution

Second Brain sits as a wellness and safety layer between the user and their AGI agent. The AGI assistant acts as a context-aware helper that understands what is going on with the user: what they say, what they do, where they go, what routines they complete, what they eat, which people they interact with, and how much help they need from AGI over time.

Second Brain monitors the user's interaction patterns, estimates how much cognitive work is being performed independently versus delegated to AGI, and inserts calibrated cognitive friction when appropriate.

The system uses four post-AGI mechanisms:

1. Cognitive Friction Layer: Before AGI completes recall, planning, summarization, or communication work, Second Brain inserts an adaptive retrieval attempt, hint, question, or planning prompt.
2. Reality Anchor: AGI logs become ground truth for reorientation. Instead of simply answering from logs, Second Brain scaffolds recall and measures the gap between user memory and reality.
3. Capability Inflation Detector: Second Brain tracks the ratio of autonomous to AGI-assisted task completion across domains such as memory, planning, language, finance-like tasks, and daily routines. For example, when the user asks AGI to write a letter, Second Brain can compare the user's own draft with the AGI-assisted version to estimate changes in vocabulary, sentence complexity, word-finding, and pragmatic completeness.
4. AGI Companion Boundary: Second Brain monitors whether AGI companionship supports wellbeing or begins replacing human connection, autonomy, and emotional resilience.

For the hackathon, the MVP uses synthetic AGI interaction logs and longitudinal behavioral data around a focused daily scenario, preferably medication routine support, to demonstrate the full loop. Future validation should focus on longitudinal cognitive, behavioral, functional, and clinical-context datasets.

## MVP Goals

- Demonstrate why cognitive wellness changes in a post-AGI era.
- Show how AGI can both mask cognitive decline and help detect/prevent it.
- Let the demo user role-play as one of three elderly personas with different cognitive and social contexts.
- Demonstrate an adaptive daily companion interaction that encourages recall before answering.
- Demonstrate the Cognitive Friction Layer stepping up clues when the user cannot answer immediately.
- Generate cognitive-domain trends from synthetic longitudinal interaction data.
- Include a validation-readiness view with the stated future objective: "Validate cognitive-domain trend signals against real longitudinal clinical datasets."
- The validation-readiness view must map each synthetic signal to the kind of real-world longitudinal data needed to validate it later.
- Show a summarized trend page with specific domain changes, such as "short-term memory decreased by 4% over the last 3 months."
- Show a clinician/caregiver dashboard with cognitive performance trends, necessary notices, concise explanations, and support suggestions.
- Avoid diagnostic claims and frame outputs as support recommendations.

## MVP Personas

1. Persona A: Older adult with early MCI and family support. She used to live with her daughter, but the daughter now visits only occasionally. She has frequent memory problems, repeats questions, and struggles with medication routines.
2. Persona B: Older adult living alone with unrecognized decline. He believes he is functioning normally, but AGI interaction patterns suggest worsening decision-making, reduced judgment, and declining perception of social cues.
3. Persona C: Older adult who subjectively notices decline in financial management. She wants to preserve instrumental activities of daily living, especially personal accounting and basic investment decisions, even though these skills are getting worse.

## Future Product Goals

- Validate cognitive-domain trend signals against real longitudinal clinical datasets.
- Integrate real AGI activity logs across messages, schedules, notes, tasks, and companion interactions.
- Support configurable caregiver and clinician review workflows.
- Build privacy-preserving consent, data minimization, and auditability into all monitoring.
- Personalize cognitive friction intensity based on baseline cognition, stress, sleep, fatigue, illness, and user preference.
- Provide longitudinal wellness reports that help older adults preserve independence and purpose.

## Primary Users

- Older adult seeking to maintain independence and cognitive wellness.
- Early MCI or elevated-risk user who needs proactive cognitive support without losing agency.
- Family caregiver who wants concise, respectful insight into changing support needs.
- Clinician or cognitive-health professional who wants trend summaries, not raw surveillance data.
- Hackathon judge evaluating whether the concept is specific to the post-AGI era.

## User Stories

1. As an older adult, I want my AGI to prompt me to recall before answering, so that I keep using my memory in daily life.
2. As an older adult, I want the system to help me without embarrassing me, so that I feel supported rather than monitored.
3. As an older adult, I want easier days when I am tired or stressed, so that cognitive support does not feel punitive.
4. As an older adult, I want stronger cognitive prompts on good days, so that I preserve function through useful effort.
5. As an older adult, I want help during medication routines, so that I can stay independent and safe.
6. As an older adult, I want the system to ask me guiding questions before giving the answer, so that I can practice recall.
7. As an older adult, I want the system to use my past routine as context, so that support feels personal.
8. As an older adult, I want my AGI companion to encourage human connection, so that I do not become isolated.
9. As an older adult, I want to know when I am relying too much on AGI, so that I can choose to stay mentally active.
10. As an older adult, I want privacy controls over what caregivers and clinicians see, so that I remain in control of my data.
11. As an older adult, I want explanations in plain language, so that I understand why the system is changing its support.
12. As an older adult, I want the system to distinguish a bad day from a concerning trend, so that I am not over-alerted.
13. As an older adult, I want to use voice commands and see large text, so that the product is usable even if typing or reading small text is difficult.
14. As an older adult, I want the system to understand my routines from consented app and device data, so that support is based on my real life rather than generic reminders.
15. As an older adult, I want the system to summarize my cognitive performance trends, so that I can understand what is changing without reading technical data.
16. As a person with early MCI, I want daily tasks to become gentle cognitive practice, so that I preserve independence longer.
17. As a person with early MCI, I want reorientation support when I am confused, so that I can recover without panic.
18. As a person with early MCI, I want the system to scaffold memory from ground-truth logs, so that I can rebuild context.
19. As an older adult managing my own finances, I want Second Brain to support my accounting and basic investment decisions without taking over, so that I can preserve my instrumental ADL skills.
20. As a caregiver, I want concise trend summaries, so that I can understand changing support needs without reading raw logs.
21. As a caregiver, I want alerts only when trends persist or safety risk rises, so that I am not overwhelmed.
22. As a caregiver, I want to see necessary notices, so that I know when memory, judgment, or social-cue perception may need attention.
23. As a caregiver, I want the system to preserve the user's dignity, so that support does not feel controlling.
24. As a caregiver, I want to understand whether AGI is masking decline, so that I do not overestimate independence.
25. As a clinician, I want cognitive-domain trends, so that I can review memory, attention, language, orientation, social cognition, and executive-function changes.
26. As a clinician, I want each notice to be backed by behavioral evidence, so that I can judge whether it is clinically meaningful.
27. As a clinician, I want clear uncertainty language, so that the product does not imply diagnosis.
28. As a clinician, I want to see trend over time rather than isolated moments, so that I avoid overreacting to noise.
29. As a clinician, I want to know what may explain a change, such as sleep, stress, illness, medication, loneliness, or routine disruption, so that interpretation is contextual.
30. As a clinician, I want the product to separate baseline behavior from longitudinal change, so that short-term noise does not overdetermine the notice.
31. As a clinician, I want the system to generate review-ready summaries, so that I can use them during patient visits.
32. As a product team member, I want synthetic longitudinal data, so that the hackathon demo can show a trend without real clinical data access.
33. As a product team member, I want a clear data boundary, so that demo data is not mistaken for validated diagnostic evidence.
34. As a product team member, I want the demo to rely on AGI interaction and behavior data, so that the concept is specific to the post-AGI environment.
35. As a product team member, I want the daily companion scenario to be concrete, so that judges immediately understand the product.
36. As a hackathon judge, I want to see what is uniquely post-AGI, so that the project does not feel like ordinary digital health.
37. As a hackathon judge, I want to see the risk of AGI masking decline, so that the problem feels novel and urgent.
38. As a hackathon judge, I want to see the full loop from user interaction to dashboard trend summary, so that the product feels demo-able.
39. As a hackathon judge, I want the product to make ethical sense, so that monitoring does not feel exploitative.
40. As an AGI platform provider, I want agents to report assistance levels, so that downstream wellness tools can measure autonomy.
41. As an AGI platform provider, I want Second Brain to act as middleware, so that cognitive-preservation logic can work across tasks.
42. As a researcher, I want to compare autonomous and AGI-assisted outputs, so that masked language or planning decline can be detected.
43. As a researcher, I want to validate synthetic trends against longitudinal datasets, so that the product can move beyond hackathon claims.
44. As a future payer or care organization, I want support recommendations rather than diagnoses, so that the tool fits preventive wellness workflows.

## MVP Functional Requirements

### Daily Companion Interaction

- The MVP must show a user asking AGI for help during a daily task.
- The recommended demo scenario is medication routine support.
- The user interaction must support a voice-first elderly interface and large-text display mode.
- The demo interface must support hands-free speech input through a live voice model; the user should be able to speak without pressing a button.
- The frontend must synchronize with the dialogue by updating the active persona, current task clue, AI prompt, user response transcript, cue level, and trend signals as the conversation progresses.
- The AGI must not immediately complete the cognitive work.
- The system must ask at least one recall, recognition, sequencing, or planning prompt before answering.
- The prompt must be adaptive to the user's simulated cognitive state.
- The system must handle user speech that does not exactly match the expected demo dialogue while preserving the persona-specific cognitive-support purpose.
- The interaction must produce structured signals for downstream trend analysis.

### Cognitive Friction Layer

- The system must intercept at least three types of cognitive offloading requests: recall, planning, and summarization or communication.
- The system must choose from at least three intervention types: hint, retrieval prompt, and direct answer.
- If the user cannot answer immediately, the system must step up clues gradually: open recall, category hint, specific cue, multiple choice, then direct answer.
- The system must adjust friction intensity based on simulated context: healthy baseline, bad day, and concerning trend.
- The system must record whether the user succeeded independently, succeeded after hinting, or required direct assistance.
- The system must avoid blocking urgent or safety-critical help.

### Reality Anchor

- The system must show how AGI logs can provide ground truth about a recent event.
- The system must use the log to scaffold reorientation rather than only giving the answer.
- The system must capture the gap between user recall and logged reality.
- The system must convert recall gaps into longitudinal signals.
- The system must avoid shaming language when the user's recall is incorrect.

### Capability Inflation Detector

- The system must estimate autonomous versus AGI-assisted task completion.
- The MVP must show at least five task domains: memory, planning, communication, financial management, and daily routine.
- The MVP must include a letter-writing or message-writing example where the user's autonomous language is compared with AGI-assisted language.
- The MVP must include a simple accounting or basic investment example where the user's autonomous reasoning is compared with AGI-assisted reasoning.
- The system must detect a shift where the user delegates more work than before.
- The system must interpret increased AGI assistance as a possible support signal, not as proof of decline.
- The dashboard must explain this as "AGI may be masking functional change."

### Communication Gap Monitor

- The system must compare a user's autonomous message attempt with an AGI-assisted version.
- The system must track at least three language-related signals: word-finding, syntactic complexity, and pragmatic completeness.
- The system must use the gap between autonomous and assisted output as the signal.
- The MVP should present this as part of the Capability Inflation Detector rather than as a separate product surface.

### AGI Companion Boundary

- The system must monitor simulated patterns of AGI companion use.
- The system must flag possible overdependence when AGI interaction rises while human contact falls.
- The system must recommend gentle human-connection nudges rather than restricting access.
- The system must treat AGI companionship as potentially beneficial unless patterns suggest risk.

### Cognitive Domain Trend Engine

- The system must convert interaction signals into cognitive-domain trends.
- The MVP domains are short-term and prospective memory, attention and processing speed, language and communication, executive function and decision-making, orientation, and social cognition or social-cue perception.
- Recovery after hints is not a cognitive domain; it is a cue-responsiveness metric that helps explain how much support the user needs.
- Trends must be longitudinal and personal-baseline-relative.
- The dashboard must show specific directional changes over time, such as "short-term memory decreased by 4% over the last 3 months."
- The system must distinguish one-off events from persistent changes.
- Trends must include confidence or uncertainty language.

### Dashboard Notice Logic

- The primary output must be a clinician/caregiver dashboard trend summary, not a standalone recommendation.
- Necessary notices must be backed by cognitive-domain trends.
- Example notices include short-term memory decline, increased AGI dependence, weaker social-cue perception, reduced autonomous language complexity, or repeated orientation gaps.
- Support suggestions may be shown beneath notices, such as increasing cueing, adding recall prompts, involving a caregiver, encouraging human contact, or preparing a clinician summary.
- Notices and suggestions must not diagnose MCI, dementia, Alzheimer's disease, or any medical condition.
- Notices must include a brief explanation, uncertainty language, and suggested next review step.

### Clinician/Caregiver Dashboard

- The dashboard must show a concise user summary.
- The dashboard must show cognitive-domain trends.
- The dashboard must show necessary notices based on trend changes.
- The dashboard must show why each notice was surfaced.
- The dashboard must include examples such as "short-term memory decreased by 4% over the last 3 months" and "social-cue perception shows a persistent decline."
- The dashboard must show uncertainty and safety framing.
- The dashboard must include a validation-readiness section that shows which signals are suitable for future comparison with real longitudinal clinical datasets.
- The dashboard must avoid raw surveillance logs unless the user explicitly grants access in a future product version.

### Synthetic Demo Dataset Layer

- The MVP must use synthetic longitudinal interaction data.
- The synthetic dataset must include at least one behavioral baseline period and one trend-change period.
- The synthetic dataset must include assistance-level values, recall success, response latency, hint recovery, communication-gap measures, task-domain labels, social-cue perception examples, and human-contact indicators.
- The synthetic dataset may include consented mock signals from email, calendar, maps, payment, media/music history, IoT vital signs, photo context, meal logs, and conversation context.
- The product narrative must avoid dependency on biological screening data and should frame the MVP as an AGI-era behavioral support system.

## Future Product Functional Requirements

- Integrate real AGI activity logs across calendars, messaging, reminders, writing, planning, and companion use.
- Integrate consented personal context from mobile apps and devices, including email, calendar, maps, payment records, media/music history, IoT vital signs, photo or smart-glasses context, meal records, and conversation context.
- Support user-controlled consent for each data domain.
- Support caregiver and clinician permission tiers.
- Integrate validated cognitive assessments where appropriate.
- Support real longitudinal clinical validation studies.
- Support adaptive personalization across culture, language, education level, and baseline digital literacy.
- Support local-first or privacy-preserving processing for sensitive cognitive and companion data.
- Support safety escalation workflows for medication risk, wandering risk, self-harm language, or severe disorientation.

## Nonfunctional Requirements

- The product must preserve user dignity and agency.
- The product must be elderly-accessible, with voice-first interaction, large text, high contrast, simple navigation, and low typing burden.
- The product must be explainable enough for caregivers and clinicians.
- The product must minimize unnecessary monitoring.
- The product must use explicit consent and data minimization for sensitive app, location, payment, photo, device, and conversation data.
- The product must separate wellness support from medical diagnosis.
- The product must support graceful fallback when data is missing.
- The MVP must be understandable in a short hackathon demo.
- The future product must be designed for privacy, consent, auditability, and clinical review.

## Implementation Decisions

- The PRD is hybrid: it defines a hackathon MVP first, then separates future product expansion.
- The MVP will use a full loop demo that ends at a clinician/caregiver dashboard trend summary.
- The primary scenario will be an adaptive daily companion interaction, preferably medication routine support.
- The primary product output will be cognitive performance trends and necessary notices in the dashboard.
- Support suggestions are secondary to trend visibility and should be shown as human-reviewed next steps.
- The product will use "support need" and "support recommendation" language rather than diagnostic labels.
- Synthetic longitudinal behavioral data will be the main MVP data source.
- Future validation will focus on longitudinal behavioral, cognitive, and clinical-context datasets that can evaluate whether AGI interaction patterns correlate with changing support needs.
- The Communication Gap Analyzer will be a focused module because language and letter-writing examples are concrete and demo-friendly.
- AGI companion overuse and human-contact decline will appear as dashboard signals rather than a standalone MVP module.
- The Cognitive Friction Layer must be adaptive; it cannot simply block AGI usage.
- The Cognitive Friction Layer must step up clues gradually when the user cannot answer immediately.
- The Reality Anchor must scaffold recall and reorientation rather than only answering from logs.
- The dashboard must make "AGI masking functional change" visible.
- The system must be designed so each module can be tested independently through structured inputs and outputs.
- The MVP should use three role-play personas to show different forms of cognitive risk and support need.

## Proposed Modules

### AGI Interaction Middleware

Purpose: receives user requests before the AGI agent answers and determines whether cognitive friction should be inserted.

Inputs: user request, task type, urgency, user baseline, current context, recent trend state, and consented app/device context.

Outputs: allow AGI answer, ask retrieval prompt, provide hint, provide direct answer, or escalate support mode.

### Cognitive Friction Policy

Purpose: selects the right amount of desirable difficulty.

Inputs: domain, task risk, user trend, bad-day indicators, stress indicators, prior response history.

Outputs: friction level, prompt type, hint depth, fallback answer timing.

### Reality Anchor Service

Purpose: compares user recall against trusted AGI logs and turns mismatches into reorientation support and trend signals.

Inputs: event logs, user recall attempt, task context.

Outputs: reorientation prompt, recall-gap signal, confidence annotation.

### Capability Inflation Tracker

Purpose: estimates how much AGI assistance is being used across functional domains.

Inputs: task events, AGI action logs, autonomous user attempts, completed outputs.

Outputs: assistance ratio, domain-specific autonomy trend, capability inflation warning.

### Communication Gap Analyzer

Purpose: measures the gap between autonomous communication and AGI-assisted communication.

Inputs: user-authored message attempt, AGI-assisted output, historical baseline.

Outputs: language-domain signals such as word-finding strain, simplification, vocabulary narrowing, syntactic simplification, pragmatic completeness gap, and dashboard notice evidence.

### Cognitive Domain Trend Engine

Purpose: aggregates longitudinal signals into personal-baseline-relative trends.

Inputs: recall gaps, hint recovery, response latency, task completion, communication gaps, assistance ratios, social-cue perception examples, human-contact indicators, and contextual signals.

Outputs: trends for memory, attention and processing speed, language and communication, executive function and decision-making, orientation, social cognition, and cue responsiveness.

### Clinician/Caregiver Dashboard

Purpose: presents cognitive performance trends, necessary notices, and support suggestions in concise, respectful language.

Inputs: user profile, trend summaries, necessary notices, support suggestions, uncertainty, consent settings.

Outputs: dashboard panels, domain trend cards, necessary notices, validation-readiness summary, and suggested next review action.

## Testing Decisions

- Good tests should assert externally visible behavior: necessary notices, trend outputs, friction choices, support suggestions, and dashboard summaries.
- Tests should not assert private implementation details, internal weighting formulas, or exact prompt text unless wording is safety-critical.
- The Cognitive Friction Policy should be tested for adaptive behavior across healthy baseline, bad day, and concerning trend scenarios.
- The Cognitive Friction Policy should be tested for step-up cueing from open recall to direct answer.
- The Reality Anchor Service should be tested for correct handling of recall mismatch, successful recall, and missing log data.
- The Capability Inflation Tracker should be tested for detecting rising AGI assistance ratios across task domains.
- The Communication Gap Analyzer should be tested for producing a stable language-support signal from synthetic autonomous and assisted examples.
- The Cognitive Domain Trend Engine should be tested for personal-baseline-relative trend changes and noisy one-off events.
- The Cognitive Domain Trend Engine should be tested for revised domains: memory, attention and processing speed, language and communication, executive function and decision-making, orientation, social cognition, and cue responsiveness.
- The Dashboard should be tested for showing domain trends, necessary notices, supporting trend evidence, uncertainty, validation-readiness content, and safe language.
- Synthetic demo data should be tested for complete persona scenarios with required fields.
- Safety-language tests should verify that the product does not claim to diagnose MCI, dementia, Alzheimer's disease, or cognitive decline.

## Demo Narrative

The recommended hackathon demo is an interactive voice role-play, not a fixed script. The interface first shows three persona cards and the demo user chooses one. Second Brain greets the selected persona by name and asks, "How can I help you today?" The interface then shows a brief task clue for that persona, like a game objective, but does not show the full dialogue. The user speaks naturally in their own words through the live voice model without pressing a button.

The AI should answer flexibly when the user does not say the exact expected phrase. It should preserve the clinical/product purpose of the selected case: extract memory in Persona A, assess judgment and social-cue interpretation in Persona B, and preserve financial instrumental ADL skills in Persona C. The frontend must stay synchronized with the dialogue by updating the current prompt, transcript, cue level, detected cognitive signal, and dashboard preview.

Interactive flow:

1. Show three persona cards and ask the demo user to choose one.
2. AI voice greets the persona by name and asks how it can help today.
3. Show one short task clue for the selected persona.
4. User speaks naturally without pressing any button.
5. Second Brain responds according to the user's actual words while keeping the persona-specific support goal.
6. If the user struggles, Cognitive Friction steps up clues gradually.
7. The frontend synchronizes the conversation with cue level, cognitive-domain signal, and dashboard trend preview.
8. The demo ends with the clinician/caregiver dashboard showing cognitive performance trends and necessary notices.

Each persona has a different pain point, daily context, and cognitive-domain trend.

### Persona A: Medication Memory Support

Background: Malee is a 76-year-old retired teacher in Bangkok. She has early MCI, hypertension, and diabetes. She used to live with her daughter, but her daughter now visits twice a month because of work. Malee wants to keep managing her morning routine independently, but she often repeats questions and forgets whether she has taken medication.

Data context: Calendar shows clinic visits, medication routine is logged through reminders, kitchen photos show breakfast timing, and voice interaction logs show repeated medication questions.

Task clue shown to demo user: "You are Malee. Ask Second Brain whether you took your morning medication. Try to answer its memory questions naturally."

Expected interaction behavior: Second Brain should not immediately answer whether Malee took the pill. It should ask memory-retrieval questions first, such as what she usually does after breakfast, what color the pill box is, or what she remembers eating. If she cannot recall, it should step up clues from open recall to category hint, specific cue, multiple choice, and then direct answer from logs.

Pain point: Malee wants independence, but repeated medication uncertainty creates safety risk and caregiver anxiety.

How Second Brain helps: It does not simply answer from logs. It uses Reality Anchor to scaffold recall, records cue responsiveness, and updates dashboard trends such as "short-term medication recall decreased by 4% over the last 3 months" and "recovery after one hint remains stable."

### Persona B: Hidden Decline in Judgment and Social-Cue Perception

Background: Somchai is a 72-year-old retired shop owner living alone in Chiang Mai. He believes he is functioning normally and does not notice cognitive change. His AGI helps with messages, appointments, online purchases, and interpreting conversations. Recently, he has made unusual payment decisions and misread social cues in messages from neighbors.

Data context: Payment patterns show repeated small transfers to unfamiliar accounts, maps show missed appointments, message logs show increased AGI rewriting, and conversation context shows more requests like "what did they mean by that?"

Task clue shown to demo user: "You are Somchai. You received a suspicious prize message. Ask Second Brain to help you respond or decide what to do."

Expected interaction behavior: Second Brain should not simply write the reply or send money. It should ask Somchai to explain why he trusts the message, identify urgency or sender clues, and compare the sender details with known safe patterns. If Somchai misses the risk, it should step up support and suggest verifying with a trusted person or bank.

Pain point: Somchai's independence looks intact because AGI is quietly compensating, but judgment and social-cue perception may be worsening.

How Second Brain helps: Capability Inflation Detector notices rising AGI assistance in decision-making and social interpretation. The dashboard can surface a necessary notice such as "social-cue perception shows persistent decline" or "financial decision support increased over the last 3 months," without diagnosing dementia.

### Persona C: Preserving Financial Instrumental ADLs

Background: Araya is a 69-year-old retired accountant in Bangkok. She subjectively notices that accounting and basic investment decisions are getting harder. She is proud of managing her own finances and wants to preserve this instrumental ADL skill rather than letting AGI take over. She uses AGI for bill summaries, budgeting, and simple investment comparisons.

Data context: Payment records show duplicate bill checks, banking summaries show more AGI help with categorization, calendar shows monthly accounting days, and prior writing/number tasks provide a personal baseline.

Task clue shown to demo user: "You are Araya. Ask Second Brain to help review monthly expenses or choose a basic investment option, but you still want to think through it yourself."

Expected interaction behavior: Second Brain should not take over the accounting or investment decision. It should ask Araya to identify expense categories, state her financial goal, compare simple options, and explain the difference in her own words. If she struggles, it should provide structured clues and large-text comparisons while preserving her agency.

Pain point: Araya can feel her financial-management skill weakening, but full AGI automation would further hide and possibly accelerate that loss.

How Second Brain helps: Cognitive Friction Policy preserves effortful accounting and decision-making. Communication Gap Analyzer and Capability Inflation Tracker can measure whether AGI is increasingly doing the user's finance-related reasoning. The dashboard can show trends such as "executive function and financial planning required more cueing this month" while preserving Araya's agency.

## Success Metrics

### Hackathon MVP Success

- Judges understand the post-AGI problem within 60 seconds.
- Judges can explain why this is not just a normal reminder app.
- The demo shows a complete loop from user interaction to dashboard trend summary and necessary notice.
- The dashboard avoids diagnostic overclaiming.
- The dashboard can show specific domain trend changes, such as short-term memory decreasing over the last 3 months or social-cue perception showing persistent decline.
- The product's novelty is clear: AGI creates the masking problem and supplies the data needed to address it.

### Future Product Success

- Users maintain or improve autonomous task participation.
- Caregivers receive fewer but more meaningful support alerts.
- Clinicians find summaries useful for review conversations.
- The system identifies changing support needs earlier than self-report alone.
- Users report that the product preserves dignity and agency.
- Privacy and consent controls are trusted by users and caregivers.

## Out of Scope

- Diagnosing MCI, dementia, Alzheimer's disease, or any medical condition.
- Making treatment decisions without clinician review.
- Building biological screening models for the hackathon MVP.
- Claiming validated prediction of decline before clinical assessment.
- Using biological screening datasets as evidence for cognitive decline prediction.
- Replacing caregiver or clinician judgment.
- Continuous raw surveillance dashboards for caregivers.
- Emergency medical response automation.
- Full regulatory compliance implementation for the hackathon MVP.
- Real patient data collection during the hackathon.
- Fully solving AGI companion dependency as a clinical condition.

## Further Notes

- The strongest positioning is "AGI will mask cognitive decline, and Second Brain makes that masking visible, measurable, and preventable."
- The project aligns with Wellness AI in the Post-AGI Era because it protects cognitive agency, autonomy, independence, and human connection rather than only automating tasks.
- The product should use "cognitive friction" as its signature feature.
- The product should use "Reality Anchor" as the most emotionally vivid demo beat.
- The product should use "Capability Inflation Detector" as the strongest academic and post-AGI differentiator.
- Longitudinal behavioral and interaction data should be presented as the main working signal.
- The safest scientific language is "support needs," "behavioral context," "domain trends," and "clinician-reviewed recommendation."
- Future validation should focus on longitudinal cognitive, behavioral, functional, and clinical-context data.
- Thailand aging-context sources used for the problem framing: National Statistical Office Social Indicators 2025 and WHO Thailand's 2025 feature story on elderly care and population aging.

## Reference Context

- National Statistical Office Thailand, [Social Indicators 2025](https://www.nso.go.th/public/e-book/Indicators-Social/Social-Indicators-2025/120/): older persons were 20.8% of Thailand's population in 2024.
- WHO Thailand, [2025 feature story on elderly day care and social connection](https://www.who.int/thailand/news/feature-stories/detail/doh-elderly-day-care-center-empowering-seniors-and-promoting-social-connection): older persons were about 20.5% of Thailand's population in 2024 and are projected to reach about 31% by 2040.
- Risko and Gilbert, [Cognitive Offloading](https://doi.org/10.1016/j.tics.2016.07.002), Trends in Cognitive Sciences, 2016: foundational review of how external tools reduce internal cognitive demand.
- Microsoft Research, [The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/), CHI 2025: survey evidence that higher confidence in GenAI was associated with less critical-thinking effort in AI-assisted knowledge work.
- MIT Media Lab, [Your Brain on ChatGPT](https://www.media.mit.edu/projects/your-brain-on-chatgpt/), 2025: early EEG and behavioral study comparing brain-only, search-assisted, and LLM-assisted essay writing; useful as a cautionary signal, not as clinical proof.
