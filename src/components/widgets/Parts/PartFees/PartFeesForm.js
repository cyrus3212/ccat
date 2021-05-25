import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';

class PartFeesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      variable: false,
      dollarAmount: false,
      percentage: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { partFee, variable, percentage, dollarAmount } = nextProps;
    return { data: partFee, variable, percentage, dollarAmount }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    if (name === 'feeType') {
      data['percentage'] = '';
      data['limit'] = '';
      data['amount'] = '';
    }

    data[name] = value;
    this.setState({ data });

    if (data['feeType'] === 'P' || value === 'P') {
      this.setState({ percentage: true })
      this.setState({ dollarAmount: false })
      this.setState({ variable: false })
    } else if (data['feeType'] === 'D' || value === 'D') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: true })
      this.setState({ variable: false })
      data['percentage'] = '';
    }else if (data['feeType'] === 'V' || value === 'V') {
      this.setState({ percentage: false })
      this.setState({ dollarAmount: false })
      this.setState({ variable: true })
      data['percentage'] = '';
    }
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

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { data, percentage, dollarAmount, variable } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, data, percentage, dollarAmount, variable, validationResult);
    let isDisabledSave = true;

    if (data.description && data.accountNumber) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabledSave}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }

}

PartFeesForm.propTypes = {};

export default PartFeesForm;
