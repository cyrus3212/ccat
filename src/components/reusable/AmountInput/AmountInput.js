import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_textInputAmount.scss';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class AmountInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value : '';
    return { value }
  }

  handleOnChange = (event, isValid) => {
    let value = event.target.value;
    const maxLength = this.props.maxLength || 7;
    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    if (value.length <= maxLength)
    {
      this.setState({ value })
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(targetValue);
      }
    }
  };

  render() {
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const isRequired = this.props.required || false;
    const autoInsertCommas = this.props.autoInsertCommas || true;
    const allowNegative = this.props.allowNegative || false;
    const allowDecimal = this.props.allowDecimal || true;
    let placeholder = this.props.placeholder;
    placeholder = placeholder === '$' || placeholder === undefined ? '0' : placeholder;

    return (
      <FormGroup >
        <Row>
          <Col sm={labelColSize}>
            <label htmlFor={field}>
              {label}
              { isRequired !== true ? null : <span className="text-alert--red"> *</span> }
            </label>
          </Col>
          <Col sm={InputColSize}>
            <div className="amount-input">
              <i id="filteramount" className="fas fa-dollar-sign" />
              <NumericInput
                id={this.props.id}
                htmlId={field}
                placeholder={placeholder}
                displayLabel={false}
                label={label}
                name={field}
                maxLength={maxLength}
                required={required}
                onChange={this.handleOnChange}
                disabled={this.props.isDisabled}
                value={this.state.value}
                labelColSize={labelColSize}
                InputColSize={InputColSize}
                autoInsertCommas={autoInsertCommas}
                allowNegative={allowNegative}
                allowDecimal={allowDecimal}
              />
            </div>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

AmountInput.propTypes = {
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

export default AmountInput;
