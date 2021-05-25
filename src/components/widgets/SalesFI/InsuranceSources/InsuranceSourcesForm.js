import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import TableEdify from '../../../reusable/TableEdify';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import './_insuranceSourcess.scss';
import { creditRateTable, creditLifeList, accidentHealthList, accidentRateTable } from './TableDefaultValues';
import {generateProviderForm} from './ProvidersFields';
import {generateCreditLifeForm} from './CreditLifeFields';
import {generateAccidentFieldsForm} from './AccidentHealthFields'
import {generateCreditTableColumns, generateCreditRateTableColumns, generateAccidentTableColumns, generateAccidentRateTableColumns} from './TableColumns';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class InsuranceSourcesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      creditLifeList: [],
      accidentHealthList: [],
      creditRateTable: [],
      accidentRateTable: [],
      enableCLTableRate: true,
      enableAHTableRate: true,
      isCheckSaveAndRetain: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { insurance, checkSaveAndRetain, isError } = nextProps;
    const salesGroupItems = nextProps.salesGroupItems || [];
    let enableCLTableRate = true;
    let enableAHTableRate = true;
    let data = insurance || {};

    if (checkSaveAndRetain && !isError) {
      data = {};
    }

    if (insurance.useClRateTable && insurance.useClRateTable.length) {
      enableCLTableRate = false;
    }
    if (insurance.useAhRateTable && insurance.useAhRateTable.length) {
      enableAHTableRate = false;
    };

    let creditDefaultLifeList = [];
    if (!insurance.accountsCreditLife) {
      salesGroupItems.map(item => {
        let row = {};
        row.cId = item.cId;
        row.recordType = 'C';
        row.key = item.key;
        row.payableVendor = item.payableVendor;
        row.franchiseCode = item.franchiseCode;
        row.franchiseType = item.franchiseType;
        row.description = item.description;
        row.accountNo1 = item.accountNo1;
        row.accountNo2 = item.accountNo2;
        row.accountNo3 = item.accountNo3;
        row.description = item.description;
        row.validationResult = item.validationResult;
        creditDefaultLifeList.push(row);
      });
    }

    let accidentDefaultLifeList = [];
    if (!insurance.accountsAccidentHealth) {
      salesGroupItems.map(item => {
        let row = {};
        row.cId = item.cId;
        row.recordType = 'H';
        row.key = item.key;
        row.payableVendor = item.payableVendor;
        row.franchiseCode = item.franchiseCode;
        row.franchiseType = item.franchiseType;
        row.description = item.description;
        row.accountNo1 = item.accountNo1;
        row.accountNo2 = item.accountNo2;
        row.accountNo3 = item.accountNo3;
        row.description = item.description;
        row.validationResult = item.validationResult;
        accidentDefaultLifeList.push(row);
      })
    }

    return {
      data: data,
      enableCLTableRate,
      enableAHTableRate,
      creditLifeList: insurance.accountsCreditLife || creditDefaultLifeList || creditLifeList(),
      accidentHealthList: insurance.accountsAccidentHealth || accidentDefaultLifeList || accidentHealthList(),
      creditRateTable: insurance.insuranceSourceCreditLifeItems ||  creditRateTable(),
      accidentRateTable: insurance.insuranceSourceAccidentHealthItems || accidentRateTable(),
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

    if (name === 'useClRateTable') {
      if (value > 0) {
        this.setState({ enableCLTableRate: false });
      } else {
        this.setState({
          enableCLTableRate: true,
          // creditRateTable: creditRateTable(),
        });
      }
    }

    if (name === 'useAhRateTable') {
      if (value > 0) {
        this.setState({ enableAHTableRate: false });
      } else {
        this.setState({
          enableAHTableRate: true,
          // accidentRateTable: accidentRateTable(),
        });
      }
    }

    this.setState({ data });
  }

  handleAccidentRateTableInputChanges = (event, id, target) => {
      const {accidentRateTable} = Object.assign({}, this.state);
      const selectedRow = accidentRateTable.findIndex(selectedRow => selectedRow.cId == id);

      accidentRateTable[selectedRow][target] = event.value;

      this.setState({ accidentRateTable });
  }

  handleAccidentTableInputChanges = (event, id, target) => {
    const {accidentHealthList} = Object.assign({}, this.state);
    const selectedRow = accidentHealthList.findIndex(selectedRow => selectedRow.cId == id);

    accidentHealthList[selectedRow][target] = event.value;

    this.setState({ accidentHealthList });
  }

  handleCreditTableInputChanges = (event, id, target) => {
    const {creditLifeList} = Object.assign({}, this.state);
    const selectedRow = creditLifeList.findIndex(selectedRow => selectedRow.cId == id);

    creditLifeList[selectedRow][target] = event.value;

    this.setState({ creditLifeList });
  }

  handleCreditRateTableInputChanges = (event, id, target) => {
    const {creditRateTable} = Object.assign({}, this.state);
    const selectedRow = creditRateTable.findIndex(selectedRow => selectedRow.cId == id);

    creditRateTable[selectedRow][target] = event.value;

    this.setState({ creditRateTable });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, creditLifeList, accidentHealthList, creditRateTable, accidentRateTable, isCheckSaveAndRetain } = this.state;
    const model = data;
    model.useClRateTable = data.useClRateTable || [];
    model.useAhRateTable = data.useAhRateTable || [];
    model.insuranceSourceAccidentHealthItems = accidentRateTable;
    model.insuranceSourceCreditLifeItems = creditRateTable;
    model.accountsCreditLife =  creditLifeList;
    model.accountsAccidentHealth = accidentHealthList;

    this.props.onSave(model, isCheckSaveAndRetain);
  }

  /**
   * method to clear form fields
   */
  handleClearForm = () => {
    const { salesGroupItems, creditLifeList, accidentHealthList } = this.state;
    this.setState(this.baseState);
    this.setState({
      creditRateTable: creditRateTable(),
      accidentRateTable: accidentRateTable()
    })
    creditLifeList.map((defaultList, index)=> {
      creditLifeList[index]['accountNo1'] = 'BLANK';
      creditLifeList[index]['accountNo2'] = 'BLANK';
      creditLifeList[index]['accountNo3'] = 'BLANK';
      this.setState({ creditLifeList });
    });
    accidentHealthList.map((defaultList, index)=> {
      accidentHealthList[index]['accountNo1'] = 'BLANK';
      accidentHealthList[index]['accountNo2'] = 'BLANK';
      accidentHealthList[index]['accountNo3'] = 'BLANK';
      this.setState({ accidentHealthList });
    });
  }

  creditLifeList() {
    const { creditLifeList, creditRateTable, enableCLTableRate } = this.state;
    const creditTableColumns = generateCreditTableColumns(this.handleCreditTableInputChanges, enableCLTableRate );
    const creditRateTableComuns = generateCreditRateTableColumns(this.handleCreditRateTableInputChanges, enableCLTableRate);

    return(
      <Fragment>
        <div className="no-bg-bd-table">
          <TableEdify key={1} data={creditRateTable} columns={creditRateTableComuns} scrollY={650} scrollX={630} displayFilter={false}/>
        </div>
        <TableEdify key={2} data={creditLifeList} enableCustomHeader={true} columns={creditTableColumns} scrollY={650} scrollX={630} displayFilter={false}/>
      </Fragment>
    )
  }

  accidentHealthList() {
    const { accidentHealthList, accidentRateTable, enableAHTableRate } = this.state
    const accidentTableColumns = generateAccidentTableColumns(this.handleAccidentTableInputChanges);
    const accidentRateTableComuns = generateAccidentRateTableColumns(this.handleAccidentRateTableInputChanges, enableAHTableRate);

    return(
      <Fragment>
        <div className="no-bg-bd-table">
          <TableEdify key={1} data={accidentRateTable} columns={accidentRateTableComuns} scrollY={650} scrollX={630} displayFilter={false}/>
        </div>
        <TableEdify key={2} data={accidentHealthList} enableCustomHeader={true} columns={accidentTableColumns} scrollY={650} scrollX={630} displayFilter={false}/>
      </Fragment>
    )
  }

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({ isCheckSaveAndRetain: response });
  }

  render () {
    const { data, isCheckSaveAndRetain } = this.state;
    const creditLifeRender = this.creditLifeList()
    const accidentHealthRender = this.accidentHealthList()
    const creditLifeFormFields = generateCreditLifeForm(this.handleInputOnChange, creditLifeRender);
    const accidentFormField = generateAccidentFieldsForm(this.handleInputOnChange, accidentHealthRender)
    const creditLifeForm = <FormEdify fields={creditLifeFormFields} data={data} formClass="tab-form" />;
    const accidentHealthForm = <FormEdify fields={accidentFormField} data={data} formClass="tab-form"/>;

    const tabContents = {
      creditLifeForm: creditLifeForm,
      accidentHealthForm: accidentHealthForm
    };

    let validationResult = [];

    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }

    const formFields = generateProviderForm(this.handleInputOnChange, tabContents, validationResult);

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data}/>
          </div>
          <FormSectionFooterAction disabledSave={data.insuranceCoName ? false : true}
            checkSaveAndRetain={isCheckSaveAndRetain}
            onSave={this.handleOnSave} onClearForm={this.handleClearForm}
            onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>
      </Fragment>
    );
  }

}

InsuranceSourcesForm.propTypes = {
};

export default InsuranceSourcesForm;
