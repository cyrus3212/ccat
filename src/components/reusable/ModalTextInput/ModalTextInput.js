import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import "./_modalTextInput.scss";
import { FormGroup} from "react-bootstrap/lib";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";

class ModalTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      validationResult: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value;
    let validationResult = nextProps.validationResult;
    value = value.toString();
    return { value, validationResult };
  }

  getErrorMessage = (fieldName) => {
    const {validationResult} = this.state;
    try {
      const filteredErrorMessage = validationResult.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;
    }
    catch (e) {
      return '';
    }
  }

  handleOnClear = () => {
    this.setState({ value : "" });
    if (typeof this.props.onClear === 'function') {
      this.props.onClear();
    }
  }

  handleKeyPress = (e) => {
    if (e.keyCode  === 13) {
      if (typeof this.props.onKeyPress === 'function') {
        this.props.onKeyPress();
      }
    }
  }

  handleOnChange = (event, isValid) => {
    // let value = event.target.value.replace(/[^a-z0-9]/gi,'');
    let value = event.target.value;
    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    this.setState({ value });
    try {
      this.props.onChange(targetValue);
    }
    catch (e) {

    }
  };

  render() {
    let forceEmpty = false;
    if (typeof this.props.forceEmpty === 'function') {
      forceEmpty = this.props.forceEmpty;
    }
    else {
      forceEmpty = this.props.forceEmpty || false;
    }

    const name = this.props.name || "field-" + this.props.id;
    const htmlId = this.props.htmlId || 'customTextInputId';
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.isDisabled || false;
    const error = this.getErrorMessage(name);
    const value = forceEmpty === true ? '' : this.state.value;
    const showClear = this.props.showClear || false;

    return (
      <FormGroup >
        <Row>
          <Col md={12}>
            <div className="modal-text-input-container">
              <div className="modal-text-input">
                <TextInput
                  error={error}
                  disabled={disabled}
                  htmlId={htmlId}
                  label={label}
                  name={name}
                  maxLength={maxLength}
                  required={required}
                  onChange={this.handleOnChange}
                  value={value}
                  onChange={this.handleOnChange}
                  onKeyDown={this.handleKeyPress}
                />
                { value && showClear ? <i id="modal-textinput-filtersubmit" className="fa fa-times-circle" onClick={this.handleOnClear} /> : null }
              </div>
            </div>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

ModalTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};

export default ModalTextInput;
