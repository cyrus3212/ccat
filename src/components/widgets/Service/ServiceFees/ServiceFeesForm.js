import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';

class ServiceFeesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      variable: false,
      dollarAmount: false,
      percentage: false,
      serviceTypeOptions: []
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { serviceFees, variable, percentage, dollarAmount, serviceTypeOptions, isEdit } = nextProps;
    serviceFees.serviceTypeList = serviceFees.serviceTypeList || [];

    return {
      data: serviceFees || [],
      variable,
      percentage,
      dollarAmount,
      serviceTypeOptions,
      isEdit
    }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { isEdit } = this.state;
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    if (name === 'amountType') {
      data['maximumAmount'] = '';
      data['percentage'] = '';
    }

    /**
     * convert from string to array
    */
    let paymentMethodArray = ""
    if (isEdit === true) {
      if (data['paymentMethod'] === null) {
        paymentMethodArray = data['paymentMethod'];
      } else{
        paymentMethodArray = Array.from(data['paymentMethod'] || []);
      }
    } else{
      paymentMethodArray = data['paymentMethod'];
    }

    data['paymentMethod'] = paymentMethodArray;
    data[name] = value;

    if (data['amountType'] === 'P' || value === 'P') {
      this.setState({ percentage: true })
      this.setState({ dollarAmount: false })
      this.setState({ variable: false })
    } else if (data['amountType'] === 'D' || value === 'D') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: true })
      this.setState({ variable: false })
      data['percentage'] = '';
    } else if (data['amountType'] === 'V' || value === 'V') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: false })
      this.setState({ variable: true })
      data['percentage'] = '';
    }

    this.setState({ data, paymentMethodArray: data['paymentMethod'] });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, paymentMethodArray } = this.state;
    let model = data;
    try {
      model.paymentMethod = paymentMethodArray.join(''); /** Convert array to string */
    }
    catch (e) {

    }
    this.props.onSave(model)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * method to handle date picker input changes
   */
  handleDatePickerOnChange = (dateString, name) => {
    let data = Object.assign({}, this.state.data);
    data[name] = dateString;
    this.setState({ data });
  }

  render () {
    const { serviceTypeOptions, data, percentage, dollarAmount, variable } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, this.handleDatePickerOnChange, serviceTypeOptions, data, percentage, dollarAmount, variable, validationResult);

    let isDisabled = true;

    if (data.feesDescription && data.feesCode) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabled}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }

}

ServiceFeesForm.propTypes = {};

export default ServiceFeesForm;
