/**
 * REST contract layer types — framework-agnostic pure contract.
 * No server/data-access imports: only neutral query/error shapes.
 */

/** one parsed sort clause; `direction` is validated by the adapter against SORT_DIRS */
export interface ApiSort {
  field: string;
  direction: string;
}

/** parsed REST list query (neutral syntax — no data-access coupling) */
export interface ListQuery {
  /** decoded filter object (was a JSON string on the wire) */
  filter?: Record<string, unknown>;
  sort?: ApiSort[];
  fields?: string[];
  limit?: number;
  offset?: number;
  /** `exact` (default) | `estimate` | `none`; validated by the adapter layer */
  total?: string;
}

/** uniform error body returned by every REST endpoint */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    params?: Record<string, unknown>;
  };
}

/** HTTP status + body produced by the error mapper */
export interface ApiErrorSpec {
  status: number;
  body: ApiErrorBody;
}

/** paginated list response envelope (pagination convention, consumed by the client SDK) */
export interface RestResult<T = Record<string, unknown>> {
  rows: T[];
  /** row count (exact or estimated); omitted when the request asked for `total=none` */
  total?: number;
  limit: number;
  offset: number;
}
