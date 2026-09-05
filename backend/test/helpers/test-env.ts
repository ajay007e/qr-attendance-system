// Public, test-only fixtures, never real credentials. Import before config-dependent
// modules. Node runs each test file in a separate process; repositories are stubbed.
Object.assign(process.env, {
  SESSION_SECRET: "unit-test-session-not-a-real-secret",
  ATTENDANCE_QR_SECRET: "unit-test-qr-not-a-real-secret",
  ADMIN_API_KEY: "unit-test-admin-not-a-real-key",
  DB_HOST: "127.0.0.1",
  DB_PORT: "1",
  DB_NAME: "unit_test_no_database",
  DB_USER: "unit-test",
  DB_PASSWORD: "unit-test-not-a-real-password",
  SESSION_SECURE: "false",
  ATTENDANCE_LOCATION_RADIUS: "100",
  PORT: "3001",
});
