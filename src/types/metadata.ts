import type { AttrKind, ReadScope } from '../values.js';
import type { WorkflowDefinition } from './workflow.js';

/**
 * The engine's neutral "schema + permissions" view, shared by MCP
 * introspection and the REST metadata/permissions endpoints, and consumed by
 * frontends. Protocol-agnostic: type semantics only, never UI/widget hints.
 */

/** one declared extra attribute of a registered-type field: its value (when set) plus its spec */
export interface MetadataAttrSpec {
  /** this field's declared value (absent when the attr is optional and not set) */
  value?: unknown;
  /** the attr's value kind (from the type's `AttrSpec`) */
  type: AttrKind;
  /** allowed values (enum only) */
  values?: string[];
  /** spec default (documentation; not injected into the field) */
  default?: unknown;
  /** human description (data semantics, never a widget) */
  description?: string;
}

/** one field as seen by a frontend — type semantics only */
export interface MetadataField {
  name: string;
  type: string;
  /** the primitive this `type` delegates to; present only when it differs from `type` */
  base?: string;
  /** per-locale display names; absent → use `name` */
  labels?: Record<string, string>;
  description?: string;
  required?: boolean;
  options?: string[];
  multiple?: boolean;
  target?: string;
  /** for a field backed by a declared named enum: the enum name */
  enum?: string;
  /** per-value display names of a named enum: locale → value → label */
  optionLabels?: Record<string, Record<string, string>>;
  /** for `user` fields: the department FK column on the identity object (`department_id`) */
  department?: string;
  /** for `currency` fields: the ISO 4217 code */
  currency?: string;
  /** true when this field is the object's primary key */
  primary?: boolean;
  /** true for engine-managed virtual system fields (`weave_*`) */
  virtual?: boolean;
  /** true for engine-managed read-only fields (system / formula) */
  readOnly?: boolean;
  /** declared extra attributes of a registered-type field, each paired with its spec */
  attrs?: Record<string, MetadataAttrSpec>;
  /** for a data-driven `enum`: the object/column whose values are the allowed options */
  optionsFrom?: { object: string; column: string };
  /** true when this field is the object's row-scope `own` column */
  ownership?: boolean;
  /** true when this field is the object's row-scope `department` column */
  departmentScope?: boolean;
  /** for a scope-marked field: where its values come from (internal ids | external ids) */
  scopeSource?: 'internal' | 'external';
}

/** a relation field (weak/strong/multi) as a named edge */
export interface MetadataRelation {
  field: string;
  type: string;
  target?: string;
}

/** effective permissions for one identity on one object */
export interface MetadataPermissions {
  read?: ReadScope;
  /** row scope applied to update/delete; defaults to `read` */
  manage?: ReadScope;
  create: boolean;
  /** null = every field updatable; [] = none; otherwise the field whitelist */
  update: string[] | null;
  delete: boolean;
  /** fields hidden from read output for this identity */
  excludedFields: string[];
  /** null = all writable fields allowed on create; [] = none; otherwise the whitelist */
  createFields: string[] | null;
}

/** full object descriptor: schema + the identity's effective permissions */
export interface ObjectDescriptor {
  name: string;
  /** per-locale display names; absent → use `name` */
  labels?: Record<string, string>;
  description?: string;
  titleTemplate?: string;
  fields: MetadataField[];
  relations: MetadataRelation[];
  permissions: MetadataPermissions;
  /** present only when the object declares the switch; `false` = definition kept but disabled */
  workflowEnabled?: boolean;
  /** declared single-line node chain, when the object has a workflow */
  workflow?: WorkflowDefinition;
  /** content-addressed identity of the active workflow definition */
  workflowHash?: string;
}

/** minimal list entry (object name/labels/description) */
export interface ObjectListEntry {
  name: string;
  labels?: Record<string, string>;
  description?: string;
}
