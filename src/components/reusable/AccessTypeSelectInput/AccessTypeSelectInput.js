import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from '@coxautokc/fusion-ui-components/lib/SelectInput';
import "./_accessTypeSelectInput.scss";

class AccessTypeSelectInput extends Component {
  state = {
    roles: [],
    value: this.props.value,
  };

  handleOnChange = (event) => {
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({
      value: event.target.value
    });

    if (typeof this.props.onChange !== 'undefined' || typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.name);
    }
  };

  render() {
    const htmlId = this.props.htmlId || 'role';
    const name = this.props.name || 'role';
    const label = this.props.label || 'Role';
    const required = this.props.required || false;
    const value = this.state.value || '';
    return (
      <SelectInput
        displayLabel={false}
        htmlId={htmlId}
        name={name}
        label={label}
        required={required}
        onChange={this.handleOnChange}
        value={value.toString()}
        options={this.props.options || []}
      />
    );
  }
}

AccessTypeSelectInput.propTypes = {
  accessTypes: PropTypes.object,
  value: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default AccessTypeSelectInput;
