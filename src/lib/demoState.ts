export type DemoStage = 'personas' | 'companion' | 'dashboard';

export const demoStages: DemoStage[] = ['personas', 'companion', 'dashboard'];

export const stageLabels: Record<DemoStage, string> = {
  personas: 'Select Persona',
  companion: 'Live Demo',
  dashboard: 'Dashboard',
};

export function nextStage(stage: DemoStage): DemoStage {
  const index = demoStages.indexOf(stage);
  return demoStages[Math.min(index + 1, demoStages.length - 1)];
}

export function previousStage(stage: DemoStage): DemoStage {
  const index = demoStages.indexOf(stage);
  return demoStages[Math.max(index - 1, 0)];
}
