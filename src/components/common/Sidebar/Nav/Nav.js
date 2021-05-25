import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../NavLink';
// import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    let _id = 0;
    const links = Object.keys(this.props.links).map((index) =>{
      _id = index;
      let name = this.props.links[index].value;
      let label = this.props.links[index].label;
      let isActive = this.props.activeMenu === name ? 'active' : null;

      if (this.props.admin === true) {
        return <NavLink id={_id} url={'/'} name={label} key={index} className='active' />
      } else {
        return <NavLink id={_id} url={'/workbooks/'+name+'/'+this.props.code+'/'+this.props.dtid} name={label} key={index} className={isActive}/>
      }
    })

    let isConfigureActive = this.props.activeMenu === undefined ? 'active' : null;
    let configureUrl = this.props.dtid === undefined ? '': '/'+this.props.dtid;
    return (
      <div>
        {links[0].props.name === undefined ? '' : links}
        {this.props.admin === true ? null : <NavLink id={_id+1} url={'/configure/'+this.props.code+configureUrl} name='Configure' key={_id+1} className={isConfigureActive} />}
      </div>
    );
  }
}

Nav.propTypes = {
  links: PropTypes.any.isRequired,
  code: PropTypes.string
};

export default Nav;
