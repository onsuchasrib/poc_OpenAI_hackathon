import { useCallback, useEffect, useRef, useState } from 'react';
import { CompanionDemo } from './components/CompanionDemo';
import { Dashboard } from './components/Dashboard';
import { PersonaSelector } from './components/PersonaSelector';
import type { PersonaId } from './data/personas';
import { nextStage, previousStage, stageLabels, type DemoStage } from './lib/demoState';

export default function App() {
  const [stage, setStage] = useState<DemoStage>('personas');
  const [personaId, setPersonaId] = useState<PersonaId | null>('somchai');
  const [conversationComplete, setConversationComplete] = useState(false);
  const [replayMode, setReplayMode] = useState(false);
  const autoDashboardTimerRef = useRef<number | null>(null);

  const canGoBack = stage !== 'personas';
  const canGoForward =
    (stage === 'personas' && personaId !== null) ||
    (stage === 'companion' && conversationComplete);

  const clearAutoDashboardTimer = () => {
    if (autoDashboardTimerRef.current === null) return;
    window.clearTimeout(autoDashboardTimerRef.current);
    autoDashboardTimerRef.current = null;
  };

  useEffect(() => () => clearAutoDashboardTimer(), []);

  const goBack = () => {
    if (!canGoBack) return;
    clearAutoDashboardTimer();
    if (stage === 'dashboard') {
      setReplayMode(true);
      setStage('companion');
      return;
    }
    setConversationComplete(false);
    setReplayMode(false);
    setStage(previousStage(stage));
  };

  const goForward = () => {
    if (!canGoForward) return;
    clearAutoDashboardTimer();
    if (stage === 'personas') {
      setConversationComplete(false);
      setReplayMode(false);
    }
    setStage((current) => nextStage(current));
  };

  const completeConversation = useCallback(() => {
    setConversationComplete(true);
    setReplayMode(false);
    if (autoDashboardTimerRef.current !== null) {
      window.clearTimeout(autoDashboardTimerRef.current);
      autoDashboardTimerRef.current = null;
    }
    autoDashboardTimerRef.current = window.setTimeout(() => {
      autoDashboardTimerRef.current = null;
      setStage('dashboard');
    }, 1500);
  }, []);

  const selectedPersonaId = personaId ?? 'malee';

  return (
    <div className="app-shell narrative-shell">
      <nav className="global-nav" aria-label="Demo page navigation">
        <button className="nav-button" onClick={goBack} disabled={!canGoBack} aria-label="Back">
          ← Back
        </button>
        <span className="page-indicator" aria-live="polite">{stageLabels[stage]}</span>
        <button className="nav-button" onClick={goForward} disabled={!canGoForward} aria-label="Forward">
          Forward →
        </button>
      </nav>

      <main id="main" className="main-content narrative-content">
        {stage === 'personas' && (
          <PersonaSelector
            selectedId={personaId}
            onSelect={(id) => {
              setPersonaId(id);
              setConversationComplete(false);
              setReplayMode(false);
              setStage('companion');
            }}
          />
        )}
        {stage === 'companion' && (
          <CompanionDemo
            key={`${selectedPersonaId}-${replayMode ? 'replay' : 'live'}`}
            personaId={selectedPersonaId}
            replayMode={replayMode}
            onConversationEnd={completeConversation}
          />
        )}
        {stage === 'dashboard' && <Dashboard selectedId={selectedPersonaId} />}
      </main>
    </div>
  );
}
