//
// Small debounce utility.
//

// PUBLIC_INTERFACE
export function debounce(fn, wait = 250) {
  /** Debounce a function call by wait ms. */
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
