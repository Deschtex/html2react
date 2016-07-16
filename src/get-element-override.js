export default function getElementOverride (element, overrides) {
  const parentNode = getTopMostElementParent(element)

  for (let override in overrides) {
    if (overrides.hasOwnProperty(override)) {
      try {
        const matches = parentNode.querySelectorAll(override)

        if (Array.from(matches).indexOf(element) > -1) {
          return overrides[override]
        }
      } catch (e) {
        // At least we tried.
      }
    }
  }
}

function getTopMostElementParent (element) {
  let parentNode = element.parentNode
  while (!parentNode) {
    parentNode = parentNode.parentNode
  }
  return parentNode
}
