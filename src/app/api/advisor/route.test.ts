/**
 * The advisor proxy.
 *
 * The advisor service itself is not running here; `fetch` is replaced. What
 * matters at this layer is that the browser never learns the service's
 * address, never sees why an upstream call failed, and never gets a response
 * shape nobody chose to expose.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ADVISOR_URL = "https://advisor.internal";
const TOKEN = "shared-token";

async function loadRoute() {
  vi.resetModules();
  return import("./route");
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://intellimindz.in/api/advisor", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

/** Typed so `mock.calls` keeps the arguments the route passed to fetch. */
function upstreamReturns(body: unknown, init: ResponseInit = {}) {
  const spy = vi.fn(
    async (_url: string, _init: RequestInit) => new Response(JSON.stringify(body), init)
  );
  vi.stubGlobal("fetch", spy);
  return spy;
}

beforeEach(() => {
  vi.stubEnv("ADVISOR_API_URL", ADVISOR_URL);
  vi.stubEnv("ADVISOR_API_TOKEN", TOKEN);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("when the advisor is not configured", () => {
  it("returns unavailable rather than calling an empty URL", async () => {
    vi.stubEnv("ADVISOR_API_URL", "");
    const spy = upstreamReturns({});
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));

    expect(response.status).toBe(503);
    expect(spy).not.toHaveBeenCalled();
  });

  it("treats a URL without a token as unconfigured", async () => {
    vi.stubEnv("ADVISOR_API_TOKEN", "");
    const spy = upstreamReturns({});
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));

    expect(response.status).toBe(503);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("input handling", () => {
  it("rejects an empty message without spending an upstream call", async () => {
    const spy = upstreamReturns({});
    const { POST } = await loadRoute();

    expect((await POST(post({ message: "   " }))).status).toBe(400);
    expect(spy).not.toHaveBeenCalled();
  });

  it("rejects an oversized message", async () => {
    const spy = upstreamReturns({});
    const { POST } = await loadRoute();

    expect((await POST(post({ message: "x".repeat(2001) }))).status).toBe(400);
    expect(spy).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON", async () => {
    upstreamReturns({});
    const { POST } = await loadRoute();

    const response = await POST(
      new Request("https://intellimindz.in/api/advisor", {
        method: "POST",
        body: "not json",
      })
    );

    expect(response.status).toBe(400);
  });

  it("drops a session id that is too long rather than forwarding it", async () => {
    const spy = upstreamReturns({ session_id: "s1", answer: "Hi" });
    const { POST } = await loadRoute();

    await POST(post({ message: "Hi", sessionId: "x".repeat(200) }));

    const sent = JSON.parse(spy.mock.calls[0]![1].body as string);
    expect(sent.session_id).toBeNull();
  });
});

describe("what reaches the advisor", () => {
  it("carries the shared token", async () => {
    const spy = upstreamReturns({ session_id: "s1", answer: "Hi" });
    const { POST } = await loadRoute();

    await POST(post({ message: "Hi" }));

    const headers = spy.mock.calls[0]![1].headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${TOKEN}`);
  });

  it("identifies the visitor without sending their address", async () => {
    const spy = upstreamReturns({ session_id: "s1", answer: "Hi" });
    const { POST } = await loadRoute();

    await POST(post({ message: "Hi" }, { "x-forwarded-for": "203.0.113.9, 10.0.0.1" }));

    const headers = spy.mock.calls[0]![1].headers as Record<string, string>;
    expect(headers["X-Client-Id"]).toMatch(/^[0-9a-f]{32}$/);
    expect(JSON.stringify(headers)).not.toContain("203.0.113.9");
  });

  it("gives two visitors different ids and one visitor a stable id", async () => {
    const spy = upstreamReturns({ session_id: "s1", answer: "Hi" });
    const { POST } = await loadRoute();

    await POST(post({ message: "Hi" }, { "x-forwarded-for": "203.0.113.9" }));
    await POST(post({ message: "Hi" }, { "x-forwarded-for": "203.0.113.9" }));
    await POST(post({ message: "Hi" }, { "x-forwarded-for": "198.51.100.4" }));

    const idOf = (call: number) =>
      (spy.mock.calls[call]![1].headers as Record<string, string>)["X-Client-Id"];

    expect(idOf(0)).toBe(idOf(1));
    expect(idOf(0)).not.toBe(idOf(2));
  });
});

describe("what reaches the browser", () => {
  it("re-shapes the answer instead of forwarding the upstream body", async () => {
    upstreamReturns({
      session_id: "s1",
      answer: "Digital Payments Ecosystem runs 3 hours.",
      sources: ["search_courses"],
      withheld: false,
      internal_debug: "a field nobody chose to expose",
    });
    const { POST } = await loadRoute();

    const body = await (await POST(post({ message: "Hi" }))).json();

    expect(body).toEqual({
      sessionId: "s1",
      answer: "Digital Payments Ecosystem runs 3 hours.",
      sources: ["search_courses"],
      withheld: false,
    });
  });

  it("passes on that an answer was withheld", async () => {
    upstreamReturns({ session_id: "s1", answer: "I can't confirm that.", withheld: true });
    const { POST } = await loadRoute();

    const body = await (await POST(post({ message: "Hi" }))).json();

    expect(body.withheld).toBe(true);
  });

  it("never reveals that our own token was rejected", async () => {
    upstreamReturns({ detail: "Not authorised." }, { status: 401 });
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));
    const text = await response.text();

    expect(response.status).toBe(502);
    expect(text).not.toContain("authorised");
    expect(text).not.toContain(TOKEN);
  });

  it("passes a rate limit through as one, with a retry hint", async () => {
    upstreamReturns({ detail: "slow down" }, { status: 429, headers: { "Retry-After": "42" } });
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("42");
  });

  it("does not leak the service address when it cannot be reached", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error(`getaddrinfo ENOTFOUND ${ADVISOR_URL}`);
      })
    );
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));
    const text = await response.text();

    expect(response.status).toBe(503);
    expect(text).not.toContain("advisor.internal");
    expect(text).not.toContain("ENOTFOUND");
  });

  it("is not cached", async () => {
    upstreamReturns({ session_id: "s1", answer: "Hi" });
    const { POST } = await loadRoute();

    const response = await POST(post({ message: "Hi" }));

    expect(response.headers.get("Cache-Control")).toContain("no-store");
  });
});
