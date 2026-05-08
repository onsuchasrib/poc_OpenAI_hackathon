import { describe, expect, it } from 'vitest';
import { conversationByPersona } from './conversation';
import { personas } from './personas';
import { demoStages } from '../lib/demoState';

describe('PRD demo narrative fixtures', () => {
  it('keeps the app to the PRD three-page flow', () => {
    expect(demoStages).toEqual(['personas', 'companion', 'dashboard']);
  });

  it('keeps persona cards limited to the PRD short descriptions', () => {
    expect(personas.map(({ label, name, age, location, description }) => ({ label, name, age, location, description }))).toEqual([
      {
        label: 'Persona A',
        name: 'Malee',
        age: 76,
        location: 'Bangkok',
        description: 'I sometimes forget whether I took my medication this morning.',
      },
      {
        label: 'Persona B',
        name: 'Somchai',
        age: 72,
        location: 'Chiang Mai',
        description: 'I got a message saying I won a prize. Can you help me figure out what to do?',
      },
      {
        label: 'Persona C',
        name: 'Araya',
        age: 69,
        location: 'Bangkok',
        description: 'I want to review my monthly expenses and think through an investment option myself.',
      },
    ]);
  });

  it('uses the PRD recommended user dialogue sequence for each persona', () => {
    expect(conversationByPersona.malee.map((step) => step.userLine)).toEqual([
      'Did I take my blood pressure pill this morning?',
      "I usually wash my cup… but I can't remember if I took it.",
      "It's the blue one, near the sink.",
    ]);

    expect(conversationByPersona.somchai.map((step) => step.userLine)).toEqual([
      'I got a message that I won a prize. They want me to send 500 baht to claim it. Should I just send it?',
      "No, I don't know them, but it says it's urgent.",
      "No, I don't think so.",
    ]);

    expect(conversationByPersona.araya.map((step) => step.userLine)).toEqual([
      'I want to go over my expenses this month and decide between two savings options, but I want to think it through myself.',
      'I think it was utilities… or maybe groceries?',
      "Stability, I think. I don't want to risk losing money.",
    ]);
  });

  it('uses the PRD AI voice lines, including final closing lines', () => {
    expect(conversationByPersona.malee.flatMap((step) => [step.aiLine, step.closingAiLine].filter(Boolean))).toEqual([
      'Good morning, Malee. How can I help you today?',
      "Let's think back together. What do you usually do right after breakfast?",
      "That's okay. Do you remember what color your pill box is, and where you keep it?",
      'Good. Based on your log from this morning, your blue box was opened at 7:42 AM. It looks like you did take it. Well done for keeping your routine.',
    ]);

    expect(conversationByPersona.somchai.flatMap((step) => [step.aiLine, step.closingAiLine].filter(Boolean))).toEqual([
      'Hello, Somchai. How can I help you today?',
      'Before we do anything, can you tell me — do you recognize the name of who sent this message?',
      "When a message is urgent and asks for money from someone you don't know, that's usually a warning sign. Has anyone you trust — like family or your bank — ever told you about this sender?",
      "I'd recommend not sending anything yet. Let's save this message and you can verify it with your bank or a family member first. I'll flag this for your caregiver to review.",
    ]);

    expect(conversationByPersona.araya.flatMap((step) => [step.aiLine, step.closingAiLine].filter(Boolean))).toEqual([
      'Hello, Araya. How can I help you today?',
      "Of course. Let's start with your expenses. Looking at this month, which category do you think was your largest spending area?",
      'Your top two were utilities at 3,200 baht and groceries at 2,800 baht. You were close. Now, for your two savings options — Option A gives 2.5% fixed return, Option B gives up to 4% but with variable risk. What matters most to you right now — stability or growth?',
      "That's a clear and sound preference. Option A would align with that goal. You've reasoned through this well, Araya. I'll note your decision and reasoning in your record.",
    ]);
  });
});
