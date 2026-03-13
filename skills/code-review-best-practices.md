# Code Review Skill: FSD Giphy Explorer Edition

```
name: fsd-code-review
description: Reviews FSD/shadcn/Vitest code for layer compliance, TDD coverage, API security, and React patterns.
```

## Review Goals

- **FSD Compliance**: Correct layer? ↓ deps only?
- **TDD Pyramid**: Unit/int/e2e colocated? >92% coverage?
- **API Safety**: Giphy key secure? Defensive parsing?
- **Shadcn/React**: Proper composition? Responsive?
- **Scalability**: Pagination ready? Hook extraction?

## How to Review

1. **Context**: FSD layer + feature purpose
2. **Checklist order**: FSD → Tests → API → UI → Metrics
3. **Findings**: Concrete line numbers + fixes

## FSD Checklist

- [ ] **Correct layer**: `features/` vs `widgets/` vs `shared/`
- [ ] **↓ deps only**: No `pages/` importing `entities/` directly
- [ ] **Naming**: `kebab-case` folders, `use-kebab-case.ts`
- [ ] **No business logic in UI**: Hooks → `model/`

## Testing Checklist

- [ ] **Colocated**: `use-gif-search.unit.test.tsx` next to hook
- [ ] **Pyramid**: Unit(70%)/Int(20%)/E2E(10%)
- [ ] **Mocked deps**: `vi.mock('shared/api/giphy.client')`
- [ ] **Coverage >92%**: `npm test --coverage`
- [ ] **Edge cases**: Empty query, network fail, malformed API

## API/Giphy Checklist

- [ ] **Key secure**: `.env` only, no console.log/hardcode
- [ ] **Defensive**: `json.data ?? []`, type guards
- [ ] **Pagination**: `offset` param ready
- [ ] **Rate limit**: Debounce in hook?

## Shadcn/UI Checklist

- [ ] **Composition**: `shared/ui/shadcn/Button` → `features/ui/`
- [ ] **Responsive**: `grid-cols-1 md:grid-cols-3`
- [ ] **a11y**: Labels, `aria-label`, keyboard nav
- [ ] **No inline styles**: Tailwind classes only

## Metrics Checklist

```bash
npm test --coverage     # >92%
npm run lint:type       # 0 errors
npx vite-bundle-visualizer # <150KB
```

## Feedback Format

```markdown
## [filename] Review

**Changes:** [2-sentence summary]

### 🔴 Critical

- L12: [layer violation] → Move to `shared/api/`

### 🟠 Major

- L25: [missing test] → Add `use-gif-search.unit.test.tsx`

### 🟡 Minor

- L45: [style] → Use `kebab-case`

## Action Items

- [ ] Fix L12 layer violation
- [ ] Add unit test → `npm test`
- [ ] Commit: `feat(layer): desc (95% cov)`
```

**Apply to your code.** Paste code → instant FSD-compliant review!

**Ready to review SearchForm?**
