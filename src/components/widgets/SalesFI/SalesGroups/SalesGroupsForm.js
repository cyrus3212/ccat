import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import saleGTranslate from '../../../../translation/salesfi/salesGroups.json'
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';

class SalesGroupsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      generateFieldsForm: [],
      isDisabled: true,
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { salesGroup } = nextProps;

    return { data: salesGroup || {} }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });

    if (data['newUsed'] === 'U') {
      this.setState({ newUsed: 'used' })
    }else{
      data['usedInvAccount'] = '';
      data['usedSaleAccount'] = '';
      this.setState({ newUsed: 'new' })
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
  handleClearForm = () => {
    this.setState(this.baseState)
  }

  render () {
    const { data, newUsed } = this.state;
    let { isDisabled } = this.state;
    const { salesTypeOptions } = this.props;
    let validationResult = [];

    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }
    const formFields = generateForm(this.handleInputOnChange, salesTypeOptions, newUsed, validationResult);

    if (data.newUsed && data.saleGroup && data.description) {
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
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.handleClearForm}>Clear</Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }

}

SalesGroupsForm.propTypes = {
};

export default SalesGroupsForm;
