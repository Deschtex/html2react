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
    input: "<pre><span>foo</span>\n<span>bar</span>\n</pre>",
    output: "<pre><span>foo</span>\n<span>bar</span>\n</pre>",
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
