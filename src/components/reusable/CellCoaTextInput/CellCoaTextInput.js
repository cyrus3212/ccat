import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_cellCoaTextInput.scss';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import Modal from 'react-bootstrap/lib/Modal';
import ModalCoaSearch from '../ModalCoaSearch/ModalCoaSearch';

class CellCoaTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valueCopy: "",
      isShowCoaSearch: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount () {
    this.setState({
      valueCopy: this.props.value
    });

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value : '';
    return { value: value.toString() }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (!this.state.isShowCoaSearch && this.state.isInputFocus && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      const targetValue = {
        id: this.props.id,
        value: this.state.value,
        name: this.props.field,
      };

      this.setState({ isInputFocus: false });
      if (this.state.valueCopy !== this.state.value) {
        this.setState({ valueCopy: this.state.value });

        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur(targetValue, this.props.item[this.props.refId], this.props.field);
        }
      }
    }
  }

  handleOnChange = (event, isValid) => {
    let value = event.target.value;
    const { maxLength } = this.props;
    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name,
    };

    if (value.length <= maxLength)
    {
      this.setState({ value })
      try {
        this.props.onChange(targetValue, this.props.item[this.props.refId], this.props.field);
      }
      catch (e) {

      }
    }

  };

  handleOnFocus = (event) => {
    this.setState({ isInputFocus: true });
    this.setState({ valueCopy: this.state.value });
    try {
      if (typeof this.props.onFocus === 'function' && event.target.value !== '') {
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


  handleOnClickModal = () => {
    this.setState({isShowCoaSearch: true});
  }

  handleHideCoaSearch = () => {
    this.setState({
      isShowCoaSearch: false,
      isInputFocus: false
    });
  };

  handleOnSelect = (value) => {
    const targetValue = {
      id: this.props.id,
      value: value,
      name: this.props.field,
    };

    this.setState({
      value,
      isShowCoaSearch: false,
      isInputFocus: false,
      valueCopy: this.state.value
    });

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(targetValue, this.props.item[this.props.refId], this.props.field)
    }
  };

  handleSearchCoaOnEnter = (e) => {
    if (e.keyCode == 9) {
      const targetValue = {
        id: this.props.id,
        value: this.state.value,
        name: this.props.field,
      };

      this.setState({ isInputFocus: false });
      this.setState({ valueCopy: this.state.value });
      if (this.state.valueCopy !== this.state.value) {
        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur(targetValue, this.props.item[this.props.refId], this.props.field)
        }
      }
    }
  }

  render() {
    const field = this.props.field || "field-" + this.props.id;
    const htmlId = this.props.id || field;
    const label = this.props.label || "COA Search: ";
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    const displayLabel = this.props.displayLabel || false;
    const forceEmpty = this.props.forceEmpty || false;
    let value = forceEmpty === true ? "" : this.state.value;
    const isModalForm = this.props.isModalForm || true;

    return (<Fragment><div className="cell-coasearch-input-container cell-coasearch-input" ref={this.setWrapperRef}>
      <TextInput
        className="isDisabled"
        displayLabel={displayLabel}
        placeholder={value === "" && this.props.isDisabled ? " " : this.props.placeholder || ""}
        onFocus={(event) => this.handleOnFocus(event)}
        // onBlur={(event) => this.handleOnBlur(event)}
        htmlId={htmlId}
        label={label}
        name={field}
        maxLength={maxLength}
        required={required}
        onChange={this.handleOnChange}
        disabled={this.props.isDisabled}
        value={value}
        onKeyDown={e => this.handleSearchCoaOnEnter(e)}
      />
      {this.props.isDisabled === true ? <i id="cell-filtercoasearch" className="fa fa-search cell-coasearch-padding" />
      : <i id="cell-filtercoasearch" onClick={this.handleOnClickModal} className="fa fa-search cell-coasearch-padding" /> }
      <Modal show={this.state.isShowCoaSearch} onHide={this.handleHideCoaSearch}>
        <ModalCoaSearch onSelect={this.handleOnSelect} searchVal={this.state.value} />
      </Modal>
      </div>

      </Fragment>
    );
  }
}

CellCoaTextInput.propTypes = {
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

export default CellCoaTextInput;
