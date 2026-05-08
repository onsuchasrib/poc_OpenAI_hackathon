export type PersonaId = 'malee' | 'somchai' | 'araya';

export type Persona = {
  id: PersonaId;
  name: string;
  age: number;
  location: string;
  context: string;
  taskClue: string;
  focus: string;
  dashboardVariant: string;
  supportSignal: string;
};

export const personas: Persona[] = [
  {
    id: 'malee',
    name: 'Malee',
    age: 76,
    location: 'Bangkok',
    context: 'Retired teacher managing morning medicine with occasional support from her daughter.',
    taskClue: 'Ask Second Brain whether you took your morning medication. Try to recall before the log answers.',
    focus: 'Short-term and prospective medication recall',
    dashboardVariant: 'Medication memory support',
    supportSignal: 'Medication recall needed more cueing over 3 months, while recovery after a hint stayed stable.',
  },
  {
    id: 'somchai',
    name: 'Somchai',
    age: 72,
    location: 'Chiang Mai',
    context: 'Retired shop owner living alone; AGI often helps interpret messages and payment decisions.',
    taskClue: 'Review a suspicious prize message without letting AGI decide for you immediately.',
    focus: 'Social-cue perception and financial judgment',
    dashboardVariant: 'Hidden judgment support need',
    supportSignal: 'Social-cue checks and financial decision support increased as human-contact markers fell.',
  },
  {
    id: 'araya',
    name: 'Araya',
    age: 69,
    location: 'Bangkok',
    context: 'Retired accountant who wants to preserve monthly budgeting and basic investment reasoning.',
    taskClue: 'Think through monthly expenses before asking AGI to summarize or choose for you.',
    focus: 'Communication and financial instrumental ADL preservation',
    dashboardVariant: 'Capability inflation gap',
    supportSignal: 'Autonomous finance explanations shortened while AGI-assisted summaries stayed polished.',
  },
];

export const getPersona = (id: PersonaId) => personas.find((persona) => persona.id === id) ?? personas[0];
