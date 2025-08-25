//
// Simple localStorage wrapper with namespacing and JSON handling.
//

const NS = 'notesapp_v1';

// PUBLIC_INTERFACE
export function load(key, fallback) {
  /** Load a value from localStorage under our namespace. */
  try {
    const raw = localStorage.getItem(`${NS}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function save(key, value) {
  /** Save a value to localStorage under our namespace. */
  try {
    localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
  } catch {
    // ignore quota or serialization errors in UI-only app
  }
}

// PUBLIC_INTERFACE
export function remove(key) {
  /** Remove a key from localStorage under our namespace. */
  try {
    localStorage.removeItem(`${NS}:${key}`);
  } catch {
    // ignore
  }
}
