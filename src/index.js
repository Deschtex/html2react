import parseNodes from './parse-nodes'

const HTML2React = (elementOverrides = {}) => (content) => {
  // Put in a temporary container so we can traverse the tree.
  const tempEl = document.createElement('div')
  tempEl.innerHTML = content

  return parseNodes(tempEl.childNodes, elementOverrides)
}

export default function (...args) {
  if (args.length === 2) {
    return HTML2React(args[1])(args[0])
  } else if (typeof args[0] === 'string') {
    return HTML2React()(args[0])
  }
  return HTML2React(args[0])
}
