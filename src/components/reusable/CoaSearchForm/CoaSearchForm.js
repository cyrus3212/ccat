import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import "./_modalCoaSearch.scss";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import { getUrlWithParams } from "../../../helpers/urlParam";
import Button from "@coxautokc/fusion-ui-components/lib/Button";
import TableEdify from "../TableEdify";
import { getTableColumns } from "./TableColumns";
import TextInputSearch from "../TextInputSearch";
import api from "../../../utils/Http";
import { Spin } from 'antd';
import 'antd/lib/spin/style/index.css';
import { PrivateContainerConsumer } from "../../containers/PrivateContainer/PrivateContainerContext";

class CoaSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartAccountsList: [],
      chartAccountsListCopy: [],
      summary: {},
      limit: 100,
      page: 1,
      sortBy: "",
      sortType: "",
      searchVal: "",
      searchBy: "CoaSearch",
      totalPages: 0,
      loadingState: true,
      dataLength: 0,
      isDoneInitialize: false,
      forceSearch: false,
      newAccountNumber: "",
      isLoading: false,
      context: {}
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    const { searchVal, context } = this.props;

    if (searchVal) {
      this.componentReload(context);
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { searchVal } = nextProps;
    return { searchVal };
  }

  componentReload = context => {
    const { searchVal } = this.state;
    const { dtid, enterpriseCode } = context;
    const match = {
      code: enterpriseCode, //dynamic
      dtid: dtid,
      name: "CHR",
      section: "CHR_01"
    };

    if (this.state.forceSearch === true) {
      this.setState({ forceSearch: false });
    }

    if (searchVal && searchVal !== 'BLANK' && searchVal !== 'SALE' && searchVal !== 'COSTOFSALE' && searchVal !== 'INVENTORY') {
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

  handleUpdateData = (data, dataCopy) => {
    this.setState({
      chartAccountsList: data,
      chartAccountsListCopy: dataCopy
    });
  };

  handleOnClear = () => {
    const { context } = this.state;
    this.setState({ searchVal: "", page: 1 }, () => {
      // this.componentReload(context);
    });
  };

  handleOnSearch = (searchVal, context) => {
    this.setState({ loadingState: true, page: 1, searchVal, context }, () => {
      this.componentReload(context);
    });
  };

  handleOnSelect = () => {
    const { newAccountNumber } = this.state;
    this.props.onSelect(newAccountNumber);
  };

  handleRowClick = selectedRow => {
    const { newAccountNumber } = selectedRow;
    this.setState({ newAccountNumber });
  };

  onChangeInput = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const tableColumns = getTableColumns();
    const {
      chartAccountsList,
      newAccountNumber,
      searchBy,
      searchVal,
      isLoading
    } = this.state;

    return (
      <PrivateContainerConsumer>
        {context => (
          <Fragment>
            <div className="coa-radio-searchby">
              <Row key={1}>
                <Col md={12} className="text-right">
                  <TextInputSearch
                    onClear={this.handleOnClear}
                    onSearch={e => this.handleOnSearch(e, context)}
                    value={searchVal}
                    field="searchVal"
                    onChange={this.onChangeInput}
                  />
                  {/* <div className="horizontal form-group">
                    <div className="radio-options text-center">
                      <RadioButtonList
                        inline
                        htmlId="coa-radio-searchby"
                        name="searchBy"
                        onChange={this.onChangeInput}
                        value={searchBy}
                        required={false}
                        options={[
                          { value: "", label: "Account Number" },
                          { value: "description", label: "Description" }
                        ]}
                      />
                    </div>
                  </div> */}
                </Col>
              </Row>
            </div>
            <div className="coa-search-table">
              { isLoading ? <div className="text-center coa-modal-loader">
                <Spin tip="Loading"/>
              </div> :
                <TableEdify
                  data={chartAccountsList}
                  columns={tableColumns}
                  htmlId=""
                  scrollY={250}
                  displayFilter={false}
                  showTableTitle={false}
                  enableOnRowClick={true}
                  onRowClick={this.handleRowClick}
                />
              }
            </div>
            <Row key={1}>
              <hr />
              <Col md={12} className="text-right">
                {/* {!newAccountNumber ? null : (
                  <span>Selected Account: {newAccountNumber}</span>
                )} */}
                <Button
                  htmlId="btnSelect"
                  buttonStyle="primary"
                  onClick={this.handleOnSelect}
                  disabled={newAccountNumber ? false : true}
                >
                  Select
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      </PrivateContainerConsumer>
    );
  }
}

export default CoaSearchForm;
