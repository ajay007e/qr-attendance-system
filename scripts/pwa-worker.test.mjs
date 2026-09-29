import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(
  new URL("../frontend/public/sw.js", import.meta.url),
  "utf8",
);
function worker({ offline = false } = {}) {
  const listeners = {};
  const deleted = [];
  const added = [];
  let claimed = false;
  const fallback = new Response("offline");
  const cache = {
    add: async (r) => added.push(r),
    match: async () => fallback,
  };
  vm.runInNewContext(source, {
    self: {
      location: { origin: "https://attendance.test" },
      clients: {
        claim: async () => {
          claimed = true;
        },
      },
      addEventListener: (name, fn) => {
        listeners[name] = fn;
      },
    },
    caches: {
      open: async () => cache,
      keys: async () => [
        "qr-attendance-offline-v0",
        "qr-attendance-offline-v1",
        "unrelated",
      ],
      delete: async (key) => deleted.push(key),
    },
    fetch: async () => {
      if (offline) throw new Error("offline");
      return new Response("live");
    },
    URL,
    Request: class extends Request {
      constructor(url, options) {
        super(new URL(url, "https://attendance.test"), options);
      }
    },
    Response,
  });
  return { listeners, deleted, added, claimed: () => claimed };
}
function dispatch(w, path, overrides = {}) {
  let response;
  w.listeners.fetch({
    request: {
      url: new URL(path, "https://attendance.test").href,
      method: "GET",
      mode: "navigate",
      ...overrides,
    },
    respondWith: (r) => {
      response = r;
    },
  });
  return response;
}

test("installation precaches only the public offline document", async () => {
  const w = worker();
  let pending;
  w.listeners.install({
    waitUntil: (p) => {
      pending = p;
    },
  });
  await pending;
  assert.equal(w.added.length, 1);
  assert.equal(w.added[0].url, "https://attendance.test/offline.html");
  assert.equal(w.added[0].cache, "reload");
});

test("activation deletes only obsolete caches owned by this app", async () => {
  const w = worker();
  let pending;
  w.listeners.activate({
    waitUntil: (p) => {
      pending = p;
    },
  });
  await pending;
  assert.deepEqual(w.deleted, ["qr-attendance-offline-v0"]);
  assert.equal(w.claimed(), true);
});

test("online documents come from network; offline documents get fallback", async () => {
  assert.equal(await (await dispatch(worker(), "/login")).text(), "live");
  assert.equal(
    await (await dispatch(worker({ offline: true }), "/student")).text(),
    "offline",
  );
});

test("APIs, submissions, RSC, assets and external requests are not intercepted even offline", () => {
  const w = worker({ offline: true });
  for (const [path, options] of [
    ["/api/v1/auth/me", {}],
    ["/api", {}],
    ["/api/v1/attendance", { method: "POST" }],
    ["/login", { method: "POST" }],
    ["/student?_rsc=abc", { mode: "cors" }],
    ["/_next/static/app.js", { mode: "no-cors" }],
    ["https://other.test/", {}],
  ])
    assert.equal(dispatch(w, path, options), undefined);
});
