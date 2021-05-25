import React, { Component } from 'react';
import { authLogout } from '../../../utils/Auth/Auth';

class ForbiddenPage extends Component {
  logout = () => {
    authLogout();
  }

  render() {
    return (
      <div className="forbidden-page flex-box--center">
        <div className="block-text text-center">
          <h3>You do not have access to the application.</h3>
          <p>Contact your DIO or Admin <a href='mailto:DMS-ImplementationACT@coxautoinc.com' target='_blank'>(DMS-ImplementationACT@coxautoinc.com).</a></p>
          <a className="forbidden-logout" onClick={this.logout}>Log Out</a>
        </div>
      </div>
    );
  }
}

export default ForbiddenPage;
