import { validationReadiness } from '../data/demoSignals';

export function ValidationReadiness() {
  return (
    <section className="panel validation" aria-labelledby="validation-title">
      <div className="section-heading compact">
        <p className="eyebrow">Validation readiness</p>
        <h3 id="validation-title">What real longitudinal data would validate later?</h3>
      </div>
      <div className="validation-grid">
        {validationReadiness.map((item) => (
          <article className="validation-card" key={item.signal}>
            <strong>{item.signal}</strong>
            <p><span>Future data:</span> {item.futureData}</p>
            <p><span>Question:</span> {item.validationQuestion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
