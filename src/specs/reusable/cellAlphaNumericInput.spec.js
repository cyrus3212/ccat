import React from 'react';
import { mount } from 'enzyme';
import CellAlphaNumericInput from '../../components/reusable/CellAlphaNumericInput';

describe('Alpha Numeric Input', () => {
  it('Defining alpha numeric Input', () => {
    expect(CellAlphaNumericInput).toBeDefined();
  });

  it('it should input alpha numeric and change value', () => {
    const wrapper = mount(<CellAlphaNumericInput htmlId="name" field="name" value="" data={{}} maxLength={10} label="Label"/>);
    // simulate the onchange event on alpha numeric input component
    const value = {
      target: {value: 'wsale123'}
    }

    wrapper.find('input').simulate('change', value);
    expect(wrapper.find('input').prop('value')).toBe('wsale123');
  });

  it('it should set props alpha numeric input', () => {
    const props = {
      htmlId: "name",
      field: "name",
      value: "",
      maxLength: 5
    };
    const wrapper = mount(<CellAlphaNumericInput {...props} />);
    expect(wrapper.find('input').prop('maxLength')).toEqual(5);
  });
});
