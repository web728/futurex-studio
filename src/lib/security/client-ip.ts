import "server-only";
const ipPattern=/^(?:(?:\d{1,3}\.){3}\d{1,3}|[a-fA-F0-9:]+)$/;
export function clientIp(headers:Headers){const trusted=process.env.TRUST_PROXY_HEADERS==="true"||process.env.VERCEL==="1";if(!trusted)return undefined;const candidate=(headers.get("x-forwarded-for")?.split(",")[0]||headers.get("x-real-ip")||"").trim();return candidate&&candidate.length<=64&&ipPattern.test(candidate)?candidate:undefined}
