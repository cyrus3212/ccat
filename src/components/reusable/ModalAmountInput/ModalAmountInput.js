import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_modalAmountInput.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';

class ModalAmountInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validationResult: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = state.value;
    let validationResult = state.validationResult;
    try {
      value = nextProps.value || '';
      value = value.toString();
      if (nextProps.validationResult.length > 0) {
        validationResult = nextProps.validationResult;
      }
      return {value, validationResult};
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  getErrorMessage = (fieldName) => {
    const {validationResult} = this.state;

    try {
      const filteredErrorMessage = validationResult.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;
    }
    catch (e) {
      return '';
    }
  }

  handleOnChange = (event, isValid) => {
    const { name, value} = event.target;
    const { id, maxLength } = this.props;

    const targetValue = {
      id: id,
      value: value,
      name: name,
    };

    if (value.length <= maxLength )
    {
      this.setState({ value })
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(targetValue);
      }
    }

  };

  render() {
    let forceEmpty = false;
    if (typeof this.props.forceEmpty === 'function') {
      forceEmpty = this.props.forceEmpty;
    }
    else {
      forceEmpty = this.props.forceEmpty || false;
    }

    const name = this.props.name || "field-" + this.props.id;
    const htmlId = this.props.htmlId || 'modalAmountInputId';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.disabled || false;
    const error = this.getErrorMessage(name);
    const value = forceEmpty === true ? '' : this.state.value;
    const autoInsertCommas = this.props.autoInsertCommas || true;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || true;
    let placeholder = this.props.placeholder;
    placeholder = placeholder === '$' || placeholder === undefined ? '0' : placeholder;

    return (<div className="modal-amount-input">
              <i id="modal-filteramount" className="fas fa-dollar-sign" />
              <NumericInput
                error={error}
                htmlId={htmlId}
                placeholder={placeholder}
                label={label}
                name={name}
                maxLength={maxLength}
                required={required}
                onChange={this.handleOnChange}
                disabled={disabled}
                value={value}
                autoInsertCommas={autoInsertCommas}
                allowNegative={allowNegative}
                allowDecimal={allowDecimal}
              />
            </div>
    );
  }
}

ModalAmountInput.propTypes = {
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

export default ModalAmountInput;
