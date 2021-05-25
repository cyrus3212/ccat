import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './_header.scss';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import HeaderNav from '../HeaderNav/Nav';
import { Link } from 'react-router-dom';
import commonTranslate from '../../../translation/common.json';
import { getUserStoreList } from '../../../api/userStoreApi';
import { authLogout } from '../../../actions/authActions';
import TextMarkUp from '../../reusable/TextMarkUp';
import api from '../../../utils/Http';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMenu: false,
      user: {},
      code: props.code,
      stores: [],
      companyNumber: "",
      companyName: "",
      dtid: "",
      isErrorAPI: false,
      errorMessage: "",
      homeUrl: '/'
    }
  }

  componentDidMount() {
    if (this.props.code !== undefined || this.props.code !== "") {
      this.props.dispatch(getUserStoreList(this.props.code));
    }
    this.initializeHomeLink();
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      if (nextProps.user.isOk === true) {
        const stores = nextProps.stores || [{dtid: "", companyNumber: "", name: ""}];

        return {
          stores: stores,
          dtid: stores[0].dtid || '------',
          companyNumber: stores[0].companyNumber || '----',
          companyName: stores[0].name || '------'
        };
      }
      return {stores: nextProps.stores}
    }
    catch (e) {
      return null;
    }

  }

  toggleMenu = () => {
    const { isShowMenu } = this.state;
    if (!isShowMenu) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({ isShowMenu: !isShowMenu })
  }

  handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    try {
      if (this.node.contains(e.target)) {
        return;
      }
      this.toggleMenu();
    } catch (error) {

    }
  }

  handleLogout = () => {
    this.props.dispatch(authLogout());
  }

  renderStores = () => {
    const {code, stores} = this.state;
    let listStore = [];
    let dtid = this.props.dtid || "";

    if (dtid === undefined || dtid === "" && stores.length > 0) {
      dtid = stores[0].dtid;
    }

    function reloadPage(e) {
      if (e) { window.location.reload() }
    }

    listStore = stores.map((store, index) => {
      const link = '/dashboard/' + code + '/' + store.dtid;
      let activeMenu = dtid == store.dtid ? 'active' : null;
      return <li className={activeMenu} key={index}><a key={index} href={link}>{code} / {store.companyNumber} / {store.dtid}</a></li>
    });

    return listStore;
  }

  renderAdminHeader = () => {
    const {user} = this.state;
    const firstName = user.firstName || " ";
    const lastName = user.lastName || " ";
    const userName = firstName + " " + lastName;
    const userRole = user.roleName || " ";

    return (
      <Fragment>
        <NavItem eventKey={2} href="#" className="header-user-menu" onClick={this.toggleMenu} >
          <span className="header-user-menu__admintext">
            <span className="header-user-menu__name">{userName}</span><br/>
            <span className="header-user-menu__role">{userRole}</span>
          </span>
          <i className="fas fa-chevron-down"></i>
          { !this.state.isShowMenu ? null :
            <span className="user-menu-dropdown" ref={node => { this.node = node }}>
              <ul>
                {userRole === 'Admin' ? <li><Link to='/admin'>{commonTranslate.administrator}</Link></li> : null }
                <li><Link to='/' onClick={this.handleLogout}>{commonTranslate.logout}</Link></li>
              </ul>
            </span>
          }
        </NavItem>
      </Fragment>
    );
  }

  renderUserHeader = () => {
    const storeLinks = this.renderStores();
    const {user} = this.state;
    const firstName = user.firstName || " ";
    const lastName = user.lastName || " ";
    const userName = firstName + " " + lastName;

    let code = this.state.code || "";
    let companyNumber = this.state.companyNumber || '---';
    let companyName = this.state.companyName || "";
    let dtid = this.state.dtid || '------';
    const {stores} = this.state;

    if (this.props.dtid !== dtid && this.props.dtid !== undefined) {
      let selectedStore = stores.filter(store => store.dtid === this.props.dtid);
      if (selectedStore.length > 0) {
        companyNumber = selectedStore[0].companyNumber;
        companyName = selectedStore[0].name;
        dtid = selectedStore[0].dtid;
      }
    }

    return (
      <li className="header-user-menu" onClick={this.toggleMenu}>
        <div id="header-user-menu">
          <span className="header-user-menu__text">
            <span className="header-user-menu__name">{userName}</span><br/>
            <span className="header-user-menu__role">{companyName}</span><br/>
            {dtid === "" ? "" : <span className="header-user-menu__role">{code} / {companyNumber} / {dtid}</span>}

          </span>
          <i className="fas fa-chevron-down"></i>
          { !this.state.isShowMenu ? null :
            <span className="user-menu-dropdown" ref={node => { this.node = node }}>
              <ul>
                {this.state.user.roleName !== 'Admin' ? null : <li><Link key={100} to='/admin'>{commonTranslate.administrator}</Link></li>}
                <ul className="navigation-store-list">
                  {stores.length > 0 ? storeLinks : ""}
                </ul>
                <li><Link key={101} to='/' onClick={this.handleLogout}>{commonTranslate.logout}</Link></li>
              </ul>
            </span>
          }
        </div>

      </li>
    );
  }

  initializeHomeLink = () => {
    const http = api();
    http.get('User').then(resUser => {
      if (resUser.data.isOk) {
        const result = resUser.data.data;
        try {
          if (result.roleName === 'Admin' ) {
            this.setState({homeUrl: '/admin', user: result}) ;
          }
          else if (result.roleName === 'DIO' ) {
            this.setState({homeUrl: `/configure/${result.enterpriseCode}`, user: result});
          }
          else {
            this.setState({user: result});
            http.get(`Menu/profile/${result.enterpriseCode}`).then(resProfile=> {
              if (resProfile.data.isOk) {
                const resStore = resProfile.data.data.stores;
                this.setState({homeUrl: `/dashboard/${result.enterpriseCode}/${resStore[0].dtid}`});
              }
            })
          }
        }
        catch (e) {

        }
      }
    });
  }

  render() {
    let dtid = this.props.dtid === undefined ? this.state.dtid : this.props.dtid;
    const {user} = this.state;

    return (
      <div className="header">
        <Navbar inverse collapseOnSelect fluid={true} staticTop={true} className="header-bar">
          <Navbar.Header className="header-bar__nav-header">
            <Navbar.Brand>
              <Link to={this.state.homeUrl}>{commonTranslate.dmsWorkbook}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <HeaderNav links={this.props.menus} user={user} admin={this.props.admin} activeMenu={this.props.activeMenu} code={this.props.code} dtid={dtid}/>
            </Nav>
            <ul className="nav navbar-nav navbar-right">
              <li className="help-icon" eventkey={1}>
                <i className="far fa-question-circle"></i>
                <span className="help-icon__content">
                 {/* <TextMarkUp label={commonTranslate.contactInfo} /> */}
                 If you have questions, please contact your Implementation Manager (Account Manager) or send e-mail to <a href='mailto:DMS-ImplementationACT@coxautoinc.com' target='_blank'>DMS-ImplementationACT@coxautoinc.com</a>
                </span>
              </li>
              {this.props.admin === true ? this.renderAdminHeader() : this.renderUserHeader()}
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  menus: PropTypes.any.isRequired,
  isUserMenuVisible: PropTypes.bool,
  onToggleUserMenu: PropTypes.func
};

export default Header
