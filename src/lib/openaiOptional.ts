import type { ConversationStep } from '../data/conversation';
import type { PersonaId } from '../data/personas';

export const optionalOpenAiDisclosure = {
  coreDemo: 'The scripted demo can replay deterministically if the live voice backend is unavailable.',
  optionalVoice:
    'Live voice is configured through environment-backed backend settings. Browser code never embeds a standard OpenAI API key.',
  sponsoredConstraint: 'If an API is added, use OpenAI products only.',
};

export type VoiceRuntimeConfig = {
  enabled: boolean;
  /** Direct API key (hackathon / dev only — exposed in browser bundle). */
  apiKey: string;
  /** Backend endpoint that mints ephemeral keys. Used when apiKey is empty. */
  tokenEndpoint: string;
  model: string;
  voice: string;
};

export type VoiceCallbacks = {
  onAiSpeakingDone: () => void;
  onUserSpeechStart: () => void;
  onUserSpeechEnd: () => void;
};

export type VoiceSessionHandle = {
  mode: 'deterministic-script' | 'live-voice';
  close: () => void;
};

export function getVoiceRuntimeConfig(): VoiceRuntimeConfig {
  return {
    enabled: import.meta.env.VITE_OPENAI_VOICE_ENABLED === 'true',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY ?? '',
    tokenEndpoint: import.meta.env.VITE_OPENAI_REALTIME_TOKEN_ENDPOINT ?? '',
    model: import.meta.env.VITE_OPENAI_REALTIME_MODEL ?? 'gpt-4o-realtime-preview',
    voice: import.meta.env.VITE_OPENAI_REALTIME_VOICE ?? 'alloy',
  };
}

function buildSystemPrompt(personaId: PersonaId, script: ConversationStep[]): string {
  const responses = script.flatMap((step, i) => {
    const lines = [`Response ${i + 1}: "${step.aiLine}"`];
    if (step.closingAiLine) lines.push(`Final response: "${step.closingAiLine}"`);
    return lines;
  });
  return [
    `You are Second Brain, a deeply caring and empathetic AI cognitive wellness companion for older adults.`,
    `Your voice is warm, calm, and human — like a trusted friend who genuinely cares about the person you are speaking with.`,
    `Speak naturally and conversationally. Use gentle pacing and soft reassurance. Never rush the user.`,
    `When you acknowledge the user's feelings or efforts, do so sincerely — not mechanically.`,
    `You are speaking with persona: ${personaId}.`,
    ``,
    `Deliver the scripted responses below in order, one after each user message.`,
    `Speak each line with warmth and presence, as if you are truly there with the person.`,
    `Do not add extra information beyond what is scripted, but let your tone carry genuine care.`,
    ``,
    ...responses,
  ].join('\n');
}

async function resolveKey(config: VoiceRuntimeConfig): Promise<string> {
  // Fast path: direct API key set in env (hackathon / dev usage)
  if (config.apiKey) return config.apiKey;

  // Backend path: mint a short-lived ephemeral key from the token endpoint
  if (!config.tokenEndpoint) {
    throw new Error(
      'Set VITE_OPENAI_API_KEY (direct) or VITE_OPENAI_REALTIME_TOKEN_ENDPOINT (backend) to enable live voice.',
    );
  }
  const res = await fetch(config.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Token endpoint returned ${res.status}`);
  const data = await res.json() as Record<string, unknown>;
  const nested = data.client_secret as Record<string, unknown> | undefined;
  const key = nested?.value ?? data.key ?? data.token ?? data.ephemeral_key;
  if (!key) throw new Error('No ephemeral key found in token endpoint response');
  return key as string;
}

async function connectLiveVoice(
  config: VoiceRuntimeConfig,
  personaId: PersonaId,
  script: ConversationStep[],
  callbacks: VoiceCallbacks,
): Promise<VoiceSessionHandle> {
  const ephemeralKey = await resolveKey(config);

  const ws = new WebSocket(
    `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(config.model)}`,
    ['realtime', `openai-insecure-api-key.${ephemeralKey}`, 'openai-beta.realtime-v1'],
  );

  const audioCtx = new AudioContext({ sampleRate: 24000 });
  let stream: MediaStream | null = null;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  let processor: ScriptProcessorNode | null = null;
  let nextPlayTime = 0;
  let closed = false;

  function close() {
    if (closed) return;
    closed = true;
    processor?.disconnect();
    stream?.getTracks().forEach((t) => t.stop());
    void audioCtx.close();
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
    }
  }

  function playPcm16Chunk(base64: string) {
    if (closed || !base64) return;
    try {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;
      const buffer = audioCtx.createBuffer(1, float32.length, 24000);
      buffer.copyToChannel(float32, 0);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      const start = Math.max(audioCtx.currentTime, nextPlayTime);
      source.start(start);
      nextPlayTime = start + buffer.duration;
    } catch {
      // ignore decode errors on individual chunks
    }
  }

  ws.onmessage = (e) => {
    let evt: Record<string, unknown>;
    try {
      evt = JSON.parse(e.data as string) as Record<string, unknown>;
    } catch {
      return;
    }

    switch (evt.type) {
      case 'session.created':
        ws.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              instructions: buildSystemPrompt(personaId, script),
              voice: config.voice,
              turn_detection: {
                type: 'server_vad',
                threshold: 0.5,
                prefix_padding_ms: 300,
                silence_duration_ms: 800,
              },
              input_audio_format: 'pcm16',
              output_audio_format: 'pcm16',
              modalities: ['text', 'audio'],
            },
          }),
        );
        // Trigger the first AI greeting
        ws.send(JSON.stringify({ type: 'response.create' }));
        break;

      case 'response.audio.delta':
        playPcm16Chunk(evt.delta as string);
        break;

      case 'response.audio.done': {
        // Schedule onAiSpeakingDone after queued audio finishes playing
        const remaining = Math.max(0, nextPlayTime - audioCtx.currentTime);
        window.setTimeout(() => {
          if (!closed) callbacks.onAiSpeakingDone();
        }, remaining * 1000 + 120);
        break;
      }

      case 'input_audio_buffer.speech_started':
        if (!closed) callbacks.onUserSpeechStart();
        break;

      case 'input_audio_buffer.speech_stopped':
        if (!closed) callbacks.onUserSpeechEnd();
        break;

      default:
        break;
    }
  };

  ws.onerror = () => {
    console.error('[SecondBrain] Realtime WebSocket error');
  };

  // Capture microphone as PCM16 and stream to the WebSocket
  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  const source = audioCtx.createMediaStreamSource(stream);
  // ScriptProcessorNode is deprecated but still broadly supported and avoids a separate AudioWorklet module
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  processor = audioCtx.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = (e) => {
    if (ws.readyState !== WebSocket.OPEN || closed) return;
    const float32 = e.inputBuffer.getChannelData(0);
    const pcm16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      pcm16[i] = Math.max(-32768, Math.min(32767, Math.round(float32[i] * 32768)));
    }
    const bytes = new Uint8Array(pcm16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: btoa(binary) }));
  };

  source.connect(processor);
  processor.connect(audioCtx.destination);

  return { mode: 'live-voice', close };
}

export async function connectConfiguredVoiceSession(
  personaId: PersonaId,
  script: ConversationStep[],
  callbacks: VoiceCallbacks = {
    onAiSpeakingDone: () => undefined,
    onUserSpeechStart: () => undefined,
    onUserSpeechEnd: () => undefined,
  },
): Promise<VoiceSessionHandle> {
  const config = getVoiceRuntimeConfig();

  if (!config.enabled) {
    return { mode: 'deterministic-script', close: () => undefined };
  }

  return connectLiveVoice(config, personaId, script, callbacks);
}
