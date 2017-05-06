import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import renderer from 'react-test-renderer';

import HTML2React from '../src';

const dataset = [
  {
    input: "<p>Hello!</p>",
    output: '<p>Hello!</p>',
  },
  {
    input: "<input type='checkbox' checked/>",
    output: '<input type="checkbox" checked=""/>',
  },
  {
    input: `<pre>{
  "foo" : "bar"
}</pre>`,
    output: `<pre>{
  &quot;foo&quot; : &quot;bar&quot;
}</pre>`
  },

  {
    input: `<textarea>{
  "foo" : "bar"
}</textarea>`,
    output: `<textarea>{
  &quot;foo&quot; : &quot;bar&quot;
}</textarea>`
  },
];

jest.autoMockOff();

dataset.forEach(({ input, output }) => {
  it("renders to string correctly", () => {
    expect(renderToStaticMarkup(<div>{HTML2React(input)}</div>).replace(/(?:^<div[^>]*>)|(?:<\/div>$)/g, ''))
      .toBe(output)
  })
});

it("overrides elements", () => {
  const input = `<a href="/">link</a>`;
  const output = `<a href="/" target="_blank">link</a>`;
  const elementOverrides = {
    a: (props) => {
      return <a {...props} target="_blank"/>;
    },
  }
  expect(renderToStaticMarkup(<div>{HTML2React(input, elementOverrides)}</div>).replace(/(?:^<div[^>]*>)|(?:<\/div>$)/g, ''))
    .toBe(output)
});

it("overrides elements with CSS selectors", () => {
  const input = `<a href="/">foo</a><a href="/" class="external">bar</a>`;
  const output = `<a href="/">foo</a><a href="/" class="external" target="_blank">bar</a>`;
  const elementOverrides = {
    "a.external": (props) => {
      return <a {...props} target="_blank"/>;
    },
  }
  expect(renderToStaticMarkup(<div>{HTML2React(input, elementOverrides)}</div>).replace(/(?:^<div[^>]*>)|(?:<\/div>$)/g, ''))
    .toBe(output)
});
