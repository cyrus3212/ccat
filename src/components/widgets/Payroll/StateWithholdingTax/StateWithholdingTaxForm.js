import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';

class StateWithholdingTaxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      stateWithholdingTax: [],
      deductionOptions: []
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { stateWithholdingTax, taxWitholdingOptions, deductionOptions } = nextProps;
    let data = stateWithholdingTax;

    if (stateWithholdingTax.withholdingTaxingUnitType) {
      taxWitholdingOptions.map(tax => {
        if (tax.value === stateWithholdingTax.withholdingTaxingUnitType) {
          data.taxUnitName = tax.taxUnitName;
        }
      })
    }

    return { data, taxWitholdingOptions, deductionOptions }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    const { taxWitholdingOptions } = this.state

    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'withholdingTaxingUnitType') {
      taxWitholdingOptions.map((taxWitholdingOption, index)=> {
        if (taxWitholdingOption.value === value) {
          data['taxUnitName'] = taxWitholdingOption.taxUnitName;
          data['taxingUnitType'] = taxWitholdingOption.taxingUnitType;
          data['withholdingUnit'] = taxWitholdingOption.taxingUnitIdNumber;
        }
      });
    }

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
    const {data, deductionOptions} = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    let isDisabledSave = true;
    const formFields = generateForm(this.handleInputOnChange, this.props.taxWitholdingOptions, this.props.taxingUnitTypeOptions, validationResult, deductionOptions);

    if (data.withholdingUnit && data.taxingUnitType) {
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

StateWithholdingTaxForm.propTypes = {};

export default StateWithholdingTaxForm;
