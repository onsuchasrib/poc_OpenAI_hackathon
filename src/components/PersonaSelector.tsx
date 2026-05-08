import { personas, type PersonaId } from '../data/personas';
import { ArrowIcon, CheckIcon } from './Icons';

type Props = {
  selectedId: PersonaId;
  onSelect: (id: PersonaId) => void;
  onContinue: () => void;
};

export function PersonaSelector({ selectedId, onSelect, onContinue }: Props) {
  return (
    <section className="stack" aria-labelledby="persona-title">
      <div className="section-heading">
        <p className="eyebrow">Step 1 · choose a role-play persona</p>
        <h2 id="persona-title">Start with Malee for the polished medication memory loop.</h2>
        <p>Somchai and Araya stay available as dashboard variants so judges can see broader support signals.</p>
      </div>
      <div className="persona-grid">
        {personas.map((persona) => (
          <button
            className={`persona-card panel ${persona.id === selectedId ? 'selected' : ''}`}
            key={persona.id}
            onClick={() => onSelect(persona.id)}
            aria-pressed={persona.id === selectedId}
          >
            <span className="persona-topline">
              <span>{persona.name}, {persona.age}</span>
              {persona.id === selectedId && <CheckIcon label="Selected" />}
            </span>
            <strong>{persona.dashboardVariant}</strong>
            <span>{persona.location}</span>
            <p>{persona.context}</p>
            <small>{persona.focus}</small>
          </button>
        ))}
      </div>
      <button className="primary-action align-start" onClick={onContinue}>
        Continue with selected persona <ArrowIcon />
      </button>
    </section>
  );
}
