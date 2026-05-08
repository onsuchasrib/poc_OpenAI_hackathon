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
        <p className="eyebrow">Page 1 · Select Persona</p>
        <h1 id="persona-title">Select persona</h1>
      </div>

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
