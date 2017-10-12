import ReactHTMLDOMPropertyConfig from 'react-dom-core/lib/HTMLDOMPropertyConfig'
import ReactSVGDOMPropertyConfig from 'react-dom-core/lib/SVGDOMPropertyConfig'

/**
 * Object with HTML attributes mapped to React properties (IDL attributes)
 * @type {Object}
 */
const HTMLProperties = Object.keys(ReactHTMLDOMPropertyConfig.Properties).reduce((acc, key) => {
  const DOMAttributeName = ReactHTMLDOMPropertyConfig.DOMAttributeNames[key]
  const mappedKey = DOMAttributeName || (key || '').toLowerCase()
  acc[mappedKey] = key
  return acc
}, {})

/**
 * Object with SVG attributes mapped to React properties (IDL attributes)
 * @type {Object}
 */
const SVGProperties = Object.keys(ReactSVGDOMPropertyConfig.DOMAttributeNames).reduce((acc, key) => {
  const mappedKey = ReactSVGDOMPropertyConfig.DOMAttributeNames[key]
  acc[mappedKey] = key
  return acc
}, {})

export default {
  ...HTMLProperties,
  ...SVGProperties
}
