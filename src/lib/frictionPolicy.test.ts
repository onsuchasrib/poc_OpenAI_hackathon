import { describe, expect, it } from 'vitest';
import { maleeConversation } from '../data/conversation';
import { decideFriction } from './frictionPolicy';

const [openRecall,, directAnswer] = maleeConversation;

describe('decideFriction', () => {
  it('reduces friction on bad days without direct answer before fallback', () => {
    const decision = decideFriction(openRecall, 'bad_day');
    expect(decision.intensity).toBe('low');
    expect(decision.canDirectAnswer).toBe(false);
    expect(decision.intervention).toBe('retrieval_prompt');
  });

  it('allows direct support after the supported recall ladder', () => {
    const decision = decideFriction(directAnswer, 'concerning_trend');
    expect(decision.intensity).toBe('safety_override');
    expect(decision.canDirectAnswer).toBe(true);
    expect(decision.intervention).toBe('direct_answer');
  });
});
