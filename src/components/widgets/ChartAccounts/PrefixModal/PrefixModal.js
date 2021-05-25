import React, { Fragment, Component } from "react";
import { Header, Title, Body, Footer } from "react-bootstrap/lib/Modal";
import PropTypes from "prop-types";
import "./_prefixModal.scss";
import PrefixModalForm from "./PrefixModalForm";
import PrefixModalFooter from "./PrefixModalFooter";
import PrefixModalHint from "./PrefixModalHint";
import api from "../../../../utils/Http";
import chartAccountsTranslate from '../../../../translation/chartAccounts/reviewAccounts.json';
import { getBaseUrl } from '../../../../helpers/apiHelper';

const http = api("data");

class PrefixModal extends Component {
  state = {
    isShowModal: false,
    value: "",
    valueCopy: "",
    isRemovePrefix: [],
    loaderStatus: "",
    loaderMessage: "",
    responseWarning: false,
    responseWarningRecordCount: 0,
    isApplyPrefix: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { prefix, dtid, skippedCoa } = nextProps;

    let value = prefix || "";
    let stores = nextProps.userStoreList.data.stores || [];
    let companyNumber = '';

    let responseWarningRecordCount = skippedCoa;

    stores.map(res => {
      if (dtid == res.dtid) {
        companyNumber = res.companyNumber;
      }
    })

    return {
      value,
      valueCopy: value,
      companyNumber,
      responseWarningRecordCount,
      responseWarning: responseWarningRecordCount ? true : false
    };
  }

  handleOnChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleOnClickApply = () => {
    const { isRemovePrefix, value, valueCopy, companyNumber } = this.state;
    const { dtid, enterpriseCode } = this.props;

    this.setState({
      loaderStatus: "loading",
      isApplyPrefix: true,
      responseWarning: false
    });

    let data = { enterpriseCode, dtid, companyNumber, prefix: value };

    if (isRemovePrefix.length) {
      data.prefix = '';
      this.setState({ loaderMessage: chartAccountsTranslate.removingPrefix });
      this.setPrefix(data);
    } else {
      if (!value) {
        this.setState({
          value: valueCopy,
          loaderStatus: "",
          loaderMessage: ""
        });
      } else {
        this.setState({ loaderMessage: chartAccountsTranslate.insertingPrefix });
        this.setPrefix(data);
      }
    }

  };

  setPrefix = data => {
    const { isRemovePrefix } = this.state;

    http.post("COASetPrefix", data).then(res => {
      let result = res.data.data;
      this.setState({ loaderStatus: "success" });

      if (isRemovePrefix.length) {
        this.setState({
          loaderMessage: chartAccountsTranslate.removingPrefixComplete,
          value: '',
          isRemovePrefix: []
        });
      } else {
        this.setState({ loaderMessage: chartAccountsTranslate.successInsertPrefix });

        if (result.skippedCoA) {
          this.setState({
            responseWarning: true,
            responseWarningRecordCount: result.skippedCoA
          });
        }
      };

    }).catch(err => {
      this.setState({ loaderStatus: "error" });

      if (isRemovePrefix.length) {
        this.setState({ loaderMessage: chartAccountsTranslate.errorRemovePrefix });
      } else {
        this.setState({ loaderMessage: chartAccountsTranslate.errorInsertPrefix });
      };
    });
  };

  handleExport = () => {
    const { companyNumber } = this.state;
    const { enterpriseCode } = this.props;

    let url = getBaseUrl('data') + `/ExportFailedCoaReport/${enterpriseCode}/${companyNumber}`;

    this.setState({
      isShowLoaderModal: true,
      loaderStatus: 'loading',
      loaderMessage: 'Exporting File...',
    });

    http.get(url).then((res, xhr) => {
      this.setState({
        loaderMessage: 'Export file successful.',
        loaderStatus: 'success'
      });

      let file = new Blob([res.data], {type: 'text/csv;charset=utf-8;'});
      let downloadLink;
      downloadLink = document.createElement("a");
      downloadLink.download = `${enterpriseCode}-${companyNumber}-SkippedChartOfAccounts.csv`;
      downloadLink.href = window.URL.createObjectURL(file);
      document.body.appendChild(downloadLink);

      downloadLink.click();
    });
  }

  handleOnClear = () => {
    this.setState({ value: "" });
  };

  handleOnChangeChecker = e => {
    const { value, name } = e;
    this.setState({ [name]: value });
  };

  handleOnGetAccounts = () => {
    const { isApplyPrefix, responseWarningRecordCount } = this.state;

    if (isApplyPrefix) {
      this.props.onUpdateWarningCount(responseWarningRecordCount);
    };

    this.props.onHide();
  };

  render() {
    const { value, isRemovePrefix, loaderStatus, loaderMessage, responseWarning, responseWarningRecordCount } = this.state;

    return (
      <Fragment>
        <Header>
          <Title>Set Prefix</Title>
        </Header>

        <Body>
          <PrefixModalForm
            value={value}
            isRemovePrefix={isRemovePrefix}
            onChange={this.handleOnChange}
            onClear={this.handleOnClear}
            onChangeChecker={this.handleOnChangeChecker}
          />
          <PrefixModalHint
            loaderStatus={loaderStatus}
            loaderMessage={loaderMessage}
            responseWarning={responseWarning}
            responseWarningRecordCount={responseWarningRecordCount}
          />
        </Body>

        <Footer>
          <PrefixModalFooter
            loaderStatus={loaderStatus}
            onCloseModal={this.handleOnGetAccounts}
            onClickApply={this.handleOnClickApply}
            responseWarning={responseWarning}
            onGetAccounts={this.handleOnGetAccounts}
            onExport={this.handleExport}
          />
        </Footer>
      </Fragment>
    );
  }
}

PrefixModal.propTypes = {
  onHide: PropTypes.func,
  loaderMessage: PropTypes.string,
  loaderStatus: PropTypes.string
};

export default PrefixModal;
