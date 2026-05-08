import { optionalOpenAiDisclosure } from '../lib/openaiOptional';
import { ArrowIcon, LockIcon, ShieldIcon } from './Icons';

type Props = { onContinue: () => void; onBack: () => void };

const sources = ['Medication reminder events', 'Routine photo context', 'Conversation transcript', 'Calendar clinic visit', 'Synthetic trend history'];

export function ConsentBoundary({ onContinue, onBack }: Props) {
  return (
    <section className="stack" aria-labelledby="consent-title">
      <div className="section-heading">
        <p className="eyebrow">Step 2 · consent and data boundary</p>
        <h2 id="consent-title">This stakeholder demo uses synthetic data only.</h2>
        <p>No raw surveillance feed is shown. Caregivers and clinicians see concise support trends and review prompts.</p>
      </div>
      <div className="two-column">
        <article className="panel elevated">
          <LockIcon />
          <h3>Visible demo boundary</h3>
          <p className="voice-disclosure">This demo uses simulated voice-like transcript controls. {optionalOpenAiDisclosure.coreDemo}</p>
          <ul className="check-list">
            <li>No real patient data</li>
            <li>No diagnosis or treatment decision</li>
            <li>No client-side API secret</li>
          </ul>
        </article>
        <article className="panel">
          <ShieldIcon />
          <h3>Synthetic context sources</h3>
          <div className="tag-cloud">
            {sources.map((source) => <span key={source}>{source}</span>)}
          </div>
        </article>
      </div>
      <div className="button-row">
        <button className="secondary-action" onClick={onBack}>Back</button>
        <button className="primary-action" onClick={onContinue}>Begin companion loop <ArrowIcon /></button>
      </div>
    </section>
  );
}
