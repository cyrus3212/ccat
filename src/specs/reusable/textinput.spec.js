import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../../components/reusable/TextInputHorizontal';

describe('Text Input', () => {
  it('Defining Text Input', () => {
    expect(TextInput).toBeDefined();
  });

  it('it should input text and change value', () => {
    const wrapper = mount(<TextInput htmlId="name" field="name" value="neza" label="text"/>);
    // simulate the onchange event on text input component
    wrapper.find('input').simulate('change', {target: {value: 'mary neza'}});
    expect(wrapper.find('input').prop('value')).toBe('mary neza');
  });

  it('it should set props text input', () => {
    const props = {
      htmlId: "name",
      field: "name",
      value: "neza",
      maxLength: 5
    };
    const wrapper = mount(<TextInput {...props} />);
    expect(wrapper.find('input').prop('maxLength')).toEqual(5);
  });
});
