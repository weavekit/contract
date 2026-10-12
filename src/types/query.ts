import type { FilterOp, SortDir, TotalMode } from '../values.js';

/**
 * The data-access query contract — the neutral shapes a list/read passes and
 * receives, shared by the engine, client and console. No runtime dependency.
 */

/** a single operator object filter value, e.g. `{ gte: 100 }` */
export type FilterValue = { [op in FilterOp]?: unknown };

/** a single equality/operator object filter — conditions across fields are AND'd */
export type FilterGroup = { [field: string]: unknown | FilterValue };

/**
 * Filter contract (REST `filter` JSON):
 * - plain object form (AND across fields), e.g. `{ status: 'open', amount: { gte: 100 } }`
 * - OR across groups via the reserved top-level `$or` key:
 *   `{ $or: [ { status: 'open' }, { amount: { gte: 100 } } ] }`
 * `$or` groups AND with any top-level field conditions and with the RBAC row scope.
 */
export type Filter = FilterGroup & { $or?: FilterGroup[] };

export interface Sort {
  field: string;
  dir: SortDir;
}

export interface FindOptions {
  filter?: Filter;
  sort?: Sort[];
  /** rows per page; defaults to the server's default limit, capped at its max */
  limit?: number;
  /** rows to skip; defaults to 0 */
  offset?: number;
  /** column projection whitelist */
  fields?: string[];
  /** columns always excluded from the projection (RBAC fields.exclude) */
  exclude?: string[];
  /** opaque keyset cursor (single-primary-key objects) */
  cursor?: string;
  /**
   * How `total` is computed (default: the server/config default, itself
   * `exact`). `exact` runs `COUNT(*)`; `estimate` reads `pg_class.reltuples`
   * (approximate); `none` skips counting and omits `total` from the result.
   */
  total?: TotalMode;
}

export interface FindResult<T = Record<string, unknown>> {
  rows: T[];
  /** row count for the query (exact or estimated); omitted when `total: 'none'` */
  total?: number;
  /** next-page keyset cursor (present only when a cursor was used and more remain) */
  nextCursor?: string;
  /** whether more rows exist beyond this page (offset or cursor mode) */
  hasMore?: boolean;
}
