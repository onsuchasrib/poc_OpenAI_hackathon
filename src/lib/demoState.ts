export type DemoStage = 'landing' | 'personas' | 'consent' | 'companion' | 'architecture' | 'dashboard';

export const demoStages: DemoStage[] = ['landing', 'personas', 'consent', 'companion', 'architecture', 'dashboard'];

export const stageLabels: Record<DemoStage, string> = {
  landing: 'Thesis',
  personas: 'Persona',
  consent: 'Data boundary',
  companion: 'Companion loop',
  architecture: 'Memory instrument',
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
