import { ArrowIcon, BrainIcon, ChartIcon, ShieldIcon } from './Icons';

type Props = { onStart: () => void };

export function Landing({ onStart }: Props) {
  return (
    <section className="hero-grid" aria-labelledby="hero-title">
      <div className="hero-copy panel elevated">
        <p className="eyebrow">OpenAI hackathon demo · static core · no API key required</p>
        <h1 id="hero-title">Second Brain makes AGI-masked support needs visible.</h1>
        <p className="lead">
          In a post-AGI world, people may seem independent because an assistant remembers, writes, plans, and decides for them.
          This demo shows a dignity-first support loop that asks for recall, anchors reality, and summarizes trends for human review.
        </p>
        <div className="hero-actions">
          <button className="primary-action" onClick={onStart}>
            Start the 60-second demo <ArrowIcon />
          </button>
          <span className="disclosure-pill">Simulated voice-like transcript controls</span>
        </div>
      </div>
      <div className="hero-instrument panel" aria-label="Second Brain loop preview">
        <div className="instrument-node active"><BrainIcon /> Cognitive friction</div>
        <div className="instrument-line" />
        <div className="instrument-node"><ShieldIcon /> Reality Anchor</div>
        <div className="instrument-line" />
        <div className="instrument-node"><ChartIcon /> Support trends</div>
        <div className="instrument-note">
          <strong>Core safety frame:</strong> support recommendations, not medical conclusions.
        </div>
      </div>
    </section>
  );
}
