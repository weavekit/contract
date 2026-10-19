import type { ApprovalStatus } from '../values.js';

/** policy snapshot captured when the approval was requested */
export interface ApprovalPolicySnapshot {
  /** dynamic rule id (guardrail / workflow) */
  ruleId?: string;
  /** human-readable reason shown to the approver */
  reason?: string;
  /** rule/policy version */
  version?: string;
}

/** one pending approval-queue entry */
export interface PendingApproval {
  approvalKey: string;
  action: string;
  args: Record<string, unknown>;
  status: ApprovalStatus;
  createdAt: Date;
  /** requester's actor key (deterministic-approval-key input) */
  actorKey: string;
  /** actor (approver key) that resolved the entry */
  approvedBy?: string;

  /** engine subject that requested the action */
  requestedBy?: string;
  /** proxied user / agent on-behalf-of reference */
  onBehalfOf?: string;
  /** caller label (agent / integration name) */
  actorLabel?: string;
  /** stable hash of action + args + actor + request id */
  requestHash?: string;
  /** caller correlation id (new request after consumption uses a new id) */
  requestId?: string;
  /** rule/reason/version captured at request time */
  policy?: ApprovalPolicySnapshot;
  /** approval TTL; null/absent for legacy rows */
  expiresAt?: Date;
  /** when the approval was consumed by an allowed execution */
  consumedAt?: Date;
  /** when the entry was approved/rejected */
  resolvedAt?: Date;
  /** approver comment (required for rejection in the Console) */
  comment?: string;
}

/**
 * Approval queue filter (persisted-store query model). `from`/`to` bound the
 * `createdAt` window; `sort` defaults to `createdAt` DESC.
 */
export interface ApprovalListFilter {
  status?: ApprovalStatus;
  action?: string;
  actorKey?: string;
  requestedBy?: string;
  approvalKey?: string;
  from?: Date;
  to?: Date;
  /** only entries expiring before this instant */
  expiresBefore?: Date;
  limit?: number;
  offset?: number;
  sort?: { field: 'createdAt' | 'action' | string; order: 'ASC' | 'DESC' };
}
