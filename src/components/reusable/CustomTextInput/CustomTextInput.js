import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import "./_customTextInput.scss";

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validationResult: []
    };
  }

  static getDerivedStateFromProps(nextProps) {
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
    // let value = event.target.value.replace(/[^a-z0-9]/gi,'');
    let value = event.target.value;

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    this.setState({ value });

    try {
      this.props.onChange(targetValue);
    }
    catch (e) {

    }

  };

  render() {
    const name = this.props.name || "field-" + this.props.id;
    const htmlId = this.props.htmlId || 'customTextInputId';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.disabled || false;
    const error = this.getErrorMessage(name);
    const value = this.state.value;


    return (
      <TextInput
        error={error}
        disabled={disabled}
        htmlId={htmlId}
        label={label}
        name={name}
        maxLength={maxLength}
        required={required}
        onChange={this.handleOnChange}
        value={value}
      />
    );
  }
}

CustomTextInput.propTypes = {
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

export default CustomTextInput;
