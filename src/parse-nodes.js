import React from 'react'
import NodeType from './node-type'
import isNodeSupported from './is-node-supported'
import getPropsFromAttributes from './get-props-from-attributes'
import getElementOverride from './get-element-override'

export default function parseNodes (nodes = [], elementOverrides = {}) {
  return Array.from(nodes).filter(isNodeSupported).map((node, index) => {
    if (node.nodeType === NodeType.ELEMENT) {
      return parseElementNode(node, index, elementOverrides)
    }
    return parseNode(node, index)
  })
}

function getElementProps (element, key) {
  const attributes = Array.from(element.attributes || [])
  return {
    ...getPropsFromAttributes(attributes),
    key
  }
}

function getElementChildren (element, overrides) {
  if (element.childNodes.length) {
    return parseNodes(element.childNodes, overrides)
  }
  return element.textContent
}

function parseElementNode (element, key, overrides) {
  const override = getElementOverride(element, overrides)
  const tagName = element.tagName
  const props = getElementProps(element, key)
  const children = getElementChildren(element, overrides)

  return React.createElement(
    override || tagName,
    props,
    children
  )
}

function parseNode (node, key) {
  return React.createElement(
    'span', {
      key
    },
    node.nodeValue
  )
}
