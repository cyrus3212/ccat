import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_salesFI.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import { generateForm } from './FormFields';
import { listTableColumns } from './TableColumns';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class AfterMarketsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      saleGroupList: [],
      validation: true,
      isCheckSaveAndRetain: false
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { aftermarket, salesGroupItems, checkSaveAndRetain, isError } = nextProps;
    const { accountsAfterMarket } = nextProps.aftermarket
    let data = aftermarket || {};

    if (checkSaveAndRetain && !isError) {
      data = {};
    }

    return {
      data: data,
      saleGroupList: accountsAfterMarket || (salesGroupItems != undefined ? salesGroupItems : []),
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
    data.include = [];

    if (name === 'include') {
      data.includeNew = 'N';
      data.includeUsed = 'N';
      if (value.includes('N')) data.includeUsed = 'Y';
      if (value.includes('Y')) data.includeNew = 'Y';
    }

    if (name === 'addtoCapCost') {
      data.addtoCapCost = 'N';
      if (value.includes('N')) data.addtoCapCost = 'N';
      if (value.includes('Y')) data.addtoCapCost = 'Y';
    }

    this.setState({ data });
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
    model.accountsAfterMarket = saleGroupList
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

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  defaultIncludeValue = (data) => {
    let defaultValue = [];
    if (data.includeNew === 'Y') {
      defaultValue.push('Y')
    }
    if (data.includeUsed === 'Y') {
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
    let {saleGroupList, salesGroupItems, data, isCheckSaveAndRetain} = this.state;
    data.include = this.defaultIncludeValue(data);
    let validationResult = [];

    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }

    const { assignGrossOptions, tableTypeOptions, taxCodeOptions } = this.props;
    const formFields = generateForm(this.handleInputOnChange, assignGrossOptions, tableTypeOptions, taxCodeOptions, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange);

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data}/>
            <TableEdify
              data={saleGroupList || salesGroupItems}
              columns={tableColumns}
              scrollY={650}
              scrollX={630}
              displayFilter={false}
              enableCustomHeader={true}
            />
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

AfterMarketsForm.propTypes = {};

export default AfterMarketsForm;
