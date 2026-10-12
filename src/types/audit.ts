import type { AuditActorType } from '../values.js';

/** immutable audit event */
export interface AuditEvent {
  actorType: AuditActorType;
  /** subject.id / agent credential id / 'system' */
  actorId: string;
  /** 'create' | 'update' | 'delete' | 'mcp.tool.search' | ... */
  action: string;
  /** object name */
  objectName?: string;
  /** record id */
  objectId?: string;
  /** write payload / change summary; tool-call argument summary for operations */
  changes?: unknown;
  /** row snapshot before the write (audit replay) */
  before?: unknown;
  /** row snapshot after the write (update only; audit replay) */
  after?: unknown;
  isError?: boolean;
  /** engine SchemaError code, e.g. 'rbac.denied.update' */
  errorCode?: string;
  /** request correlation id */
  requestId?: string;
  /** distributed trace id (inbound W3C traceparent), when present */
  traceId?: string;
  /** tenant the event belongs to (multi-tenancy); absent = single-tenant */
  tenantId?: string;
  /** generic row-scope the event belongs to (canonical; `scopeId ?? tenantId`) */
  scopeId?: string;
  /** extension: onBehalfOf/agentLabel/tool/latency etc. */
  meta?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Generic audit filter — structural, mirrors the object `Filter`: plain field
 * conditions AND'd with an optional `$or` group. Field names are raw
 * `weavekit_audit` columns; operator values follow `FILTER_OPS`.
 */
export type AuditFilter = {
  [column: string]: unknown;
  $or?: Array<{ [column: string]: unknown }>;
};

/** audit query filter (protocol-neutral — REST/ops/adapter layer maps wire params onto it) */
export interface AuditQuery {
  actorId?: string;
  action?: string;
  object?: string;
  from?: Date;
  to?: Date;
  /** scope to one tenant (multi-tenancy); absent = all tenants (admin) */
  tenantId?: string;
  /** scope to one row-scope value (canonical; `scopeId ?? tenantId`); absent = all (admin) */
  scopeId?: string;
  /** generic `weavekit_audit` column filter; OR'd/AND'd with the typed fields above */
  filter?: AuditFilter;
  limit?: number;
  offset?: number;
  /** opaque keyset cursor; when set, pagination is stable over `(ts DESC, id DESC)` */
  cursor?: string;
}

/** paginated audit query result (rows newest-first: ORDER BY ts DESC, id DESC) */
export interface AuditQueryResult {
  rows: AuditEvent[];
  total: number;
  /** present when a full page was returned — pass back as `cursor` for the next page */
  nextCursor?: string;
}
