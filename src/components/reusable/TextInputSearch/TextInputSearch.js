import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_textInputSearch.scss';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

class TextInputSearch extends Component {
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
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
    const targetValue = {
      id: this.props.id,
      value: event.target.value,
      name: event.target.name,
    };

    this.setState({
      value: event.target.value
    });

  };

  handleOnClear = () => {
    this.setState({ value : '' });
    this.props.onClear();
  }

  handleKeyPress = (e) => {
    if (e.keyCode  === 13) {
      this.handleOnSearch();
    }
  }

  handleOnSearch = () => {
    const { value } = this.state;
    this.props.onSearch(value)
  }

  render() {
    const { value } = this.state;
    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 500;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;

    return (
      <FormGroup >
        <Row>
          <Col md={12}>
            <div className="search-input-container">
              <div className="search-input">
                <TextInput
                  id="filter"
                  placeholder="Search"
                  displayLabel={false}
                  htmlId="filter"
                  label={label}
                  className="text-search"
                  name={field}
                  maxLength={maxLength}
                  required={required}
                  onChange={this.handleOnChange}
                  onKeyDown={this.handleKeyPress}
                  disabled={this.props.isDisabled}
                  value={this.state.value}
                  labelColSize={labelColSize}
                  InputColSize={InputColSize}
                />
                { !value ? null :
                  <i id="filtersubmit" className="fa fa-times-circle" onClick={this.handleOnClear} />
                }
              </div>
              <Button
                htmlId="searchButton"
                onClick={this.handleOnSearch}
                buttonStyle="primary"
              >
                Search
              </Button>
            </div>
            {/* <input id="filter" type="text" placeholder="Search" /> */}

          </Col>
        </Row>
      </FormGroup>
    );
  }
}

TextInputSearch.propTypes = {
  value: PropTypes.string,
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

export default TextInputSearch;
