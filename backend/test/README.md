# Backend unit tests

Use Node.js 22, matching the backend coverage job in `.github/workflows/pr-checks.yml`.
From `backend/`, run:

```sh
npm test
npm run test:coverage
```

Both commands compile the TypeScript tests and resolve source aliases before running
Node's built-in test runner. No database, running API, or real credentials are needed.

## Scope

- Auth, users, courses, enrolment and offerings: service behavior, mapping and validation.
- Offering access: enrolled/unregistered students, assigned/unassigned lecturers,
  administrator roles and invalid/missing offerings.
- Sessions: creation, active-session lookup, close/reopen/edit, assignment checks,
  conflict handling, edit-window boundaries, request validation and signed QR generation.

Repositories are replaced with in-memory test doubles. Tests check denied operations
do not write, validate repository arguments, and check returned data. Session tests
use Node's mock clock instead of wall-clock delays. Config-dependent tests import
`helpers/test-env.ts` first, which installs public test-only configuration in that
test file's isolated process. It overrides database settings with a non-service
loopback endpoint; repository methods must remain stubbed.

Coverage thresholds are 90% lines, 80% branches and 80% functions across the **loaded
service, mapper, validation and shared utility files selected by the coverage command**.
The result is not whole-backend coverage: unloaded modules, repositories, controllers,
routes and middleware are not measured by this scope. In particular, attendance
scanning, real SQL transactions and HTTP authentication/authorization integration
still need separate tests. Session service/mapper/validator coverage does not imply
the entire session module is covered.

Node 22 currently emits an experimental API notice for mocked timers; it does not
indicate a failed test.
