# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

- `npm run test:unit` - Run all unit tests
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier (uses --experimental-cli flag)

## Code Style

- No semicolons, single quotes, 100-char line width, 2-space indentation
- TypeScript project references: tsconfig.app.json (excludes __tests__), tsconfig.vitest.json (includes __tests__)

## Testing

- Test files located in `src/**/__tests__/` directories (co-located with source)
- Supabase auth methods mocked globally in `src/test/setup.ts`
- All Naive UI components stubbed in test setup to avoid warnings
- Use `createMemoryHistory()` for router in tests
- Router uses factory function `createAppRouter()` for testability

## Architecture

- Router guards: `requiresAuth`, `guestOnly`, `requiresBet` (custom meta fields)
- Navigation blocked away from `/draw` when `betStore.drawInProgress` is true
- Pinia stores use Options API (defineStore with object syntax)
- Environment variables must use `VITE_` prefix (e.g., `VITE_SUPABASE_URL`)
