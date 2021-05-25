import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from '../../components/reusable/Loader';

describe('Loading Indicator', () => {
  it('Defining Loader Component', () => {
    expect(LoadingIndicator).toBeDefined();
  });

  it('it should render the loader component', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper);
  });
});
