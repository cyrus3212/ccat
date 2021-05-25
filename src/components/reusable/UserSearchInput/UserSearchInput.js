import React, { Component } from 'react';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import "./_userSearchInput.scss";
import { getUsersSelect } from '../../../api/selects/userSelectApi';
import PropTypes from 'prop-types';
import { getUid } from '../../../helpers/generateUid';

class SearchInput extends Component {
  state = {
    isShowSearchResult: false,
    users: [],
    user: {},
    userName: "",
  }

  onChangeInput = (event) => {
    let user = event.target;

    this.setState({
      userName: user.value,
    }, () => {
      this.props.onChangeInput(this.state.userName);
    });

    if (user.value) {
      this.props.dispatch(getUsersSelect(this.props.match.code, user.value));
      this.setState({
        isShowSearchResult: true,
      });
    } else {
      this.setState({
        isShowSearchResult: false,
      });
    }

    this.props.onChange(event);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usersSelect) {
      this.setState({
        users: nextProps.usersSelect.data
      });
    }
  }

  onSelectAddUser = (event, user) => {
    let userName = user.fullName;
    user.rid = getUid();

    this.setState({
      user,
      userName,
      isShowSearchResult: false,
    });
    this.props.onSelectAddUser(user, userName);
  }

  render() {
    const { name, options, userName } = this.props;
    const { isShowSearchResult, users } = this.state;
    const option = users.map((user, i) => {
      return <ListGroupItem key={i} onClick={(event) => this.onSelectAddUser(event, user)}>
        {user.fullName} <br/>
        <span className="sub-info"><i>{user.email} - {user.loginId}</i></span>
      </ListGroupItem>
    });

    return (
      <div className="searchInput search-label-top">
        <label>User Name</label>
        <input
          htmlid="userSearchInput"
          className="userSearchInput"
          label="User Name"
          placeholder="Enter User"
          value={userName}
          name={name}
          onChange={this.onChangeInput}
        />

        { !isShowSearchResult ? null :
          <ListGroup>
            { option }
          </ListGroup>
        }

      </div>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default SearchInput;
