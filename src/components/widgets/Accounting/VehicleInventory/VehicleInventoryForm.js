import React, {Component, Fragment} from 'react';
import "../_accountingWidget.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class VehicleInventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      vinIntegrityCheck: '',
      journalDescription: '',
      includeOptionsfromInvoice: '',
      requireKeyCodeEntry: '',
      searchAllCompaniesforVehicles: '',
      systemGenereatedStockNumbersNew: '',
      systemGenereatedStockNumbersUsed: '',
      vinWarning: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      return { data: nextProps.vehicleInventory };
    } catch (err) {

    }

    return {...nextProps, ...state};
  }

  handleMarkAsComplete = (status) => {
    const { data} = this.state;
    this.props.onMarkAsComplete(data, status);
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'vinIntegrityCheck') {
      if (value === 'Y') {
        data.vinWarning = 'N',
        data.requireKeyCodeEntry = 'N';
        data.vinIntegrityCheck = 'Y'
      }
    }

    if (name === 'vinWarning') {
      if (value === 'Y') {
        data.vinWarning = 'Y';
        data.requireKeyCodeEntry = 'N';
        data.vinIntegrityCheck = 'N';
      }
    }

    if (name === 'requireKeyCodeEntry') {
      if (value === 'Y') {
        data.vinWarning = 'N';
        data.requireKeyCodeEntry = 'Y';
        data.vinIntegrityCheck = 'N';
      }
    }

    this.setState({ data });
    // this.props.onInputChange(data);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleSaveContinue = () => {
    const { data } = this.state;
    this.props.onSaveContinue(data);
  }

  render () {
    const {data} = this.state;
    const {summary, hasError} = this.props
    let validationResult = [];

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, validationResult);
    return (
      <Fragment>
        { data === undefined ? null :
          <FormEdify fields={formFields} data={this.state.data} onGetProps={this.handleGetProps}/>
        }
        <Footer match={this.props.props.match} onMarkAsComplete={this.handleMarkAsComplete}
          onSaveAndContinue={this.handleSaveContinue} linkTo={'SplitAccounts'} summary={summary} hasError={hasError}
          disabledClearData={false} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete}
        />
      </Fragment>
    );
  }

}

VehicleInventoryForm.propTypes = {};

export default VehicleInventoryForm;
