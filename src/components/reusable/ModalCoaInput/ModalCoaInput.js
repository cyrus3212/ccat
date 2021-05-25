import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TextInput from "@coxautokc/fusion-ui-components/lib/TextInput";
import "./_modalCoaInput.scss";
import api from "../../../utils/Http";
import { getUrlWithParams } from "../../../helpers/urlParam";
import { PrivateContainerConsumer } from "../../containers/PrivateContainer/PrivateContainerContext";
import { Spin } from "antd";
import "antd/lib/spin/style/index.css";
import ModalCoaInputResult from "./ModalCoaInputResult";

class ModalCoaInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      validationResult: [],
      chartAccountsList: [],
      limit: 100,
      page: 1,
      sortBy: "",
      sortType: "",
      searchVal: "",
      searchBy: "CoaSearch",
      totalPages: 0,
      loadingState: true,
      dataLength: 0,
      isShowFloatingResult: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value;
    let validationResult = nextProps.validationResult;
    value = value.toString();

    return { value, validationResult, searchVal: value };
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isShowFloatingResult: false });
    }
  }

  getErrorMessage = fieldName => {
    const { validationResult } = this.state;

    try {
      const filteredErrorMessage = validationResult.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;
    } catch (e) {
      return "";
    }
  };

  handleOnChange = (event, isValid) => {
    // let value = event.target.value.replace(/[^a-z0-9]/gi,'');
    let value = event.target.value;

    const targetValue = {
      id: this.props.id,
      value,
      name: event.target.name
    };

    this.setState({ value, searchVal: value });

    try {
      this.props.onChange(targetValue);
    } catch (e) {}
  };

  handleSearchCoa = context => {
    const { value } = this.state;
    const { dtid, enterpriseCode } = context;
    const match = {
      code: enterpriseCode,
      dtid,
      name: "CHR",
      section: "CHR_01"
    };

    if (value && value !== 'BLANK' && value !== 'SALE' && value !== 'COSTOFSALE' && value !== 'INVENTORY') {
      this.setState({ match, isLoading: true });
      const url = getUrlWithParams(match, this.state);
      const http = api("data");

      http.get(url).then(res => {
        this.setState({ isLoading: false });
        if (res.data.isOk) {
          let chartAccountsList = res.data.data.model;
          let dataLength = 0;
          const chartAccountsListCopy = res.data.data.model;
          const totalPages = res.data.data.totalPages;
          const summary = res.data.data.summary;

          if (
            chartAccountsList.length !== undefined ||
            Object.keys(chartAccountsList).length > 0
          ) {
            chartAccountsList = chartAccountsList.slice(0, this.state.limit);
            dataLength = res.data.data.model.length;
          }

          // if (chartAccountsList.length) {
          //   this.setState({ isShowFloatingResult: true });
          // }

          this.setState({
            isShowFloatingResult: true,
            chartAccountsList,
            chartAccountsListCopy,
            dataLength,
            summary,
            totalPages,
            loadingState: false
          });
        }
      });
    }
  };

  handleSearchCoaOnEnter = (e,  context) => {

    if (e.key == 'Enter') {
      this.setState({ isShowFloatingResult: false });
      this.handleSearchCoa(context);
    }

    if (e.keyCode === 27) {
      this.setState({ isShowFloatingResult: false });
    }
  }

  onSelectAccount = account => {
    const { newAccountNumber } = account;
    this.setState({
      searchVal: newAccountNumber,
      value: newAccountNumber,
      isShowFloatingResult: false
    });
  };

  onHideResult = () => {
    this.setState({ isShowFloatingResult: false });
  }

  render() {
    let forceEmpty = false;
    if (typeof this.props.forceEmpty === "function") {
      forceEmpty = this.props.forceEmpty;
    } else {
      forceEmpty = this.props.forceEmpty || false;
    }

    const name = this.props.name || "field-" + this.props.id;
    const htmlId = this.props.htmlId || "customTextInputId";
    const label = this.props.label || "label-" + this.props.id;
    const maxLength = this.props.maxLength || 100;
    const required = this.props.required || false;
    const disabled = this.props.isDisabled || false;
    const error = this.getErrorMessage(name);
    const value = forceEmpty === true ? "" : this.state.value;
    const { chartAccountsList, isShowFloatingResult, isLoading } = this.state;

    return (
      <PrivateContainerConsumer>
        {context => (
          <Fragment>
            <div className="text-coasearch-input">
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
                onKeyDown={e => this.handleSearchCoaOnEnter(e, context)}
              />
              {disabled === true ?
              <i
                id="text--filtercoasearch--floating"
                className="fa fa-search coasearch-padding"
              />
              :
              <i
                id="text--filtercoasearch--floating"
                onClick={e => this.handleSearchCoa(context)}
                className="fa fa-search coasearch-padding"
              />}
            </div>

            {!isLoading ? null : (
              <ul className="coa-floating-result text-center">
                <li className="coa-floating-result--item">
                  <Spin tip="Loading" />
                </li>
              </ul>
            )}

            {!isShowFloatingResult ? null : (
              <div ref={this.setWrapperRef}>
                <ModalCoaInputResult onSelectAccount={this.onSelectAccount} chartAccountsList={chartAccountsList} onHideResult={this.onHideResult}/>
              </div>
            )}
          </Fragment>
        )}
      </PrivateContainerConsumer>
    );
  }
}

ModalCoaInput.propTypes = {
  value: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.any,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool
};

export default ModalCoaInput;
