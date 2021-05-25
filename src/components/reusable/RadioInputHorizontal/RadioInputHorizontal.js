import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_radioInputHorizontal.scss';
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import RadioButtonList from '@coxautokc/fusion-ui-components/lib/RadioButtonList';

class RadioInputHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value : '';
    return { value }
  }

  handleOnChange = (event, isValid) => {
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({
      value: event.target.value
    });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(targetValue);
    }

  };

  render() {
    const field = this.props.field || this.props.name || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const { options } = this.props

    return (
      <FormGroup className="horizontal">
        <Row>
          <Col sm={labelColSize}>
            <label htmlFor={field}>{label}</label>
          </Col>
          <Col className="radio-options" sm={InputColSize}>
            <RadioButtonList
              inline
              id={this.props.id}
              required={required}
              displayLabel={false}
              htmlId={field}
              name={field}
              label={label}
              onChange={this.handleOnChange}
              value={this.state.value}
              options={options}
              disabled={this.props.isDisabled}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

RadioInputHorizontal.propTypes = {
  value: PropTypes.string,
  displayLabel: PropTypes.bool,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  label: PropTypes.any,
  required: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
  options: PropTypes.any,
  isDisabled: PropTypes.bool,
};

export default RadioInputHorizontal;
