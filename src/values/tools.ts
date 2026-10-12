/**
 * Tools / approvals vocabulary — pure `as const`.
 */

/** approval queue statuses (single source of truth) */
export const APPROVAL_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;
export type ApprovalStatus = typeof APPROVAL_STATUSES[keyof typeof APPROVAL_STATUSES];
