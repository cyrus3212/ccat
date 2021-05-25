import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_salesFI.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import {generateForm} from './FormFields';
import {listTableColumns} from './TableColumns';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class AccessoriesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      saleGroupList: [],
      salesGroupItems: [],
      validation: true,
      isCheckSaveAndRetain: false
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { accessories, salesGroupItems, checkSaveAndRetain, isError } = nextProps;
    const { accountsAccessory } = nextProps.accessories;
    let data = accessories || {};

    if (checkSaveAndRetain && !isError) {
      data = {};
    }

    return {
      data: data,
      saleGroupList: accountsAccessory || (salesGroupItems != undefined ? salesGroupItems : []),
      salesGroupItems,
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

    data.included = [];

    if (name === 'included') {
      data.includedNew = 'N';
      data.includedUsed = 'N';
      if (value.includes('N')) data.includedUsed = 'Y';
      if (value.includes('Y')) data.includedNew = 'Y';
    }

    this.setState({ data });
    if (name === 'description' && value !== '') {
      this.setState({ validation: false });
    }else{
      this.setState({ validation: true });
    }
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { saleGroupList } = Object.assign({}, this.state);
    let selectedRow = saleGroupList.findIndex(selectedRow => selectedRow.cId == id);

    saleGroupList[selectedRow][target] = event.value;
    this.setState({ saleGroupList });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, saleGroupList, isCheckSaveAndRetain } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;

    let model = data ;
    model.accountsAccessory = saleGroupList
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
    const { saleGroupList } = this.state;
    this.setState(this.baseState);
    saleGroupList.map((defaultList, index)=> {
      saleGroupList[index]['accountNo1'] = 'BLANK';
      saleGroupList[index]['accountNo2'] = 'BLANK';
      saleGroupList[index]['accountNo3'] = 'BLANK';
      this.setState({ saleGroupList })
    });
  };

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleChangeModal = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  defaultIncludeValue = (data) => {
    let defaultValue = [];
    if (data.includedNew === 'Y') {
      defaultValue.push('Y')
    }
    if (data.includedUsed === 'Y') {
      defaultValue.push('N')
    }

    return defaultValue;
  }

  /**
  * Method used to set if to Retain the data as next entry
  */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({ isCheckSaveAndRetain: response });
  }

  render () {
    const {saleGroupList, salesGroupItems, data, isCheckSaveAndRetain} = this.state;
    data.included = this.defaultIncludeValue(data);
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const { assignGrossOptions, tableTypeOptions, taxCodeOptions } = this.props;
    const formFields = generateForm(this.handleInputOnChange, assignGrossOptions, tableTypeOptions, taxCodeOptions, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange)

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data}/>
            <TableEdify data={saleGroupList || salesGroupItems} enableCustomHeader={true} columns={tableColumns} scrollY={650} scrollX={630} displayFilter={false}/>
          </div>
          <FormSectionFooterAction disabledSave={data.description ? false : true}
            checkSaveAndRetain={isCheckSaveAndRetain}
            onSave={this.handleOnSave} onClearForm={this.clearForm}
            onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }

}

AccessoriesForm.propTypes = {};

export default AccessoriesForm;
