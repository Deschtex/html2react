# HTML2React

[![npm version](https://img.shields.io/npm/v/html2react.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.org/package/html2react)

A utility for turning raw HTML into React elements.

## Installation

```
npm install --save html2react
```

## Usage

### Basic example

```javascript
import React from 'react'
import HTML2React from 'html2react'
import { render } from 'react-dom'

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

### Basic override example

```javascript
import React from 'react'
import HTML2React from 'html2react'
import { render } from 'react-dom'

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

### Advanced override examples

```javascript
import React from 'react'
import HTML2React from 'html2react'
import { render } from 'react-dom'

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

```javascript
import React from 'react'
import HTML2React from 'html2react'
import { render } from 'react-dom'

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
  'p:nth-of-type(2)': (props) => (
    <p><Link {...props } /></p>,
  )
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
