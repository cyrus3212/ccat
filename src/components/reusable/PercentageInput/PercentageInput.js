import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_textInputPercentage.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class PercentageInput extends Component {
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
    let value = event.target.value;
    const maxLength = this.props.maxLength || 7;

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    if (value.length <= maxLength)
    {
      this.setState({ value })
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(targetValue);
      }
    }

  };

  render() {
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const isRequired = this.props.required || false;
    const autoInsertCommas = this.props.autoInsertCommas || false;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || true;
    const placeholder = this.props.placeholder || '0';
    const name = this.props.name || field;
    const error = this.getErrorMessage(name);
    const forceEmpty = this.props.forceEmpty || false;

    return (
      <FormGroup >
        <Row>
          <Col sm={labelColSize}>
            <label htmlFor={field}>
              {label}
              { isRequired !== true ? null : <span className="text-alert--red"> *</span> }
            </label>
          </Col>
          <Col sm={InputColSize}>
            <div className="text-percentage-input">
              <NumericInput
                id={this.props.id}
                htmlId={field}
                placeholder={placeholder}
                displayLabel={false}
                label={label}
                name={name}
                maxLength={maxLength}
                required={required}
                onChange={this.handleOnChange}
                disabled={this.props.isDisabled}
                value={forceEmpty === true ? '' : this.state.value}
                error={error}
                autoInsertCommas={autoInsertCommas}
                allowNegative={allowNegative}
                allowDecimal={allowDecimal}
              />
                <i id="text-filterpercentage" className="fa fa-percent percentage-padding" />
            </div>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

PercentageInput.propTypes = {
  value: PropTypes.any,
  displayLabel: PropTypes.bool,
  field: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
};

export default PercentageInput;
