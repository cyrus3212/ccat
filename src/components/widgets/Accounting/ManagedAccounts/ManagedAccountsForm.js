import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { generateProps } from '../../../../helpers/workbookHelper';
import managedAccountsTranslate from '../../../../translation/accounting/managedAccounts.json';
import TableEdify from '../../../reusable/TableEdify';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { getUidInteger } from '../../../../helpers/generateUid';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateColumns} from './AccountTableColumns';
import {generateForm} from './FormFields';
import {generateModalForm} from './ModalFormFields';
import Footer from '../../../common/Footer';
import DeleteRowModal from '../../../reusable/DeleteRowModal';

class ManagedAccountsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowAddModal: false,
      value: '1',
      listOfAccount: [],
      data: {},
      isAddStatus: '',
      lienPayoffs: true,
      tools: true,
      item: {},
      isEditState: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { isEdit, account } = nextProps;
    return { data: account, listOfAccount: account.accounts || [], isEditState: isEdit }
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
    this.setState({isEditState:false})
  }

  /**
   * Handle on blur event
   */
  handleOnBlur = (event) => {
    this.props.onBlur(event);
  }

  /**
   * method to handle data input changes
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let item = Object.assign({}, this.state.item);
    item[name] = value;

    this.setState({ item });
  }

  /**
   * Handle show add modal event
   */
  handleShowAddModal = () => {
    this.setState({ isShowAddModal: true });
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { listOfAccount } = Object.assign({}, this.state);
    let selectedRow = listOfAccount.findIndex(selectedRow => selectedRow.cId == id);

    listOfAccount[selectedRow][target] = event.value;
    this.setState({ listOfAccount });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, listOfAccount } = this.state;
    data['accounts'] = listOfAccount;
    let model = data;
    this.props.onSave(model)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleModalGetProps = (item) => {
    item['cId'] = getUidInteger();
    this.setState({ item });
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      data: {}
    })
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleOnShowErrorModal = (accountDeleteRow) => {
    this.setState({ accountDeleteRow, isShowDeleteModal: true });
  }

  /**
   * method to handle add new item
   */
  handleAddItem = () => {
    let item = Object.assign({}, this.state.item);
    this.setState({ listOfAccount: [...this.state.listOfAccount, item], isAddStatus: 'success', item: {} });

    setTimeout(() => {
      this.setState({
        isAddStatus: ''
      })
    }, 1000)
  }

  handleRowDel = () => {
    const { listOfAccount, accountDeleteRow } = Object.assign({}, this.state);

    // delete account
    let index = listOfAccount.indexOf(accountDeleteRow);
    listOfAccount.splice(index, 1);
    if (listOfAccount.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ listOfAccount, isShowDeleteModal: false });
  }

  /**
   * method that handle modal editing
   */
  handleInputOnChange = (event, id, target) => {
    const { name, value } = event;
    const { isEditState } = this.state

    if (value === 'P' && name === 'tools') {
      this.setState({tools:false})
      if (event) {
        this.setState({isEditState:false})
      }
    } else if (value === 'None' && name === 'tools' || value === '' && name === 'tools' || value === 'A' && name === 'tools' || value === 'R' && name === 'tools') {
      const { data } = this.state
      data.controlNumber = "",
      data.payableBankAcct = "",
      data.checkStubInfo = ""
      data.address1 = "";
      data.city = "";
      data.contact = "";
      data.stateCode = "";
      data.zipCode = "";
      data.phoneNumber = "";
      this.setState({ tools:true })
      this.setState({ lienPayoffs:true})
      if (event) {
        this.setState({isEditState:false})
      }
    }

    if (value === 'L' && name === 'checkStubInfo') {
      this.setState({lienPayoffs:false})
      if (event) {
        this.setState({isEditState:false})
      }
    }

    if (value === 'P' && name === 'checkStubInfo' || value === 'F' && name === 'checkStubInfo' || value === 'C' && name === 'checkStubInfo' || value === '' && name === 'checkStubInfo') {
      const { data } = this.state
      data.address1 = "";
      data.city = "";
      data.contact = "";
      data.stateCode = "";
      data.zipCode = "";
      data.phoneNumber = "";
      this.setState({lienPayoffs:true})
      if (event) {
        this.setState({isEditState:false})
      }
    }

    if ((isEditState === true && this.state.data.checkStubInfo === 'L') && (isEditState === true && this.state.data.tools !== 'P')) {
      this.setState({lienPayoffs:false})
      this.setState({tools:true})
    } else if ((isEditState === true && this.state.data.checkStubInfo !== 'L') && (isEditState === true && this.state.data.tools === 'P')) {
      this.setState({lienPayoffs:true})
      this.setState({tools:false})
    } else if ((isEditState === true && this.state.data.checkStubInfo === 'L') && (isEditState === true && this.state.data.tools === 'P')) {
      this.setState({lienPayoffs:false})
      this.setState({tools:false})
    } else if ((isEditState === true && this.state.data.checkStubInfo !== 'L') && (isEditState === true && this.state.data.tools !== 'P')) {
      this.setState({lienPayoffs:true})
      this.setState({tools:true})
    }

    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false
    })
  }

  listOfAccount () {
    const { listOfAccount, isAddStatus, isLeinPayoff, item } = this.state
    const formFields = generateModalForm(this.handleOnChangeModalInput, isLeinPayoff);
    const tableColumns = generateColumns(this.handleTableInputOnChange, this.handleOnShowErrorModal);

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify key={1} data={listOfAccount} tableTitle={managedAccountsTranslate.listOfAccounts} columns={tableColumns}
              scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true} displayFilter={false} />
          </Col>
        </Row>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={item} onGetProps={this.handleModalGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem}/>
        </Modal>
      </Fragment>
    )
  }

  render () {
    const { toolsOptions, checkStubInfoOptions, controlledByOptions } = this.props
    const { data, isShowDeleteModal, lienPayoffs, tools } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const generateFieldsForm = generateForm(this.handleInputOnChange, this.handleOnclick, toolsOptions, checkStubInfoOptions, controlledByOptions, lienPayoffs, tools, validationResult);
    let isDisabledSave = true;

    if (data.managedAcctDesc) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={generateFieldsForm} data={data} onGetProps={this.handleGetProps}/>
            <Row className="show-grid list-textinput">
              <Col xs={12} md={12}>
                {this.listOfAccount()}
              </Col>
            </Row>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabledSave}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>
        </form>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    );
  }

}

ManagedAccountsForm.propTypes = {
};

export default ManagedAccountsForm;
