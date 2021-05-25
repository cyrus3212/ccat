import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import TextInput from "@coxautokc/fusion-ui-components/lib/TextInput";
import "./_coaSearchInput.scss";
import api from "../../../utils/Http";
import { getUrlWithParams } from "../../../helpers/urlParam";
import { PrivateContainerConsumer } from "../../containers/PrivateContainer/PrivateContainerContext";
import { Spin } from "antd";
import "antd/lib/spin/style/index.css";
import CoaSearchInputResult from "./CoaSearchInputResult";
import { FormGroup} from 'react-bootstrap/lib';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class CoaSearchInput extends Component {
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
      isShowFloatingResult: false,
      errorFields: [],
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
    let validationResult = nextProps.validationResult;
    let value = nextProps.value || '';

    return { value, errorFields: validationResult };
  }

  getErrorMessage = (fieldName) => {
    const {errorFields} = this.state;

    try {
      const filteredErrorMessage = errorFields.filter(errorField => {
        return errorField.key === fieldName;
      });
      return filteredErrorMessage[0].message;
    }
    catch (e) {
      return '';
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isShowFloatingResult: false });
    }
  }

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
    console.log('test');
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

    const disabled = this.props.isDisabled || false;
    const { chartAccountsList, isShowFloatingResult, isLoading } = this.state;

    const field = this.props.field || "field-" + this.props.id;
    const label = this.props.label || "COA Search: ";
    const maxLength = this.props.maxLength || 7;
    const required = this.props.required || false;
    const labelColSize = this.props.labelColSize || 5;
    const InputColSize = this.props.InputColSize || 7;
    const isRequired = this.props.required || false;
    const description = this.props.description || '';
    const inputDescription = this.props.inputDescription || '';
    const placeholder = this.props.placeholder || "";
    const name = this.props.name || field;
    const error = this.getErrorMessage(name);
    const isModalForm = this.props.isModalForm === undefined ? true : false;
    const coaIconPaddingCN = this.props.coaIconPaddingCN === undefined ? "coasearch-padding" : this.props.coaIconPaddingCN;
    const coaTextCN = this.props.coaTextCN === undefined ? "text--coasearchinput--floating" : this.props.coaTextCN;

    return (
      <PrivateContainerConsumer>
        {context => (
          <FormGroup >
            <Fragment>
              <Row>
                <Col sm={labelColSize}>
                  <label htmlFor={field}>
                    {label}
                    { isRequired !== true ? null : <span className="text-alert--red"> *</span> }
                  </label>
                  { description != '' && <span>{description}</span> }
                </Col>
                <Col sm={InputColSize}>
                  <div className="text-coasearch-input">
                    <TextInput
                      className="form-control"
                      error={error}
                      displayLabel={false}
                      htmlId={field}
                      label={label}
                      placeholder={placeholder}
                      value={forceEmpty === true ? "" : this.state.value}
                      disabled={disabled}
                      name={name}
                      maxLength={maxLength}
                      required={required}
                      onChange={this.handleOnChange}
                      // onKeyDown={e => this.handleSearchCoaOnEnter(e, context)}
                    />
                    {disabled === true ?
                      <i id={coaTextCN} className={"fa fa-search " + coaIconPaddingCN} />
                    :
                    <i id={coaTextCN} onClick={e => this.handleSearchCoa(context)} className={"fa fa-search " + coaIconPaddingCN} />}
                  </div>

                  {!isLoading ? null : (
                    <ul className="coainput-floating-result text-center">
                      <li className="coainput-floating-result--item loader">
                        <Spin tip="Loading" />
                      </li>
                    </ul>
                  )}

                  {!isShowFloatingResult ? null : (
                    <div ref={this.setWrapperRef} className="form-coa-search">
                      <CoaSearchInputResult onSelectAccount={this.onSelectAccount} chartAccountsList={chartAccountsList} onHideResult={this.onHideResult}/>
                    </div>
                  )}
                </Col>
                { inputDescription !== '' && <Col sm={inputDescSize}><span className="inputDescription">{inputDescription}</span></Col>}
              </Row>
            </Fragment>
          </FormGroup>
        )}
      </PrivateContainerConsumer>
    );
  }
}

CoaSearchInput.propTypes = {
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

export default CoaSearchInput;
