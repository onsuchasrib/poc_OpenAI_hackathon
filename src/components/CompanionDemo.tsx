import { useMemo, useState } from 'react';
import { maleeConversation } from '../data/conversation';
import { getPersona } from '../data/personas';
import { deterministicInteractionAdapter } from '../lib/interactionAdapter';
import type { PersonaId } from '../data/personas';
import { ArrowIcon, BrainIcon, CheckIcon } from './Icons';
import { SignalRail } from './SignalRail';

type Props = {
  personaId: PersonaId;
  onContinue: () => void;
  onBack: () => void;
};

export function CompanionDemo({ personaId, onContinue, onBack }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const persona = getPersona(personaId);
  const output = useMemo(
    () => deterministicInteractionAdapter.next({ stepIndex, context: 'concerning_trend' }),
    [stepIndex],
  );
  const step = output.step;

  const advance = () => setStepIndex((current) => Math.min(current + 1, maleeConversation.length - 1));
  const reset = () => setStepIndex(0);

  return (
    <section className="stack" aria-labelledby="companion-title">
      <div className="section-heading">
        <p className="eyebrow">Step 3 · companion interaction</p>
        <h2 id="companion-title">Second Brain asks for recall before answering.</h2>
        <p>{persona.taskClue}</p>
      </div>
      <div className="companion-layout">
        <article className="chat-panel panel elevated" aria-live="polite">
          <div className="task-card">
            <BrainIcon />
            <div>
              <span className="eyebrow">Role-play clue</span>
              <strong>{persona.name}: morning medication check</strong>
            </div>
          </div>
          <div className="cue-meter" aria-label={`Cue level ${stepIndex + 1} of ${maleeConversation.length}`}>
            {maleeConversation.map((cue, index) => (
              <span className={index <= stepIndex ? 'filled' : ''} key={cue.id}>{index + 1}</span>
            ))}
          </div>
          <div className="message user-message">
            <span>{persona.name}</span>
            <p>{step.userLine}</p>
          </div>
          <div className="message assistant-message">
            <span>Second Brain · {step.cueLevel}</span>
            <p>{step.assistantLine}</p>
          </div>
          <div className="helper-card">
            <CheckIcon />
            <p>{step.helper}</p>
          </div>
          <div className="button-row wrap">
            <button className="secondary-action" onClick={onBack}>Back</button>
            <button className="secondary-action" onClick={reset}>Restart clues</button>
            {!output.isComplete ? (
              <button className="primary-action" onClick={advance}>Continue clue ladder <ArrowIcon /></button>
            ) : (
              <button className="primary-action" onClick={onContinue}>Show memory instrument <ArrowIcon /></button>
            )}
          </div>
        </article>
        <SignalRail signal={output.emittedSignals} />
      </div>
    </section>
  );
}
