import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import AlphaNumericTextAreaHorizontal from '../../../reusable/AlphaNumericTextAreaHorizontal';
import AlphaNumericInputHorizontal from '../../../reusable/AlphaNumericInputHorizontal';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import splitAccountsTranslate from '../../../../translation/accounting/splitAccounts.json';
import commonTranslate from '../../../../translation/common.json';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateProps } from '../../../../helpers/workbookHelper';
import { getUidInteger } from '../../../../helpers/generateUid';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { generateColumns } from './TableColumns';
import { generateModalForm } from './ModalFormFields';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class SplitAccountsForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      isShowDeleteModal: false,
      id: "",
      key: "",
      description: "",
      items: [],
      data: {},
      accountDeleteRow: {},
      isAddStatus: "",
      isCheckSaveAndRetain: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { splitAccount, checkSaveAndRetain, isError } = nextProps;
    const { id, items } = nextProps.splitAccount;
    let key = nextProps.splitAccount.key;
    let description = nextProps.splitAccount.description;

    if (checkSaveAndRetain && !isError) {
      description = "";
      key = "";
    }

    return {
      id,
      key: key,
      description: description,
      items: items || [],
      isCheckSaveAndRetain: checkSaveAndRetain,
      isAddNewDisable: true, splitAccount
    }
  }

  /**
   * method that handle inline editing
   */
  handleInputOnChange = (event, id, target) => {
    const { items } = Object.assign({}, this.state);
    let selectedRow = items.findIndex(selectedRow => selectedRow.cId == id);
    items[selectedRow][target] = event.value;
    this.setState({ items });
  }

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false
    })
  }

  /**
   * method that handle modal editing
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data: data });

    if ((data.account === "" || data.account === null) && (data.controlOverride === "" || data.account === null) && (data.splitAmount === "" || data.account === null) && (data.splitPercent === "" || data.account === null)) {
      this.setState({isDisabled:true})
    }else{
      this.setState({isDisabled:false})
    }
  }

  /**
   * method to show add modal
   */
  handleShowAddModal = (event, columns) => {
    let data = generateProps(columns);
    this.setState({ data, isShowAddModal: true });
  }

  /**
   * method to handle split key and description
   */
  handleOnChange = (event) => {
    debugger
    const { name, value } = event;
    this.setState({ [name]: value })
  };

  /**
   * method to handle save data
   */
  handleOnSave = () => {
    const { id, key, description, items, isCheckSaveAndRetain } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;
    let model = { id, key, description, items, enterpriseCode, dtid, workbook, section }

    this.props.onSave(model, isCheckSaveAndRetain);
    this.setState(this.baseState)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState);
    this.setState({isAddNewDisable: false});
  }

  /**
   * method to hide add modal
   */
  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  /**
   * method to handle add new item
   */
  handleAddItem = (temp) => {
    let data = Object.assign({}, this.state.data);
    data['cId'] = getUidInteger();

    const items = [...this.state.items, data]

    this.setState({
      items: items,
      isAddStatus: 'success',
      data: {},
      isDisabled:true,
    })

    setTimeout(() => {
      this.setState({
        isAddStatus: ""
      })
    }, 1000)

    if (this.state.items.length >= 19) {
      this.setState({isAddNewDisable:true})
      this.setState({isShowAddModal:false})
    }

  }

  handleOnShowErrorModal = (accountDeleteRow) => {
    this.setState({ accountDeleteRow, isShowDeleteModal: true });
  }

  handleRowDel = () => {
    const { items, accountDeleteRow } = Object.assign({}, this.state);

    // delete account
    let index = items.indexOf(accountDeleteRow);
    items.splice(index, 1);
    if (items.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    if (this.state.items.length < 20) {
      this.setState({isAddNewDisable:false})
    }

    this.setState({ items, isShowDeleteModal: false });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * method to generate split account table
   */
  listSplitAccount() {
    const { items, isShowAddModal, data, isAddStatus, isAddNewDisable, isDisabled } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateModalForm(this.handleOnChangeModalInput, validationResult);
    const tableColumns = generateColumns(this.handleInputOnChange, this.handleOnShowErrorModal);

    return (
      <Fragment>
        <Row className="show-grid list-textinput">
          <Col md={12}>
            <TableEdify displayFilter={false} data={items} tableTitle="" columns={tableColumns} isAddNewDisable={false} htmlId="splitAccountTable" scrollY={400} displayAddItem={true} onAddItemClick={this.handleShowAddModal}/>
          </Col>
        </Row>

        <Modal show={isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} title="Add New Item" onHide={this.handleHideAddModal} isDisabled={isDisabled == true ? true : false} onAdd={this.handleAddItem} isAddStatus={isAddStatus} data={data} onGetProps={this.handleGetProps} />
        </Modal>
      </Fragment>
    );
  }

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({ isCheckSaveAndRetain: response });
  }

  render () {
    const { key, description, isShowDeleteModal, splitAccount, isCheckSaveAndRetain } = this.state;
    let isDisabledSave = true;

    if (key && description) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <AlphaNumericInputHorizontal
                  id="key"
                  displayLabel={true}
                  field="key"
                  label={splitAccountsTranslate.splitKey}
                  name="key"
                  onChange={this.handleOnChange}
                  value={key}
                  required={true}
                  maxLength={10}
                  validationResult={splitAccount.validationResult || []}
                />
                <AlphaNumericTextAreaHorizontal
                  id="description"
                  displayLabel={true}
                  field="description"
                  label={splitAccountsTranslate.description}
                  name="description"
                  onChange={this.handleOnChange}
                  value={description}
                  maxLength={30}
                  required={true}
                  rows={3}
                  validationResult={splitAccount.validationResult || []}
                />
              </Col>
            </Row>
            {this.listSplitAccount(splitAccount.validationResult)}
          </div>

          <FormSectionFooterAction disabledSave={isDisabledSave}
            checkSaveAndRetain={isCheckSaveAndRetain}
            onSave={this.handleOnSave} onClearForm={this.clearForm}
            onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    );
  }

}

SplitAccountsForm.propTypes = {};

export default SplitAccountsForm;
