# @weave-kit/contract

The **zero-dependency shared vocabulary** for WeaveKit — pure TypeScript types and `as const` values
used by [`@weave-kit/engine`](https://github.com/weavekit/engine),
[`@weave-kit/client`](https://github.com/weavekit/client) and the console, so no consumer needs the
Node server runtime (fastify / pg / esbuild / …) just to reference the contract.

## Entries

| Entry | Contents | For |
| --- | --- | --- |
| `@weave-kit/contract` | pure types (schema query + REST contract) | type-only imports |
| `@weave-kit/contract/values` | the matching `as const` runtime values (browser-safe) | constants at runtime |

```ts
import type { Filter, FindOptions, RestResult, TotalMode } from '@weave-kit/contract';
import { FILTER_OPS, TOTAL_MODES, FIELD_TYPES } from '@weave-kit/contract/values';
```

## Notes

- **Zero runtime dependencies.** `values` modules are pure `as const` leaves, safe in a browser bundle.
- The engine re-exports this surface (its `@weave-kit/engine` and `@weave-kit/engine/values` entries
  stay unchanged); the contract is the single source of truth.

## License

MIT
