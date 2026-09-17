import { NextResponse } from "next/server";
import {
  advisorHeaders,
  advisorUrl,
  isAdvisorConfigured,
  visitorKey,
} from "@/lib/advisor/config";

/** Matches the advisor's own cap, so an oversized message is refused here. */
const MAX_MESSAGE_CHARS = 2000;
const MAX_SESSION_ID_CHARS = 64;

/** The advisor calls a model; a slow answer is normal, a stuck one is not. */
const TIMEOUT_MS = 30_000;

const UNAVAILABLE =
  "The learning advisor isn't connected on this deployment yet.";

type Payload = { message?: unknown; sessionId?: unknown };

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (!isAdvisorConfigured()) {
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json({ error: "Message missing or too long." }, { status: 400 });
  }

  const sessionId =
    typeof payload.sessionId === "string" && payload.sessionId.length <= MAX_SESSION_ID_CHARS
      ? payload.sessionId
      : null;

  const timeout = AbortSignal.timeout(TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(`${advisorUrl}/api/chat`, {
      method: "POST",
      headers: advisorHeaders(visitorKey(clientAddress(request))),
      body: JSON.stringify({ message, session_id: sessionId }),
      signal: timeout,
      cache: "no-store",
    });
  } catch {
    // A DNS failure, a refused connection or a timeout. The visitor gets a
    // sentence; the reason would only ever describe our own infrastructure.
    return NextResponse.json(
      { error: "The advisor is not responding right now. Please try again shortly." },
      { status: 503 }
    );
  }

  if (upstream.status === 429) {
    return NextResponse.json(
      { error: "That's a lot of questions in a short time. Please pause a moment." },
      { status: 429, headers: { "Retry-After": upstream.headers.get("Retry-After") ?? "60" } }
    );
  }

  if (!upstream.ok) {
    // 401 here means our own token is wrong, which the visitor cannot act on
    // and must not be told. Every upstream failure reads the same from outside.
    return NextResponse.json(
      { error: "The advisor couldn't answer that just now. Please try again." },
      { status: 502 }
    );
  }

  const body = await upstream.json();

  // Re-shaped rather than forwarded, so a new field added upstream cannot
  // reach the browser without someone deciding it should.
  return NextResponse.json(
    {
      sessionId: String(body.session_id ?? ""),
      answer: String(body.answer ?? ""),
      sources: Array.isArray(body.sources) ? body.sources.map(String) : [],
      withheld: Boolean(body.withheld),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
