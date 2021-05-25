import React, { Component, Fragment } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import UserSearchInput from '../../../reusable/UserSearchInput';
import configureTranslate from "../../../../translation/configure.json"

class ConfigureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userName: "",
      isShowSuccessMessage: false,
      isShowErrorMessage: false,
      users: [],
      isAddDisable: false
    }
  }

  addUser = () => {
    const { users } = this.props;
    const { user } = this.state;

    let isUserExist = false;
    for(let i = 0; i < users.length; i++) {
      let employee = users[i];

      if (employee.loginId == user.loginId) {
        this.setState({
          isShowErrorMessage: true,
          isShowSuccessMessage: false
        });
        isUserExist = false;
        break;
      } else {
        isUserExist = true;
      }
    }

    if (users.length === 0 || isUserExist === true) {
      this.setState({
        isShowSuccessMessage: true,
        isShowErrorMessage: false
      });
      this.props.onAddRow(this.state.user);
    }

    this.setState({
      userName: ''
    });

    setTimeout( () => {
      this.setState({
        isShowSuccessMessage: false,
        isShowErrorMessage: false,
      });
    }, 2000)
  }

  onChangeInput = (userName) => {
    this.setState({ userName, isAddDisable: false, isShowSuccessMessage: false, isShowErrorMessage: false });
  }

  onSelectAddUser = (user, userName) => {
    this.setState({ user, userName, isAddDisable: true });
  }

  render() {
    const { onHide, match } = this.props;
    const { isShowSuccessMessage, isShowErrorMessage, users, userName, isAddDisable } = this.state;

    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserSearchInput
            name="userName"
            userName={userName}
            onChange={this.onChangeInput}
            options={users}
            onSelectAddUser={this.onSelectAddUser}
            onChangeInput={this.onChangeInput}
            match={match}
          />
        </Modal.Body>
        <Modal.Footer>
          { !isShowSuccessMessage ? null :
            <span className="pull-left text-alert--green">
              <i className="fas fa-check" />{userName} {configureTranslate.successAddMessage}
            </span>
          }

          { !isShowErrorMessage ? null :
            <span className="pull-left text-alert--red">
              <i className="fas fa-user-slash" /> {userName} {configureTranslate.errorAddMessage}
            </span>
          }

          <Button htmlId="ButtonLink" buttonStyle="link" onClick={onHide}>
            Close
          </Button>
          <Button htmlId="DeleteCompanyButton"  buttonStyle="primary" disabled={!isAddDisable} onClick={this.addUser}>
            Add
          </Button>
        </Modal.Footer>
      </Fragment>
    );
  }
}

export default ConfigureModal;
