export default function isElementChildrenSupported (element) {
  return (
    isNotVoidElementTag(element.tagName)
  )
}

/**
 * List of void element tag names, that is, elements without child nodes.
 * @type {Array}
 */
const VOID_ELEMENT_TAGS = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
]
/**
 * Checks if provided tag name is not in the list of void element tags.
 * @param {String} tagName
 * @return {Boolean}
 */
const isNotVoidElementTag = (tagName) => (
  VOID_ELEMENT_TAGS.indexOf(tagName.toLowerCase()) === -1
)
