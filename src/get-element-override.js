export default function getElementOverride (element, overrides) {
   // Put in a temporary container so we can query selectors on it.
  const tempEl = document.createElement('div')
  tempEl.appendChild(element)

  for (let override in overrides) {
    if (overrides.hasOwnProperty(override)) {
      try {
        if (tempEl.querySelector(override)) {
          return overrides[override]
        }
      } catch (e) {
        // At least we tried.
      }
    }
  }
}
