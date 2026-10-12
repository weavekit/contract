/** Field-type registration vocabulary — pure `as const`. */

/** value kinds a declared extra attribute (`AttrSpec.type`) may take */
export const ATTR_KINDS = {
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  JSON: 'json',
  ENUM: 'enum',
} as const;
export type AttrKind = (typeof ATTR_KINDS)[keyof typeof ATTR_KINDS];
