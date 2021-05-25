import React, { Component } from 'react';
import './_notAllowedPage.scss';
import BlockText from '../../reusable/BlockText';

class NotAllowedPage extends Component {
  render() {
    const notFoundPage = this.props.notFoundPage || false;
    let message = '';

    if (notFoundPage === true) {
      message = 'Page Not Found. <br /> <br />Contact your DIO or Admin for proper access.';
    }
    else {
      message = 'You are not allowed to access this ' + this.props.name + ' page. <br /> <br />Contact your DIO or Admin if you need to access this page.';
    }

    return (
      <div className="not-allowed-page">
        <BlockText title={message} />
      </div>);
  }
}

export default NotAllowedPage;
