import getPropsFromAttributes from '../src/get-props-from-attributes';

function toElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
}

it("gets props from <input type='checkbox' checked/> element", () => {
    const element = toElement('<input type="checkbox" checked/>');

    expect(getPropsFromAttributes(element))
        .toEqual({
            type: "checkbox",
            defaultChecked: true,
        });
});

it("gets props from <input type='checkbox' disabled readonly/> element", () => {
    const element = toElement('<input type="checkbox" disabled readonly/>');

    expect(getPropsFromAttributes(element))
        .toEqual({
            type: "checkbox",
            disabled: true,
            readOnly: true,
        });
});

it("gets props from <input type='text'/> element", () => {
    const element = toElement('<input type="text" value="foo"/>');

    expect(getPropsFromAttributes(element))
        .toEqual({
            type: "text",
            defaultValue: "foo",
        });
});

it("gets props from <span style='...'/> element", () => {
    const element = toElement('<span style="color: red; font-weight: bold">foo</span>');

    expect(getPropsFromAttributes(element))
        .toEqual({
            style: {
                color: 'red',
                fontWeight: 'bold'
            },
        });
});
