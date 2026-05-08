import { useEffect, useMemo, useRef, useState } from 'react';
import { getPersonaConversation } from '../data/conversation';
import { deterministicInteractionAdapter } from '../lib/interactionAdapter';
import { connectConfiguredVoiceSession, type VoiceCallbacks, type VoiceSessionHandle } from '../lib/openaiOptional';
import { getPersona, type PersonaId } from '../data/personas';

type Props = {
  personaId: PersonaId;
  replayMode: boolean;
  onConversationEnd: () => void;
};

type VoiceState = 'CONNECTING' | 'AI_SPEAKING' | 'WAITING_FOR_USER' | 'USER_SPEAKING' | 'CONVERSATION_END';

const CONNECTING_MS = 650;
const AI_TURN_MS = 2300;
const USER_WAIT_MS = 1800;
const USER_SPEAKING_MS = 1500;

const statusLabel: Record<VoiceState, string> = {
  CONNECTING: 'Connecting…',
  AI_SPEAKING: 'Second Brain is speaking…',
  WAITING_FOR_USER: 'Listening…',
  USER_SPEAKING: 'Listening…',
  CONVERSATION_END: 'Conversation complete.',
};

export function CompanionDemo({ personaId, replayMode, onConversationEnd }: Props) {
  const persona = useMemo(() => getPersona(personaId), [personaId]);
  const conversation = useMemo(() => getPersonaConversation(personaId), [personaId]);
  const [voiceState, setVoiceState] = useState<VoiceState>(replayMode ? 'CONVERSATION_END' : 'CONNECTING');
  const [stepIndex, setStepIndex] = useState(replayMode ? conversation.length - 1 : 0);
  const [isClosingTurn, setIsClosingTurn] = useState(replayMode);
  const [isLiveVoice, setIsLiveVoice] = useState(false);

  const hasEndedRef = useRef(replayMode);
  const isClosingTurnRef = useRef(replayMode);
  const voiceSessionRef = useRef<VoiceSessionHandle | null>(null);

  const output = useMemo(
    () => deterministicInteractionAdapter.next({ stepIndex, context: 'concerning_trend', personaId }),
    [personaId, stepIndex],
  );

  // Connect / disconnect voice session
  useEffect(() => {
    hasEndedRef.current = replayMode;
    isClosingTurnRef.current = replayMode;
    setStepIndex(replayMode ? conversation.length - 1 : 0);
    setIsClosingTurn(replayMode);
    setVoiceState(replayMode ? 'CONVERSATION_END' : 'CONNECTING');
    setIsLiveVoice(false);

    if (replayMode) return;

    let cancelled = false;

    const liveCallbacks: VoiceCallbacks = {
      onAiSpeakingDone: () => {
        if (cancelled) return;
        if (isClosingTurnRef.current) {
          setVoiceState('CONVERSATION_END');
          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            onConversationEnd();
          }
        } else {
          setVoiceState('WAITING_FOR_USER');
        }
      },
      onUserSpeechStart: () => {
        if (!cancelled) setVoiceState('USER_SPEAKING');
      },
      onUserSpeechEnd: () => {
        if (cancelled) return;
        setStepIndex((current) => {
          if (current >= conversation.length - 1) {
            isClosingTurnRef.current = true;
            return current;
          }
          return current + 1;
        });
        setVoiceState('AI_SPEAKING');
      },
    };

    void connectConfiguredVoiceSession(personaId, conversation, liveCallbacks).then((session) => {
      if (cancelled) {
        session.close();
        return;
      }
      voiceSessionRef.current = session;
      setIsLiveVoice(session.mode === 'live-voice');
      window.setTimeout(() => {
        if (!cancelled) setVoiceState('AI_SPEAKING');
      }, CONNECTING_MS);
    });

    return () => {
      cancelled = true;
      voiceSessionRef.current?.close();
      voiceSessionRef.current = null;
      setIsLiveVoice(false);
    };
  }, [conversation, personaId, replayMode, onConversationEnd]);

  // Deterministic timer-based state machine — only active when NOT in live voice mode
  useEffect(() => {
    if (replayMode || isLiveVoice || voiceState === 'CONNECTING' || voiceState === 'CONVERSATION_END') return;

    const timer = window.setTimeout(() => {
      if (voiceState === 'AI_SPEAKING') {
        if (isClosingTurn) {
          setVoiceState('CONVERSATION_END');
          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            onConversationEnd();
          }
          return;
        }
        setVoiceState('WAITING_FOR_USER');
        return;
      }

      if (voiceState === 'WAITING_FOR_USER') {
        setVoiceState('USER_SPEAKING');
        return;
      }

      if (voiceState === 'USER_SPEAKING') {
        if (stepIndex >= conversation.length - 1) {
          isClosingTurnRef.current = true;
          setIsClosingTurn(true);
        } else {
          setStepIndex((current) => Math.min(current + 1, conversation.length - 1));
        }
        setVoiceState('AI_SPEAKING');
      }
    }, voiceState === 'AI_SPEAKING' ? AI_TURN_MS : voiceState === 'WAITING_FOR_USER' ? USER_WAIT_MS : USER_SPEAKING_MS);

    return () => window.clearTimeout(timer);
  }, [conversation.length, isClosingTurn, isLiveVoice, onConversationEnd, replayMode, stepIndex, voiceState]);

  const showSuggestedResponse = voiceState === 'WAITING_FOR_USER' || voiceState === 'USER_SPEAKING';
  const suggestedResponse = replayMode ? 'Conversation complete.' : output.step.userLine;

  return (
    <section
      className="voice-page"
      aria-label="Live voice interaction"
      style={{
        backgroundImage: `url(${persona.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="voice-stability-note" aria-label="Stability notice">
        ⚠ AI real voice may not be stable
      </div>

      <div className={`live-status-pill ${voiceState.toLowerCase().replaceAll('_', '-')} `} aria-live="polite">
        <span className="status-dot" aria-hidden="true" />
        <span>{statusLabel[voiceState]}</span>
      </div>

      <div className="voice-persona-banner" aria-label="Current scenario">
        <span className="voice-persona-banner__step">Step 2 of 3</span>
        <span className="voice-persona-banner__name">{persona.name} · {persona.age} · {persona.location}</span>
      </div>

      <div className={`suggested-response ${voiceState === 'USER_SPEAKING' ? 'dimmed' : ''}`} aria-live="polite">
        {showSuggestedResponse ? (
          <>
            <span className="suggested-label">💬 Your suggested response:</span>
            <p className="recommended-line">{suggestedResponse}</p>
          </>
        ) : voiceState === 'CONVERSATION_END' ? (
          <p className="recommended-line">Conversation complete.</p>
        ) : (
          <p className="voice-placeholder">{voiceState === 'AI_SPEAKING' ? 'Second Brain is speaking. Your suggested response will appear when it is your turn.' : 'Preparing the live voice session…'}</p>
        )}
      </div>
    </section>
  );
}
