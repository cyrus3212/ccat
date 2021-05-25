import React, {Component} from 'react';
import SearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';
import PropTypes from 'prop-types';
import "./_workbookSearchableSelect.scss";

class WorkbookSearchableSelect extends Component {
  state = {
    workbooks: [],
    value: this.props.value,
    isDisable: false
  };

  componentWillMount () {
    this.checkWorkbookLabel(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === "undefined") {
      this.checkWorkbookLabel([]);
    }else {
      this.checkWorkbookLabel(nextProps.value);
    }

  }

  checkWorkbookLabel = (value) => {
    if (value.length)
    {
      if (value[0].label == 'All Workbooks')
      {
        this.setState({
          isDisable : true
        })
      } else {
        this.setState({
          isDisable : false
        })
      }
    } else {
      this.setState({
        isDisable : false
      })
    }
  }

  onChange = (event, isValid) => {
    const targetValue = {
      id: this.props.item.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({value: event.target.value});
    if (typeof this.props.onChange !== 'undefined' || typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.name);
    }
  };

  render() {
    const htmlId = this.props.htmlId || 'selectedOptions';
    const name = this.props.name || 'selectedOptions';
    const label = this.props.label || 'Selected Workbooks';
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

WorkbookSearchableSelect.propTypes = {
  workbooksSelect: PropTypes.object,
  value: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default WorkbookSearchableSelect;
