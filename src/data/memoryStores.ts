export type StoreType = 'episodic' | 'semantic' | 'procedural' | 'working';

export type MemoryStore = {
  type: StoreType;
  title: string;
  subtitle: string;
  demoRole: string;
  items: string[];
};

export const memoryStores: MemoryStore[] = [
  {
    type: 'episodic',
    title: 'Episodic store',
    subtitle: 'Append-only event log',
    demoRole: 'Ground truth for what happened and when it was learned.',
    items: ['08:03 breakfast photo context', '08:12 blue pill box detected', '08:13 pill compartment opened', '08:15 asked AGI for confirmation'],
  },
  {
    type: 'semantic',
    title: 'Semantic store',
    subtitle: 'Life knowledge graph',
    demoRole: 'Connects people, places, routines, and meaning.',
    items: ['Pim is daughter', 'Pim visits twice a month', 'Green mug belongs to breakfast routine', 'Blue pill box means morning medicine'],
  },
  {
    type: 'procedural',
    title: 'Procedural store',
    subtitle: 'Routine signature model',
    demoRole: 'Compares today with habitual sequence and cue response.',
    items: ['Breakfast → tea → pill box', 'Usually confirms without direct answer', 'Bad-day mode lowers friction intensity', 'Trend-change period needs more hints'],
  },
  {
    type: 'working',
    title: 'Working memory',
    subtitle: 'Current model context',
    demoRole: 'Holds the active conversation and task clue only temporarily.',
    items: ['Selected persona: Malee', 'Current cue: specific visual anchor', 'Active safety boundary: answer after recall attempt', 'Dashboard preview: memory support need'],
  },
];
