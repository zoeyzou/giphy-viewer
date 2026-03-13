# Giphy Explorer Architecture v1.0

## FSD Layers (Strict ↓ Dependencies)

```

app/ → pages/ → widgets/ → features/ → entities/ → shared/
Global config Page layouts Domain UI User actions Domain models Atomic utils
(Providers) (composition) blocks (search, nav) (GiphyGif) (shadcn, api)

```

## Layer Details

| Layer       | Responsibility                               | Example Slice                                          | Shadcn Usage           | Tests                                   |
| ----------- | -------------------------------------------- | ------------------------------------------------------ | ---------------------- | --------------------------------------- |
| `app/`      | Global providers, routing, error boundaries  | -                                                      | -                      | -                                       |
| `pages/`    | Page-level composition                       | `pages/explorer.tsx`                                   | -                      | `pages.unit.test.tsx`                   |
| `widgets/`  | Reusable domain UI blocks **(own model/ui)** | `widgets/gif-results/`                                 | Composes Button, Card  | `model.unit.test.tsx`                   |
| `features/` | User features **(model/ui/lib)**             | `features/gif-search/`                                 | Composes Input, Select | `model.unit.test.tsx`<br>`int.test.tsx` |
| `entities/` | Pure domain types                            | `entities/GiphyGif.ts`                                 | -                      | `entities.unit.test.tsx`                |
| `shared/`   | Atomic primitives, cross-cutting             | `shared/ui/shadcn/Button.tsx`<br>`shared/api/giphy.ts` | Raw shadcn imports     | `shared.unit.test.tsx`                  |

## Domain Model (entities/GiphyGif.ts)

```typescript
export interface GiphyGif {
  id: string
  title: string
  images: { downsized_medium: { url: string } }
}
export type TextPosition = 'top-center' | 'bottom-center' | 'below-center'
```

## Testing Pyramid (100% Colocated)

```
📁 features/gif-search/
├── model/
│   ├── useGifSearch.ts
│   └── useGifSearch.unit.test.tsx     # 70% Pure logic
├── ui/
│   └── SearchForm.int.test.tsx        # 20% Feature integration
└── acceptance.md                      # Scenarios

📁 e2e/                                 # 10% Full flows
└── explorer.e2e.ts
```

## Shadcn Component Flow

```
shared/ui/shadcn/
├── Button.tsx ──┐
├── Input.tsx ───┼───→ features/gif-search/ui/SearchForm.tsx
└── Select.tsx ──┘         ↓
                           widgets/gif-results/ui/GifResults.tsx
```

## Quality Metrics (Enforced)

| Metric        | Target         | Command                      |
| ------------- | -------------- | ---------------------------- |
| Test Coverage | >92%           | `npm test --coverage`        |
| Type Errors   | 0              | `npm run lint:type`          |
| Cyclomatic    | <10/file       | ESLint                       |
| Bundle Size   | <150KB gzipped | `npx vite-bundle-visualizer` |
| Lighthouse    | 95+            | Chrome DevTools              |

## npm Scripts (Add to package.json)

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint:type": "tsc --noEmit && eslint . --ext .ts,.tsx",
    "bundle:viz": "vite-bundle-visualizer"
  }
}
```

## Naming Conventions (FSD + React 2026)

| Element            | Convention                               | Example                |
| ------------------ | ---------------------------------------- | ---------------------- |
| **Folders/Slices** | `kebab-case`                             | `features/gif-search/` |
| **Components**     | `kebab-case.tsx` or `PascalCase.tsx`     | `search-form.tsx`      |
| **Hooks**          | `use-kebab-case.ts` or `useCamelCase.ts` | `use-gif-search.ts`    |
| **Types**          | `PascalCase`                             | `GiphyGif`             |
| **Variables**      | `camelCase`                              | `searchQuery`          |

### Your Structure

## Commit Convention

```
feat(features/gif-search): add search with text overlay (95% cov)
fix(shared/api): giphy error handling (100% cov)
docs(architecture): update layers diagram
```

## Progression Roadmap

```
✅ 1. features/gif-search (API + form)
✅ 2. features/gif-pagination (offset logic)
✅ 3. widgets/gif-results (3-GIF grid + nav)
✅ 4. pages/explorer (composition)
✅ 5. e2e/ full flow
```

---

_Built for team scalability. New devs: read → `features/user-profile/` → ship._
