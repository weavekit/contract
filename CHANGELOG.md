# Changelog

All notable changes to `@weave-kit/contract`. Format follows [Keep a Changelog](https://keepachangelog.com/);
the project uses [Semantic Versioning](https://semver.org/).

## [1.0.0]

Initial release. The zero-dependency shared vocabulary used by `@weave-kit/engine`, `@weave-kit/client`
and `@weave-kit/console`, so no consumer needs the Node server runtime for types or constants.

### Added

- `@weave-kit/contract` (types): the data-access query contract (`Filter`, `Sort`, `FindOptions`,
  `FindResult`) and the REST contract (`ApiSort`, `ListQuery`, `ApiErrorBody`, `ApiErrorSpec`,
  `RestResult`).
- `@weave-kit/contract/values` (pure `as const`): the schema vocabulary (`FIELD_TYPES`,
  `IDENTITY_OBJECT_NAMES`, `WEAVE_STATUS`, `DETAILS_COLUMNS`, …), the data-access constants
  (`FILTER_OPS`, `SORT_DIRS`, `TOTAL_MODES`, `WRITE_MODES`, `PAGINATION`) and their derived types.
