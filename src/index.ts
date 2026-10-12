/**
 * `@weave-kit/contract` — the zero-dependency shared vocabulary.
 *
 * - `@weave-kit/contract` (this entry): pure types.
 * - `@weave-kit/contract/values`: the matching `as const` runtime values.
 *
 * The engine re-exports both; the client and console import from here so they
 * never depend on the Node server runtime.
 */
export type * from './types/query.js';
export type * from './types/api.js';
export type * from './values.js';
