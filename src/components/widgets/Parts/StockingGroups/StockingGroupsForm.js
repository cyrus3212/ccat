import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import stockingGrpTranslate from '../../../../translation/parts/stockingGroup.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import {generateForm} from './FormFields';
import {listTableColumns} from './TableColumns'
import {saleAccountListDefaultValues} from './SaleAccountListDefaultValues';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class StockingGroupsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      saleGroupList: [],
      isCheckSaveAndRetain: false
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { stockingGroup, manufacturerOptions, checkSaveAndRetain, isError } = nextProps;
    const { saleAccountRepairOrders } = nextProps.stockingGroup
    let data = stockingGroup || {};

    if (checkSaveAndRetain && !isError) {
      data.stockGroup = "";
      data.description = "";
      data.manufacturer = "";
      data.tradeDefaultPct = "";
      data.listDefaultPct = "";
    }

    return {
      data: data,
      saleGroupList: saleAccountRepairOrders || saleAccountListDefaultValues(),
      manufacturerOptions,
      isCheckSaveAndRetain: checkSaveAndRetain
    }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { saleGroupList } = Object.assign({}, this.state);
    let selectedRow = saleGroupList.findIndex(selectedRow => selectedRow.cId === id);
    saleGroupList[selectedRow][target] = event.value;
    this.setState({saleGroupList})
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, saleGroupList, isCheckSaveAndRetain } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;

    let model = data ;
    model.saleAccountRepairOrders = saleGroupList
    model.dtid = dtid;
    model.enterpriseCode = enterpriseCode;
    model.workbook = workbook;
    model.section = section;

    this.props.onSave(model, isCheckSaveAndRetain);
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState({ data: {}, saleGroupList: saleAccountListDefaultValues() })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({ isCheckSaveAndRetain: response });
  }

  render () {
    const { data, saleGroupList, manufacturerOptions, isCheckSaveAndRetain } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, manufacturerOptions, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange);
    let isDisabledSave = true;

    if (data.stockGroup && data.description && data.manufacturer) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
            <TableEdify data={saleGroupList} tableTitle={stockingGrpTranslate.SaleAccountRepairOrder} columns={tableColumns} scrollY={650} scrollX={630} displayFilter={false} enableCustomHeader={true}/>
          </div>
          <FormSectionFooterAction disabledSave={isDisabledSave}
            checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave}
            onClearForm={this.clearForm} onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }

}

StockingGroupsForm.propTypes = {};

export default StockingGroupsForm;
