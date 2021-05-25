import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableEdifyLazyLoad from '../../../reusable/TableEdifyLazyLoad/TableEdifyLazyLoad';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { Redirect } from 'react-router-dom';
import BlockText from '../../../reusable/BlockText';
import ConfirmationModal from '../../../reusable/ThreeActionConfirmationModal';
import { getReviewAccount } from '../../../../api/chartAccounts/chartAccountListApi';
import { updateReviewAccount } from '../../../../api/chartAccounts/chartAccountApi';
import chartAccountsTranslate from '../../../../translation/chartAccounts/reviewAccounts.json';
import api from '../../../../utils/Http';
import { Spin } from 'antd';
import AddAccountModal from '../../../widgets/ChartAccounts/AddAccountModal';
import commonTranslate from '../../../../translation/common.json';
import MessageAlertModal from '../../../reusable/MessageAlertModal';
import { getBaseUrl } from '../../../../helpers/apiHelper';
import FooterFormAction from '../../../reusable/FooterFormAction';
import LoaderModal from '../../../reusable/LoaderModal';
import TextInputSearch from '../../../reusable/TextInputSearch';
import 'antd/lib/spin/style/index.css';
import './_reviewAccounts.scss';
import { iconType } from '../../../../helpers/iconHelper';
import { generateReviewAccounts } from './TableColumns';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import PrefixModal from '../../../widgets/ChartAccounts/PrefixModal';
import Footer from '../../../common/Footer';

const http = api('data');

class ReviewAccounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      isShowAddModal: false,
      isShowDeleteModal: false,
      options: [],
      loadingState: false,
      limit: 15,
      page: 1,
      sortType: "asc",
      dataLength: 0,
      sortBy: 'newAccountNumber',
      isDataMaximum: false,
      value: 0,
      departments: [],
      accountTypes: [],
      updatedData: [],
      accountsCopy: [],
      summary: {},
      selectedRowId: '',
      selectedEditAccount: {},
      enterpriseCode: '',
      dtid: '',
      isAddNew: false,
      isAddTopScroll: false,
      isShowConfirmationMessageModal: false,
      scrollDirection: 'bottom',
      redirectSummary: false,
      onSave: false,
      isShowMessageAlert: false,
      isLoadDisable: false,
      messageAlert: '',
      messageType: 'success',
      messageTip: '',
      onUpdate: false,
      totalPages: 0,
      isShowLoaderModal: false,
      dataTransactionStatus: '',
      loaderMessage: '',
      searchVal: '',
      isMarkAsComplete: false,
      onMarkAsComplete: false,
      hasError: false,
      isShowPrefixModal: false,
      prefix: '',
      roleName: '',
      skippedCoa: 0
    };
  }

  componentDidMount() {
    this.getAccounts();
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.match.name !== 'CHR') {
      return null;
    }

    let accounts = state.accounts;

    let accountTypes = state.accountTypes;
    let departments = state.departments;
    let balanceTypes = state.balanceTypes;
    let summary = state.summary;
    let totalPages = state.totalPages;
    let dataLength = state.dataLength;
    let prefix = state.prefix;
    let roleName = state.roleName;
    let skippedCoa = state.skippedCoa;

    /**
     * Handle response on Save data
     */

    if (state.onSave === true) {
      if (nextProps.chartAccounts.isOk === false ) {
        return {
          loaderStatus: 'error',
          loaderMessage: chartAccountsTranslate.saveError,
          chartAccounts: nextProps.chartAccounts.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'success',
          loaderMessage: chartAccountsTranslate.saveSuccess,
          chartAccounts: nextProps.chartAccounts.data.model[0]
        }
      }
    }

    if (state.onMarkAsComplete === true) {

      if (nextProps.chartAccounts.isOk === false ) {
        return {
          dataTransactionStatus: 'error',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
        }
      } else {
        return {
          dataTransactionStatus: 'success',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
        }
      }
    }

    if (nextProps.chartAccountsList.isOk === false ) {
      return {
        isShowMessageAlert: true,
        messageAlert: chartAccountsTranslate.messageAlert,
        messageType: 'error',
        messageTip: chartAccountsTranslate.messageTip
      }
    }

    if (nextProps.chartAccountsList.data.model !== accounts && state.onUpdate === false) {
      accounts = nextProps.chartAccountsList.data.model;
      accountTypes = nextProps.chartAccountsList.data.accountTypes;
      departments = nextProps.chartAccountsList.data.departments;
      balanceTypes = nextProps.chartAccountsList.data.balanceTypes;
      summary = nextProps.chartAccountsList.data.summary;
      totalPages = nextProps.chartAccountsList.data.totalPages;
      prefix = nextProps.chartAccountsList.data.prefix;
      skippedCoa = nextProps.chartAccountsList.data.skippedCoa;
      roleName = nextProps.userStoreList.data.roleName;

      try {
        if (accounts.length !== undefined || Object.keys(accounts).length > 0) {
          accounts = accounts.slice(0, state.limit);
          dataLength = nextProps.chartAccountsList.data.model.length;
        }
      }
      catch (e) {

      }
    }

    let accountsCopy = accounts;

    return {accounts, accountsCopy, dataLength, accountTypes, departments, balanceTypes, summary, totalPages, loadingState: false, prefix, roleName, skippedCoa}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chartAccountsList.isOk === true && prevState.onSave === true) {
      setTimeout(() => {
        this.setState({ redirectSummary: true })
      }, 1000)
    }
  }

  getAccounts = () => {
    const { code, dtid } = this.props.match;
    const { searchVal } = this.state;
    this.setState({ enterpriseCode: code, dtid });

    this.props.dispatch(getReviewAccount(this.getUrlWithParams(searchVal)));
  }

  getUrlWithParams = () => {
    const { code, dtid, name, section } = this.props.match;

    const { limit, page, sortBy, sortType, searchVal } = this.state;

    let param = [];

    param.push('limit=' + limit);
    param.push('sortBy=' + sortBy);
    param.push('sortType=' + sortType);
    param.push('page=' + page);

    if (searchVal !== '') {
      param.push('search=' + searchVal);
    }

    let queryString = '';

    if (param.length) {
      queryString = '?' + param.join('&');
    }

    return `${code}/${dtid}/${name}/${section}${queryString}`;
  }

  handleSearchAccount = (searchVal) => {
    this.setState({ loadingState: true, page: 1, searchVal }, () => {
      this.getAccounts();
    });
  }

  /**
   * Get Account Type By Value
   */
  getAccountType = (val) => {
    const {accountTypes} = this.state;
    try {
      const filteredAccountType = accountTypes.filter(accountType => {
        return accountType.value === val;
      });
      return filteredAccountType[0].label;
    }
    catch (e) {
      return '';
    }
  }

  /**
   * method that handle to disable the row based on account type
   */
  handleDisabledField = (data) => {
    if (this.getAccountType(data.accountType) === 'Sale') {
      return false;
    }
    else {
      return true;
    }
  }

  handleInputOnChange = (event, id, target) => {
    const { accounts, updatedData, selectedRowId } = Object.assign({}, this.state);
    let selectedAccount = accounts.findIndex(selectedAccount => selectedAccount.id == id);

    if (accounts[selectedAccount][target] !== event.value) {
      let updatedAccount = accounts[selectedAccount];
      this.setState({ isLoadDisable: false })

      let selectedRow = updatedData.findIndex(selectedRow => selectedRow.id == id);
      if (selectedRow < 0)
      {
        this.setState({
          updatedData: [...this.state.updatedData, updatedAccount]
        })
      }
      // this.handlePageChange(true);
    }

    accounts[selectedAccount][target] = event.value;
    this.setState({ accounts });

  }

  onChangeInputSave = (event, id, target) => {
    const { accounts, summary } = Object.assign({}, this.state);
    let selectedAccount = accounts.findIndex(selectedAccount => selectedAccount.id == id);

    accounts[selectedAccount][target] = event.value;
    let params = {
      model: [accounts[selectedAccount]],
      summary
    };

    http.post(getBaseUrl('data'), params).then(res => {
      let result = res.data;
      let row = result.data.model[0];
      let updatedList = updateTableList(row, accounts);

      this.setState({ accounts: updatedList, accountsCopy: updatedList })

      if (result.isOk === true) {
        renderSuccessAlertMessage('Update Success');
        this.setState({ hasError: false });
      }

      if (result.isOk === false) {
        renderErrorAlertMessage('Update Failed');
        this.setState({ hasError: true });
      }
    })

  }

  handleLoadPrev = () => {
    const { isLoadDisable } = this.state;

    if ( isLoadDisable === false ) {
      this.setState({ scrollDirection: 'top' });
      this.handlePreLoadData();
    }
  }

  handleProceedLoadPrev = () => {
    const { hasError } = this.state;

    if (hasError === false) {
      this.updatedListWithPrevData();
    }

  }

  updatedListWithPrevData = () => {
    const { isDataMaximum, page, loadingState, totalPages } = this.state;

    if (page > 3 && loadingState === false) {
      this.setState({
        loadingState: true,
        isAddTopScroll: false,
        page: page - 2
      }, () => {
        if (isDataMaximum === false) {
          http.get(this.getUrlWithParams()).then(res => {
            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: chartAccountsTranslate.messageAlert,
                messageType: 'error',
                messageTip: chartAccountsTranslate.messageTip
              })
            } else {
              let accountsResult = res.data.data.model;
              let accounts = [...accountsResult, ...this.state.accounts.slice(0, 10)];

              this.setState({
                accounts,
                loadingState: false,
                isAddTopScroll: true
              });

              setTimeout(() => {
                this.setState({
                  isAddTopScroll: true
                })
              }, 350)
            }
          });
        }
      });
    }

    /**
      We reset to page 1 upon reaching on page 2 or page 3
      Since we handled already the previous objects.
    **/
    if (page === 3 || page === 2 && loadingState === false ) {
      this.setState({
        loadingState: true,
        isAddTopScroll: false,
        page: 1
      }, () => {

        if (isDataMaximum === false) {
          http.get(this.getUrlWithParams()).then(res => {

            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: chartAccountsTranslate.messageAlert,
                messageType: 'error',
                messageTip: chartAccountsTranslate.messageTip
              })
            } else {
              let accounts = res.data.data.model;

              this.setState({
                accounts,
                accountsCopy: accounts,
                loadingState: false,
              });
            }
          });
        }
      });
    }
  }

  handleStopPrevScroll = () => {
    this.setState({
      isAddTopScroll: false
    });
  }

  handleLoadMore = () => {
    const { isLoadDisable } = this.state;

    if (isLoadDisable === false) {
      this.setState({ scrollDirection: 'bottom' });
      this.handlePreLoadData();
    }
  }

  handlePreLoadData = () => {
    const { updatedData, scrollDirection } = this.state;

    if (scrollDirection === 'bottom') {
      this.handleProceedLoadMore();
    }
    else if (scrollDirection === 'top') {
      this.handleProceedLoadPrev();
    }
  }

  /**
    We call this method upon getting more items.
    The response are from the API Service
  **/
  handleProceedLoadMore = () => {
    const { totalPages, page, hasError } = this.state;
    // process load more
    if (totalPages >= (page + 1)) {
      // check has error
      if (hasError === false) {
        this.updatedListWithNextData();
      }
    } else {
      // reached limit
      // if (loadingState === false) {
      //   this.updatedListWithNextData();
      // }
    }

  }

  /**
   Method that will update or assign the existing data with new response data.
  **/
  updatedListWithNextData = () => {
    this.setState({
      accounts: this.state.accountsCopy,
      loadingState: true,
      page: this.state.page + 1
    }, () => {

      http.get(this.getUrlWithParams()).then(res => {
        if (res.data.isOk === false) {
          // this handle the provision error from API
          this.setState({
            isShowMessageAlert: true,
            messageAlert: 'Error fetching data',
            messageType: 'error',
            messageTip: 'Click Ok to refresh'
          })
        } else {
          let accounts = res.data.data.model;

          this.setState({
            accounts: [...this.state.accountsCopy, ...accounts],
            // accounts,
            accountsCopy: accounts,
            loadingState: false,
            updatedData: []
          })
        }
      });
    });

  }

  // Unused method
  handleScrollConfirmationModal = (action) => {
    const { scrollDirection, page } = this.state;

    if ( action === "yes") {
      this.onSubmit();

      if (scrollDirection === 'bottom') {
        this.setState({page : this.state.page + 1}, () => {
          this.handleProceedLoadMore();
        })
      }
      else if (scrollDirection === 'top') {
        if (page > 2) {
          this.setState({page : this.state.page - 2}, () => {
            this.handleProceedLoadPrev();
          })
        }
      }
    }

    else if ( action === "no" ) {
      if (scrollDirection === 'bottom') {
        this.handleProceedLoadMore();
      }
      else if (scrollDirection === 'top') {
        if (page > 2) {
          this.handleProceedLoadPrev();
        }
      }
    }

    this.setState({ isShowConfirmationMessageModal: false });
  }

  handleShowErrorModal = (target) => {
    this.setState({ userId: target, isShowDeleteModal: true });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleShowAddModal = () => {
    this.setState({ isShowAddModal: true, selectedEditAccount: {}, isAddNew: true });
  }

  handleOnfocus = (selectedRowId) => {
    this.setState({
      selectedRowId
    });
  }

  handleClickAddAccount = (account) => {
    this.setState({
      accounts: [...this.state.accounts, account]
    });
  }

  handleShowEditModal = (selectedEditAccount) => {
    this.setState({
      selectedEditAccount,
      isShowAddModal: true,
      isAddNew: false
    });
  }

  handleClickEditAccount = () => {
    this.componentDidMount();
  }

  handleMarkAsComplete = (status) => {
    let { summary, accounts } = this.state;

    summary.isCompleted = status;

    let params = {
      model: accounts,
      summary
    };

    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    this.props.dispatch(updateReviewAccount(params));
    // this.setState({ redirectSummary: true })
  }

  handleOnSaveContinue = () => {
    let isDataInValid = false;
    if (isDataInValid === false) {
      this.setState({ onSave: true });
      this.onSubmit();
    } else {
      this.showValidationError();
    }
  }

  showValidationError = () => {
    this.setState({
      isShowMessageAlert: true,
      messageAlert: chartAccountsTranslate.unableUpdateMessage,
      messageType: 'error',
      messageTip: chartAccountsTranslate.messageTip
    })
  }

  onSubmit = () => {
    const { updatedData, summary } = this.state;

    let params = {
      model: updatedData,
      summary
    };

    this.props.dispatch(updateReviewAccount(params));
    this.setState({updatedData: []});
  }

  handleCloseMessageAlert = () => {
    this.setState({ isShowMessageAlert: false });
    this.componentDidMount();
  }

  handleChangeFile = (event) => {
    const { enterpriseCode, dtid, workbook, section } = this.state.summary;
    const file = event.target.files[0];

    let formData = new FormData();
    formData.append('file', file)
    formData.append('enterpriseCode', enterpriseCode)
    formData.append('dtid', dtid)
    formData.append('workbook', workbook)
    formData.append('section', section)

    this.setState({
      onImport: true,
      isShowLoaderModal: true,
      loaderMessage: chartAccountsTranslate.importingDataMessage
    });

    http.post(getBaseUrl('data') + '/UploadCsv', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}).then(res => {
        document.getElementById("input-file").value = "";
        let result = res.data;
        this.setState({ page: 1 });

        if (result.isOk === true) {
          this.setState({
            dataTransactionStatus: 'success' ,
            loaderMessage: chartAccountsTranslate.importingDataSuccess
          });
        } else {
          this.setState({
            dataTransactionStatus: 'error' ,
            loaderMessage: result.errorMessage
          });
        }
    }).catch(err => {
      this.showLoaderErrorStatus();
    });
  }

  showLoaderErrorStatus = () => {
    this.setState({
      dataTransactionStatus: 'error',
      loaderMessage: chartAccountsTranslate.importingDataFailed
    });
  }

  handleLoaderModalHide = () => {
    const { onMarkAsComplete } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;

    // this.getAccounts();
    this.setState({
      isShowLoaderModal: false,
      loaderMessage: '',
      dataTransactionStatus: ''
    });

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
      });

      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    } else {
      this.setState({ onImport: false });
      this.getAccounts();
    }

  }

  handleExport = () => {
    const { enterpriseCode, dtid, workbook, section } = this.state.summary;

    let url = getBaseUrl('data') + `/DownloadCsv/${enterpriseCode}/${dtid}/${workbook}/${section}`;
    // this.props.dispatch(exportData(url));
    // window.open(url, "_self");

    this.setState({
      isShowLoaderModal: true,
      loaderMessage: 'Exporting File...',
      dataTransactionStatus: ''
    });

    http.get(url).then((res, xhr) => {
      this.setState({
        loaderMessage: 'Export file successful.',
        dataTransactionStatus: 'success'
      });

      let file = new Blob([res.data], {type: 'text/csv;charset=utf-8;'});
      let downloadLink;
      downloadLink = document.createElement("a");
      downloadLink.download = "XREFGLP.csv";
      downloadLink.href = window.URL.createObjectURL(file);
      document.body.appendChild(downloadLink);

      downloadLink.click();
    });
  }

  handleClearAccounts = () => {
    this.setState({ searchVal: '', page: 1}, () => {
      this.getAccounts();
    });
  };

  handleShowPrefixModal = () => {
    this.setState({ isShowPrefixModal: true });
  };

  handleClosePrefixModal = () => {
    this.setState({ isShowPrefixModal: false });
  };

  onUpdateWarningCount = (skippedCoa) => {
    this.setState({ skippedCoa });
    this.getAccounts();
  }

  render() {
    if (this.props.match.name !== 'CHR') {
      return null;
    }

    const {
      accounts,
      accountTypes,
      balanceTypes,
      departments,
      selectedEditAccount,
      isAddTopScroll,
      enterpriseCode,
      dtid,
      summary,
      isAddNew,
      redirectSummary,
      isShowMessageAlert,
      messageAlert,
      messageType,
      messageTip,
      onSave,
      dataTransactionStatus,
      loaderMessage,
      isMarkAsComplete,
      onMarkAsComplete,
      prefix,
      skippedCoa
    } = this.state;

    const columns = generateReviewAccounts(this.handleInputOnChange, this.handleDisabledField, accountTypes, departments, balanceTypes, this.onChangeInputSave)

    const { code, name } = this.props.match;

    let Table = accounts !== undefined ?
      <TableEdifyLazyLoad
        data={accounts}
        onLoadPrevScroll={this.handleLoadPrevScroll}
        onStopPrevScroll={this.handleStopPrevScroll}
        isAddTopScroll={isAddTopScroll}
        displayFilter={false}
        onFocus={this.handleOnfocus}
        columns={columns}
        scrollY={350}
        onLoadPrev={this.handleLoadPrev}
        onLoadMore={this.handleLoadMore}
      />
      :
      <div className="text-center">
        <Spin tip="Loading"/>
      </div>

    let summaryLink = `/reviews/${name}/${code}/${dtid}`;
    let saveAndContinueLink = `/dashboard/${code}/${dtid}/${name}`;
    let self = `/workbooks/${name}/${code}/${dtid}`;

    // if (isMarkAsComplete && onMarkAsComplete === true) {
    //   // return <Redirect to={self} />;
    //   window.location.reload(true);
    // }

    if (redirectSummary && onSave === true) {
      return <Redirect to={summaryLink} />;
    }

    // footer settings
    const footerFormActions = [
      { name : commonTranslate.back,            url : '#', position : 'left',   buttonStyle : 'link', 'url': saveAndContinueLink},
      { name : commonTranslate.saveAndContinue, url : '#', position : 'right',  buttonStyle : 'primary', onClick: this.handleOnSaveContinue },
      { name : commonTranslate.markAsComplete,  url : '#', position : 'right',  buttonStyle : 'default', onClick: this.handleMarkAsComplete, disabled: accounts !== undefined ? false : true}
    ]

    const impButton = iconType('IP', 'Import File')
    const expButton = iconType('EP', 'Export File');

    return (
      <Fragment>
          <BlockText
            title={chartAccountsTranslate.pageTitle}
            paragraph={chartAccountsTranslate.pageInstruction}
          />

          <Row>
            <Col md={12}>
              <div className="multi-button-container">
                <Button
                  htmlId="sendButton"
                  buttonStyle="default"
                  onClick={this.handleExport}
                  className="custom-file-upload"
                >
                  <span className="icon-button-container">
                    <img src={expButton.icon} alt={expButton.label}/>
                    <span>{commonTranslate.exportFile}</span>
                  </span>
                </Button>
                <label className="custom-file-upload">
                  <input id="input-file" type="file" onChange={this.handleChangeFile} accept=".csv" />
                  <span className="icon-button-container">
                    {/* <IconFileUpload htmlId="IconFileUpload" /> */}
                    <img src={impButton.icon} alt={impButton.label}/>
                    <span>{commonTranslate.importFile}</span>
                  </span>
                </label>
              </div>
            </Col>
          </Row>

          <Row className="coa-searchbar">
            <Col md={4}>
              { this.state.roleName === 'Admin' ? <span className="set-prefix-button" onClick={this.handleShowPrefixModal}>
                <span>+</span>
                Set Prefix
              </span>: null }
            </Col>
            <Col md={4}></Col>
            <Col md={4} className="text-right">
              <TextInputSearch onSearchAccount={this.handleSearchAccount} onClear={this.handleClearAccounts} onSearch={this.handleSearchAccount} />
            </Col>
          </Row>

          <div className="review-accounts-table">
            { Table }
          </div>

          <div className="loading-block text-center">
            <div className="loading-block__inner">
              {this.state.loadingState ?  <Spin tip="Loading"/>  : ""}
            </div>
          </div>

        <Row>
          <Col md={12} className="add-row-button">
            <Button
                htmlId="buttonAddAccount"
                onClick={this.handleShowAddModal}
                disabled={accounts !== undefined ? false : true}
                buttonStyle="link"
                className="icon-link-button"
              >
                <i className="fas fa-plus" /> {chartAccountsTranslate.addAccount}
              </Button>
          </Col>
        </Row>

        {/* <FooterFormAction
          footerFormActions={footerFormActions}
        /> */}

        <Footer match={this.props.match} onSaveAndContinue={this.handleOnSaveContinue} summary={summary}
          onMarkAsComplete={this.handleMarkAsComplete} isClearDataShow={false} onClearDataComplete={this.handleOnClearDataComplete} linkTo={'dashboard'}
        />

        <Modal show={this.state.isShowConfirmationMessageModal} >
          <ConfirmationModal onConfirmFilter={this.handleScrollConfirmationModal} />
        </Modal>

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <AddAccountModal isAddNew={isAddNew} selectedEditAccount={selectedEditAccount} code={enterpriseCode} dtid={dtid} summary={summary} onClickEditAccount={this.handleClickEditAccount} onClickAddAccount={this.handleClickAddAccount} selectedEditAccount={selectedEditAccount} onHide={this.handleHideAddModal} accounts={accounts} accountTypes={accountTypes} balanceTypes={balanceTypes} departments={departments}/>
        </Modal>

        <Modal show={isShowMessageAlert} onHide={this.handleCloseMessageAlert}>
          <MessageAlertModal onHide={this.handleCloseMessageAlert} messageTip={messageTip} messageAlert={messageAlert} messageType={messageType}/>
        </Modal>

        <Modal show={this.state.isShowLoaderModal} onHide={this.handleRedirectEditPage}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={dataTransactionStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={this.state.isShowPrefixModal}>
          <PrefixModal onHide={this.handleClosePrefixModal} loaderStatus={dataTransactionStatus} loaderMessage={loaderMessage}
            getAccounts={this.getAccounts} enterpriseCode={enterpriseCode} dtid={dtid} prefix={prefix} skippedCoa={skippedCoa}
            onUpdateWarningCount={this.onUpdateWarningCount}
          />
        </Modal>

      </Fragment>
    )
  }
}

ReviewAccounts.propTypes = {
  chartAccountsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ReviewAccounts;
