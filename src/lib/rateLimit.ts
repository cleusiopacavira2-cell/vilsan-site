/**
 * Simple in-memory rate limiter.
 * For production with multiple instances, replace the Map with
 * an Upstash Redis client (same interface, just swap the store).
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

/**
 * @param key      Unique identifier (e.g. IP address)
 * @param limit    Max requests allowed in the window
 * @param windowMs Window duration in milliseconds
 * @returns { allowed: boolean, remaining: number }
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count }
}
