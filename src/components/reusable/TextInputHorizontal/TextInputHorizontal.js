import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_textInputHorizontal.scss';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import { FormGroup, Row} from 'react-bootstrap/lib';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class TextInputHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errorFields: []
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
        }
        // validationResult = nextProps.validationResult;
      }
      return { value, errorFields };
    }
    catch (e) {

    }

    return { value };
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

  handleOnChange = (event, isValid) => {
    let value = "";
    if (event.target.value !== '' || event.target.value !== null) {
      value = event.target.value.replace(/[^a-zA-Z0-9\s]/gi,'');
    }
    this.setState({ value });

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    try {
      this.props.onChange(event.target);
    }
    catch (e) {

    }
  };

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
            <TextInput
              id={this.props.id}
              displayLabel={false}
              htmlId={field}
              label={label}
              name={field}
              maxLength={maxLength}
              required={required}
              onChange={this.handleOnChange}
              disabled={this.props.isDisabled}
              value={this.state.value}
              labelColSize={labelColSize}
              error={error}
              InputColSize={InputColSize}
            />
          </Col>
          { inputDescription !== '' && <Col sm={inputDescSize}><span className="inputDescription">{inputDescription}</span></Col>}
        </Row>
      </FormGroup>
    );
  }
}

TextInputHorizontal.propTypes = {
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

export default TextInputHorizontal;
