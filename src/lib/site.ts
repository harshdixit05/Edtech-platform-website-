/**
 * The origin this deployment is actually served from, and whether it is the
 * Foundation's real site or a preview.
 *
 * Preview deployments (vercel.app URLs, staging, local) must not be indexed:
 * the site carries third-party and government marks, and those should only
 * ever appear in search results on the Foundation's own domain.
 */

const PRODUCTION_HOST = "intellimindz.in";

export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `https://${PRODUCTION_HOST}`)
).replace(/\/$/, "");

export const isProductionSite =
  process.env.VERCEL_ENV === "production" || siteUrl.includes(PRODUCTION_HOST);
