# HTML2React

[![npm version](https://img.shields.io/npm/v/html2react.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.org/package/html2react)

A utility for turning raw HTML into React elements.

## Installation

```
npm install --save html2react
```

## Usage

### Basic HTML conversion

If you want to take raw HTML and turn it into something that you can use in a React application, without using [dangerouslySetInnerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html), then you can simply pass it to `html2react`:


```javascript
import React from 'react'
import { render } from 'react-dom'
import HTML2React from 'html2react'

const html = `
  <h1>Foo</h1>
  <p><a href="#" style="text-decoration: none;">Bar</a></p>
  <p>Baz</p>
`

render(
  <div>
    {HTML2React(html)}
  </div>,
  document.getElementById('root')
)
```

**Note:** All attributes but [event handlers](https://www.w3.org/TR/html5/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects) will be transferred to the React elements.

### HTML conversion with element overrides

A powerful feature of `html2react` is the ability to target elements in the provided HTML and override them with React components, using nothing but [CSS selectors](https://www.w3.org/TR/css3-selectors/#selectors) for the mapping. Super simple!

The following example maps any `<a>` tag in the HTML to the local `Link` component:

```javascript
import React from 'react'
import { render } from 'react-dom'
import HTML2React from 'html2react'

function Link (props) {
  return <a {...props} style={{ textDecoration: 'none' }} />
}

const html = `
  <h1>Foo</h1>
  <p><a href="#">Bar</a></p>
  <p>Baz</p>
`
const content = HTML2React(html, {
  a: Link
})

render(
  <div>
    {content}
  </div>,
  document.getElementById('root')
)
```

**Note:** In the example above, a stateless component is used, however, all [React components](https://facebook.github.io/react/docs/reusable-components.html) work.

The following example maps any `<a>` tag with an `external` class to the local `ExternalLink` component:

```javascript
import React from 'react'
import { render } from 'react-dom'
import HTML2React from 'html2react'

function Link (props) {
  return <a {...props} style={{ textDecoration: 'none' }} />
}
function ExternalLink (props) {
  return <Link {...props} target='_blank' />
}

const html = `
  <h1>Foo</h1>
  <p><a href="http://bar" class="external">Bar</a></p>
  <p><a href="#">Baz</a></p>
  <p>Qux</p>
`
const content = HTML2React(html, {
  'a.external': ExternalLink,
  a: Link
})

render(
  <div>
    {content}
  </div>,
  document.getElementById('root')
)
```

In this last example, a slightly more complex selector is used in order to map only the second `<p>` tag to a `<p>` tag that wraps the local `Link` component.

```javascript
import React from 'react'
import { render } from 'react-dom'
import HTML2React from 'html2react'

function Link (props) {
  return <a {...props} style={{ textDecoration: 'none' }} />
}

const html = `
  <h1>Foo</h1>
  <p>Bar</p>
  <p>Baz</p>
  <p>Qux</p>
`
const content = HTML2React(html, {
  'p:nth-of-type(2)': (props) => <p><Link {...props} /></p>
})

render(
  <div>
    {content}
  </div>,
  document.getElementById('root')
)
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

See [LICENSE](LICENSE) attached.
