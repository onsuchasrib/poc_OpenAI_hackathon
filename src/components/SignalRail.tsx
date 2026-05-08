import type { ConversationStep } from '../data/conversation';
import { PulseIcon } from './Icons';

type Props = { signal: ConversationStep['signal'] & { intensity?: string; rationale?: string } };

export function SignalRail({ signal }: Props) {
  const items = [
    ['Assistance level', signal.assistanceLevel],
    ['Recall gap', signal.recallGap],
    ['Domain', signal.domain],
    ['Cue responsiveness', signal.cueResponsiveness],
    ['Latency', signal.latency],
  ];
  return (
    <aside className="signal-rail panel" aria-label="Structured signals emitted by this interaction">
      <div className="rail-title"><PulseIcon /> Live support signals</div>
      {items.map(([label, value]) => (
        <div className="signal-item" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
      {signal.rationale && <p className="rationale"><strong>Friction policy:</strong> {signal.rationale}</p>}
    </aside>
  );
}
