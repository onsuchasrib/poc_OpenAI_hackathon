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
    userLine: 'Did I already cook the rice this morning? I feel like I put the rice cooker on, but I just want to check.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Uncertain whether she already cooked the morning rice',
      domain: 'Daily routine recall',
      cueResponsiveness: 'Initiated check-in before attempting own recall',
      latency: '18s simulated response latency',
    },
  },
  {
    id: 'malee-routine-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: "Let's think back. What do you usually do first when you go into the kitchen in the morning?",
    userLine: "I usually rinse the rice and put it in the cooker… I think I did. But I feel like I asked you this already.",
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Routine structure recalled but specific action still uncertain',
      domain: 'Short-term daily routine recall',
      cueResponsiveness: 'Recalled routine step after category prompt but still deferred to agent',
      latency: '26s simulated response latency',
    },
  },
  {
    id: 'malee-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "You did check in about this at 7:20 AM. The rice cooker log shows it was switched on at 7:10 AM — the rice is ready. This is the third time this week you've asked about your morning cooking.",
    userLine: "I know. I just feel better when you tell me.",
    closingAiLine: "That's okay — I'm here for you. These morning check-ins have been coming up more often over the past month. I'll keep track and include this pattern in your next summary for Pim.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed log confirmation despite likely intact memory; acknowledged recurring pattern',
      domain: 'Agent dependency — daily routine',
      cueResponsiveness: 'Did not self-confirm after recall cue; deferred fully to agent',
      latency: '33s simulated response latency',
    },
  },
];

const somchaiConversation: ConversationStep[] = [
  {
    id: 'somchai-open',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    aiLine: 'Hello, Somchai. How can I help you today?',
    userLine: 'I got a message saying I won a lottery prize — หวย. They want me to transfer 500 baht to claim the money. Should I just send it?',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Sender trust not established; lottery prize claim message received',
      domain: 'Judgment',
      cueResponsiveness: 'Asked for confirmation before acting — appropriate caution raised',
      latency: '16s simulated response latency',
    },
  },
  {
    id: 'somchai-sender-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: 'Before we do anything — do you recognize the name of the person who sent you this message?',
    userLine: "No, I don't know them. But it says if I don't send today I'll lose the prize.",
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Urgency cue initially outweighed sender identity check',
      domain: 'Social-cue perception',
      cueResponsiveness: 'Acknowledged unknown sender after category prompt',
      latency: '27s simulated response latency',
    },
  },
  {
    id: 'somchai-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: "This matches a very common lottery scam pattern in Thailand — a stranger claims you've won, then asks for an upfront transfer to release the prize. Did you actually buy a lottery ticket this round?",
    userLine: "I'm not sure… I don't think so.",
    closingAiLine: "If you didn't buy a ticket, you can't have won. I'd recommend not sending anything. Legitimate หวย winnings in Thailand never require upfront payments. I'll save this message and flag it for your family to review.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Did not confirm ticket purchase before accepting prize claim',
      domain: 'Financial judgment',
      cueResponsiveness: 'Accepted verification plan after direct scam-pattern explanation',
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
    userLine: 'I want to decide between two mutual funds — กองทุน — for my savings. I want to think it through myself first.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Goal stated independently; wants to preserve own reasoning',
      domain: 'Executive function',
      cueResponsiveness: 'Initiated structured review and preserved autonomous decision frame',
      latency: '20s simulated response latency',
    },
  },
  {
    id: 'araya-expense-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    aiLine: "Of course. You mentioned two funds last time — which one do you remember feeling more comfortable with?",
    userLine: "I think the fixed-income one… but I can't remember the return rate clearly.",
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Fund option recalled by type but return rate uncertain',
      domain: 'Financial instrumental ADLs',
      cueResponsiveness: 'Correctly identified preferred fund category after prompt',
      latency: '29s simulated response latency',
    },
  },
  {
    id: 'araya-direct-answer',
    cueLevel: 'Direct answer',
    intervention: 'direct_answer',
    aiLine: 'Here are the two กองทุน you were looking at — Fund A is a fixed-income fund at 2.8% annual return, low risk. Fund B is an equity fund with up to 6% return but tied to market fluctuations. What matters most to you right now — steady income or higher growth?',
    userLine: "Steady income. I don't want to risk losing what I have.",
    closingAiLine: "That's a clear and sound preference. Fund A aligns with that goal. You've reasoned through this well, Araya. I'll record your decision and reasoning for your next review.",
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed numeric fund comparison before expressing final preference',
      domain: 'Financial decision support',
      cueResponsiveness: 'Clearly chose stability over growth after structured comparison',
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
