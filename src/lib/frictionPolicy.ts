import type { ConversationStep, InterventionType } from '../data/conversation';

export type SimulatedContext = 'healthy_baseline' | 'bad_day' | 'concerning_trend';

export type FrictionDecision = {
  intensity: 'low' | 'medium' | 'high' | 'safety_override';
  intervention: InterventionType;
  rationale: string;
  canDirectAnswer: boolean;
};

export function decideFriction(step: ConversationStep, context: SimulatedContext): FrictionDecision {
  if (step.intervention === 'direct_answer') {
    return {
      intensity: 'safety_override',
      intervention: step.intervention,
      rationale: 'Direct support is appropriate after a supported recall attempt or when safety clarity matters.',
      canDirectAnswer: true,
    };
  }

  const contextIntensity: Record<SimulatedContext, FrictionDecision['intensity']> = {
    healthy_baseline: 'medium',
    bad_day: 'low',
    concerning_trend: 'high',
  };

  return {
    intensity: contextIntensity[context],
    intervention: step.intervention,
    rationale:
      context === 'bad_day'
        ? 'Bad-day mode reduces friction so support does not feel punitive.'
        : context === 'concerning_trend'
          ? 'Concerning trend mode preserves effort while escalating structured cues.'
          : 'Baseline mode asks for recall before AGI completes the work.',
    canDirectAnswer: false,
  };
}
