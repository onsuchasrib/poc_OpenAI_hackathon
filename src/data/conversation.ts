import type { PersonaId } from './personas';

export type CueLevel = 'Open recall' | 'Category hint' | 'Direct answer';
export type InterventionType = 'retrieval_prompt' | 'hint' | 'direct_answer';

export type ConversationStep = {
  id: string;
  cueLevel: CueLevel;
  intervention: InterventionType;
  aiLine: string;
  userLine: string;
  closingAiLine?: string;
  signal: {
    assistanceLevel: 'Independent attempt' | 'Hint-supported' | 'Direct support';
    recallGap: string;
    domain: string;
    cueResponsiveness: string;
    latency: string;
  };
};

export const maleeConversation: ConversationStep[] = [
  {
    id: 'malee-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: 'Good morning, Malee. How can I help you today?',
    userLine: 'Did I take my blood pressure pill this morning?',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Uncertain morning medication event',
      domain: 'Short-term recall',
      cueResponsiveness: 'Open recall attempted before log confirmation',
      latency: '18s simulated response latency',
    },
  },
  {
    id: 'malee-routine-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: "Let's think back together. What do you usually do right after breakfast?",
    userLine: "I usually wash my cup… but I can't remember if I took it.",
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Routine remembered, pill action unclear',
      domain: 'Prospective medication memory',
      cueResponsiveness: 'Recovered routine context after category cue',
      latency: '24s simulated response latency',
    },
  },
  {
    id: 'malee-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "That's okay. Do you remember what color your pill box is, and where you keep it?",
    userLine: "It's the blue one, near the sink.",
    closingAiLine: 'Good. Based on your log from this morning, your blue box was opened at 7:42 AM. It looks like you did take it. Well done for keeping your routine.',
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed log confirmation after supported recall',
      domain: 'Medication memory',
      cueResponsiveness: 'Identified pill-box cue before direct answer',
      latency: '31s simulated response latency',
    },
  },
];

const somchaiConversation: ConversationStep[] = [
  {
    id: 'somchai-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: 'Hello, Somchai. How can I help you today?',
    userLine: 'I got a message that I won a prize. They want me to send 500 baht to claim it. Should I just send it?',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Sender trust not established',
      domain: 'Judgment',
      cueResponsiveness: 'Risk question raised before recommendation',
      latency: '16s simulated response latency',
    },
  },
  {
    id: 'somchai-sender-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: 'Before we do anything, can you tell me — do you recognize the name of who sent this message?',
    userLine: "No, I don't know them, but it says it's urgent.",
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Urgency cue initially weighted over sender identity',
      domain: 'Social-cue perception',
      cueResponsiveness: 'Recognized unknown sender after category prompt',
      latency: '27s simulated response latency',
    },
  },
  {
    id: 'somchai-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "When a message is urgent and asks for money from someone you don't know, that's usually a warning sign. Has anyone you trust — like family or your bank — ever told you about this sender?",
    userLine: "No, I don't think so.",
    closingAiLine: "I'd recommend not sending anything yet. Let's save this message and you can verify it with your bank or a family member first. I'll flag this for your caregiver to review.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed explicit warning-sign summary',
      domain: 'Financial judgment',
      cueResponsiveness: 'Accepted verification plan after direct support',
      latency: '39s simulated response latency',
    },
  },
];

const arayaConversation: ConversationStep[] = [
  {
    id: 'araya-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: 'Hello, Araya. How can I help you today?',
    userLine: 'I want to go over my expenses this month and decide between two savings options, but I want to think it through myself.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Goal stated independently before AGI choice',
      domain: 'Executive function',
      cueResponsiveness: 'Preserved autonomous decision frame',
      latency: '20s simulated response latency',
    },
  },
  {
    id: 'araya-expense-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: "Of course. Let's start with your expenses. Looking at this month, which category do you think was your largest spending area?",
    userLine: 'I think it was utilities… or maybe groceries?',
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Expense category comparison uncertain',
      domain: 'Financial instrumental ADLs',
      cueResponsiveness: 'Narrowed to the two relevant categories',
      latency: '29s simulated response latency',
    },
  },
  {
    id: 'araya-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: 'Your top two were utilities at 3,200 baht and groceries at 2,800 baht. You were close. Now, for your two savings options — Option A gives 2.5% fixed return, Option B gives up to 4% but with variable risk. What matters most to you right now — stability or growth?',
    userLine: "Stability, I think. I don't want to risk losing money.",
    closingAiLine: "That's a clear and sound preference. Option A would align with that goal. You've reasoned through this well, Araya. I'll note your decision and reasoning in your record.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed numeric comparison before final preference',
      domain: 'Financial decision support',
      cueResponsiveness: 'Chose stability after structured comparison',
      latency: '34s simulated response latency',
    },
  },
];

export const conversationByPersona: Record<PersonaId, ConversationStep[]> = {
  malee: maleeConversation,
  somchai: somchaiConversation,
  araya: arayaConversation,
};

export const getPersonaConversation = (personaId: PersonaId) => conversationByPersona[personaId] ?? maleeConversation;
