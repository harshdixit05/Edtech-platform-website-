import Link from "next/link";
import { EXTERNAL } from "@/lib/content";

export function AnnouncementBar() {
  return (
    <div className="bg-navy-ink">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-center text-[0.8125rem] text-white/80">
        <span>
          Free and paid FinTech programmes — from Discovery to Advanced, self-paced or live.
        </span>
        <Link
          href={EXTERNAL.catalogue}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-semibold text-teal-bright"
        >
          Browse the catalogue ↗
        </Link>
      </div>
    </div>
  );
}
