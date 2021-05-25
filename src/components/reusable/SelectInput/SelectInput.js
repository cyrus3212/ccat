import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_selectInput.scss';
import SelectInputUi from '@coxautokc/fusion-ui-components/lib/SelectInput';

class SelectInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = state.value;
    try {
      value = nextProps.value || "";
      return {value};
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }


  onChange = (event) => {
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({
      value: event.target.value
    });

    if (typeof this.props.onChange !== undefined || typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.name);
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(targetValue, this.props.item[this.props.refId], this.props.name);
    }
  };

  render() {
    const htmlId = this.props.htmlId || 'SelectInput';
    const name = this.props.name || 'SelectInput';
    const label = this.props.label || "";
    const required = this.props.required || false;
    const value = this.state.value || "";
    const displayLabel = this.props.displayLabel || false
    const disabled = this.props.disabled || false;

    return (
      <SelectInputUi
        required
        htmlId={htmlId}
        name={name}
        label={label}
        required={required}
        onChange={this.onChange}
        value={value.toString()}
        options={this.props.options}
        displayLabel={displayLabel}
        disabled={disabled}
      />
    );
  }

}

SelectInput.propTypes = {
  value: PropTypes.any,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  refId: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  displayLabel: PropTypes.bool
};

export default SelectInput;
