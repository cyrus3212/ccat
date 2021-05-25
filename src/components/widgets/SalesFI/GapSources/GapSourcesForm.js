import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "../_salesFI.scss";
import FormEdify from "../../../reusable/FormEdify/FormEdify";
import TableEdify from "../../../reusable/TableEdify";
import { generateForm } from "./FormFields";
import { listTableColumns } from "./TableColumns";
import FormSectionFooterAction from "../../../reusable/FormSectionFooterAction/FormSectionFooterAction";

class GapSourceForm extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      saleGroupList: [],
      defaultValue: [],
      isCheckSaveAndRetain: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { gapSource, salesGroupItems, checkSaveAndRetain, isError } = nextProps;
    const { accountsGapSource } = nextProps.gapSource;
    let data = gapSource || {};

    if (checkSaveAndRetain && !isError) {
      data = {};
    }

    return {
      data: data,
      saleGroupList: accountsGapSource || (salesGroupItems != undefined ? salesGroupItems : []),
      salesGroupItems,
      isCheckSaveAndRetain: checkSaveAndRetain
      // defaultValue
    };
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = event => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  };

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { name, value } = event;
    const { saleGroupList } = Object.assign({}, this.state);

    // waiting for backend Item ID
    let selectedRow = saleGroupList.findIndex(
      selectedRow => selectedRow.cId === id
    );
    saleGroupList[selectedRow][target] = value;
    this.setState({ saleGroupList });
  };

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, saleGroupList, isCheckSaveAndRetain } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;

    let model = data;
    model.taxable = data.taxable || [];
    model.accountsGapSource = saleGroupList;
    model.dtid = dtid;
    model.enterpriseCode = enterpriseCode;
    model.workbook = workbook;
    model.section = section;
    this.props.onSave(model, isCheckSaveAndRetain);
  };

  /**
   * method to clear form fields
   */
  clearForm = () => {
    const { saleGroupList } = this.state;
    this.setState(this.baseState);
    saleGroupList.map((defaultList, index)=> {
      saleGroupList[index]['accountNo1'] = 'BLANK';
      saleGroupList[index]['accountNo2'] = 'BLANK';
      this.setState({ saleGroupList });
    });
  };

  handleGetProps = data => {
    this.setState({ data });
  };

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  };

  handleAddItem = event => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  };

  handleOnSaveAndContinue = () => {
    const { saveAndContinue } = this.props;
    if (saveAndContinue === true) {
      this.handleOnSave();
    }
  };

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({ isCheckSaveAndRetain: response });
  }

  render() {
    const { saleGroupList, data, isCheckSaveAndRetain } = this.state;
    const { formulaOptions } = this.props;
    let validationResult = [];

    console.log("data: ", data);

    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }
    const formFields = generateForm(this.handleInputOnChange, formulaOptions, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange);

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} />
            <TableEdify
              enableCustomHeader={true}
              data={saleGroupList}
              columns={tableColumns}
              scrollY={650}
              scrollX={630}
              displayFilter={false}
            />
          </div>
          <FormSectionFooterAction disabledSave={data.gapName ? false : true}
            checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave}
            onClearForm={this.clearForm} onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }
}

GapSourceForm.propTypes = {
  dispatch: PropTypes.func,
  formulaOptions: PropTypes.array,
  onSave: PropTypes.func,
  saveAndContinue: PropTypes.bool,
  summary: PropTypes.object,
};

export default GapSourceForm;
