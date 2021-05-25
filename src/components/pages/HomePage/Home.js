import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../reusable/Loader';
import { checkAccessToken } from '../../../utils/Auth/Auth';
import api from '../../../utils/Http';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    checkAccessToken().then(token => {
      if (token) {
        const http = api();
        http.get('User').then(resUser => {
          if (resUser.data.isOk) {
            const result = resUser.data.data;
            try {
              if (result.roleName === 'Admin' ) {
                this.props.params.history.replace('/admin');
              }
              else if (result.roleName === 'DIO' ) {
                this.props.params.history.replace(`/configure/${result.enterpriseCode}`);
              }
              else {
                http.get(`Menu/profile/${result.enterpriseCode}`).then(resProfile=> {
                  if (resProfile.data.isOk) {
                    const resStore = resProfile.data.data.stores;
                    this.props.params.history.replace(`/dashboard/${result.enterpriseCode}/${resStore[0].dtid}`);
                  }
                })
              }
            }
            catch (e) {
            }
          }
        });
      }
    })
  }

  render() {
    return <Loader />
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
};

HomePage.displayName = 'Home Page';

export default HomePage;
