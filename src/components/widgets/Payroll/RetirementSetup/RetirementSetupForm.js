import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import "./_retirementSetup.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class RetirementSetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      deductionOptions: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      const { deductionOptions } = nextProps;
      let data = nextProps.retirementSetup
      return { data, deductionOptions }
    } catch (err) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
    this.props.onInputChange(event);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnSave = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  render () {
    const {data, deductionOptions} = this.state;
    const { summary, hasError } = this.props;

    let validationResult = [];
    let disabledClearData = true;
    try {
      validationResult = data.validationResult;

      if (Object.keys(data).length !== 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    let disabledSave = false;
    const formFields = generateForm(this.handleInputOnChange, validationResult, deductionOptions);

    return (
      <Fragment>
        <form className="form-horizontal">
         { data === undefined ? null :
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
          }
          {
            <Footer match={this.props.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete}
              isClearDataShow={true} onMarkAsComplete={this.props.onMarkAsComplete} onSaveAndContinue={this.handleOnSave}
              disabledSave={disabledSave} linkTo={'OtherPayCodes'} hasError={hasError}
            />
          }
        </form>
      </Fragment>

    );
  }

}

RetirementSetupForm.propTypes = {};

export default RetirementSetupForm;
