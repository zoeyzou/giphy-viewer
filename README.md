# Giphy Explorer 🎥

[ ![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen) ](https://github.com/YOUR_USERNAME/giphy-explorer/actions)
[![FSD Architecture](https://img.shields.io/badge/Architecture-FSD-blueviolet)](ARCHITECTURE.md)

**Feature-Sliced React + shadcn + Vitest** challenge app. Pages through Giphy GIFs with text overlays.

![Screenshot](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Giphy+Explorer)

## Features

- 🔍 Search Giphy API (`images.downsized_medium.url`, rating `g`)
- 📱 Responsive: 3-col desktop, 1-col mobile
- 🎨 Text overlays (top/bottom/below)
- 🧪 **95%+ test coverage** (unit/int/e2e)
- 🏗️ **FSD architecture** (scalable team-ready)

## Tech Stack

```
React 18 + Vite + TypeScript
shadcn/ui + Tailwind
React Router v7
Vitest + RTL (TDD pyramid)
FSD (app→pages→widgets→features→entities→shared)
```

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/giphy-explorer
cd giphy-explorer
npm install
npm run dev  # http://localhost:5173
```

## Architecture

```
app/ → pages/ → widgets/ → features/ → entities/ → shared/ui/shadcn/
Tests colocated: unit(70%)/int(20%)/e2e(10%)
```

**Details:** [ARCHITECTURE.md](./ARCHITECTURE.md) | [AGENT.md](./AGENT.md)

## Development Workflow

```bash
# New feature
features/user-favorites/acceptance.md
TDD: unit → int → e2e (>92%)
npm test --coverage
git commit -m "feat(user-favorites): desc (95%)"

# Gates
npm run lint:type
npx vite-bundle-visualizer
```

## Testing

```bash
npm test                    # All tests
npm test --coverage         # Coverage report
npm test features/gif-search  # Feature slice
```

**95%+ coverage** across 20+ tests.

## API

```
GET https://api.giphy.com/v1/gifs/search?q=cat&limit=3&rating=g
Key: .env → VITE_GIPHY_API_KEY
```

## Folder Structure (Screaming Architecture)

```
src/
├── app/          # Providers, Router
├── pages/        # explorer.tsx
├── widgets/      # gif-results/
├── features/     # gif-search/
├── entities/     # GiphyGif.ts
└── shared/       # shadcn/ + api/
```

## Deployment

```bash
npm run build
npx vite-preview  # Preview
# Vercel/Netlify: Connect GitHub repo
```

Live: https://giphy-explorer.vercel.app

## Contribution

1. [AGENT.md](./AGENT.md)
2. `features/my-feature/acceptance.md`
3. TDD workflow
4. PR → Auto FSD review

**Built for team scalability.**
