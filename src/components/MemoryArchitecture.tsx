import { memoryStores } from '../data/memoryStores';
import { ArrowIcon, GraphIcon } from './Icons';

type Props = { onContinue: () => void; onBack: () => void };

export function MemoryArchitecture({ onContinue, onBack }: Props) {
  return (
    <section className="stack" aria-labelledby="memory-title">
      <div className="section-heading">
        <p className="eyebrow">Step 4 · architecture as diagnostic instrument</p>
        <h2 id="memory-title">Cognitively-inspired multi-store memory explains the support signal.</h2>
        <p>For the demo, stores are simulated but structured. They show how each memory layer contributes evidence to the dashboard.</p>
      </div>
      <div className="store-grid">
        {memoryStores.map((store, index) => (
          <article className={`store-card panel ${store.type}`} key={store.type}>
            <div className="store-index">{index + 1}</div>
            <h3>{store.title}</h3>
            <p className="store-subtitle">{store.subtitle}</p>
            <p>{store.demoRole}</p>
            <ul>
              {store.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div className="event-flow panel elevated">
        <GraphIcon />
        <div>
          <strong>Event flow:</strong>
          <p>Episodic evidence anchors the medication event, semantic context explains meaning, procedural signatures compare routine, and working memory guides today’s conversation.</p>
        </div>
      </div>
      <div className="button-row">
        <button className="secondary-action" onClick={onBack}>Back</button>
        <button className="primary-action" onClick={onContinue}>Open dashboard <ArrowIcon /></button>
      </div>
    </section>
  );
}
