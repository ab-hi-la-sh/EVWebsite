// Keeps the evmarketingsite.netlify.app copy of the site out of search results.
// Header rules in netlify.toml can only match paths, not hostnames, so this runs
// on every request and adds noindex only when the site is reached on a
// *.netlify.app host. Requests on the real domain pass through untouched.
//
// Once www.enigmavault.io points at Netlify, the netlify.app host should 301 to
// it instead (see the commented redirect in netlify.toml) and this file can go.
import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  if (new URL(request.url).hostname.endsWith(".netlify.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
};

export const config: Config = { path: "/*" };
