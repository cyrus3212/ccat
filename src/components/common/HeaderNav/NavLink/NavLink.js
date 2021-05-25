import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavItem from 'react-bootstrap/lib/NavItem';
import '../../Header/_header.scss';
import { Link } from 'react-router-dom';

class NavLink extends Component {

  render() {
    const name = this.props.name || '';

    return (
      <NavItem disabled={this.props.disabled} eventKey={this.props.id} href={this.props.url} className={this.props.className}>
          {name}
      </NavItem>
    );
  }
}

NavLink.propTypes = {
  id: PropTypes.any,
  url: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default NavLink;
