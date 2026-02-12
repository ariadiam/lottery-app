# Testing Best Practices

This project uses Vitest + Vue Test Utils and follows a behavior-first testing style.

## Core Principles

- Test user-observable behavior, not UI library internals.
- Prefer stable selectors like `data-testid` for interactive elements.
- Avoid brittle selectors tied to framework/internal CSS classes.
- Keep each test isolated: clean up mounted wrappers and mock state between tests.

## Selector and Assertion Guidelines

- Do this:
  - `wrapper.find('[data-testid="logout-button"]')`
  - `wrapper.find('[data-testid="menu-live-draw"]')`
- Avoid this:
  - `wrapper.find('button')` when multiple buttons may exist.
  - `.findAll('.n-menu-item-content')` and assertions on internal classes from Naive UI.

For route-related checks, assert navigation/state directly:

- `router.currentRoute.value.path`
- `n-menu` active `value` prop
- Calls to `router.push` (when spied)

Do not depend on internal class names such as `n-menu-item-content--selected`.

## Cleanup and Mock Isolation

Use `afterEach` in suites that mount components:

```ts
afterEach(() => {
  wrapper?.unmount()
  wrapper = undefined
})
```

Global Vitest config should reset/restore mocks automatically:

- `mockReset: true`
- `restoreMocks: true`

With these options enabled, avoid redundant per-test `vi.clearAllMocks()` / `vi.restoreAllMocks()` unless a specific suite needs custom behavior.

## Project-Specific Conventions

- Keep tests co-located in `src/**/__tests__/`.
- Use `createMemoryHistory()` and `createAppRouter()` for router tests.
- Supabase auth is globally mocked in `src/test/setup.ts`.
- Naive UI components are globally stubbed in `src/test/setup.ts`.
- Use `flushPromises()` after async user interactions and router changes.

## Suggested Test Pattern

1. Arrange: set up Pinia/router state and mount.
2. Act: interact through stable selectors.
3. Assert: verify route/store/component state.
4. Cleanup: unmount wrapper in `afterEach`.

## Useful Commands

- Run all unit tests: `npm run test:unit`
- Run lint: `npm run lint`
- Format code: `npm run format`
