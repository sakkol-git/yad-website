/**
 * Rate Limiting Utility — In-Memory Sliding Window
 *
 * Uses an in-memory Map with sliding window algorithm.
 * This is sufficient for single-server deployments. For multi-server
 * or edge deployment, upgrade to Upstash Redis:
 *   npm install @upstash/ratelimit @upstash/redis
 *
 * Usage:
 *   const { success, remaining } = await rateLimitByIP(ip, 5, '10m');
 *   if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
 */

interface RateLimitResult {
  success: boolean;
  remaining: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

// In-memory store (per-process, resets on restart/redeploy)
const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function parseWindow(window: string): number {
  const match = window.match(/^(\d+)(s|m|h|d)$/);
  if (!match) throw new Error(`Invalid rate limit window: ${window}`);
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    default: throw new Error(`Unknown time unit: ${unit}`);
  }
}

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

export async function rateLimitByIP(
  identifier: string,
  limit: number,
  window: string
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = parseWindow(window);

  // Periodic cleanup
  cleanup(windowMs);

  const entry = store.get(identifier) || { timestamps: [] };

  // Remove timestamps outside the current window (sliding window)
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    store.set(identifier, entry);
    return { success: false, remaining: 0 };
  }

  entry.timestamps.push(now);
  store.set(identifier, entry);
  return { success: true, remaining: limit - entry.timestamps.length };
}
