# Module structure

Every feature module uses the same folders:

- `actions/` — Server Actions for mutations.
- `component/` — Client and server UI components owned by the module.
- `lib/` — Module utilities with no UI.
- `types/` — Local types; one exported type per file.
- `hooks/` — Module-specific React hooks.
- `static/` — Module-owned static assets.

Empty folders are retained with a `.gitkeep` until the module needs them.
