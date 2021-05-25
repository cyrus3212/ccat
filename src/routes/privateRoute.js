import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateContainer from '../components/containers/PrivateContainer';

const PrivateRoute = ({ main: Component, isAuthenticated, ...rest }) => {
  return (<Route {...rest} render={props => (
    isAuthenticated === true ? (<PrivateContainer title={rest.title}><Component {...props}/></PrivateContainer>)
                                  : (<Redirect to={{ pathname: '/login', state: { from: props.location } }}/>)
  )}/>);
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  main: PropTypes.any
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: !!localStorage.getItem('access_token')
  };
}

export default connect(mapStateToProps)(PrivateRoute);
