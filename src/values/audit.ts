/**
 * Audit vocabulary — pure `as const` (single source of truth).
 */

/** who initiated the event */
export const AUDIT_ACTOR_TYPES = {
  AGENT: 'agent',
  USER: 'user',
  SYSTEM: 'system',
  ANONYMOUS: 'anonymous',
} as const;
export type AuditActorType = typeof AUDIT_ACTOR_TYPES[keyof typeof AUDIT_ACTOR_TYPES];

/**
 * Audit durability mode. `best-effort` (default) = fire-and-forget process
 * buffer; `transactional` = the audit row is written in the business
 * transaction; `durable` = a transactional-outbox row + relay.
 */
export const AUDIT_MODES = {
  BEST_EFFORT: 'best-effort',
  TRANSACTIONAL: 'transactional',
  DURABLE: 'durable',
} as const;
export type AuditMode = typeof AUDIT_MODES[keyof typeof AUDIT_MODES];

/** engine data-access actions — closed set */
export const DATA_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  READ: 'read',
  TRANSITION: 'transition',
} as const;
export type DataAction = typeof DATA_ACTIONS[keyof typeof DATA_ACTIONS];

/**
 * Interface-layer action namespace prefixes (open names; the prefix is the
 * contract). Consumers compose `<prefix>.<detail>`, e.g. `mcp.tool.search_lead`.
 */
export const ACTION_PREFIXES = {
  MCP_TOOL: 'mcp.tool',
  REST: 'rest',
  SCHEMA: 'schema',
} as const;
export type ActionPrefix = typeof ACTION_PREFIXES[keyof typeof ACTION_PREFIXES];
