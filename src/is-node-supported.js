import NodeType from './node-type'

export default function isNodeSupported (node = {}) {
  return !(
    isNodeTypeIgnored(node.nodeType) ||
    isNodeValueIgnored(node.nodeValue)
  )
}

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
