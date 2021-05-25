import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_numericInputHorizontal.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';
import { FormGroup, Row} from 'react-bootstrap/lib';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class NumericInputHorizontal extends Component {
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
    const { name, value } = event.target;
    const { id, item, refId, field, maxLength, onChange } = this.props;

    const targetValue = {
      id: id,
      value: value,
      name: name,
    };

    if (value.length <= maxLength)
    {
      this.setState({ value })
      onChange(targetValue, item[refId], field);
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
    const autoInsertCommas = this.props.autoInsertCommas || false;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || false;
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
            <NumericInput
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
              autoInsertCommas={autoInsertCommas}
              allowNegative={allowNegative}
              allowDecimal={allowDecimal}
            />
          </Col>
          { inputDescription !== '' && <Col sm={inputDescSize}><span className="inputDescription">{inputDescription}</span></Col>}
        </Row>
      </FormGroup>
    );
  }
}

NumericInputHorizontal.propTypes = {
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

export default NumericInputHorizontal;
