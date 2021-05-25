import React, {Component, Fragment} from 'react';
import "../_parts.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import Footer from '../../../common/Footer';
import { generateForm } from './FormFields';

class RestockingChargeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      vinIntegrityCheck: "",
      journalDescription: "",
      includeOptionsfromInvoice: "",
      requireKeyCodeEntry: "",
      searchAllCompaniesforVehicles: "",
      systemGenereatedStockNumbersNew: "",
      systemGenereatedStockNumbersUsed: "",
      vinWarning: ""
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      let data = nextProps.restockingCharge;
      return { data }
    } catch (err) {

    }

    return {...nextProps, ...state};
  }

  // onSave = () => {
  //   const { data, vinIntegrityCheck, requireKeyCodeEntry, vinWarning } = this.state;
  //   let model = data;

  //   model.vinIntegrityCheck = vinIntegrityCheck;
  //   model.requireKeyCodeEntry =requireKeyCodeEntry;
  //   model.vinWarning = vinWarning;

  //   this.props.onSave(model);
  // }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'vinIntegrityCheck') {
      if (value === 'R') {
        this.setState({
          requireKeyCodeEntry: 'Y',
          vinWarning: 'N',
          vinIntegrityCheck: 'N'
        });
      }
      else if (value === 'W') {
        this.setState({
          requireKeyCodeEntry: 'N',
          vinWarning: 'Y',
          vinIntegrityCheck: 'N'
        });
      }
      else if (value === 'Y') {
        this.setState({
          requireKeyCodeEntry: 'N',
          vinWarning: 'N',
          vinIntegrityCheck: 'Y'
        });
      }
    }
    this.setState({ data });
    this.props.onInputChange(event);
  }

  handleOnSaveContinue = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleMarkAsComplete = () => {
    const { data } = this.state;
    console.log('data', data);

    this.props.onMarkAsComplete(data);
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  render () {
    const { data } = this.state;
    const { summary } = this.props;
    let disabledClearData = true;
    let validationResult = [];

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    try {
      if (Object.keys(data).length !== 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, validationResult);

    return (
      <Fragment>
        <div className="restocking-form">
          <FormEdify fields={formFields} data={this.state.data || []} onGetProps={this.handleGetProps}/>
        </div>
        <Footer match={this.props.props.match} summary={summary} disabledClearData={disabledClearData} isClearDataShow={true}
          onClearDataComplete={this.handleOnClearDataComplete} onMarkAsComplete={this.props.onMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Counterpersons'} />
      </Fragment>

    );
  }

}

RestockingChargeForm.propTypes = {};

export default RestockingChargeForm;
