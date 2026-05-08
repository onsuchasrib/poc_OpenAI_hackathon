import type { PersonaId } from './personas';

export type TrendPoint = { month: string; value: number };
export type DomainTrend = {
  id: string;
  label: string;
  delta: string;
  status: 'stable' | 'watch' | 'support';
  confidence: string;
  explanation: string;
  points: TrendPoint[];
};
export type Notice = {
  title: string;
  why: string;
  uncertainty: string;
  suggestion: string;
};

export const domainTrends: Record<PersonaId, DomainTrend[]> = {
  malee: [
    {
      id: 'memory',
      label: 'Short-term medication recall',
      delta: 'decreased 4% over 3 months',
      status: 'support',
      confidence: 'Moderate confidence: persistent across 18 synthetic medication events',
      explanation: 'Malee more often needed a category or specific cue before confirming the morning routine.',
      points: [
        { month: 'Feb', value: 86 },
        { month: 'Mar', value: 84 },
        { month: 'Apr', value: 83 },
        { month: 'May', value: 82 },
      ],
    },
    {
      id: 'cue',
      label: 'Recovery after one hint',
      delta: 'stable at 72%',
      status: 'stable',
      confidence: 'Higher confidence: consistent recovery after routine cueing',
      explanation: 'Cue responsiveness remains a strength, suggesting gentle prompts still help preserve agency.',
      points: [
        { month: 'Feb', value: 71 },
        { month: 'Mar', value: 73 },
        { month: 'Apr', value: 72 },
        { month: 'May', value: 72 },
      ],
    },
    {
      id: 'assistance',
      label: 'AGI-assisted routine completion',
      delta: 'increased 9%',
      status: 'watch',
      confidence: 'Moderate confidence: assistance mix changed after routine disruption',
      explanation: 'More tasks were completed with AGI help, so independence may look stronger than unsupported performance.',
      points: [
        { month: 'Feb', value: 28 },
        { month: 'Mar', value: 31 },
        { month: 'Apr', value: 35 },
        { month: 'May', value: 37 },
      ],
    },
  ],
  somchai: [
    {
      id: 'social',
      label: 'Social-cue interpretation checks',
      delta: 'persistent decline signal',
      status: 'support',
      confidence: 'Low-to-moderate confidence: synthetic message examples only',
      explanation: 'Requests like “what did they mean?” rose while neighbor calls decreased.',
      points: [
        { month: 'Feb', value: 74 },
        { month: 'Mar', value: 70 },
        { month: 'Apr', value: 66 },
        { month: 'May', value: 61 },
      ],
    },
    {
      id: 'finance-risk',
      label: 'Financial judgment support',
      delta: 'increased 12%',
      status: 'watch',
      confidence: 'Moderate confidence: repeated prize-message and transfer simulations',
      explanation: 'AGI stepped in more often before unfamiliar transfers or urgent prize replies.',
      points: [
        { month: 'Feb', value: 22 },
        { month: 'Mar', value: 26 },
        { month: 'Apr', value: 31 },
        { month: 'May', value: 34 },
      ],
    },
  ],
  araya: [
    {
      id: 'communication-gap',
      label: 'Autonomous vs AGI-assisted explanation gap',
      delta: 'gap widened 11%',
      status: 'support',
      confidence: 'Moderate confidence: writing and finance explanation comparisons',
      explanation: 'Autonomous notes became shorter and less complete while AGI summaries stayed polished.',
      points: [
        { month: 'Feb', value: 18 },
        { month: 'Mar', value: 21 },
        { month: 'Apr', value: 25 },
        { month: 'May', value: 29 },
      ],
    },
    {
      id: 'finance-planning',
      label: 'Monthly accounting cueing',
      delta: 'required more cueing this month',
      status: 'watch',
      confidence: 'Low-to-moderate confidence: synthetic bill review tasks',
      explanation: 'Budget categories and simple investment tradeoffs needed more structured prompts.',
      points: [
        { month: 'Feb', value: 78 },
        { month: 'Mar', value: 75 },
        { month: 'Apr', value: 72 },
        { month: 'May', value: 69 },
      ],
    },
  ],
};

export const notices: Record<PersonaId, Notice[]> = {
  malee: [
    {
      title: 'Medication recall support need is rising',
      why: 'Morning routine recall needed more cueing across the synthetic trend-change period.',
      uncertainty: 'This is not a medical conclusion. Sleep, stress, illness, or routine disruption could explain part of the change.',
      suggestion: 'Keep gentle recall prompts, then share a concise trend summary with Pim or a clinician at the next review.',
    },
    {
      title: 'AGI may be masking functional change',
      why: 'Completion still looks high because AGI scaffolds more steps than before.',
      uncertainty: 'Assistance can be helpful; the signal is the changing ratio, not a single event.',
      suggestion: 'Track autonomous attempts separately from AGI-completed tasks.',
    },
  ],
  somchai: [
    {
      title: 'Social-cue and financial judgment checks increased',
      why: 'Prize-message interpretation and unfamiliar-transfer support rose while human-contact indicators fell.',
      uncertainty: 'Synthetic examples indicate a support need to review, not a condition.',
      suggestion: 'Nudge verification with a trusted person or bank before payment decisions.',
    },
  ],
  araya: [
    {
      title: 'Communication and finance capability gap widened',
      why: 'Autonomous explanations became less complete while AGI-assisted summaries remained strong.',
      uncertainty: 'The gap suggests where to preserve practice, not what the cause is.',
      suggestion: 'Use step-by-step prompts before AGI writes or chooses for Araya.',
    },
  ],
};

export const validationReadiness = [
  {
    signal: 'Recall success and hint recovery',
    futureData: 'Longitudinal cognitive task performance, medication adherence context, routine logs',
    validationQuestion: 'Do cue-responsive support signals track real support needs over time?',
  },
  {
    signal: 'Autonomous vs AGI-assisted output gap',
    futureData: 'Repeated writing/planning samples, language complexity measures, functional ADL reviews',
    validationQuestion: 'Does widening AGI assistance gap correlate with changing daily-function support?',
  },
  {
    signal: 'Human contact vs AGI companion use',
    futureData: 'Consented call/message frequency, loneliness scales, social participation measures',
    validationQuestion: 'When does companionship shift from beneficial support to review-worthy overdependence?',
  },
  {
    signal: 'Reality Anchor recall gap',
    futureData: 'Ground-truth event logs, prospective memory tasks, clinician/caregiver review summaries',
    validationQuestion: 'Can logged reality gaps identify moments where scaffolding preserves agency?',
  },
];
