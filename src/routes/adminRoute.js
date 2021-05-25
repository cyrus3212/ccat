import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminContainer from '../components/containers/AdminContainer';

const AdminRoute = ({ main: Component, isAuthenticated, ...rest }) => {
  return (<Route {...rest} render={props => (
    isAuthenticated === true ? (<AdminContainer title={rest.title}><Component {...props}/></AdminContainer>)
                    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }}/>)
  )}/>);
};

AdminRoute.propTypes = {
  location: PropTypes.object,
  main: PropTypes.func
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: true, //!!localStorage.getItem('access_token')
  };
}

export default connect(mapStateToProps)(AdminRoute);
