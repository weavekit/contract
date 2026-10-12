/**
 * Workflow.json schema vocabulary (`objects/<name>/workflow.json`) — pure
 * `as const`. The engine re-exports these; instance/timer runtime lives in the
 * engine, not here.
 */

/** on-disk `workflow.json` format version */
export const WORKFLOW_FORMAT_VERSION = 2 as const;

/** synthetic node id of the implicit start node — never authored */
export const WORKFLOW_START_NODE = '__start__';

/** node kinds */
export const WORKFLOW_NODE_KINDS = {
  APPROVE: 'approve',
  NOTIFY: 'notify',
} as const;
export type WorkflowNodeKind = (typeof WORKFLOW_NODE_KINDS)[keyof typeof WORKFLOW_NODE_KINDS];

/** how a node's assignees complete it */
export const WORKFLOW_ASSIGN_MODES = {
  /** any: the first decision settles the node */
  ANY: 'any',
  /** all: every assignee must approve */
  ALL: 'all',
} as const;
export type WorkflowAssignMode = (typeof WORKFLOW_ASSIGN_MODES)[keyof typeof WORKFLOW_ASSIGN_MODES];

/** the actions a node timeout may auto-fire */
export const WORKFLOW_TIMEOUT_ACTIONS = {
  APPROVE: 'approve',
  REJECT: 'reject',
} as const;
export type WorkflowTimeoutAction = (typeof WORKFLOW_TIMEOUT_ACTIONS)[keyof typeof WORKFLOW_TIMEOUT_ACTIONS];
