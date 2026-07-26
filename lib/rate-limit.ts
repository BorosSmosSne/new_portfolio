/**
 * Minimal in-memory rate limiter (sliding window).
 *
 * Used by app/api/contact/route.ts to blunt casual spam.
 *
 * Caveat: memory is per server instance, so on serverless platforms the limit
 * applies per instance rather than globally. That is fine for a portfolio
 * contact form. If you need a hard guarantee, back it with a shared store such
 * as Vercel KV or Upstash Redis, or put a CAPTCHA in front of the form.
 */

export type RateLimiter = {
  /** Returns true if this key has exceeded its allowance. */
  isLimited: (key: string) => boolean;
  /** Number of keys currently tracked. Exposed for tests. */
  size: () => number;
};

export function createRateLimiter({
  windowMs,
  max,
  now = () => Date.now(),
  maxKeys = 5000,
}: {
  windowMs: number;
  max: number;
  /** Injectable clock so tests don't have to sleep. */
  now?: () => number;
  /** Safety valve so the map can't grow without bound. */
  maxKeys?: number;
}): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    isLimited(key: string): boolean {
      const currentTime = now();
      const windowStart = currentTime - windowMs;

      // Drop timestamps that have aged out of the window.
      const timestamps = (hits.get(key) ?? []).filter(
        (timestamp) => timestamp > windowStart,
      );

      if (timestamps.length >= max) {
        hits.set(key, timestamps);
        return true;
      }

      timestamps.push(currentTime);
      hits.set(key, timestamps);

      // Evict keys whose activity is entirely in the past.
      if (hits.size > maxKeys) {
        for (const [entryKey, entryTimestamps] of hits) {
          if (entryTimestamps.every((timestamp) => timestamp <= windowStart)) {
            hits.delete(entryKey);
          }
        }
      }

      return false;
    },

    size() {
      return hits.size;
    },
  };
}
