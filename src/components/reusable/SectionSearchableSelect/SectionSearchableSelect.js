import React, {Component} from 'react';
import SectionSearchableSelect from '@coxautokc/fusion-ui-components/lib/SearchableSelect';
import PropTypes from 'prop-types';
import "./_modalSectionSearchableSelect.scss";


class SectionSearchableSelect extends Component {
  state = {
    sections: [],
    value: this.props.value,
    isDisable: false
  };

  static getDerivedStateFromProps(nextProps, state) {
      section_list = state.sections;

    try {
      return {section_list:nextProps.CopyData.pyr};
    } catch (e) {

    }
  }

  render() {
    const htmlId = this.props.htmlId || 'selectedOptions';
    const name = this.props.name || 'selectedOptions';
    const label = this.props.label || 'Selected Workbooks';
    const required = this.props.required || false;

    return (
      <div>
        <SectionSearchableSelect
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

SectionSearchableSelect.propTypes = {
  workbooksSelect: PropTypes.object,
  value: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default SectionSearchableSelect;
