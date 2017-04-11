import ReactProperties from './react-properties-map'

export default function getPropsFromAttributes (element) {
  const attributes = Array.from(element.attributes || [])

  return attributes.reduce((props, { name, value }) => {
    const propName = getPropName(name, element)
    const propValue = getPropValue(propName, value)
    return {
      ...props,
      [propName]: propValue
    }
  }, {})
}

function formatStylePropName (propName) {
  // Vendor prefixes other than "ms" should begin with a capital letter.
  // See: https://facebook.github.io/react/tips/inline-styles.html.
  propName = propName.replace(/^(\s+)?-(?=ms)/, '').trim()
  // Turn, for instance, "-webkit-property" into "WebkitProperty"
  // and "font-size" into "fontSize.
  return propName.replace(/(\-\w)/g, (match) => {
    return match[1].toUpperCase()
  })
}

function getStylePropValue (attrValue) {
  const props = attrValue.split(';').filter((prop) => {
    return !!prop
  })

  return props.reduce((props, prop) => {
    let [propName, propValue] = prop.split(/:(.+)?/)
    propName = formatStylePropName(propName)
    propValue = propValue.trim()
    return {
      ...props,
      [propName]: propValue
    }
  }, {})
}

function getPropName (attrName, element) {
  const lowerAttrName = attrName.toLowerCase()

  if (lowerAttrName === 'value') {
    const tagName = element.tagName.toLowerCase()
    // https://facebook.github.io/react/docs/forms.html#default-value
    // https://facebook.github.io/react/docs/forms.html#why-select-value
    if (tagName === 'input' || tagName === 'select') {
      return 'defaultValue'
    }
  } else if (lowerAttrName === 'checked') {
    return 'defaultChecked'
  }

  return ReactProperties[attrName] || attrName
}

function getPropValue (propName, attrValue) {
  const lowerPropName = propName.toLowerCase()

  if (lowerPropName === 'style') {
    return getStylePropValue(attrValue)
  }

  switch (lowerPropName) {
    case 'checked':
    case 'defaultchecked':
    case 'readonly':
    case 'disabled':
      return true;
  }

  return attrValue
}
