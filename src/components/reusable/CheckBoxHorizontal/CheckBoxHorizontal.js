import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_checkBoxHorizontal.scss';
import { FormGroup} from 'react-bootstrap/lib';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import CheckBoxList from '@coxautokc/fusion-ui-components/lib/CheckBoxList';

class CheckBoxHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value : [];
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
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "";
    const maxLength = this.props.maxLength || 51;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const options = this.props.options || [];
    const displayLabel = this.props.displayLabel || false;

    return (
      <FormGroup className="horizontal">
        <Row>
          {displayLabel !== false &&
          <Col sm={labelColSize}>
            {label !== '' && <label htmlFor={field}>{label}</label>}
          </Col>
          }
          <Col className="select-options" sm={InputColSize}>
            <CheckBoxList
              inline
              id={this.props.id}
              required={required}
              displayLabel={false}
              htmlId={field}
              name={field}
              label={label}
              onChange={this.handleOnChange}
              values={this.state.value}
              options={options}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

CheckBoxHorizontal.propTypes = {
  value: PropTypes.any,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
  displayLabel: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
  options: PropTypes.any
};

export default CheckBoxHorizontal;
