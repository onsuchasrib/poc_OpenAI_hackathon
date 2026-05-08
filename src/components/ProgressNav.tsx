import { demoStages, stageLabels, type DemoStage } from '../lib/demoState';

type Props = {
  current: DemoStage;
  onSelect: (stage: DemoStage) => void;
};

export function ProgressNav({ current, onSelect }: Props) {
  const currentIndex = demoStages.indexOf(current);
  return (
    <nav className="progress-nav" aria-label="Demo progress">
      {demoStages.map((stage, index) => (
        <button
          key={stage}
          className={`progress-step ${stage === current ? 'active' : ''} ${index < currentIndex ? 'done' : ''}`}
          onClick={() => onSelect(stage)}
          aria-current={stage === current ? 'step' : undefined}
        >
          <span className="step-number">{index + 1}</span>
          <span>{stageLabels[stage]}</span>
        </button>
      ))}
    </nav>
  );
}
