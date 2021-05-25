import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class FederalTaxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      let data = nextProps.federalTax
      return { data }
    } catch (err) {

    }
    return {...nextProps, ...state};
  }

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
    const {data} = this.state;
    const { summary, hasError } = this.props;
    let validationResult = [];
    let disabledClearData = true;
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    if (Object.keys(data).length !== 0) {
      disabledClearData = false;
    }

    let disabledSave = false;
    const formFields = generateForm(this.handleInputOnChange, validationResult);

    return (
      <Fragment>
          { data === undefined ? null :
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
          }
          <Footer match={this.props.props.match} disabledClearData={disabledClearData}
            onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.props.onMarkAsComplete}
            onSaveAndContinue={this.handleOnSave} disabledSave={disabledSave} linkTo={'dashboard'} summary={summary} hasError={hasError}
          />
      </Fragment>

    );
  }
}

FederalTaxForm.propTypes = {};

export default FederalTaxForm;
