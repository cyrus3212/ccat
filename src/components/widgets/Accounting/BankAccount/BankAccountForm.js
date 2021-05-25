import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import {generateForm} from './FormFields';
import FormEdify from '../../../reusable/FormEdify/FormEdify';

class BankAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      bankAccount: {},
      customerTypeOptions: [],
      isClearedForm: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { bankAccount } = nextProps;
    return { data: bankAccount }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  clearForm = () => {
    this.setState(this.baseState);
    this.setState({isClearedForm: true});
  }

  handleLoaderModalHide = () => {
    this.setState({ isShowLoaderModal: true });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    let { data } = this.state;
    let disabledSave = true;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    let generateFieldsForm = generateForm(this.handleInputOnChange, validationResult);

    if (data.description && data.glAccountNumber) {
      disabledSave = false;
    }

    return (
      <form className="form-horizontal">
        <div className="wrap-form-box">
          <FormEdify fields={generateFieldsForm} data={data} onGetProps={this.handleGetProps} />
        </div>
        <Row className="footer-action-btn">
          <Col className="text-right" xs={12} md={12}>
            <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={disabledSave}>Save</Button>
            <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
          </Col>
        </Row>
      </form>
    );
  }

}

BankAccountForm.propTypes = {

};

export default BankAccountForm;
