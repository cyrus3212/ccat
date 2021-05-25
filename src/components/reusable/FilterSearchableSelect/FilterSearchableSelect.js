import React, {Component, Fragment} from 'react';
import SelectInput from '@coxautokc/fusion-ui-components/lib/SelectInput';
import PropTypes from 'prop-types';

class FilterSearchableSelect extends Component {
  state = {
    value: '',
    isDisable: false
  };

  onChange = (event, isValid) => {
    const targetValue = {
      id: event.target.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({value: event.target.value});
    if (typeof this.props.onChange !== 'undefined' || typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue);
    }

  };

  render() {
    const htmlId = this.props.htmlId || 'selectedOptions';
    const name = this.props.name || 'selectedOptions';
    const label = this.props.label || '';
    const required = this.props.required || false;
    const value = this.state.value || '';
    let options = this.props.options;

    return (
      <Fragment>
        <div className="store-select">
          <SelectInput
            displayPlaceholder={false}
            required={required}
            displayLabel={false}
            htmlId={htmlId}
            name={name}
            onChange={this.onChange}
            value={value}
            options={options}
          />
          <span>{this.props.users} User(s)</span>
        </div>
      </Fragment>
    );
  }
}

FilterSearchableSelect.propTypes = {
  storesSelect: PropTypes.object.isRequired,
  value: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default FilterSearchableSelect;
