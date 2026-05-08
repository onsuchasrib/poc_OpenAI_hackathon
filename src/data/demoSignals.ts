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
      id: 'checkin-frequency',
      label: 'Daily routine check-in frequency',
      delta: 'increased 31% over 3 months',
      status: 'support',
      confidence: 'Moderate confidence: persistent across 22 synthetic daily interaction logs',
      explanation: 'Malee checks in with the agent about small routine events — morning tea, door locks, whether she sat down yet — more often than before, often for things she likely already knows.',
      points: [
        { month: 'Feb', value: 42 },
        { month: 'Mar', value: 48 },
        { month: 'Apr', value: 53 },
        { month: 'May', value: 55 },
      ],
    },
    {
      id: 'self-confirm',
      label: 'Self-confirmation before agent query',
      delta: 'decreased 18% over 3 months',
      status: 'watch',
      confidence: 'Moderate confidence: derived from open-recall attempts in check-in logs',
      explanation: 'She less often tries to recall or reason through the answer herself before asking the agent — deferral to the agent is becoming the first step, not a fallback.',
      points: [
        { month: 'Feb', value: 68 },
        { month: 'Mar', value: 63 },
        { month: 'Apr', value: 57 },
        { month: 'May', value: 50 },
      ],
    },
    {
      id: 'assistance',
      label: 'AGI-assisted routine completion',
      delta: 'increased 9%',
      status: 'watch',
      confidence: 'Moderate confidence: assistance mix changed gradually across the period',
      explanation: 'More routine tasks are completed with AGI confirmation, so functional independence may appear higher than unsupported performance would show.',
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
      title: 'Agent check-in frequency has quietly increased',
      why: 'Malee is asking the agent to confirm small everyday events — morning tea, door locks, routine steps — more often over the past 3 months, and less often attempts to recall on her own first.',
      uncertainty: 'This is not a medical conclusion. Anxiety, loneliness, or a change in routine confidence could explain increased check-ins without any cognitive change.',
      suggestion: 'Share a concise trend summary with Pim or a clinician at the next review. Consider whether gentle self-recall prompts before log confirmation could help preserve her confidence.',
    },
    {
      title: 'Self-reliance before querying the agent is declining',
      why: 'Open-recall attempts before agent queries have dropped — deferral is becoming her default rather than a fallback.',
      uncertainty: 'The pattern reflects increased reliance, not necessarily inability. The two are worth distinguishing before drawing conclusions.',
      suggestion: 'Track autonomous attempts separately from agent-confirmed completions to surface the real support ratio.',
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
