import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class ErrorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return <div><h1>{this.props.error}</h1></div>
  }
}

ErrorPage.propTypes = {
  dispatch: PropTypes.func,
};

export default ErrorPage;
