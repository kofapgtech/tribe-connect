# Tribe Connect

A concierge-backed trip app for diaspora travelers in Ghana — built on the
*belonging → booking* vision from Jared Lewis's direction note and the
Expanded Wireframe V2. This repo is the **MVP clickable demo**: a guest-only
Expo app running entirely on **mock data** (no backend, auth, or payments yet).

See the full plan in the Tribe Connect project doc: *Tribe Connect MVP Plan*.

## Status — Phases 0–2

Done:
- Expo Router + TypeScript app (Expo SDK 58), four branded tabs
  (**Journey · Connect · Tribe · Exchange**; Exchange is a teaser).
- Brand design system (Diaspora Tribe colors, Zen Dots + Lato), mock-data layer
  shaped to swap for Supabase later.
- **Onboarding:** Welcome → Interests → Sub-interests → Tribe reveal (real
  interest→archetype rule, one of five tribes).
- **Storybook + group planning:** ideal journey (vibe + pace) → storybook
  chapters → invite + accept/decline join requests → group vision board with
  shared favorites and date voting. This covers **Handoff #1** (storybook →
  accepted group). The Journey tab reflects the saved plan.

Next phase: the booking handoff — booking review, pending → confirmed status,
countdown, and the arrive/host screens (Handoff #2).

## Run it

```bash
npm install
npx expo start
```

Then open in Expo Go (scan the QR), an iOS/Android simulator, or `w` for web.
For store builds you'll use EAS (`eas build` / `eas submit`) via Expo.dev.

## Project structure

```
src/
  app/                     # Expo Router routes (file-based)
    (onboarding)/          # welcome, interests, sub-interest, reveal
    (tabs)/                # journey, connect, tribe, exchange
    _layout.tsx            # root: fonts, providers, stack
  theme/                   # brand colors, typography, spacing (design tokens)
  components/              # Screen, Text, Button, Card
  state/                   # onboarding context (interest selections + tribe)
  data/                    # typed models + mock repositories + seed content
```

## Mock-data strategy

Screens never touch the store directly — they call repositories in `src/data`
(`getInterestCategories`, `revealTribe`, `getExperiences`, …) which return
promises with artificial latency. When we move to Supabase, we reimplement the
repositories and the screens stay untouched.

## Design notes / open items

- **Fonts:** Lato (body) + Zen Dots (headlines). The logo face *Bocures* is
  proprietary/logo-only — never used for UI text; the wordmark ships as an image.
- Tab icons are Ionicons placeholders — the brand calls for **Adinkra symbols**
  (arrow / broom / print / circle), still to be sourced and vetted.
- The 4th tab is **"Invest"** in the direction email and **"Exchange"** in the
  wireframe — working name is Exchange, to confirm.
