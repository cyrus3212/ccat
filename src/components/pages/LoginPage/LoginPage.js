import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../../reusable/Loader';

class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Redirect to={`/`} />;
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
};

LoginPage.displayName = 'Login Page';

export default LoginPage;
