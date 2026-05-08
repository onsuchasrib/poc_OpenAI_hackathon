import { useState } from 'react';
import { ConsentBoundary } from './components/ConsentBoundary';
import { CompanionDemo } from './components/CompanionDemo';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';
import { MemoryArchitecture } from './components/MemoryArchitecture';
import { PersonaSelector } from './components/PersonaSelector';
import { ProgressNav } from './components/ProgressNav';
import type { PersonaId } from './data/personas';
import { nextStage, previousStage, type DemoStage } from './lib/demoState';

export default function App() {
  const [stage, setStage] = useState<DemoStage>('landing');
  const [personaId, setPersonaId] = useState<PersonaId>('malee');

  const goNext = () => setStage((current) => nextStage(current));
  const goBack = () => setStage((current) => previousStage(current));
  const restart = () => {
    setPersonaId('malee');
    setStage('landing');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand" aria-label="Second Brain home">
          <span className="brand-mark" aria-hidden="true">SB</span>
          <div>
            <strong>Second Brain</strong>
            <span>Cognitive wellness support demo</span>
          </div>
        </div>
        <p className="header-note">Static, synthetic, non-diagnostic MVP</p>
      </header>
      <ProgressNav current={stage} onSelect={setStage} />
      <main id="main" className="main-content">
        {stage === 'landing' && <Landing onStart={() => setStage('personas')} />}
        {stage === 'personas' && <PersonaSelector selectedId={personaId} onSelect={setPersonaId} onContinue={goNext} />}
        {stage === 'consent' && <ConsentBoundary onBack={goBack} onContinue={goNext} />}
        {stage === 'companion' && <CompanionDemo personaId={personaId} onBack={goBack} onContinue={goNext} />}
        {stage === 'architecture' && <MemoryArchitecture onBack={goBack} onContinue={goNext} />}
        {stage === 'dashboard' && <Dashboard selectedId={personaId} onBack={goBack} onRestart={restart} />}
      </main>
    </div>
  );
}
