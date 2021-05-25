import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailInput from '@coxautokc/fusion-ui-components/lib/EmailInput';

class CellEmailInput extends Component {
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
    let value = nextProps.data ? nextProps.data : '';

    return { value: value.toString() }
  }

  handleOnChange = (event, isValid) => {

    let value = event.target.value;

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    this.setState({ value });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.field);
    }

  };

  handleOnFocus = (event) => {
    try {
      if (typeof this.props.onFocus === 'function' && event.target.value !== '') {
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
    const field = this.props.field || "field-" + this.props.id;
    const htmlId = this.props.id || field;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 501;
    const required = this.props.required || false;
    const displayLabel = this.props.displayLabel || false;
    const forceEmpty = this.props.forceEmpty || false;
    let value = forceEmpty === true ? '' : this.state.value;

    return (<EmailInput
      placeholder={value === '' && this.props.isDisabled ? " " : this.props.placeholder || ''}
      displayLabel={displayLabel}
      onFocus={(event) => this.handleOnFocus(event)}
      onBlur={(event) => this.handleOnBlur(event)}
      htmlId={htmlId}
      label={label}
      name={field}
      maxLength={maxLength}
      required={required}
      onChange={this.handleOnChange}
      disabled={this.props.isDisabled}
      value={value}
    />);
  }
}

CellEmailInput.propTypes = {
  data: PropTypes.any.isRequired,
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

export default CellEmailInput;
