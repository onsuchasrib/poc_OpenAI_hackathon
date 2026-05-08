export type PersonaId = 'malee' | 'somchai' | 'araya';

export type Persona = {
  id: PersonaId;
  label: string;
  name: string;
  age: number;
  location: string;
  description: string;
  dashboardVariant: string;
  supportSignal: string;
};

export const personas: Persona[] = [
  {
    id: 'malee',
    label: 'Persona A',
    name: 'Malee',
    age: 76,
    location: 'Bangkok',
    description: 'I sometimes forget whether I took my medication this morning.',
    dashboardVariant: 'Medication memory',
    supportSignal: 'Short-term medication recall has decreased over 3 months while cue responsiveness remains stable.',
  },
  {
    id: 'somchai',
    label: 'Persona B',
    name: 'Somchai',
    age: 72,
    location: 'Chiang Mai',
    description: 'I got a message saying I won a prize. Can you help me figure out what to do?',
    dashboardVariant: 'Judgment and social-cue perception',
    supportSignal: 'Social-cue checks and financial judgment support have increased across recent message-review tasks.',
  },
  {
    id: 'araya',
    label: 'Persona C',
    name: 'Araya',
    age: 69,
    location: 'Bangkok',
    description: 'I want to review my monthly expenses and think through an investment option myself.',
    dashboardVariant: 'Financial instrumental ADLs',
    supportSignal: 'Financial decision support has increased over the past 3 months, especially during budgeting tradeoffs.',
  },
];

export const getPersona = (id: PersonaId) => personas.find((persona) => persona.id === id) ?? personas[0];
