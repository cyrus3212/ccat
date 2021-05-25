import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_cellAmountInput.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';

class CellAmountInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
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
    const { id } = this.props;
    const maxLength = this.props.maxLength;
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
    const field = this.props.field || "field-" + this.props.id;
    const htmlId = this.props.id || field;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    const forceEmpty = this.props.forceEmpty || false;
    const autoInsertCommas = this.props.autoInsertCommas || true;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || true;
    let placeholder = this.props.placeholder;
    placeholder = placeholder === '$' || placeholder === undefined ? '0' : placeholder || '';
    let value = forceEmpty === true ? '' : this.state.value;

    return (<div className="cell-amount-input">
              <i id="cell-filteramount" className="fas fa-dollar-sign" />
              <NumericInput
                displayLabel={false}
                onFocus={(event) => this.handleOnFocus(event)}
                onBlur={(event) => this.handleOnBlur(event)}
                htmlId={htmlId}
                label={label}
                name={field}
                maxLength={maxLength}
                required={required}
                placeholder={value === '' && this.props.isDisabled ? " " : placeholder}
                onChange={this.handleOnChange}
                disabled={this.props.isDisabled}
                autoInsertCommas={autoInsertCommas}
                allowNegative={allowNegative}
                allowDecimal={allowDecimal}
                allowDecimal={this.props.allowDecimal || false}
                value={value}
              />
            </div>
    );
  }
}

CellAmountInput.propTypes = {
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

export default CellAmountInput;
