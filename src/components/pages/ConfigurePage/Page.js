import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import configureTranslate from '../../../translation/configure.json';
import commonTranslate from '../../../translation/common.json';
import "./_configurePage.scss";
import BlockText from '../../reusable/BlockText';
import Modal from 'react-bootstrap/lib/Modal';
import TableEdify from '../../reusable/TableEdify';
import { getConfigUser, addConfigUser } from '../../../api/configUserApi';
import AddUserModal from '../../widgets/Configure/AddUserModal';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import SubmitButton from '@coxautokc/fusion-ui-components/lib/SubmitButton';
import DeleteRowModal from '../../reusable/DeleteRowModal';
import ConfirmationModal from '../../reusable/ThreeActionConfirmationModal';
import FilterSearchableSelect from '../../reusable/FilterSearchableSelect';
import { getUid } from '../../../../src/helpers/generateUid';
import MessageAlertModal from '../../reusable/MessageAlertModal';
import api from '../../../utils/Http';
import { compareArray } from '../../../helpers/arrayHelper';

class Page extends Component {
  state = {
    value: '',
    isSaveButtonDisabled: true,
    isShowAddModal: false,
    selectedRole: "Admin",
    roles: [],
    stores: [],
    workbooks: [],
    users: [],
    isAddUser: false,
    reloadTypeAccess: false,
    isShowDeleteModal: false,
    isSaveUser: false,
    enterpriseId: 0,
    userId: 0,
    messageType: 'success',
    messageAlert: '',
    isShowMessageAlert: false,
    isAddUserDisable: true,
    optionStores: [],
    filterStoreValue: [],
    isChanged: false,
    isShowConfirmationMessageModal: false,
    selectedStoreOption: '',
    deletedUsers: [],
    updatedUsers: [],
    submitLoading: false,
    sendLoading: false,
    isFirstLoad: true,
    isSendUser: false,
    isLoading: false
  };

  componentWillMount() {
    this.getUsers();
  }

  getUsers = (selectedStoreOption = '') => {
    const { params } = this.props.params.match;
    this.props.dispatch(getConfigUser(params.code, selectedStoreOption));
  }

  componentWillReceiveProps(nextProps) {
    try {
      this.setState({ isLoading: false })
      if (nextProps.configUsers.data !== {} && this.state.isAddUser === false || nextProps.configUsers !== {} && this.state.isSaveUser === true) {
        let result = nextProps.configUsers.data;
        let users = [];
        let optionStores = result.stores || [];

        if (result.stores.length > 0) {
          this.setState({
            isAddUserDisable: false,
          })
        }

        // We loop the store data since API cannot save if we generated unique identifier on id object. So we added rid(row unique identifier) property assigned on table
        for (let i = 0; i < result.users.length; i++) {
          let user = result.users[i];
          user.rid = user.id ? user.id : getUid();
          users.push(user);
        }

        if (result.users.length > 0) {
          this.setState({ isSaveButtonDisabled: false });
        } else {
          this.setState({ isSaveButtonDisabled: true });
        }

        this.setState({
          users: users, workbooks: result.workbooks, stores: result.stores,
          roles: result.roles, enterpriseId: result.enterpriseId, isSaveUser: false,
          optionStores: optionStores, updatedUsers: users,
        });

        if (this.state.isSaveUser === true && nextProps.configUsers.isOk === true && this.state.isSendUser === false) {
          this.setState({
            isShowMessageAlert: true,
            messageType: "success",
            messageAlert: 'Successfully saved users.',
            submitLoading: false,
            sendLoading: false
          })
        } else if (this.state.isSaveUser === true && nextProps.configUsers.isOk === false && this.state.isSendUser === false) {
          this.setState({
            isShowMessageAlert: true,
            messageType: "error",
            messageAlert: 'Failed to save users.',
            submitLoading: false,
            sendLoading: false
          })
        } else if (this.state.isSaveUser === true && this.state.isSendUser === true && nextProps.configUsers.isOk === true) {
          this.setState({
            isShowMessageAlert: true,
            messageType: "success",
            messageAlert: 'Successfully sent notification to selected users.',
            submitLoading: false,
            sendLoading: false,
            isSaveButtonDisabled: true,
            isSendUser: false
          })
        } else if (this.state.isSaveUser === true && nextProps.configUsers.isOk === false && this.state.isSendUser === true) {
          this.setState({
            isShowMessageAlert: true,
            messageType: "error",
            messageAlert: 'Failed to send notification to selected users.',
            submitLoading: false,
            sendLoading: false,
            isSaveButtonDisabled: true,
          })
        }

        this.setState({ isChanged: false });

      }
    }
    catch (e) {

    }
  }

  handlePageChange = (value) => {
    this.setState({ isChanged: value });
  }

  handleTextInputChange = (event, userId, target) => {
    const { users } = Object.assign({}, this.state);
    let selectedEmployee = users.findIndex(selectedEmployee => selectedEmployee.rid == userId);
    if (users[selectedEmployee][target] !== event.value) {
      this.handlePageChange(true);
    }
    users[selectedEmployee][target] = event.value;
    this.setState({ users });
  }

  handleSearchableSelectChange = (event, userId, target) => {

    const { users } = Object.assign({}, this.state);
    let selectedEmployee = users.findIndex(selectedEmployee => selectedEmployee.rid == userId);
    if (!compareArray(users[selectedEmployee][target], event.value)) {
      this.handlePageChange(true);
    }
    users[selectedEmployee][target] = event.value;
    this.setState({ users });
  }

  handleSearchSelectRoleChange = (event, userId, target) => {
    const { users } = Object.assign({}, this.state);
    const http = api();
    let selectedEmployee = users.findIndex(selectedEmployee => selectedEmployee.rid == userId);
    users[selectedEmployee].roleId = event.value ? event.value : 0;
    http.get('Roles/' + event.value).then(
      res => {
        const result = res.data.data;
        users[selectedEmployee].stores = result.defaultStores;
        users[selectedEmployee].workbooks = result.defaultWorkbooks;
        this.setState({ users });
      }
    );
    this.handlePageChange(true);
  }

  handleOnSubmit = () => {
    this.setState({ isSaveUser: true, submitLoading: true });
    this.submitData();
  }

  onSendNotification = () => {
    this.setState({ isSaveUser: true, isSendUser: true, sendLoading: true });
    this.submitData();
  }

  submitData = () => {
    const { users, selectedStoreOption } = this.state;
    const { params } = this.props.params.match;

    this.handlePageChange(false);
    let usersData = {
      users: users,
      enterpriseCode: params.code,
      dtid: selectedStoreOption
    }

    this.props.dispatch(addConfigUser(usersData))
  }

  // Method that compares array of original Users and Updated users
  compare = (usersArr, updatedUserArr) => {
    const { deletedUsers } = this.state;
    const users = [];

    usersArr.forEach((user) => updatedUserArr.forEach((updatedUser) => {
      if (user === updatedUser) {
        users.push(updatedUser)
      } else {
        users.push(user)
      }
    }
    ));

    this.deleteUsers(users, deletedUsers)
  }

  handleShowAddModal = () => {
    this.setState({
      isShowAddModal: true
    });
  }

  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  }

  handleHideAddModal = () => {
    this.setState({
      isShowAddModal: false
    });
  }

  handleAddUserRow = (user) => {
    const userDetail = {
      id: 0,
      rid: user.rid,
      email: user.email,
      fullName: user.fullName,
      roleId: "0",
      stores: [],
      workbooks: [],
      validationResult: [],
      sub: user.sub,
      loginId: user.loginId
    }

    this.setState({
      users: [...this.state.users, userDetail],
      isAddUser: true,
      reloadTypeAccess: true,
      isSaveButtonDisabled: false
    });

    this.handlePageChange(true);

  }

  handleShowErrorModal = (target) => {
    this.setState({ userId: target, isShowDeleteModal: true });
  }

  handleRowDel = (target) => {
    const { users } = Object.assign({}, this.state);
    const { userId } = Object.assign({}, this.state);

    // delete user on updated Users Data
    let indexUpdatedUser = users.indexOf(userId)
    users.splice(indexUpdatedUser, 1);
    if (users.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ users, isShowDeleteModal: false, deletedUsers: [...this.state.deletedUsers, userId], });
    this.handlePageChange(true);
  }

  handleStoreFilterConfirmationModal = (action) => {
    const { params } = this.props.params.match;
    const { selectedStoreOption } = this.state;

    if (action === "yes") {
      this.handleOnSubmit();
    }
    else if (action === "no") {
      this.setState({ users: [] })
      this.props.dispatch(getConfigUser(params.code, selectedStoreOption));
      this.getUsers(selectedStoreOption);
    }

    this.setState({
      isShowConfirmationMessageModal: false,
      isAddUser: false
    })
    this.handlePageChange(false);
  }

  handleStoreFilter = (event) => {
    let selectedStoreOption = event.value;
    const { params } = this.props.params.match;
    if (this.state.isChanged === true) {
      this.setState({
        isShowConfirmationMessageModal: true,
        selectedStoreOption
      });
    }
    else {
      this.setState({ selectedStoreOption });
      this.props.dispatch(getConfigUser(params.code, selectedStoreOption));
    }
  }

  handleStoreFilterData = (selectedValue) => {
    const { users } = Object.assign({}, this.state);
    const filteredUsers = users.filter(user => user.stores.filter(store => store.value === selectedValue).length)
    this.setState({ updatedUsers: filteredUsers });
  }

  handleCloseStoreFilterModal = () => {
    this.setState({ isShowConfirmationMessageModal: false });
  }

  handleCloseMessageAlert = () => {
    const { selectedStoreOption } = this.state;
    const { params } = this.props.params.match;

    this.setState({ isShowMessageAlert: false })
    // this.props.dispatch(getConfigUser(params.code, selectedStoreOption));
  }

  handleRowSelection = (rows) => {
    const { users } = Object.assign({}, this.state);
    let checkboxCountToggle = 0;

    // Clear send notification for all users
    users.filter(user => {
      user.sendNotification = false;
    })

    // Assign send notification state for all users
    users.filter(user => {
      rows.filter(row => {
        if (row == user.rid) {
          user.sendNotification = true;
          checkboxCountToggle++;
        }
      });
    })

    if (checkboxCountToggle > 0) {
      this.setState({ isSaveButtonDisabled: true })
    } else {
      this.setState({ isSaveButtonDisabled: false })
    }

    this.setState({ users });
  }

  render() {
    const {
      users,
      messageType,
      isShowMessageAlert,
      messageAlert,
      isAddUserDisable,
      optionStores,
      updatedUsers,
      selectedStoreOption,
      isSaveButtonDisabled,
      submitLoading,
      sendLoading
    } = this.state;

    const { params } = this.props.params.match;

    const columns = [
      {
        title: "",
        dataIndex: 'inviteCount',
        refId: 'rid',
        type: "notificationState"
      },
      {
        title: "User's Email",
        dataIndex: 'email',
        refId: 'rid',
        type: "emailInput",
        isCheckValidation: true,
        required: true,
        onChange: this.handleTextInputChange
      },
      {
        title: "User's Name",
        dataIndex: 'fullName',
        refId: 'rid',
        type: "alphaNumericInput",
        isDisabled: true,
        isCheckValidation: true,
        required: true,
        onChange: this.handleTextInputChange
      },
      {
        title: 'Type of Access',
        dataIndex: 'roleId',
        refId: 'rid',
        type: "accessTypeSelect",
        isCheckValidation: true,
        required: true,
        options: this.state.roles,
        onChange: this.handleSearchSelectRoleChange
      },
      {
        title: 'Workbook Access',
        dataIndex: 'workbooks',
        refId: 'rid',
        type: "workbookSearchableSelect",
        isCheckValidation: true,
        required: true,
        options: this.state.workbooks,
        onChange: this.handleSearchableSelectChange
      },
      {
        title: 'Company Access',
        dataIndex: 'stores',
        refId: 'rid',
        type: "storeSearchableSelect",
        isCheckValidation: true,
        required: true,
        options: this.state.stores,
        onChange: this.handleSearchableSelectChange
      },
      {
        title: "Login Id",
        dataIndex: 'loginId',
        refId: 'rid',
        type: "label",
        isCheckValidation: true,
        required: true,
        onChange: this.handleTextInputChange
      },
      {
        title: 'Action',
        dataIndex: 'extraData',
        columnSortable: false,
        type: "actionButtons",
        actionButtons: [
          {
            htmlId: "deleteButton",
            buttonStyle: "danger",
            className: "table-delete-button",
            text: commonTranslate.delete,
            isDisabled: this.handleDisabledDeleteButton,
            onClick: this.handleShowErrorModal,
            type: "button",
          }
        ]
      },

    ];

    return (

      <Fragment>
        <BlockText
          title={configureTranslate.pageTitle}
          paragraph={configureTranslate.instruction}
        />

        {/* <Alert bsStyle={messageType}>
            {messageAlert}
           </Alert> */}

        <div className="configure-table">
          <FilterSearchableSelect users={updatedUsers.length} options={optionStores} value={selectedStoreOption} onChange={this.handleStoreFilter} />
          <TableEdify data={users} isLoading={this.state.isLoading} tableTitle="User List" rowSelection={true} onRowSelection={this.handleRowSelection} columns={columns} scrollY={650} scrollX={630} />
        </div>

        <Row>
          <Col md={12} className="add-row-button">
            <SubmitButton
              htmlId="addUser"
              onClick={this.handleShowAddModal}
              buttonStyle="link"
              className="icon-link-button"
            // disabled={isAddUserDisable}
            >
              <i className="fas fa-plus" /> {commonTranslate.addUser}
            </SubmitButton>
          </Col>
        </Row>

        <Row className="show-grid footer-options">
          <Col md={12}>
            {/* <Button
              buttonStyle="default"
              disabled={!isSaveButtonDisabled}
            >Send Notification to Selected User</Button> */}
            <SubmitButton
              htmlId="sendButton"
              buttonStyle="default"
              onClick={this.onSendNotification}
              loading={sendLoading}
              disabled={!isSaveButtonDisabled}
              loadingText={commonTranslate.pleaseWait}
            >Send Notification to Selected User</SubmitButton>
            <SubmitButton
              htmlId="saveButton"
              buttonStyle="primary"
              onClick={this.handleOnSubmit}
              loading={submitLoading}
              // disabled={isSaveButtonDisabled}
              loadingText={commonTranslate.pleaseWait}
            >{commonTranslate.save}</SubmitButton>
          </Col>
        </Row>

        {/* <LoadScroll /> */}

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <AddUserModal onAddRow={this.handleAddUserRow} onHide={this.handleHideAddModal} users={users} match={params} />
        </Modal>

        <Modal show={this.state.isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel} />
        </Modal>

        <Modal show={this.state.isShowConfirmationMessageModal} >
          <ConfirmationModal onConfirmFilter={this.handleStoreFilterConfirmationModal} />
        </Modal>

        <Modal show={isShowMessageAlert} onHide={this.handleCloseMessageAlert}>
          <MessageAlertModal onHide={this.handleCloseMessageAlert} messageAlert={messageAlert} messageType={messageType} />
        </Modal>
      </Fragment>
    );
  }
}

Page.propTypes = {
  configUsers: PropTypes.any.isRequired,
  workbookAccessSelect: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Page.displayName = '[Configure Page] - List';

export default Page;
