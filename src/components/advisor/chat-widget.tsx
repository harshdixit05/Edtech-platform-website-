"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "visitor" | "advisor";
  text: string;
  sources?: string[];
  withheld?: boolean;
};

const STORAGE_KEY = "intellimindz-advisor";

const OPENING =
  "Ask me about Intellimindz courses — what's covered, how long something runs, or what it costs. I answer from the course catalogue, so if a detail isn't published I'll tell you rather than guess.";

/** Tool names are internal; this is what a visitor is told was consulted. */
const SOURCE_LABELS: Record<string, string> = {
  search_courses: "course catalogue",
  get_course: "course details",
  compare_courses: "course comparison",
  recommend_courses: "course catalogue",
  build_learning_path: "level sequence",
  get_pricing: "published fees",
};

function describe(sources: string[]): string {
  const labels = [...new Set(sources.map((s) => SOURCE_LABELS[s] ?? "course catalogue"))];
  return `Checked against the ${labels.join(" and ")}`;
}

type Saved = { sessionId: string | null; messages: Message[] };

/**
 * Read once, at mount, so a reload does not lose the conversation.
 *
 * Safe as a lazy initialiser despite running during server rendering: it
 * returns nothing on the server, and on the client the panel starts closed, so
 * a restored conversation is not part of the markup being hydrated. Storage
 * can also be unavailable or corrupt in a private window, which is not an
 * error worth showing anyone.
 */
function readSaved(): Saved {
  if (typeof window === "undefined") return { sessionId: null, messages: [] };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { sessionId: null, messages: [] };
    const parsed = JSON.parse(raw) as Partial<Saved>;
    return {
      sessionId: parsed.sessionId ?? null,
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch {
    return { sessionId: null, messages: [] };
  }
}

export function ChatWidget() {
  const [restored] = useState(readSaved);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(restored.messages);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef<string | null>(restored.sessionId);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(restored.messages.length + 1);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ sessionId: sessionId.current, messages })
      );
    } catch {
      /* the conversation still works, it just won't survive a reload */
    }
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || pending) return;

    setMessages((prev) => [...prev, { id: nextId.current++, role: "visitor", text }]);
    setDraft("");
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId.current }),
      });
      const body = await response.json();

      if (!response.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      sessionId.current = body.sessionId || sessionId.current;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "advisor",
          text: body.answer,
          sources: body.sources,
          withheld: body.withheld,
        },
      ]);
    } catch {
      setError("Couldn't reach the advisor. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="advisor-panel"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(15,23,56,0.9)] transition-colors duration-200 hover:bg-navy-deep"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          )}
        </svg>
        {open ? "Close" : "Ask about courses"}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="advisor-panel"
          role="dialog"
          aria-label="Course advisor"
          className="fixed bottom-24 right-6 z-50 flex max-h-[min(34rem,calc(100dvh-8rem))] w-[min(23.5rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[0_30px_70px_-30px_rgba(15,23,56,0.55)]"
        >
          <header className="border-b border-line px-5 py-4">
            <p className="t-eyebrow text-teal-deep">Course advisor</p>
            <p className="mt-1 text-[0.9375rem] font-semibold text-ink">
              Find the right Intellimindz course
            </p>
          </header>

          <div
            ref={logRef}
            className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <p className="text-[0.875rem] leading-relaxed text-ink-soft">{OPENING}</p>
            )}

            {messages.map((message) =>
              message.role === "visitor" ? (
                <p
                  key={message.id}
                  className="ml-auto w-fit max-w-[85%] rounded-[var(--radius-sm)] bg-tint px-3.5 py-2.5 text-[0.875rem] text-ink"
                >
                  {message.text}
                </p>
              ) : (
                <div key={message.id} className="max-w-[92%]">
                  <p className="whitespace-pre-wrap text-[0.875rem] leading-relaxed text-ink">
                    {message.text}
                  </p>
                  {message.withheld ? (
                    <p className="mt-1.5 text-[0.75rem] text-ink-faint">
                      Some details couldn&rsquo;t be confirmed, so they were left out.
                    </p>
                  ) : message.sources && message.sources.length > 0 ? (
                    <p className="mt-1.5 text-[0.75rem] text-ink-faint">
                      {describe(message.sources)}
                    </p>
                  ) : null}
                </div>
              )
            )}

            {pending && (
              <p className="text-[0.8125rem] text-ink-faint" role="status">
                Checking the catalogue…
              </p>
            )}

            {error && (
              <p className="rounded-[var(--radius-sm)] bg-[#fdf2f2] px-3.5 py-2.5 text-[0.8125rem] text-[#8c2f2f]">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={send} className="border-t border-line px-3 py-3">
            <div className="flex items-center gap-2">
              <label htmlFor="advisor-input" className="sr-only">
                Your question
              </label>
              <input
                ref={inputRef}
                id="advisor-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={2000}
                autoComplete="off"
                placeholder="e.g. What suits a CA new to payments?"
                className="min-w-0 flex-1 rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-[0.875rem] text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
              />
              <button
                type="submit"
                disabled={pending || draft.trim().length === 0}
                className="shrink-0 rounded-[var(--radius-sm)] bg-teal px-4 py-2.5 text-[0.8125rem] font-semibold text-white transition-colors duration-200 hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>
            <p className="mt-2 px-1 text-[0.6875rem] leading-snug text-ink-faint">
              Course facts come from the Intellimindz catalogue. Fees shown are
              indicative — the team confirms the final amount.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
