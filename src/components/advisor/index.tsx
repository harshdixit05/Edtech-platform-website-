import { isAdvisorConfigured } from "@/lib/advisor/config";
import { ChatWidget } from "./chat-widget";

/**
 * Renders nothing when the advisor service is not configured, so a preview
 * deployment does not offer a button that can only fail.
 */
export function Advisor() {
  if (!isAdvisorConfigured()) return null;
  return <ChatWidget />;
}
