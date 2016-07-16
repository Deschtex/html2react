# HTML2React

[![npm version](https://img.shields.io/npm/v/html2react.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.org/package/html2react)

A utility for turning raw HTML into React elements.

## Installation

```
npm install --save html2react
```

## Usage

### Basic HTML conversion

If you want to take raw HTML, SVG or any arbitrary XML and turn it into something that you can use in a React application, without using [dangerouslySetInnerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html), then you can simply pass it to `html2react`:

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

A powerful feature of `html2react` is the ability to target elements in the provided HTML and *override* them with [React components](https://facebook.github.io/react/docs/reusable-components.html), using nothing but [CSS selectors](https://www.w3.org/TR/css3-selectors/#selectors) for the mapping. Super simple!

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

The following example maps any `<a>` tag with an `external` class to the local `ExternalLink` component. It also demonstrates a slightly more complex selector that maps only the third `<p>` tag to a `<p>` tag that wraps the local `Link` component:

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
  'p:nth-of-type(3)': (props) => <p><Link {...props} /></p>,
  a: Link
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
