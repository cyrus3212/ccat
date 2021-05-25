import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../NavLink';
import { getParam } from '../../../../helpers/urlParam';

class Nav extends Component {

  renderConfigureMenu = (_id) => {
    const configureUrl = this.props.dtid === undefined ? '' : '/'+this.props.dtid;
    const isConfigureActive = window.location.pathname === '/configure/'+this.props.code+configureUrl ? 'active' : null || window.location.pathname === '/configure/'+this.props.code ? 'active' : null
    let compoLink = null;

    if (this.props.user.roleName === 'Admin' || this.props.user.roleName === 'DIO') {
      // if on the admin home page hide the configure link
      if (this.props.admin === true) {
        compoLink = null;
      }
      else {
        compoLink = <NavLink id={_id+1} url={'/configure/'+this.props.code+configureUrl} name='Configure' key={_id+1} className={isConfigureActive} />
      }
    }
    else {
      if (this.props.admin === true) {
        compoLink = null;
      }
      else {
        compoLink = <NavLink id={_id+1} url={'/configure/'+this.props.code+configureUrl} name='Configure' disabled={true} key={_id+1} className={isConfigureActive} />;
      }
    }

    return compoLink;
  }

  render() {
    let _id = 0;
    let links = [];

    try {
      links = Object.keys(this.props.links).map((index) =>{
        _id = index;
        let name = this.props.links[index].value;
        let label = this.props.links[index].label;
        let isActive = this.props.activeMenu === name ? 'active' : null;
        let isActiveMenu = this.props.links[index].value == getParam() ? 'active' : '';

        if (this.props.admin === true && this.props.user.roleName === 'Admin') {
          return (
              <NavLink id={_id} key={_id} url={`/${name}`} name={label} key={index} className={isActiveMenu} />
          )
        } else {
          let hasAccess = true;
          if (this.props.links[index].hasAccess === true) {
            hasAccess = false;
          }
          return <NavLink id={_id} disabled={hasAccess} url={'/workbooks/'+name+'/'+this.props.code+'/'+this.props.dtid} name={label} key={index} className={isActive}/>
        }
      })
    }
    catch (e) {

    }

    return (
      <div>
        {links.length > 0 ? links : ''}
        {this.renderConfigureMenu(_id)}
      </div>
    );
  }

}

Nav.propTypes = {
  links: PropTypes.any.isRequired,
  code: PropTypes.string
};

export default Nav;
