import type { ApprovalStatus } from '../values.js';

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
}

/**
 * Approval queue filter (persisted-store query model). `from`/`to` bound the
 * `createdAt` window; `sort` defaults to `createdAt` DESC.
 */
export interface ApprovalListFilter {
  status?: ApprovalStatus;
  action?: string;
  actorKey?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
  sort?: { field: 'createdAt' | 'action' | string; order: 'ASC' | 'DESC' };
}
