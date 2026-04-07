export function readStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback
  }

  const value = window.localStorage.getItem(key)
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value) as T
  } catch {
    window.localStorage.removeItem(key)
    return fallback
  }
}
