# Second Brain Demo

OpenAI Codex x AIAT Hackathon Thailand demo app.

Second Brain is a responsive, stakeholder-facing demo for cognitive wellness support in a post-AGI era. It shows how AGI can mask functional change and how a dignity-first support layer can turn interaction patterns into human-reviewed support signals.

## Demo scope

- Static React + Vite + TypeScript app.
- Synthetic data only; no real patient data.
- Deterministic no-drop-off golden path for Malee's medication routine.
- Somchai and Araya dashboard variants for social-cue, finance, communication, and capability-inflation signals.
- Non-diagnostic language: outputs are support trends and review prompts, not medical conclusions.

## Simulated voice disclosure

This MVP uses simulated voice-like transcript controls. No live voice, microphone streaming, or OpenAI API key is required for the core demo.

If a future live OpenAI voice enhancement is added, it must use a backend or serverless token endpoint that keeps `OPENAI_API_KEY` server-side and mints ephemeral Realtime client secrets. Do not expose a standard API key in browser code.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run test
npm run build
```

## Deploy

The core demo builds as static assets in `dist/` and can be deployed to Vercel or GitHub Pages. No environment variables are needed for the static demo.

## Architecture concept

The UI presents cognitively-inspired multi-store memory as the diagnostic instrument:

- Episodic store: append-only event log.
- Semantic store: life knowledge graph.
- Procedural store: routine signature model.
- Working memory: current conversation context.

These stores are simulated for the hackathon MVP, but their data shapes are explicit so the dashboard claims are traceable.
