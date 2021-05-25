import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_cellTextInputPercentage.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';

class CellPercentageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueCopy: ''
    };
  }

  componentDidMount () {
    this.setState({
      valueCopy: this.props.value
    })
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value : '';
    return { value: value.toString() }
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

  handleOnFocus = (event) => {
    try {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.props);
      }
    } catch (err) {

    }
  }

  handleOnBlur = (event) => {
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    const { value, valueCopy } = this.state;

    if (value !== valueCopy) {
      if (typeof this.props.onBlur === 'function') {
        this.setState({ valueCopy: value });
        this.props.onBlur(targetValue, this.props.item[this.props.refId], this.props.field);
      }
    }
  }

  render() {
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    // const placeholder = this.props.placeholder || '0';
    const field = this.props.field || "field-" + this.props.id;
    const htmlId = this.props.id || field;
    const label = this.props.label || "label-" + this.props.id;
    const displayLabel = this.props.displayLabel || false;
    const forceEmpty = this.props.forceEmpty || false;
    let value = forceEmpty === true ? '' : this.state.value;

    return (
        <div className="cell-percentage-input-container cell-percentage-input">
          <NumericInput
            displayLabel={displayLabel}
            placeholder={value === '' && this.props.isDisabled ? " " : this.props.placeholder || ''}
            onFocus={(event) => this.handleOnFocus(event)}
            onBlur={(event) => this.handleOnBlur(event)}
            htmlId={htmlId}
            label={label}
            name={field}
            maxLength={maxLength}
            required={required}
            onChange={this.handleOnChange}
            disabled={this.props.isDisabled}
            allowDecimal={this.props.allowDecimal || true}
            value={value}
          />
          <i id="cell-filterpercentage" className="fa fa-percent cell-percentage-padding" />
      </div>
    );
  }
}

CellPercentageInput.propTypes = {
  value: PropTypes.any.isRequired,
  displayLabel: PropTypes.bool,
  field: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};

export default CellPercentageInput;
