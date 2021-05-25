import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_datepicker.scss';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import { DatePicker } from 'antd';
import { FormGroup, Row} from 'react-bootstrap/lib';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import moment from 'moment';

class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errorFields: [],
      customerError: false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let validationResult = nextProps.validationResult;
    let errorFields = state.errorFields;
    let value = nextProps.value || '';

    try {
      if (nextProps.validationResult.length > 0) {
        for (let i = 0; i < validationResult.length; i++) {
          let errorFieldObj = {};
          errorFieldObj['key'] = validationResult[i].key;
          errorFieldObj['message'] = validationResult[i].message;
          errorFields.push(errorFieldObj);
          customerError = true
        }
        // validationResult = nextProps.validationResult;
      }
      return { value, errorFields, customerError };
    }
    catch (e) {

    }

    return { value, validationResult };
  }

  getErrorMessage = (fieldName) => {
    const {errorFields} = this.state;

    try {
      const filteredErrorMessage = errorFields.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;

    }
    catch (e) {
      return '';
    }
  }

  render() {
    const field = this.props.field || '';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 51;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const inputDescSize = this.props.inputDescSize || 0;
    const description = this.props.description || '';
    const inputDescription = this.props.inputDescription || '';
    const name = this.props.name || field;
    const error = this.getErrorMessage(name);
    const isRequired = this.props.required || false;
    const { value } = this.props;
    const { validationResult } = this.state;

    let displayError = false;
    try{
      if (validationResult.length > 0) {
        displayError = true
      }
    }catch (e) {

    }

    return (
      <FormGroup>
        <Row>
        <Col sm={labelColSize}>
          <label htmlFor={field}>
            {label}
            { isRequired !== true ? null : <span className="text-alert--red"> *</span> }
          </label>
          { description != '' && <span>{description}</span> }
        </Col>
        <Col sm={InputColSize}>
          <div id={displayError === true ? 'display-error' : 'no-display-error'} className={error ? 'has-custom-error' : 'no-custom-error' }>
            { !value || isNaN(value) ?
              <DatePicker
                className={`form-group`}
                label={label}
                htmlId={field}
                onChange={(event) => this.props.onChange(moment(event).format('YYYY-MM-DD'), name)}
                value={""}
              />
              :
              <DatePicker
                className={`form-group`}
                label={label}
                htmlId={field}
                onChange={(event) => this.props.onChange(moment(event).format('YYYY-MM-DD'), name)}
                value={value}
              />
            }
          </div>
          {displayError === true ?
            <span className="help-block custom-error">{error}</span>
            :
            null
          }
        </Col>
        { inputDescription !== '' && <Col sm={inputDescSize}><span className="inputDescription">{inputDescription}</span></Col>}
        </Row>
      </FormGroup>
    );
  }
}

Datepicker.propTypes = {
  colSize: PropTypes.number,
  value: PropTypes.string,
  displayLabel: PropTypes.bool,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
  description: PropTypes.string,
  inputDescription: PropTypes.string,
  inputDescSize: PropTypes.number
};

export default Datepicker;
