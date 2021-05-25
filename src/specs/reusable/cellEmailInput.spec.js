import React from 'react';
import { mount } from 'enzyme';
import CellEmailInput from '../../components/reusable/CellEmailInput';

describe('Email Input', () => {
  it('Defining email Input', () => {
    expect(CellEmailInput).toBeDefined();
  });

  it('it should input email and change value', () => {
    const wrapper = mount(<CellEmailInput htmlId="name" field="name" value="" data={{}} label="email"/>);
    // simulate the onchange event on email input component
    const value = {
      target: {value: 'sss@email.com'}
    }

    wrapper.find('input').simulate('change', value);
    expect(wrapper.find('input').prop('value')).toBe('sss@email.com');
  });

  it('it should set props email input', () => {
    const props = {
      htmlId: "name",
      field: "name",
      value: "",
      maxLength: 5
    };
    const wrapper = mount(<CellEmailInput {...props} />);
    expect(wrapper.find('input').prop('maxLength')).toEqual(5);
  });
});
