import assert from "node:assert/strict";
import test from "node:test";
import { createApiClient } from "../api.js";

test("api client calls both services", async () => {
  const originalFetch = globalThis.fetch;
  const urls = [];
  globalThis.fetch = async (url) => {
    urls.push(url);
    return { ok: true, json: async () => [] };
  };
  try {
    const api = createApiClient({ service1Url: "http://service-1", service2Url: "http://service-2" });
    await api.listCourts();
    await api.listReservations("user-1");
    assert.deepEqual(urls, ["http://service-1/courts", "http://service-2/users/user-1/reservations"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("api client reports timeout", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (_url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
  });
  try {
    const api = createApiClient({ service1Url: "http://service-1", service2Url: "http://service-2", timeoutMs: 1 });
    await assert.rejects(api.listCourts(), /tiempo límite/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
