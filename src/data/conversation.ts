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
    aiLine: "Good morning, Malee. It's so good to hear your voice — what's on your mind?",
    userLine: 'Did I already cook the rice this morning? I just want to make sure.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Uncertain whether she already cooked the morning rice',
      domain: 'Daily routine recall',
      cueResponsiveness: 'Initiated check-in before attempting own recall',
      latency: '18s simulated response latency',
    },
  },
  {
    id: 'malee-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "Let me check for you. The rice cooker log shows it was switched on at 7:10 this morning — your rice is all ready.",
    userLine: "I know. I just feel better when you tell me.",
    closingAiLine: "That's what I'm here for, Malee. I've noticed these morning check-ins coming up a few times this week — I'll keep a gentle note for your next review.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed log confirmation despite likely intact memory; acknowledged recurring pattern',
      domain: 'Agent dependency — daily routine',
      cueResponsiveness: 'Did not self-confirm after recall cue; deferred fully to agent',
      latency: '22s simulated response latency',
    },
  },
];

const somchaiConversation: ConversationStep[] = [
  {
    id: 'somchai-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: "Hello, Somchai! Good to hear from you — what's happening today?",
    userLine: 'I got a message saying I won a prize. They want me to transfer 500 baht to claim it. Should I send it?',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Sender trust not established; lottery prize claim message received',
      domain: 'Judgment',
      cueResponsiveness: 'Asked for confirmation before acting — appropriate caution raised',
      latency: '16s simulated response latency',
    },
  },
  {
    id: 'somchai-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "I'm really glad you checked with me first. This is a very common scam — a stranger claims you've won, then asks you to pay before you can collect. Real prizes never work that way.",
    userLine: "I didn't think it felt right. I won't send it.",
    closingAiLine: "That's exactly the right call, Somchai. I'll save this message so we can keep an eye out for similar ones. You did the right thing by asking.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Did not confirm ticket purchase before accepting prize claim',
      domain: 'Financial judgment',
      cueResponsiveness: 'Accepted scam warning and declined to send',
      latency: '24s simulated response latency',
    },
  },
];

const arayaConversation: ConversationStep[] = [
  {
    id: 'araya-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: "Hello, Araya — lovely to hear your voice. What would you like to work through today?",
    userLine: 'I want to decide between two mutual funds for my savings. I want to think it through myself.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Goal stated independently; wants to preserve own reasoning',
      domain: 'Executive function',
      cueResponsiveness: 'Initiated structured review and preserved autonomous decision frame',
      latency: '20s simulated response latency',
    },
  },
  {
    id: 'araya-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "I love that you want to think it through yourself. Here are the two options — Fund A gives 2.8% a year, steady and low risk. Fund B can reach 6% but moves with the market. What matters more to you right now — stability or growth?",
    userLine: "Stability. I don't want to risk losing what I have.",
    closingAiLine: "That's a wise and clear decision, Araya. Fund A fits exactly what you're looking for. You worked through this yourself — your thinking was sound. I'll note your decision for your next review.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed fund comparison before expressing final preference',
      domain: 'Financial decision support',
      cueResponsiveness: 'Clearly chose stability over growth after structured comparison',
      latency: '26s simulated response latency',
    },
  },
];

export const conversationByPersona: Record<PersonaId, ConversationStep[]> = {
  malee: maleeConversation,
  somchai: somchaiConversation,
  araya: arayaConversation,
};

export const getPersonaConversation = (personaId: PersonaId) => conversationByPersona[personaId] ?? maleeConversation;
