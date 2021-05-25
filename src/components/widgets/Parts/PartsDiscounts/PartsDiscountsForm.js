import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';

class PartsDiscountsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      percentage: false,
      flatAmount: false
    }

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { partDiscount, percentage , flatAmount } = nextProps;
    return { data: partDiscount, percentage , flatAmount }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    if (name === 'discountType') {
      data['limit'] = '';
      data['amount'] = '';
    }

    data[name] = value;
    this.setState({ data });

    if (data['discountType'] === 'P' || value === 'P') {
      this.setState({ percentage: true })
      this.setState({ flatAmount: false })
    }else if (data['discountType'] === 'F' || value === 'F') {
      this.setState({ percentage: false })
      this.setState({ flatAmount: true })
    }
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

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleOnSave = () => {
    const { data } = this.state;
    let model = data;
    this.props.onSave(model);
  };

  render () {
    const { data, percentage, flatAmount } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, data, percentage, flatAmount, validationResult);
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

PartsDiscountsForm.propTypes = {};

export default PartsDiscountsForm;
