import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';
import "./_modalTextInput.scss";

class ModalNumericInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validationResult: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value;
    let validationResult = nextProps.validationResult;
    value = value.toString();

    return { value, validationResult };
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
        this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.field);
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
    const htmlId = this.props.htmlId || 'customTextInputId';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.isDisabled || false;
    const error = this.getErrorMessage(name);
    const value = forceEmpty === true ? '' : this.state.value;

    return (
      <NumericInput
        error={error}
        disabled={disabled}
        htmlId={htmlId}
        label={label}
        name={name}
        maxLength={maxLength}
        required={required}
        onChange={this.handleOnChange}
        value={value}
        allowDecimal={this.props.allowDecimal || false}
      />
    );
  }
}

ModalNumericInput.propTypes = {
  value: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};

export default ModalNumericInput;
