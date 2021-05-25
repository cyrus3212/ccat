import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import FormEdify from "../../../reusable/FormEdify/FormEdify";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { getUidInteger } from '../../../../helpers/generateUid';
import { generateForm } from './FormFields';
import FormSectionFooterAction from "../../../reusable/FormSectionFooterAction/FormSectionFooterAction";

class OtherPayCodeForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      itemList: [],
      item: {},
      isShowAddModal: false,
      isAddStatus: "",
      saveAndRetain: true,
      isCheckSaveAndRetain: false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { otherPayCode, isAddStatus, checkSaveAndRetain } = nextProps;
    return {
      data: otherPayCode,
      isAddStatus,
      itemList: otherPayCode.items || [],
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
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, itemList, isCheckSaveAndRetain } = this.state;
    data["items"] = itemList;
    let model = data;
    this.props.onSave(model, isCheckSaveAndRetain)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
    this.setState({ data: {
      accountNumber: "BLANK"
    }, itemList: [] })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleOnShowErrorModal = (otherPayCodeRowDelete) => {
    this.setState({ otherPayCodeRowDelete, isShowDeleteModal: true });
  }

  handleRowDel = () => {
    const { itemList, otherPayCodeRowDelete } = Object.assign({}, this.state);
    let index = itemList.indexOf(otherPayCodeRowDelete);
    itemList.splice(index, 1);
    if (itemList.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ itemList, isShowDeleteModal: false });
  }

  handleOnChange = (event) => {
    try {
      const { name, value } = event.target;
      this.setState({ distributionCode: value });
    }
    catch (e) {

    }
  };

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
  };

  handleInputOnChange = (event) => {
    const { name, value } = event;

    if (name === 'saveAndRetain') {
      if (value > 0) {
        this.setState({ saveAndRetain: false });
      } else {
        this.setState({ saveAndRetain: true });
      }
    }

    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({isCheckSaveAndRetain: response});
  }

  render () {
    const { deductionCodeOptions } = this.props;
    const { data, isCheckSaveAndRetain } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const generateFieldsForm = generateForm(this.handleInputOnChange, validationResult, deductionCodeOptions);

    let isDisabled = true;

    if (data.dedpayCode && data.description) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={generateFieldsForm} data={data} onGetProps={this.handleGetProps}/>
          </div>
          <FormSectionFooterAction disabledSave={isDisabled} checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave} onClearForm={this.clearForm}
            onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }

}

OtherPayCodeForm.propTypes = {};

export default OtherPayCodeForm;
