import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_textAreaHorizontal.scss';
import TextArea from '@coxautokc/fusion-ui-components/lib/TextArea';
import { FormGroup} from 'react-bootstrap/lib';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Row from '@coxautokc/fusion-ui-components/lib/Row';

class AlphaNumericTextAreaHorizontal extends Component {
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
    // let value = event.target.value.replace(/[^a-zA-Z0-9\s]/gi,'');
    let value = event.target.value;
    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    this.setState({ value });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue);
    }
  };

  render() {
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 51;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const rows = this.props.rows || 5;
    const isRequired = this.props.required || false;

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
            <TextArea
              id={this.props.id}
              displayLabel={false}
              htmlId={field}
              label={label}
              name={field}
              maxLength={maxLength}
              required={required}
              onChange={this.handleOnChange}
              disabled={this.props.isDisabled}
              value={this.state.value}
              labelColSize={labelColSize}
              InputColSize={InputColSize}
              row={rows}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

AlphaNumericTextAreaHorizontal.propTypes = {
  colSize: PropTypes.number,
  value: PropTypes.string,
  displayLabel: PropTypes.bool,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
  rows: PropTypes.number
};

export default AlphaNumericTextAreaHorizontal;
