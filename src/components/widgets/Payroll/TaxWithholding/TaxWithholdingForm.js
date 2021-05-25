import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';


class TaxWithholdingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      taxwithholding: [],
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps) {
    const { taxwithholding } = nextProps;
    return { data: taxwithholding }
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
    this.setState(this.baseState);
  }

  render () {
    const {data} = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, this.props.taxingUnitTypeOptions, validationResult);
    let isDisabledSave = true;

    if (data.taxUnitName && data.taxingUnitIdNumber && data.taxingUnitType) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            {formFields !== undefined ? <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/> : null }
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

TaxWithholdingForm.propTypes = {};

export default TaxWithholdingForm;
