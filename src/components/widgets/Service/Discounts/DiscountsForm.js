import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import moment from 'moment';


class DiscountsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      variable: false,
      dollarAmount: false,
      percentage: false,
      discountLabor: false,
      discountParts: false,
      isSetDiscAllo: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { variable, percentage, dollarAmount } = nextProps;
    let { discounts } = nextProps;
    return { data: discounts || {}, variable, percentage, dollarAmount }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.discountParts && this.state.discountLabor && prevState.isSetDiscAllo === false) {
      const { data } = this.state;
      // Set the default discount allocation
      data['laborDiscntAlloc'] = 50;
      data['partsDiscntAlloc'] = 50;
      this.setState({ data, isSetDiscAllo: true });
    }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    if (name === 'discountBasis') {
      data['discountPercent'] = '';
      data['discountAmount'] = '';
      data['discountMaximum'] = '';
    }

    if (name === 'discountParts') {
      this.setState({
        discountParts: value === 'Y' ? true : false,
        // isSetDiscAllo: value === 'Y' ? false : true
      });
    }

    if (name === 'discountLabor') {
      this.setState({
        discountLabor: value === 'Y' ? true : false,
        // isSetDiscAllo: value === 'Y' ? false : true
      });
    }

    data[name] = value;
    this.setState({ data });

    if (data['discountBasis'] === 'P' || value === 'P') {
      this.setState({ percentage: true })
      this.setState({ dollarAmount: false })
      this.setState({ variable: false })
    } else if (data['discountBasis'] === 'D' || value === 'D') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: true })
      this.setState({ variable: false })
    } else if (data['discountBasis'] === 'V' || value === 'V') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: false })
      this.setState({ variable: true })
    }

  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data } = this.state;
    let model = data;
    this.props.onSave(model)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
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
    const { data, percentage, dollarAmount, variable } = this.state;
    let validationResult = [];
    let isDisabled = true;
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, this.handleDatePickerOnChange, data, percentage, dollarAmount, variable, validationResult);

    if (data.description) {
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

DiscountsForm.propTypes = {};

export default DiscountsForm;
