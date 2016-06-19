import parseNodes from './parse-nodes'

export default function HTML2React (input = '', elementOverrides = {}) {
  // Put in a temporary container so we can traverse the tree.
  const tempEl = document.createElement('div')
  tempEl.innerHTML = input

  return parseNodes(tempEl.childNodes, elementOverrides)
}
