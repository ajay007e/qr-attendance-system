# Installable attendance app (US-20 / #22)

## Implementation

- Next.js `app/manifest.ts` supplies `/manifest.webmanifest`: stable root ID and scope, root start URL (existing role-aware redirect), standalone display, theme and icons.
- PNG icons: 192px, 512px, 512px maskable and 180px Apple touch icon. `frontend/public/icons/icon.svg` is the editable source; the graphic is decorative, not a scannable attendance QR code.
- Root metadata enables Apple web-app mode without disabling zoom.
- The service worker registers only in production. `/sw.js` is served with revalidation/no-store headers.
- Only `/offline.html` is stored in Cache Storage. Full document navigations use the network with the public offline screen on network failure. APIs, mutations, Next.js client-navigation/RSC requests and external requests are not intercepted. There is no offline attendance queue; existing application errors handle failed in-app requests.
- Updates wait for old controlled windows to close; no forced activation/reload interrupts attendance. Activation deletes only obsolete `qr-attendance-offline-*` caches. Increment the cache version in `sw.js` when changing the offline screen.

## Local checks

Use Node 22 and the repository's pnpm setup:

```sh
pnpm --dir frontend lint
pnpm --dir frontend typecheck
pnpm --dir frontend format:check
NEXT_PUBLIC_API_BASE_URL=/api/v1 NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:5000 pnpm --dir frontend build
node --test scripts/pwa-worker.test.mjs
pnpm --dir frontend start --hostname 127.0.0.1 --port 3103
```

Open `http://localhost:3103/login`. A frontend-only run cannot verify sign-in, dashboards, QR submissions or location validation. Use a configured backend/database and test users for those checks. Development mode does not register a new worker; use a clean browser profile or unregister an earlier production worker when switching back to development on the same origin.

Phone testing requires a trusted HTTPS origin with the backend available. Do not use a plain LAN HTTP address to judge installation/camera/location behavior. No public preview or deployment is created by this change.

## Verification recorded 2026-09-27

- Node 22.23.2: production build, lint, typecheck, formatting and four worker-policy tests pass.
- Headless Chromium 151, persistent isolated profile, 390 × 844 mobile viewport: manifest/PNG responses, Apple icon metadata, service-worker registration/control and no-store headers pass. Chromium reports no installability errors.
- Browser Cache Storage contains only `/offline.html`; offline full navigation and online retry recovery pass. Login page has no horizontal overflow at the tested width.
- Full-stack follow-up: 11 checks pass against a fresh isolated MySQL database, synthetic users, the real backend and the production frontend. Lecturer/student UI login works under service-worker control; authentication survives reload; logout revokes the session and protected navigation returns to login.
- Browser-origin API checks pass for session creation, valid QR attendance, invalid QR rejection, duplicate rejection, lecturer roster and student summary loading. Outside-radius attendance is flagged `suspicious`, matching existing backend policy; it is not rejected. These checks submit QR tokens directly, not through a physical camera.
- Student/lecturer course pages have no horizontal overflow at 360/390/430px. Cache Storage still contains only the public offline document after authenticated actions. Offline submission fails without a cached success response.
- Extended full-stack follow-up: 13 checks pass in desktop Chromium with a mobile viewport. A generated QR SVG is rendered into a canvas MediaStream and decoded by the real scanner. Simulated camera denial shows a recoverable error. Explicitly denied browser geolocation shows an attendance failure. Granted simulated geolocation produces the success UI. The lecturer joins the real websocket session and its live attendance screen automatically reflects the submission without navigation/reload. This verifies in-app live updates, not OS push notifications.
- Four worker-upgrade checks pass using the actual worker source in an isolated HTTP lifecycle harness with a v1-to-v2 substitution: update waits without reloading an active client, closing the last controlled page allows activation, only the obsolete app cache is removed while an unrelated cache survives, and the upgraded worker supports offline fallback and online recovery. No product worker version was changed by this test.
- Evidence: workspace `tmp/qr-pwa-e2e-20260927/extended.cjs`, `extended-results.json`, `update.cjs`, and `update-results.json`. The extended run repeats some earlier checks and is not 13 additional independent requirements. Early harness failures were corrected (SVG namespace and browser-context permission targeting) before the successful run.
- At the September 27 run, physical devices were unavailable. See the September 29 Android follow-up below; desktop synthetic media/location does not prove phone hardware behavior. Existing Next.js multiple-lockfile warning remains unchanged.

## Physical Android verification recorded 2026-09-29

Tested by the project owner using Android Chrome and an installed standalone app through a temporary HTTPS preview backed by an isolated synthetic database. Exact Android/device/Chrome versions were not captured.

- User-reported passes: installation, standalone launch without browser address bar, login persistence after close/reopen, offline fallback with connectivity disabled, recovery after reconnect, and logout returning to sign-in after relaunch.
- Screenshots confirm real camera QR attendance submission and a successful `verified` location result for a session created on the same phone. Lecturer view confirms Present / QR Code / Verified and the correct local timestamp.
- Lecturer view was manually refreshed: physical-device automatic live updates are **not verified**. The earlier automated websocket/UI test passed.
- The first PC-created session produced `suspicious`; the phone-created session produced `verified` with the unchanged 100 m radius. This points to differing device location estimates, not proof of absolute GPS accuracy. Accuracy is currently discarded and student coordinates are not persisted, so the original distance cannot be reconstructed. No location-policy changes were made.
- The test MySQL instance used AEST while the backend interpreted results as UTC, causing a ten-hour display offset. Aligning the isolated database to UTC and recycling its app connections corrected display without changing attendance records. Future test setup initializes UTC. This was a test-environment fix, not a PWA source change.
- Reopening retains the existing session and location; duplicate attendance was correctly rejected. A separate synthetic course was used for the fresh phone-created session, preserving the original attendance.
- iPhone/iOS verification is unavailable to the owner and remains explicitly untested. Physical permission-denial, exhaustive layout/keyboard, and device upgrade checks also remain unclaimed; relevant automated coverage is listed above.
- Temporary public tunnel and local test services were stopped after the round. Test database files are retained; no production data was used.

## Device and regression checklist (remaining coverage)

Adapted from a Gemini supplied-text draft and reviewed against this implementation.

- [x] Android Chrome: installation and standalone launch confirmed by owner; detailed icon appearance not separately assessed.
- [ ] iOS Safari: Share → Add to Home Screen (open as web app where offered); check Apple icon and standalone launch.
- [ ] Verify normal navigation, app close/relaunch and session behavior match the existing authentication policy. Log out and confirm protected routes are inaccessible.
- [ ] At 360–430px portrait and landscape, check login, student/lecturer dashboards, forms, tables, dialogs and keyboard behavior for clipped controls/overflow.
- [ ] Lecturer: manage sessions, display QR and observe live attendance updates.
- [ ] Student: enrol, scan a valid QR, confirm attendance and view summaries. Check expired/invalid QR errors.
- [ ] Camera/location: allow and deny permissions, test location inside/outside the allowed radius and verify behavior in standalone mode.
- [ ] Offline: full reload shows the public fallback; reconnect and retry recovers. Offline submissions must not report success or queue attendance.
- [ ] Cache Storage contains only the offline document after login/logout and attendance actions, with no account/API data.
- [ ] Update: change worker version, load new build, observe waiting worker; close all app/browser windows for this origin and reopen. Confirm activation and removal only of this app's obsolete cache, with no forced reload during use.

## References

- [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps)
- [Next.js manifest convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)
