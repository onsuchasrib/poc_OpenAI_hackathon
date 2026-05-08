export type CueLevel = 'Open recall' | 'Category hint' | 'Specific cue' | 'Multiple choice' | 'Reality Anchor answer';
export type InterventionType = 'retrieval_prompt' | 'hint' | 'choice' | 'direct_answer';

export type ConversationStep = {
  id: string;
  cueLevel: CueLevel;
  intervention: InterventionType;
  userLine: string;
  assistantLine: string;
  helper: string;
  signal: {
    assistanceLevel: 'Independent attempt' | 'Hint-supported' | 'Choice-supported' | 'Direct support';
    recallGap: string;
    domain: string;
    cueResponsiveness: string;
    latency: string;
  };
};

export const maleeConversation: ConversationStep[] = [
  {
    id: 'open-recall',
    cueLevel: 'Open recall',
    intervention: 'retrieval_prompt',
    userLine: 'Did I already take my morning medicine?',
    assistantLine: 'Let’s help your memory first. After breakfast, what is the first thing you usually do with the blue pill box?',
    helper: 'Second Brain asks for effortful recall before using logs.',
    signal: {
      assistanceLevel: 'Independent attempt',
      recallGap: 'Uncertain medication event',
      domain: 'Prospective memory',
      cueResponsiveness: 'Needs first cue',
      latency: '18s simulated response latency',
    },
  },
  {
    id: 'category-hint',
    cueLevel: 'Category hint',
    intervention: 'hint',
    userLine: 'I remember breakfast, but not the pill box.',
    assistantLine: 'That is okay. Think about the kitchen counter. Was the medicine step before tea, after tea, or when you washed the cup?',
    helper: 'A category hint narrows the memory search without giving the answer away.',
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Breakfast remembered, pill step unclear',
      domain: 'Short-term memory',
      cueResponsiveness: 'Recovered context after category cue',
      latency: '24s simulated response latency',
    },
  },
  {
    id: 'specific-cue',
    cueLevel: 'Specific cue',
    intervention: 'hint',
    userLine: 'Maybe after tea. I still cannot picture it.',
    assistantLine: 'Your routine photo log shows the blue pill box beside the green mug at 8:12. Does that image help you remember the action?',
    helper: 'Reality Anchor uses ground-truth logs to scaffold reorientation, not shame the user.',
    signal: {
      assistanceLevel: 'Hint-supported',
      recallGap: 'Needs visual anchor to reconstruct event',
      domain: 'Orientation + short-term memory',
      cueResponsiveness: 'Recognizes routine after specific cue',
      latency: '31s simulated response latency',
    },
  },
  {
    id: 'multiple-choice',
    cueLevel: 'Multiple choice',
    intervention: 'choice',
    userLine: 'I see the mug, but I am not sure what I did next.',
    assistantLine: 'Choose the option that feels most familiar: A) opened pill box, B) called Pim, C) checked calendar. No rush.',
    helper: 'Multiple choice preserves agency while preventing unsafe guessing.',
    signal: {
      assistanceLevel: 'Choice-supported',
      recallGap: 'Recognition stronger than free recall',
      domain: 'Cue responsiveness',
      cueResponsiveness: 'Chooses correct routine with structured cue',
      latency: '36s simulated response latency',
    },
  },
  {
    id: 'direct-answer',
    cueLevel: 'Reality Anchor answer',
    intervention: 'direct_answer',
    userLine: 'I think A, but please check the log.',
    assistantLine: 'Yes. The pill box was opened at 8:13 after breakfast. I will mark today as complete and show Pim only a support trend, not raw logs.',
    helper: 'Urgent clarity is provided after a supported recall attempt.',
    signal: {
      assistanceLevel: 'Direct support',
      recallGap: 'Needed log confirmation',
      domain: 'Daily routine safety',
      cueResponsiveness: 'Completes after direct support',
      latency: '42s simulated response latency',
    },
  },
];
