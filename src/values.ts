/**
 * The shared value surface (`@weave-kit/contract/values`).
 *
 * Every module re-exported here is pure `as const` (import-free), so browser
 * bundles and non-Node consumers can share the exact engine vocabulary at
 * runtime without pulling the server runtime.
 */
export * from './values/core.js';
export * from './values/data-access.js';
