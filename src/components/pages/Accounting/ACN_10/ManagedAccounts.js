import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import managedAccountsTranslate from '../../../../translation/accounting/managedAccounts.json';
import BlockText from '../../../reusable/BlockText';
import ManagedAccountsForm from '../../../widgets/Accounting/ManagedAccounts';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import TableEdify from '../../../reusable/TableEdify';
import scrollToTop from '../../../../helpers/scrollToTop';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';

class ManagedAccounts extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      managedAccounts: [],
      managedAccountsList: [],
      toolsOptions: [],
      account: {},
      controlledByOptions: [],
      checkStubInfoOptions: [],
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      accountRowDelete: {},
      isMarkAsComplete: false
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this._isMounted = true
    if (this._isMounted) {
      this.props.dispatch(getAccountingList(getWorkbookUrl(this.props.match)));
      setTimeout(() => {
        this.setState({ loaderStatus: '' });
      }, 2000)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let managedAccountsList = state.managedAccountsList;
    let summary = state.summary;
    let toolsOptions = state.toolsOptions;
    let checkStubInfoOptions= state.checkStubInfoOptions;
    let controlledByOptions = state.controlledByOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.managedAccounts.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: managedAccountsTranslate.saveError,
            account: nextProps.managedAccounts.data.model[0]
          }
        }
        else {
          return {
          loaderStatus: 'success',
          loaderMessage: managedAccountsTranslate.saveSuccess,
          account: {}
        }
        }
      }
    }
    catch (e) {

    }

    /**
     * Handle response on Delete data
     */
    try {
      if (state.onDelete === true) {
        if (nextProps.managedAccounts.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: managedAccountsTranslate.deleteSuccess,
            account: {}
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: managedAccountsTranslate.deleteError,
          }
        }
      }
    }
    catch (e) {

    }

    /**
     * Handle response on mark as complete
     */
    try {
      if (state.onMarkAsComplete === true) {
        if (nextProps.managedAccounts.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
          }
        }
        else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
          }
        }
      }
    }
    catch (e)
    {

    }

    try {
      if (nextProps.managedAccountsList.data.model !== state.managedAccountsList) {
        managedAccountsList = nextProps.managedAccountsList.data.model;
        summary = nextProps.managedAccountsList.data.summary;
        toolsOptions = nextProps.managedAccountsList.data.toolsOptions;
        checkStubInfoOptions = nextProps.managedAccountsList.data.checkStubInfoOptions
        controlledByOptions = nextProps.managedAccountsList.data.controlledByOptions

        if (managedAccountsList.length !== undefined || Object.keys(managedAccountsList).length > 0) {
          // Re structure data to dispplay first row list of accounts
          let updatedList = [];
          managedAccountsList.map(acc => {
            let updatedAcc = acc;
            let defaultAccList = [];
            updatedAcc.arAccountNumber = '';

            acc.accounts.map(res => {
              if (res.account1) defaultAccList.push(res.account1);
              if (res.account2) defaultAccList.push(res.account2);
              if (res.account3) defaultAccList.push(res.account3);
              if (res.account4) defaultAccList.push(res.account4);
              if (res.account5) defaultAccList.push(res.account5);
            });

            updatedList.push(updatedAcc);
            updatedAcc.arAccountNumber = defaultAccList.join(', ');
          });

          return {managedAccountsList: updatedList, summary, toolsOptions, checkStubInfoOptions, controlledByOptions};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit managed account
   */
  handleEdit = (account) => {
    scrollToTop();
    this.setState({ account, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (accountRowDelete) => {
    this.setState({ accountRowDelete, isShowDeleteModal: true, isEdit: false, account: {} });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, accountRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(accountRowDelete, summary)));
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { summary } = this.state;
    summary.isCompleted = status;
    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      model: [],
      summary
    }

    this.props.dispatch(addAccountingSection(params));
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;
    this.setState({ loaderMessage: '', loaderStatus: ''});

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
        // isMarkAsComplete: true
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    }
    else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });

      this.componentReload();
    }
  }

  /**
   * Method that handle save and continue to next section
   */
  handleSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false
    })
  }

  renderArCustomerTypeList = () => {
    const { managedAccountsList } = this.state;
    const columns = [
      { title: 'Description',         dataIndex: 'managedAcctDesc', refId: "id",  type: "label",          columnSortable: false, },
      { title: 'List',  dataIndex: 'arAccountNumber', refId: "id", type: "label",          columnSortable: false,},
      { title: 'Action',              dataIndex: 'extraData',       type: "actionButtons",  columnSortable: false,
                actionButtons: [
                  { htmlId: "editAccount",  buttonStyle: "primary", className: "btn btn-primary",     text: commonTranslate.edit,   type: "button", onClick: this.handleEdit },
                  { htmlId: "deleteButton", buttonStyle: "danger",  className: "table-delete-button", text: commonTranslate.delete, isDisabled: this.handleDisabledDeleteButton, onClick: this.handleShowErrorModal, type: "button" }
                ]
      },
    ]

    return(
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={managedAccountsList} tableTitle={managedAccountsTranslate.accountList} columns={columns} scrollY={650} scrollX={630} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { account, isShowLoaderModal, isShowDeleteModal, toolsOptions, checkStubInfoOptions, controlledByOptions, isEdit, loaderStatus, loaderMessage, summary, isSaveAndContinue, managedAccountsList } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'SplitAccounts')} />;
    }

    try {
      if (managedAccountsList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <BlockText
          title={managedAccountsTranslate.pageTitle}
          paragraph={managedAccountsTranslate.pageInstruction}
        />
        <Grid htmlId="arCustomer">
          <ManagedAccountsForm
            account={account}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            props={this.props}
            toolsOptions={toolsOptions}
            checkStubInfoOptions={checkStubInfoOptions}
            controlledByOptions={controlledByOptions}
            isAddStatus={loaderStatus}
          />
          {this.renderArCustomerTypeList()}
          <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete}
            onSaveAndContinue={this.handleSaveContinue} linkTo={'APVendorTypes'} summary={summary}
            disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.componentReload}
          />
        </Grid>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    )
  }
}

ManagedAccounts.propTypes = {
  managedAccounts: PropTypes.any.isRequired,
  managedAccountsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ManagedAccounts;
