import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_modalTextInputPercentage.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';

class ModalPercentageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
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
    const htmlId = this.props.htmlId || 'modalPercentageInputId';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.isDisabled || this.props.disabled || false;
    const error = this.getErrorMessage(name);
    const value = forceEmpty === true ? '' : this.state.value;
    const autoInsertCommas = this.props.autoInsertCommas || false;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || true;
    const placeholder = this.props.placeholder || '0';

    return (<div className="modal-percentage-input">
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
                <i id="modal-filterpercentage" className="fa fa-percent modal-percentage-padding" />
            </div>
    );
  }
}

ModalPercentageInput.propTypes = {
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

export default ModalPercentageInput;
