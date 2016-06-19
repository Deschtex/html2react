import ReactProperties from './react-properties-map'

export default function getPropsFromAttributes (attributes = []) {
  return attributes.reduce((acc, { name, value }) => {
    const propName = ReactProperties[name] || name
    const propValue = getPropValue(propName, value)
    acc[propName] = propValue
    return acc
  }, {})
}

function formatStylePropName (name) {
  // Vendor prefixes other than "ms" should begin with a capital letter.
  // See: https://facebook.github.io/react/tips/inline-styles.html.
  name = name.replace(/^(\s+)?-(?=ms)/, '').trim()
  // Turn, for instance, "-webkit-property" into "WebkitProperty"
  // and "font-size" into "fontSize.
  return name.replace(/(\-\w)/g, (match) => {
    return match[1].toUpperCase()
  })
}

function getStylePropValue (value) {
  const properties = value.split(';')
  const filteredProperties = properties.filter((prop) => !!prop)

  return filteredProperties.reduce((acc, prop) => {
    let [propName, propValue] = prop.split(':')
    propName = formatStylePropName(propName)
    acc[propName] = propValue.trim()
    return acc
  }, {})
}

function getPropValue (name = '', value = '') {
  if (name.toLowerCase() === 'style') {
    return getStylePropValue(value)
  }
  return value
}
