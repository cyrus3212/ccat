import React, {Component} from 'react';
import SearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';
import PropTypes from 'prop-types';

class StoreSearchableSelect extends Component {
  state = {
    stores: [],
    value: this.props.value,
    isDisable: false
  };

  componentWillMount () {
    this.checkStoreLabel(this.props.value);
  }


  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === "undefined") {
      this.checkStoreLabel([]);
    }else {
      this.checkStoreLabel(nextProps.value);
    }
  }

  checkStoreLabel = (value) => {
    if (value.length)
    {
      if (value[0].label == 'All Companies')
      {
        this.setState({ isDisable : true })
      } else {
        this.setState({ isDisable : false })
      }
    } else {
      this.setState({ isDisable : false })
    }
  }

  onChange = (event, isValid) => {
    let targetValue = {
      id: this.props.item.id,
      value: event.target.value,
      name: event.target.name,
    };

    let filteredValue = targetValue.value.filter(i => {
      if (i.label === 'All Companies') {
        return [{value: "", label: "All Companies"}];
      }
      else {
        return false;
      }
    });

    if (filteredValue.length > 0) {
      targetValue.value = filteredValue;
    }

    this.setCompanyValue(targetValue);
  }

  setCompanyValue = (targetValue) => {
    const { item, refId, name } = this.props;
    this.props.onChange(targetValue, item[refId], name);
  }

  render() {
    const htmlId = this.props.htmlId || 'selectedOptions';
    const name = this.props.name || 'selectedOptions';
    const label = this.props.label || 'Selected Stores';
    const required = this.props.required || false;

    return (
      <div>
        <SearchableSelect
          displayLabel={false}
          displayPlaceholder={false}
          htmlId={htmlId}
          label={label}
          name={name}
          disabled={this.state.isDisable}
          onChange={this.onChange}
          options={this.props.options || []}
          required={required}
          value={this.props.value}
        />
      </div>
    );
  }
}

StoreSearchableSelect.propTypes = {
  storesSelect: PropTypes.object,
  value: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default StoreSearchableSelect;
