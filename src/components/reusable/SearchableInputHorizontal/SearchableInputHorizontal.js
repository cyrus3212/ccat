import React, { Component } from "react";
import PropTypes from "prop-types";
import "./_selectInputHorizontal.scss";
import { FormGroup } from "react-bootstrap/lib";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import SearchableSelect from "@coxautokc/fusion-ui-components/lib/SearchableSelect";

class SelectInputHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errorFields: [],
      isRequired: false,
      hasError: false
    };
  }

  componentDidMount() {
    const { validationResult } = this.props;

    try {
      if (validationResult.length) {
        this.setState({ hasError: true });
      }
    }
    catch (e) {

    }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    let validationResult = nextProps.validationResult;
    let value = nextProps.value || "";
    let isRequired = false;

    return { value, errorFields: validationResult, isRequired };
  }

  getErrorMessage = fieldName => {
    const { errorFields } = this.state;

    try {
      const filteredErrorMessage = errorFields.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;
    } catch (e) {
      return "";
    }
  };

  handleOnChange = (event, isValid) => {
    const { value, name } = event.target;
    const { required, id } = this.props;
    const targetValue = { id, value, name };

    this.setState({ value },
      () => {

        // Check if input is required
        if (required) {
          if (!this.state.value && !this.state.errorFields.length) {
            const key = this.props.name || this.props.field;
            const label = this.props.label;
            let error = {
              key,
              message: `${label} is required`
            };

            this.setState(
              { errorFields: [...this.state.errorFields, error], isRequired: true });
          } else {
            this.setState({ errorFields: [], isRequired: false});
          }
        }
      }
    );

    this.props.onChange(targetValue, this.props.id, this.props.name);
  };

  onClick = e => {
    const { required } = this.props;
    if (required) {
      if (!event.target.value && !this.state.errorFields.length) {
        this.setState({ errorFields: []});
      }
    };

    this.setState({ hasError: false });
  };

  render() {
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 51;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const options = this.props.options || [];
    const isRequired = this.props.required || false;
    const name = this.props.name || field;
    const error = this.getErrorMessage(name);

    return (
      <FormGroup className="horizontal">
        <Row>
          <Col sm={labelColSize}>
            <label htmlFor={field}>
              {label}
              {isRequired !== true ? null : (
                <span className="text-alert--red"> *</span>
              )}
            </label>
          </Col>
          <Col
            className={
              `horizontal-select-input
              select-options
              ${ this.state.hasError ? 'isRequired' : ''}
              ${ this.state.isRequired ? 'isRequired' : ''}`
            }
            sm={InputColSize}
            onClick={this.onClick}
          >
            <SearchableSelect
              inline
              id={this.props.id}
              displayLabel={false}
              htmlId={field}
              name={field}
              label={label}
              onChange={this.handleOnChange}
              value={this.state.value}
              options={options}
              error={error}
              disabled={this.props.isDisabled}
            />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

SelectInputHorizontal.propTypes = {
  value: PropTypes.string,
  displayLabel: PropTypes.bool,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  id: PropTypes.any,
  refId: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
  labelColSize: PropTypes.number,
  InputColSize: PropTypes.number,
  options: PropTypes.any
};

export default SelectInputHorizontal;
