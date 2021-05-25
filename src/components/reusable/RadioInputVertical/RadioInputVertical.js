import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_radioInputVertical.scss';
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import RadioButtonList from '@coxautokc/fusion-ui-components/lib/RadioButtonList';

class RadioInputVertical extends Component {
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
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({
      value: event.target.value
    });

    this.props.onChange(targetValue);
    // try {
    //   if (typeof this.props.onChange === 'function' && event.target.value !== '') {
    //     this.props.onChange(targetValue);
    //   }
    // }
    // catch (e) {

    // }

  };

  render() {
    const field = this.props.field || this.props.name || "field-" + this.props.id;
    const label = this.props.label;
    const maxLength = this.props.maxLength || 51;
    const required = this.props.required || false;
    const colSize = this.props.colSize || 12;
    const { options } = this.props

    return (
      <FormGroup className="vertical">
        <Row>
          <Col className="radio-options" sm={12} md={colSize}>
            <label className="label-vertical" htmlFor={field}>{label}</label>
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
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

RadioInputVertical.propTypes = {
  value: PropTypes.string,
  displayLabel: PropTypes.bool,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  label: PropTypes.any,
  required: PropTypes.bool,
  colSize: PropTypes.number,
  InputColSize: PropTypes.number,
  options: PropTypes.any
};

export default RadioInputVertical;
