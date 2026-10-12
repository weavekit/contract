import type { WorkflowAssignMode, WorkflowNodeKind, WorkflowTimeoutAction } from '../values.js';

/**
 * Declarative single-line node-chain workflow schema
 * (`objects/<name>/workflow.json`). Pure types — zero runtime dependencies.
 */

/** how long a node may be held before its timeout fires, and what to do then */
export interface WorkflowTimeout {
  /** duration string: `<n>` with optional unit `ms|s|m|h|d|w` (bare number = ms) */
  after: string;
  /** action auto-fired on expiry; absent = only dispatch the `onTimeout` hook */
  action?: WorkflowTimeoutAction;
}

/** who acts at a node and how the node completes */
export interface WorkflowAssign {
  /** roles whose members resolve to the node's assignees (required, non-empty) */
  roles: string[];
  /** any (`any`, default) | all (`all`); `notify` nodes keep `any` */
  mode?: WorkflowAssignMode;
}

/** one node in the single-line chain */
export interface WorkflowNode {
  /** snake_case node id, unique within the chain */
  id: string;
  /** `approve` (default) | `notify` (no quorum, advances immediately) */
  kind?: WorkflowNodeKind;
  /** display names keyed by locale, e.g. { en: 'Finance', zh: '財務審批' } */
  name?: Record<string, string>;
  description?: string;
  /** roles that resolve to the node's assignees (required) */
  assign: WorkflowAssign;
  /** on reject, roll back to this earlier node id; absent = the start node */
  onReject?: string;
  /** on withdraw, roll back to this earlier node id; absent = the start node */
  onWithdraw?: string;
  /** when true, the action at this node must be approved through the approval queue before it fires */
  requiresApproval?: boolean;
  /** node-level timeout (approve nodes only) */
  onTimeout?: WorkflowTimeout;
}

/** validated workflow definition attached to an object */
export interface WorkflowDefinition {
  /** on-disk `workflow.json` format version */
  schemaVersion?: number;
  /**
   * author-managed definition revision (an arbitrary positive integer, distinct
   * from the on-disk `schemaVersion`). Surfaced in the descriptor / transition
   * events + audit so history stays interpretable after a definition changes.
   */
  version?: number;
  /** the ordered single-line node chain (the start node is implicit) */
  nodes: WorkflowNode[];
}
