# Changelog

All notable changes to `@weave-kit/contract`. Format follows [Keep a Changelog](https://keepachangelog.com/);
the project uses [Semantic Versioning](https://semver.org/).

## [2.1.1]

### Added

- `ApprovalListFilter.expiresBefore` (additive).

## [2.1.0]

### Added

- `PendingApproval` optional request context and lifecycle fields: `requestedBy`, `onBehalfOf`,
  `actorLabel`, `requestHash`, `requestId`, `policy`, `expiresAt`, `consumedAt`, `resolvedAt`,
  `comment`; `ApprovalPolicySnapshot`.
- `ApprovalListFilter.requestedBy` / `approvalKey`.

## [2.0.0]

Breaking: the `tenant` vocabulary is removed — `scope` is the single row-scope name.

### Removed

- `ROW_SCOPE_MARKERS.TENANT` (the `tenant: true` field marker) — use `ROW_SCOPE_MARKERS.SCOPE`.
- `AuditEvent.tenantId` and `AuditQuery.tenantId` — use `scopeId`.

## [1.0.0]

Initial release. The zero-dependency shared vocabulary used by `@weave-kit/engine`, `@weave-kit/client`
and `@weave-kit/console`, so no consumer needs the Node server runtime for types or constants.

### Added

- `@weave-kit/contract` (types): the data-access query contract (`Filter`, `Sort`, `FindOptions`,
  `FindResult`), the REST contract (`ApiSort`, `ListQuery`, `ApiErrorBody`, `ApiErrorSpec`,
  `RestResult`), the audit contract (`AuditEvent`, `AuditFilter`, `AuditQuery`, `AuditQueryResult`),
  the approval shapes (`PendingApproval`, `ApprovalListFilter`), the workflow schema
  (`WorkflowDefinition`/`WorkflowNode`/`WorkflowAssign`/`WorkflowTimeout`) and the metadata descriptor
  (`ObjectDescriptor`, `MetadataField`, `MetadataRelation`, `MetadataPermissions`, `MetadataAttrSpec`,
  `ObjectListEntry`).
- `@weave-kit/contract/values` (pure `as const`): the schema vocabulary (`FIELD_TYPES`,
  `IDENTITY_OBJECT_NAMES`, `WEAVE_STATUS`, `DETAILS_COLUMNS`, …), the data-access constants
  (`FILTER_OPS`, `SORT_DIRS`, `TOTAL_MODES`, `WRITE_MODES`, `PAGINATION`), audit (`AUDIT_ACTOR_TYPES`,
  `AUDIT_MODES`, `DATA_ACTIONS`, `ACTION_PREFIXES`), approvals (`APPROVAL_STATUSES`), script
  (`SCRIPT_SOURCE_KINDS`), workflow (`WORKFLOW_*`) and field-type attrs (`ATTR_KINDS`) — plus all
  derived types.
