import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import manufacturerTranslate from '../../../../translation/parts/manufacturer.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import {generateForm} from './FormFields';
import {listTableColumns} from './TableColumns';
import {saleAccountListDefaultValues} from './SaleAccountListDefaultValues';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class ManufacturerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      saleAccountList: [],
      isCheckSaveAndRetain: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {  manufacturer, checkSaveAndRetain, isError } = nextProps;
    let data = manufacturer || {};

    if (checkSaveAndRetain && !isError) {
      data = {};
    }

    return {
      data: data,
      saleAccountList: manufacturer.saleAccounts || saleAccountListDefaultValues(),
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
    const { saleAccountList } = Object.assign({}, this.state);
    let selectedRow = saleAccountList.findIndex(selectedRow => selectedRow.cId == id);
    saleAccountList[selectedRow][target] = event.value;
    this.setState({ saleAccountList });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, saleAccountList, isCheckSaveAndRetain } = this.state;
    data['saleAccounts'] = saleAccountList
    let model = data;

    this.props.onSave(model, isCheckSaveAndRetain);
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState({ data: {}, saleAccountList: saleAccountListDefaultValues() });
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
    const { saleAccountList, data, isCheckSaveAndRetain } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange)

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
            <TableEdify data={saleAccountList} tableTitle={manufacturerTranslate.saleAccount} columns={tableColumns} scrollY={650} scrollX={630} displayFilter={false} enableCustomHeader={true} />
          </div>
          <FormSectionFooterAction disabledSave={data.description && data.manufacturerName ? false : true}
            checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave}
            onClearForm={this.clearForm} onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }

}

ManufacturerForm.propTypes = {};

export default ManufacturerForm;
