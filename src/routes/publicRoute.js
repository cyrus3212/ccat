import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PublicContainer from '../components/containers/PublicContainer';

const PublicRoute = ({ main: Component, isAuthenticated, ...rest }) => {
  return (<Route {...rest} render={props => (
    <PublicContainer>
      <Component {...props} />
    </PublicContainer>
  )}/>);
};

PublicRoute.propTypes = {
  main: PropTypes.func,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: !!localStorage.getItem('access_token')
  };
}

export default connect(mapStateToProps)(PublicRoute);
