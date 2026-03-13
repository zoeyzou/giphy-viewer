## TODO / Next Steps

### Caption text input & behavior

- Add a dedicated **caption text input** in the query section (next to the search input).
- Thread this caption text through the feature/render-prop so that `GifResults` can render:
  - The **user-entered caption** on or below each image
  - According to the selected caption position (top-center, bottom-center, below-center).
- Today the Giphy API is **read-only** and we are not persisting captions anywhere.
  - The caption should therefore be treated as **ephemeral UI state** only (per-session, per-search); no server persistence required.
  - Once the requirement to persist or reuse captions is clarified (e.g. shareable links, user profiles, or saved boards), extract a small feature slice for caption preferences or saved overlays.

### Caption position placement (architecture rationale)

- Based on the FSD + screaming architecture guidelines in `ARCHITECTURE.md`:
  - `features/gif-search` owns **search behavior** (query, pagination, API calls).
  - `widgets/gif-results` owns **how results are presented** (grid layout, caption overlays, pagination UI).
- For that reason, the **caption position dropdown is intentionally placed in `GifResults`**, not in the search form:
  - Positioning is a **display concern** tightly coupled to how each GIF tile is rendered.
  - Search should not need to know or care how captions are visually arranged around the images.
  - If a future requirement introduces a global caption preference shared across multiple widgets, we can revisit this and potentially move caption state into its own feature slice.

### Missing / future work

- **User caption end-to-end**
  - Wire the new caption input into tests:
    - Feature-level: ensure caption text flows from input to render-prop state.
    - Widget-level: assert caption text appears in the correct position (top, bottom, below).
    - Page-level integration: simulate typing caption + selecting position and verify the composed behavior.

- **Accessibility & UX polish**
  - Add more explicit aria-labels and roles for pagination controls and result sections.
  - Ensure keyboard-only users can:
    - Focus and change caption position.
    - Page through results via Previous/Next.
  - Consider focus management when new pages of results are loaded.

- **Edge cases & error handling**
  - Handle API rate limiting and network failures more explicitly (e.g. retry hints, “Try again” button).
  - Clarify behavior when:
    - The API returns fewer than 3 GIFs.
    - The user pages beyond available results (last page edge conditions).

- **Quality gates from `ARCHITECTURE.md`**
  - Improve test coverage towards the >92% goal:
    - Add unit tests for pagination calculations in `useGifSearch` (page/totalPages/canGoNext/canGoPrev).
    - Add an e2e test (`e2e/explorer.e2e.ts`) to cover the full flow, including pagination and caption position changes.
  - Run and tune:
    - `npm run lint:type` to ensure 0 type + lint errors.
    - `npm test --coverage` to monitor coverage trajectory.

- **Future extensibility**
  - If additional widgets (e.g. favorites, related GIFs) are added later, consider:
    - Extracting a shared **pagination widget** if multiple result lists need synchronized pagination UX.
    - Introducing a small **caption-preferences feature** if caption text/position becomes a user-level preference across pages.
