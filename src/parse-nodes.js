import React from 'react'
import getElementOverride from './get-element-override'
import getPropsFromAttributes from './get-props-from-attributes'
import isElementChildrenSupported from './is-element-children-supported'
import isNodeSupported from './is-node-supported'
import NodeType from './node-type'

export default function parseNodes (nodes = [], elementOverrides = {}) {
  return Array.from(nodes).filter(isNodeSupported).map((node, index) => {
    if (node.nodeType === NodeType.ELEMENT) {
      return parseElementNode(node, index, elementOverrides)
    }
    return node.nodeValue
  })
}

function getElementChildren (element, overrides) {
  if (isElementChildrenSupported(element)) {
    return parseNodes(element.childNodes, overrides)
  }
}

function getElementProps (element, key) {
  const attributes = Array.from(element.attributes || [])
  return {
    ...getPropsFromAttributes(attributes),
    key
  }
}

function parseElementNode (element, key, overrides) {
  const children = getElementChildren(element, overrides)
  const override = getElementOverride(element, overrides)
  const tagName = element.tagName
  const props = getElementProps(element, key)
  const args = [override || tagName, props]

  if (children) {
    args.push(children)
  }

  return React.createElement(...args)
}
