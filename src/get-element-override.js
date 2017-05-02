export default function getElementOverride (element, overrides) {
  const parentNode = getTopMostElementParent(element)

  for (const override in overrides) {
    if (overrides.hasOwnProperty(override)) {
      try {
        const matches = parentNode.getElementsByTagName(override)
        if (Array.prototype.indexOf.call(matches, element) > -1) {
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
  // Traverse up the DOM tree until the last parent is found.
  while (parentNode.parentNode) {
    parentNode = parentNode.parentNode
  }
  return parentNode
}
