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
  bgImage: string;
};

export const personas: Persona[] = [
  {
    id: 'malee',
    label: 'Situation 1',
    name: 'Malee',
    age: 76,
    location: 'Bangkok',
    description: 'Her routine check-ins have been quietly flagged as early signs of MCI.',
    dashboardVariant: 'Daily routine check-ins',
    supportSignal: 'Agent check-in frequency has quietly increased over 3 months, driven by repeated queries about routine tasks she previously managed independently.',
    bgImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=80&fit=crop&crop=center',
  },
  {
    id: 'somchai',
    label: 'Situation 2',
    name: 'Somchai',
    age: 72,
    location: 'Chiang Mai',
    description: 'He thinks he\'s fine — but his interactions reveal subtle cognitive slips he hasn\'t noticed.',
    dashboardVariant: 'Judgment and social-cue perception',
    supportSignal: 'Social-cue checks and financial judgment support have increased across recent message-review tasks.',
    bgImage: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1600&q=80&fit=crop&crop=center',
  },
  {
    id: 'araya',
    label: 'Situation 3',
    name: 'Araya',
    age: 69,
    location: 'Bangkok',
    description: 'She actively monitors her own cognitive health to stay in control.',
    dashboardVariant: 'Financial instrumental ADLs',
    supportSignal: 'Financial decision support has increased over the past 3 months, especially during investment tradeoffs.',
    bgImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&fit=crop&crop=center',
  },
];

export const getPersona = (id: PersonaId) => personas.find((persona) => persona.id === id) ?? personas[0];
