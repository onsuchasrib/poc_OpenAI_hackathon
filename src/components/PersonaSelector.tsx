import { personas, type PersonaId } from '../data/personas';

type Props = {
  selectedId: PersonaId | null;
  onSelect: (id: PersonaId) => void;
};

export function PersonaSelector({ selectedId, onSelect }: Props) {
  return (
    <section className="persona-page" aria-labelledby="persona-title">
      <aside className="demo-note" aria-label="Demo note">
        ⓘ <strong>Demo only</strong> — This is not the actual user interface. This screen demonstrates the interaction between the user and the AGI companion.
      </aside>

      <div className="section-heading minimal-heading">
        <h1 id="persona-title">Second Brain</h1>
        <p className="demo-intro">This demo walks through three everyday Thai life situations where an AGI companion quietly supports cognitive health</p>
      </div>

      <ol className="demo-steps" aria-label="Demo steps">
        <li className="demo-step demo-step--active">
          <span className="demo-step__num">1</span>
          <div>
            <strong>Select a situation</strong>
            <p>Choose one of three Thai life scenarios: <em>morning kitchen routine</em>, <em>lottery scam judgment</em>, or <em>mutual fund decision</em>.</p>
          </div>
        </li>
        <li className="demo-step">
          <span className="demo-step__num">2</span>
          <div>
            <strong>Live AI conversation</strong>
            <p>Hear Second Brain guide the person through their situation in real time — and follow along with a suggested response.</p>
          </div>
        </li>
        <li className="demo-step">
          <span className="demo-step__num">3</span>
          <div>
            <strong>Dashboard review</strong>
            <p>See how the AI's cognitive support signals are captured and surfaced to a family caregiver.</p>
          </div>
        </li>
      </ol>

      <div className="persona-grid narrative-personas">
        {personas.map((persona) => (
          <button
            className={`persona-card panel ${persona.id === selectedId ? 'selected' : ''}`}
            key={persona.id}
            onClick={() => onSelect(persona.id)}
            aria-pressed={persona.id === selectedId}
            aria-label={`${persona.label}: ${persona.name}, ${persona.age}, ${persona.location}. ${persona.description}`}
          >
            <span className="persona-topline">{persona.label} — {persona.name}, {persona.age}, {persona.location}</span>
            <p>“{persona.description}”</p>
          </button>
        ))}
      </div>
    </section>
  );
}
