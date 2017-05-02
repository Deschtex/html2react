import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import renderer from 'react-test-renderer';

import HTML2React from '../src';

jest.autoMockOff();

it("removes <script> by default", () => {
  const h2r = HTML2React({})
  expect(renderToStaticMarkup(<div>{h2r(`<script>document.write("Hello!")</script>`)}</div>).replace(/(?:^<div[^>]*>)|(?:<\/div>$)/g, ''))
    .toBe("")
})

it("overrides <script> explicitly", () => {
  const h2r = HTML2React({
    script: (props) => {
      return <code>{props.children}</code>;
    },
  })
  expect(renderToStaticMarkup(<div>{h2r(`<script>document.write("Hello!")</script>`)}</div>).replace(/(?:^<div[^>]*>)|(?:<\/div>$)/g, ''))
    .toBe(`<code>document.write(&quot;Hello!&quot;)</code>`)
})
