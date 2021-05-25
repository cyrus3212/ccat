import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import bankAccountTranslate from '../../../../translation/accounting/bankAccount.json';
import BlockText from '../../../reusable/BlockText';
import BankAccountForm from '../../../widgets/Accounting/BankAccount/BankAccountForm';
import commonTranslate from '../../../../translation/common.json';
import TableEdify from '../../../reusable/TableEdify';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import {generateAccountList} from './TableColumns';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import {getSectionLink} from '../../../../helpers/routesHelper';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class BankAccount extends Component {
  _isMounted = false
  constructor(props) {
    super(props);

    this.state = {
      bankAccountsList: [],
      bankAccounts: {},
      summary: {},
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      isEdit: false,
      onSave: false,
      customerRowDelete: {},
      onMarkAsComplete: false,
      isSaveAndContinue: false,
      isMarkAsComplete: false,
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  static getDerivedStateFromProps(nextProps, state) {
    let bankAccountsList = state.bankAccountsList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.bankAccounts.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: commonTranslate.failedSaveMessage,
          bankAccounts: nextProps.bankAccounts.data.model[0],
        }
      } else {
        return {
          loaderStatus: 'success',
          onMarkAsComplete: false,
          loaderMessage: commonTranslate.successSaveMessage,
          bankAccounts: { description: "", glAccountNumber: "" }
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.bankAccounts.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: commonTranslate.successDeleteMessage,
          bankAccounts: { description: "", glAccountNumber: "" }
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: commonTranslate.failedDeleteMessage,
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.bankAccounts.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
        }
      } else {
        return {
          loaderStatus: 'error',
          onMarkAsComplete: false,
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
        }
      }
    }

    try {
      if (nextProps.bankAccountsList.data.model !== state.bankAccountsList) {
        bankAccountsList = nextProps.bankAccountsList.data.model;
        summary = nextProps.bankAccountsList.data.summary;

        if (bankAccountsList.length !== undefined || Object.keys(bankAccountsList).length > 0) {
          return {bankAccountsList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that fetch split accounts
   */
  componentReload = () => {
    this._isMounted = true

    if (this._isMounted) {
      this.props.dispatch(getAccountingList(getWorkbookUrl(this.props.match)));
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  /**
   * method that handle edit row
   */
  handleEdit = (bankAccounts) => {
    scrollToTop();
    this.setState({ bankAccounts, isEdit: true });
  }

  /**
   * method that handle add/save bank
   */
  handleSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (customerRowDelete) => {
    this.setState({ customerRowDelete, isShowDeleteModal: true, isEdit: false, bankAccounts: { description: "", glAccountNumber: "" } });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: "", isEdit: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, customerRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(customerRowDelete, summary)));
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
    const { onMarkAsComplete } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
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

  renderBankAccountsTypeList = () => {
    const { bankAccountsList } = this.state
    const columns = generateAccountList(this.handleEdit, this.handleDisabledDeleteButton, this.handleShowErrorModal);

    return(
      <div className="bank-account-list">
        <Row>
          <Col md={12}>
            <TableEdify data={bankAccountsList} tableTitle={bankAccountTranslate.bankAccountList} columns={columns} scrollY={650} scrollX={630} />
          </Col>
        </Row>
      </div>
    )
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  render () {
    const { isSaveAndContinue, bankAccounts, isEdit, isShowLoaderModal, loaderMessage, loaderStatus, isShowDeleteModal, bankAccountsList, summary } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'GeneralDepartment')} />;
    }

    try {
      if (bankAccountsList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return (
      <Fragment>
        <BlockText
          title={bankAccountTranslate.pageTitle}
          paragraph={bankAccountTranslate.pageInstruction}
        />
        <Grid htmlId="bankAccount">
          <BankAccountForm
            bankAccount={bankAccounts}
            isEdit={isEdit}
            saveStatus={loaderStatus}
            props={this.props}
            onSave={this.handleSave}
          />
          {this.renderBankAccountsTypeList()}
          <Footer match={this.props.match} onSaveAndContinue={this.handleSaveContinue} summary={summary}
            onMarkAsComplete={this.handleMarkAsComplete}
            disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.handleOnClearDataComplete} linkTo={'dashboard'}
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

BankAccount.propTypes = {
  bankAccounts: PropTypes.any.isRequired,
  bankAccountsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default BankAccount;
