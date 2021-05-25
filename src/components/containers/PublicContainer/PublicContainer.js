import React, { Component } from 'react';
import '../_app.scss';
import PropTypes from 'prop-types';

class PublicContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-layout">
        <div id="wrapper" className="content">
          <div>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

PublicContainer.propTypes = {
  children: PropTypes.element,
};

export default PublicContainer;
