# Agent Development Guide v1.0

**FSD + TDD + shadcn Giphy Explorer.** >92% test coverage. Clean commits.

## ⚡ Token Saving Rules (MANDATORY)

- Reference ARCHITECTURE.md, don't repeat
- Use existing: shared/ui/shadcn/\* components
- Colocate tests, no duplication
- Max 3 files per response
- Commit early: "feat(layer): desc (95% cov)"

## Structure (See ARCHITECTURE.md)

```
app → pages → widgets → features → entities → shared/ui/shadcn/
Tests colocated: .unit.test.tsx / .int.test.tsx
```

## Workflow (Follow Exactly)

```
1. features/{feat}/acceptance.md (2-3 Gherkin scenarios)
2. TDD: unit test → code → int test → e2e test
3. npm test --coverage (>92%)
4. Extract shared/ui/ primitives
5. Commit: feat({layer}): {desc} ({coverage}%)
```

## Quality Gates (Run Always)

```bash
npm test --coverage      # >92%
npm run lint:type        # 0 errors
npx vite-bundle-visualizer  # <150KB
```

## Start Here

Create `features/gif-search/acceptance.md` first.
