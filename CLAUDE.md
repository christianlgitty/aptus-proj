# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (opens Expo CLI to choose platform)
npm start

# Launch directly on a specific platform
npm run android
npm run ios
npm run web
```

There is no lint or test script configured. TypeScript checking is the primary static validation — the tsconfig uses `"strict": false` but `typedRoutes` is enabled via Expo experiments.

## Architecture

Aptus is a React Native / Expo app for discovering and sharing endurance sports events (running, cycling, triathlon). It uses **Expo Router** with file-based routing.

### Routing structure

```
app/
  _layout.tsx          # Root Stack navigator (headerShown: true)
  (tabs)/
    _layout.tsx        # Bottom tab navigator (5 tabs)
    index.tsx          # Home — animated hero + featured events
    search.tsx         # Browse all events
    feed.tsx           # Community activity feed
    create-post.tsx    # Post creation
    saved.tsx          # Saved races
  event/
    _layout.tsx        # Stack for event detail
    [id].tsx           # Event detail page (dynamic route)
```

The root layout uses a `Stack` and the `(tabs)` group uses `Tabs` from `expo-router`. Event detail lives outside the tabs group so it renders as a full-screen stack push.

### Data layer

All data is currently mocked:
- `lib/mockEvents.ts` — shared `Event[]` used by the home screen and search
- `app/event/[id].tsx` — contains its own `MOCK_EVENTS` record with richer detail fields (price, registration status, official site URL)
- `app/(tabs)/feed.tsx` — contains inline `mockPosts` array

The `Event` type (`lib/types.ts`) defines the shared shape: `id`, `name`, `location`, `date`, and `sport` (union of `"Running" | "Cycling" | "Triathlon" | "Hybrid"`).

### Theming

`lib/theme.ts` exports a `theme` object with `colors`, `spacing`, and `radius` tokens. Use these in `StyleSheet.create` calls rather than hardcoded hex values. The palette is dark-mode only (dark graphite background `#0B0F14`, cyan accent `#00E5FF`).

### Shared components

- `components/screen.tsx` — `Screen` wraps content in `SafeAreaView` with the background color and base padding applied. Use it as the root element on every screen.
- `components/EventCard.tsx` — displays a single event row (sport tag, name, location/date).

### Animations

The home screen (`app/(tabs)/index.tsx`) uses React Native's `Animated` API (not Reanimated) for entry animations and the rotating hero icon. `react-native-reanimated` is installed but not yet used.
