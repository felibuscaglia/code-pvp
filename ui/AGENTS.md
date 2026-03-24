# Project Guidelines

## Component Architecture

### "use client" Directive — Minimize Usage

NEVER add `"use client"` to a component that can remain a Server Component. When a Server Component requires a small piece of client-side interactivity (e.g., a button with `onClick`, a controlled input), extract ONLY that interactive piece into a separate file as a Client Component and import it. The parent component stays a Server Component.

- WRONG: Adding `"use client"` to an entire page or large component because one child needs `useState`.
- RIGHT: Creating a small `_components/InteractiveWidget.tsx` with `"use client"` and importing it into the Server Component.

### One Component Per File

Each component MUST live in its own dedicated file. Do NOT define multiple components in a single file. A piece of JSX should be extracted into its own component file when BOTH of these conditions are true:

1. It manages state (`useState`, `useReducer`) that is scoped only to itself.
2. It defines event handlers or logic functions that are specific to its own behavior.

If a piece of JSX is purely presentational with no local state or handlers, it can remain inline.

### No Separate "View" Components

Do NOT create standalone "view" or "page-view" wrapper components. The `page.tsx` file inside each route IS the view. Page-level layout and composition belong directly in `page.tsx`.

### Shadcn/UI as the UI Foundation

All application UI MUST be built on top of shadcn/ui primitives. Before creating any new component, check `components/ui/` for an existing primitive that satisfies the need. Only add a new shadcn component (via the CLI) when no existing one covers the use case.

When composing UI, follow shadcn patterns:
- Use the `variants` pattern (via `cva`) for visual variations — do NOT create separate components for each visual style.
- Preserve built-in accessibility attributes (aria-*, role, keyboard handling). Do NOT strip or override them.
- Compose by combining shadcn primitives together rather than reimplementing their internals.

Custom wrapper components around shadcn primitives are allowed ONLY when the same app-specific behavior (not just styling) is repeated across multiple places. Keep wrappers thin — they should pass through all original props and add only the repeated logic. If the customization is one-off, apply it inline at the call site instead of creating a wrapper.

### Contexts and Hooks

All React contexts live under `lib/contexts/`. Each context gets its own folder containing two files: one for the context + provider and one for the hook that consumes it.

- The context file exports the `Provider` component and the raw `Context` object.
- The hook file exports a custom `use<Name>` hook that wraps `useContext` with a guard.
- An `index.ts` barrel file re-exports the provider and hook for clean imports.

Example structure:
```
lib/
  contexts/
    room/
      room-context.tsx        # createContext + RoomProvider
      use-room.ts             # useRoom hook
      index.ts                # re-exports RoomProvider and useRoom
```

- WRONG: Defining the context, provider, and hook all in a single file.
- WRONG: Placing context files inside `_components/` or `components/ui/`.

### Component File Organization

- `components/ui/` is reserved exclusively for Shadcn UI primitives (installed via the shadcn CLI). Do NOT place custom feature components here and do NOT manually edit these files.
- Feature-specific components are co-located with their route using a `_components/` directory inside the route folder.

Example structure:
```
app/
  settings/
    page.tsx                     # The view for /settings
    _components/
      ProfileForm.tsx            # Client Component with form state
      NotificationToggle.tsx     # Client Component with toggle state
  dashboard/
    page.tsx
    _components/
      StatsCard.tsx
```
