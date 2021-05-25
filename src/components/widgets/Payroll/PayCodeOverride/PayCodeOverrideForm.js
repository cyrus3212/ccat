import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TableEdify from "../../../reusable/TableEdify";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import ModalFormEdify from "../../../reusable/ModalFormEdify";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { getUid } from '../../../../helpers/generateUid';
import { generatePayCodeOverrideTableColumns } from './TableColumns';
import { generateModalForm } from './ModalFormFields';
import { generateForm } from './FormFields';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import FormSectionFooterAction from "../../../reusable/FormSectionFooterAction/FormSectionFooterAction";

class PayCodeOverrideForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      itemList: [],
      item: {},
      isShowAddModal: false,
      payCodeOptions: [],
      companyNumberOptions: [],
      defaultCompanyNumber: "",
      isAddStatus: "",
      distributionCode: "",
      isCheckSaveAndRetain: false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { payCodeOverride, isAddStatus, payCodeOptions, companyNumberOptions, defaultCompanyNumber, checkSaveAndRetain } = nextProps;

    return {
      data: payCodeOverride, distributionCode: payCodeOverride.distributionCode,
      payCodeOptions,
      companyNumberOptions,
      isAddStatus,
      itemList: payCodeOverride.items || [], defaultCompanyNumber,
      isCheckSaveAndRetain: checkSaveAndRetain,
    };
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { name, value } = event;
    const { itemList } = Object.assign({}, this.state);
    let selectedRow = itemList.findIndex(selectedRow => selectedRow.cId === id);
    itemList[selectedRow][target] = value;
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    // const { customField } = this.state;
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, itemList, isCheckSaveAndRetain } = this.state;
    data["items"] = itemList;
    // data["distributionCode"] = distributionCode;
    let model = data;
    this.props.onSave(model, isCheckSaveAndRetain);
  }

  /**
   * method to clear form fields
   */
  handleClearForm = () => {
    this.setState(this.baseState)
    this.setState({ data: {}, itemList: [] })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: "",
      data: {},
      itemList: []
    })
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleOnShowErrorModal = (payCodeOverrideRowDelete) => {
    this.setState({ payCodeOverrideRowDelete, isShowDeleteModal: true });
  }

  /**
   * method to handle add new item
   */
  handleAddItem = () => {
    let item = this.state.item;

    if (item.companyNumber === "") {
      item.companyNumber = this.state.defaultCompanyNumber;
    }
    this.setState({ itemList: [...this.state.itemList, item], isAddStatus: "success", item: {} });
    setTimeout(() => {
      this.setState({
        isAddStatus: ""
      })
    }, 1000);
  }

  handleRowDel = () => {
    const { itemList, payCodeOverrideRowDelete } = Object.assign({}, this.state);
    let index = itemList.indexOf(payCodeOverrideRowDelete);
    itemList.splice(index, 1);
    if (itemList.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ itemList, isShowDeleteModal: false });
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

  handleChangeModal = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false
    })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleModalGetProps = (item) => {
    item['cId'] = getUid();
    this.setState({ item });
  }

  listOfItems() {
    let validationResultModal = [];
    const { itemList, isAddStatus, item, payCodeOptions, companyNumberOptions, defaultCompanyNumber } = this.state
    const modalFormFields = generateModalForm(this.handleOnChangeModalInput, validationResultModal, payCodeOptions, companyNumberOptions, defaultCompanyNumber);
    const tableColumns = generatePayCodeOverrideTableColumns(this.handleTableInputOnChange, this.handleOnShowErrorModal, payCodeOptions, companyNumberOptions);

    return(
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={itemList || []} columns={tableColumns} displayFilter={false} scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal}
              displayAddItem={true} enableCustomHeader={true} />
          </Col>
        </Row>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={modalFormFields} data={item} onGetProps={this.handleModalGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem}/>
        </Modal>
      </Fragment>
    )
  };

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({isCheckSaveAndRetain: response});
  }

  render () {
    const { data, isShowDeleteModal, isCheckSaveAndRetain } = this.state;
    const { distributionCodeOptions } = this.props;
    let validationResult = [];
    let isDisabledSave = true;

    if (data.distributionCode) {
      isDisabledSave = false;
    }

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, validationResult, distributionCodeOptions);

    if (data.distributionCode) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
            <Row className="show-grid list-textinput">
              <Col xs={12} md={12}>
                {this.listOfItems()}
              </Col>
            </Row>
          </div>
          <FormSectionFooterAction disabledSave={isDisabledSave} checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave} onClearForm={this.handleClearForm}
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

PayCodeOverrideForm.propTypes = {};

export default PayCodeOverrideForm;
