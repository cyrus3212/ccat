import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import {serviceContractsListDefaultValues} from './ServiceContractsListDefaultValues';

class ServiceContractsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      serviceContractsList: [],
      isDisabled: true,
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { serviceContract } = nextProps;

    return { data: serviceContract || {} }
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
  handleClearForm = () => {
    this.setState(this.baseState)
  }

  render () {
    const { data } = this.state;
    let { isDisabled } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, validationResult);

    if (data.companyName && data.receivableAccount) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={this.state.data} onGetProps={this.handleGetProps}/>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabled}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.handleClearForm}>Clear</Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }

}

ServiceContractsForm.propTypes = {};

export default ServiceContractsForm;
