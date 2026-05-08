import { useMemo, useState } from 'react';
import { getPersona, personas, type PersonaId } from '../data/personas';
import { buildDashboardSummary, getTrendDirection } from '../lib/trendEngine';
import { ChartIcon, PulseIcon, ShieldIcon } from './Icons';
import { ValidationReadiness } from './ValidationReadiness';

type Props = { selectedId: PersonaId; onRestart: () => void; onBack: () => void };

function MiniLine({ points, label }: { points: { month: string; value: number }[]; label: string }) {
  const max = Math.max(...points.map((point) => point.value));
  const min = Math.min(...points.map((point) => point.value));
  const range = Math.max(1, max - min);
  const path = points
    .map((point, index) => {
      const x = (index / Math.max(1, points.length - 1)) * 100;
      const y = 42 - ((point.value - min) / range) * 34;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  return (
    <svg className="mini-line" viewBox="0 0 100 48" role="img" aria-label={`${label} trend from ${points[0]?.month} to ${points.at(-1)?.month}`}>
      <path d="M0 42 H100" className="axis" />
      <path d={path} className="trend-path" />
      {points.map((point, index) => {
        const x = (index / Math.max(1, points.length - 1)) * 100;
        const y = 42 - ((point.value - min) / range) * 34;
        return <circle key={point.month} cx={x} cy={y} r="2.6" />;
      })}
    </svg>
  );
}

export function Dashboard({ selectedId, onRestart, onBack }: Props) {
  const [activePersona, setActivePersona] = useState<PersonaId>(selectedId);
  const persona = getPersona(activePersona);
  const summary = useMemo(() => buildDashboardSummary(activePersona), [activePersona]);

  return (
    <section className="stack dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard-hero panel elevated">
        <div>
          <p className="eyebrow">Step 5 · clinician/caregiver dashboard</p>
          <h2 id="dashboard-title">{persona.name}: support trend summary</h2>
          <p>{persona.supportSignal}</p>
        </div>
        <div className="support-badge" aria-label={`Support level ${summary.supportLevel}`}>
          <ShieldIcon /> {summary.supportLevel}
        </div>
      </div>

      <div className="variant-tabs" role="tablist" aria-label="Persona dashboard variants">
        {personas.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activePersona === item.id}
            className={activePersona === item.id ? 'active' : ''}
            onClick={() => setActivePersona(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="trend-grid">
        {summary.trends.map((trend) => (
          <article className={`trend-card panel ${trend.status}`} key={trend.id}>
            <div className="trend-heading">
              <ChartIcon />
              <div>
                <h3>{trend.label}</h3>
                <span>{trend.delta}</span>
              </div>
            </div>
            <MiniLine points={trend.points} label={trend.label} />
            <p>{trend.explanation}</p>
            <small>{trend.confidence} · Direction: {getTrendDirection(trend)}</small>
          </article>
        ))}
      </div>

      <section className="notice-grid" aria-label="Necessary notices">
        {summary.notices.map((notice) => (
          <article className="notice-card panel" key={notice.title}>
            <div className="rail-title"><PulseIcon /> Necessary notice</div>
            <h3>{notice.title}</h3>
            <p><strong>Why surfaced:</strong> {notice.why}</p>
            <p><strong>Uncertainty:</strong> {notice.uncertainty}</p>
            <p><strong>Suggested next review:</strong> {notice.suggestion}</p>
          </article>
        ))}
      </section>

      <article className="panel masking-callout">
        <h3>Capability Inflation Detector</h3>
        <p>{summary.maskingSummary}</p>
        <p>This is a review signal for humans. It does not replace caregiver or clinician judgment.</p>
      </article>

      <ValidationReadiness />

      <div className="button-row wrap">
        <button className="secondary-action" onClick={onBack}>Back to memory instrument</button>
        <button className="primary-action" onClick={onRestart}>Restart full demo</button>
      </div>
    </section>
  );
}
