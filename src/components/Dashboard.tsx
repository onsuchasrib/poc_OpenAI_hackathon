import { useMemo } from 'react';
import { getPersona, type PersonaId } from '../data/personas';
import { buildDashboardSummary, getTrendDirection } from '../lib/trendEngine';
import { ChartIcon, PulseIcon, ShieldIcon } from './Icons';
import { getPersonaConversation } from '../data/conversation';

export type LiveSignal = {
  domain: string;
  assistanceLevel: string;
  recallGap: string;
  cueResponsiveness: string;
  latency: string;
  intensity?: string;
};

type Props = { selectedId: PersonaId };

type SummaryPanelProps = {
  personaId: PersonaId;
  liveSignal?: LiveSignal;
  compact?: boolean;
};

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

export function DashboardSummaryPanel({ personaId, liveSignal, compact = false }: SummaryPanelProps) {
  const persona = getPersona(personaId);
  const summary = useMemo(() => buildDashboardSummary(personaId), [personaId]);
  const conversation = useMemo(() => getPersonaConversation(personaId), [personaId]);
  const finalStep = conversation.at(-1);
  const trends = compact ? summary.trends.slice(0, 3) : summary.trends;

  return (
    <div className={`dashboard-summary ${compact ? 'compact-dashboard' : ''}`}>
      <div className="dashboard-hero panel elevated">
        <div>
          <p className="eyebrow">Clinician/caregiver dashboard</p>
          <h2>{persona.name}: support trend summary</h2>
          <p>{persona.supportSignal}</p>
        </div>
        <div className="support-badge" aria-label={`Support level ${summary.supportLevel}`}>
          <ShieldIcon /> {summary.supportLevel}
        </div>
      </div>

      {liveSignal && (
        <article className="panel live-signal-card" aria-live="polite">
          <div className="rail-title"><PulseIcon /> Detected during this spoken turn</div>
          <p><strong>{liveSignal.domain}</strong> · {liveSignal.assistanceLevel} · {liveSignal.intensity ?? 'adaptive'} friction</p>
          <p>{liveSignal.recallGap}. {liveSignal.cueResponsiveness}. {liveSignal.latency}.</p>
        </article>
      )}

      {finalStep && !compact && (
        <article className="panel session-outcome-card">
          <div className="rail-title"><PulseIcon /> Session outcome</div>
          <p><strong>Cognitive signals detected:</strong> {summary.trends.map((trend) => trend.label).join('; ')}</p>
          <p><strong>Cue level reached:</strong> {finalStep.cueLevel}</p>
          <p><strong>Conversation signal:</strong> {finalStep.signal.domain}. {finalStep.signal.recallGap}. {finalStep.signal.cueResponsiveness}.</p>
        </article>
      )}

      <div className="trend-grid">
        {trends.map((trend) => (
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
            {!compact && <p><strong>Uncertainty:</strong> {notice.uncertainty}</p>}
            <p><strong>Suggested next review:</strong> {notice.suggestion}</p>
          </article>
        ))}
      </section>

      <article className="panel masking-callout">
        <h3>Capability Inflation Detector</h3>
        <p>{summary.maskingSummary}</p>
        <div className="tag-cloud" aria-label="Task domains tracked for autonomous versus AGI-assisted completion">
          <span>Memory</span>
          <span>Planning</span>
          <span>Communication</span>
          <span>Financial management</span>
          <span>Daily routine</span>
        </div>
        <p>Message-writing and finance examples compare autonomous attempts with AGI-assisted outputs, then frame the gap as a support signal.</p>
        <p>This is a review signal for humans. It does not replace caregiver or clinician judgment.</p>
      </article>
    </div>
  );
}

export function Dashboard({ selectedId }: Props) {
  return (
    <section className="stack dashboard" aria-labelledby="dashboard-title">
      <aside className="demo-note clinical-note" aria-label="Clinical view note">
        ⓘ <strong>Clinical view</strong> — This data is intended for clinicians and caregivers to review the patient's cognitive performance. It is not shown to the user.
      </aside>
      <div className="section-heading">
        <p className="eyebrow">Page 3 · Dashboard</p>
        <h2 id="dashboard-title">Clinical review summary</h2>
        <p>Read-only synthetic longitudinal support signals. No diagnostic claims.</p>
      </div>

      <DashboardSummaryPanel personaId={selectedId} />
    </section>
  );
}
