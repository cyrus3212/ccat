import React, { Component } from 'react';
import pack from '../../../../package.json';
import { getBaseUrl } from '../../../helpers/apiHelper';
const http = getBaseUrl();

class Page extends Component {
  render() {
    return (
      <div className="start-setup-page flex-box--center">
        <div className="block-text text-center">
          <h3>Health Check: Healthy</h3>
          <div>App Version: {pack.version}</div>
          <div>http: {http}</div>
          <div>Environment : {process.env.REACT_APP_ENV || "localhost"}</div>
        </div>
      </div>
    );
  }
}

export default Page;
