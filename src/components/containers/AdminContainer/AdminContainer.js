import React, { Component } from 'react';
import Header from '../../common/Header';
import { Redirect } from 'react-router-dom';
import PropTypes   from 'prop-types';
import '../_app.scss';
import api from '../../../utils/Http';
import NotAllowedPage from '../../pages/NotAllowedPage';
import Loader from '../../reusable/Loader';

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isHeaderVisible: false,
      headerToggleState: '',
      isUserMenuVisible: false,
      menus: [
        {
        "value": "admin",
        "label": "Administrator"
        },
        {
          "value": "add-new-admin",
          "label": "Add New Admin"
        }
      ],
      isNotAllowed: null
    };

  }

  componentDidMount() {
    // this.props.dispatch(getUserProfile());
    const http = api();
    http.get('User').then(res => {
      if (res.data.isOk) {
        const user = res.data.data;
        if (user.roleName === 'Admin') {
          this.setState({user: user, isNotAllowed: false});
        }
        else {
          this.setState({isNotAllowed: true});
        }
      }
    });
  }

  toggleHeader = () => {
    this.setState({ isHeaderVisible: !this.state.isHeaderVisible});
  };

  handleToggleUserMenu = () => {
    this.setState({
      isUserMenuVisible: !this.state.isUserMenuVisible
    });
  }

  render() {
    const code = this.props.children.props.match.params.id;
    const { user, isUserMenuVisible, menus, isNotAllowed }  = this.state;
    const title = this.props.title || '';

    if (user.roleName !== 'Admin' && isNotAllowed === null) {
      return <Loader />
    }

    return (
      <div className="main-layout">
        <div>
          <Header user={user} code={code} subheaderTitle={title} menus={menus} admin={true} onToggleUserMenu={this.handleToggleUserMenu} isUserMenuVisible={isUserMenuVisible}/>
          {isNotAllowed === true ? null : <div className="sub-header">{title}</div> }
          <div className="dashboard container">
            {isNotAllowed === true ? <NotAllowedPage name="Admin" match={this.props.children.props.match.params} /> : this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

AdminContainer.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
  menus: PropTypes.any,
  title: PropTypes.string,
};

export default AdminContainer;
