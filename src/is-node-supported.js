import NodeType from './node-type'

export default function isNodeSupported (node = {}) {
  return !(
    isTagNameIgnored(node.tagName) ||
    isNodeTypeIgnored(node.nodeType) ||
    isNodeValueIgnored(node.nodeValue)
  )
}

/**
 * Tag names that are not supported.
 * @type {Array}
 */
const IGNORED_TAG_NAMES = ['script']
/**
 * Checks if provided tag name is ignored (not supported).
 * @param {String} tagName
 * @return {Boolean}
 */
const isTagNameIgnored = (tagName = '') => (
  IGNORED_TAG_NAMES.indexOf(tagName.toLowerCase()) > -1
)

/**
 * Node types that are not supported.
 * @type {Array}
 */
const IGNORED_NODE_TYPES = [NodeType.COMMENT]
/**
 * Checks if provided node type is ignored (not supported).
 * @param {Number} nodeType
 * @return {Boolean}
 */
const isNodeTypeIgnored = (nodeType) => (
  IGNORED_NODE_TYPES.indexOf(nodeType) > -1
)

/**
 * Checks if provided node value is ignored (not supported).
 * @param {String} nodeValue
 * @return {Boolean}
 */
const isNodeValueIgnored = (nodeValue) => (
  nodeValue !== null && nodeValue === ''
)
