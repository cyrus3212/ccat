import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import "./_arcustomerForm.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import {generateForm} from './FormFields';
import FormEdify from '../../../reusable/FormEdify/FormEdify';

class ARCustomerForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      arCustomer: {},
      customerTypeOptions: [],
      assessFC: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { arCustomer } = nextProps;
    let assessFC = state.assessFC;

    if (!arCustomer.assessFinanceCharge || arCustomer.assessFinanceCharge === undefined) {
      assessFC = false;
    }

    return { data: arCustomer, assessFC }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;

    if (name === 'assessFinanceCharge' && value === 'N') {
      this.setState({ assessFC : false });
      const { data } = this.state
      data.monthlyInterestRate = "";
      data.minimumInterest = "";
      data.interestonBalanceOver = "";
      data.interestIncomeAccount = "";
      data.arStatementForm = "";
      data.chargeInterestonInterest = "";

    } else if (name === 'assessFinanceCharge' && value === 'Y') {
      this.setState({ assessFC : true });
    }

    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
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

  render () {
    const { data } = this.state;
    const { customerTypeOptions } = this.props;
    let assessFC = this.state.assessFC;
    let isDisabledSave = true;
    let validationResult = [];

    if (data.description && data.arAccount) {
      isDisabledSave = false;
    }

    if (data.assessFinanceCharge === 'Y') {
      assessFC = true;
    }

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const generateFieldsForm = generateForm(this.handleInputOnChange, customerTypeOptions, assessFC, validationResult);

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={generateFieldsForm} data={data} onGetProps={this.handleGetProps}/>
          </div>`
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

ARCustomerForm.propTypes = {
};

export default ARCustomerForm;
