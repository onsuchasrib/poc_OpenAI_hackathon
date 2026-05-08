import { maleeConversation, type ConversationStep } from '../data/conversation';
import { decideFriction, type SimulatedContext } from './frictionPolicy';

export type InteractionInput = {
  stepIndex: number;
  utterance?: string;
  context: SimulatedContext;
};

export type InteractionOutput = {
  step: ConversationStep;
  nextStepIndex: number;
  isComplete: boolean;
  emittedSignals: ConversationStep['signal'] & { intensity: string; rationale: string };
};

export interface InteractionAdapter {
  next(input: InteractionInput): InteractionOutput;
}

export class DeterministicInteractionAdapter implements InteractionAdapter {
  next(input: InteractionInput): InteractionOutput {
    const boundedIndex = Math.max(0, Math.min(input.stepIndex, maleeConversation.length - 1));
    const step = maleeConversation[boundedIndex];
    const friction = decideFriction(step, input.context);
    const isComplete = boundedIndex >= maleeConversation.length - 1;

    return {
      step,
      nextStepIndex: isComplete ? boundedIndex : boundedIndex + 1,
      isComplete,
      emittedSignals: {
        ...step.signal,
        intensity: friction.intensity,
        rationale: friction.rationale,
      },
    };
  }
}

export const deterministicInteractionAdapter = new DeterministicInteractionAdapter();

export const OPENAI_REALTIME_ADAPTER_NOTE =
  'Future OpenAIRealtimeAdapter requires a server or serverless endpoint to mint ephemeral Realtime client secrets from OPENAI_API_KEY. The static demo never exposes a standard API key in browser code.';
