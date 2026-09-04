# Web E2E coverage map

| Spec | Covered flow |
| --- | --- |
| `src/tests/auth.spec.ts` | Protected-route redirect and sign in |
| `src/tests/items.spec.ts` | Create, rename, and delete an item |
| `src/tests/documents.spec.ts` | Upload, rename, and delete a document |
| `src/tests/sign-out.spec.ts` | Sign out after authenticated tests |

The authenticated specs use `src/tests/global.setup.ts` to sign in once and
persist browser storage state. Sign-out runs in a dependent project after the
other authenticated specs so it cannot invalidate their shared session.

See `README.md` for setup commands and failure artifact locations.
