import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import splitAccountsTranslate from '../../../../translation/accounting/splitAccounts.json';
import BlockText from '../../../reusable/BlockText';
import SplitAccountsForm from '../../../widgets/Accounting/SplitAccounts';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import scrollToTop from '../../../../helpers/scrollToTop';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';

class SplitAccountsPage extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      splitAccountsList: [],
      splitAccountData: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      accountRowDelete: {},
      summary: {},
      isMarkAsComplete: false,
      isCheckSaveAndRetain: false,
      isError: false
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
      this.setState({ onSave: false })
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
    let splitAccountsList = state.splitAccountsList;
    let summary = state.summary;
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let splitAccountData = state.splitAccountData;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.splitAccounts.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          isError: true,
          loaderMessage: splitAccountsTranslate.saveError,
          splitAccountData: nextProps.splitAccounts.data.model[0]
        }
      }
      else {
        if (isCheckSaveAndRetain) {
          splitAccountData = nextProps.splitAccounts.data.model[0];
          splitAccountData.id = null;
          description.key = "";
          description.description = "";
        } else {
          splitAccountData = {}
        }

        return {
          loaderStatus: 'success',
          onSave: false,
          isError: false,
          loaderMessage: splitAccountsTranslate.saveSuccess,
          splitAccountData: splitAccountData,
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.splitAccounts.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: splitAccountsTranslate.deleteSuccess,
          splitAccountData: {},
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: splitAccountsTranslate.deleteError,
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.splitAccounts.isOk === true ) {
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

    try {
      if (nextProps.splitAccountsList.data.model !== state.splitAccountsList) {
        splitAccountsList = nextProps.splitAccountsList.data.model;
        summary = nextProps.splitAccountsList.data.summary;

        if (splitAccountsList.length !== undefined || Object.keys(splitAccountsList).length > 0) {
          return {splitAccountsList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit split account
   */
  handleEditSplitAccount = (splitAccountData) => {
    scrollToTop();
    this.setState({ splitAccountData, isEdit: true,  isCheckSaveAndRetain: false, isError: false })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isCheckSaveAndRetain: response,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
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

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
        // isMarkAsComplete: true
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    }
    else if (onSave === true && loaderStatus === 'success') {
      this.setState({
        isSaveAndContinue: true
      })
    } else {
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

  /**
   * method that show error modal
   */
  handleShowErrorModal = (accountRowDelete) => {
    this.setState({ accountRowDelete, isShowDeleteModal: true, isEdit: false, splitAccountData: {} });
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

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false,
      isCheckSaveAndRetain: false,
      isError: false
    })
  }

  /**
   * method that generate account list
   */
  renderSplitAccountList = () => {
    const { splitAccountsList } = this.state

    const columns = [
      { title: 'Split Key',    dataIndex: 'key',      refId:'id', type: "label",          columnSortable: false,  },
      { title: 'Description',  dataIndex: 'description',   refId:'id', type: "label",          columnSortable: false,  },
      { title: 'Action',       dataIndex: 'extraData',     refId:'id', type: "actionButtons",  columnSortable: false,
        actionButtons: [
          { htmlId: "editAccount",  buttonStyle: "primary", className: "btn btn-primary",     text: commonTranslate.edit,   type: "button", onClick: this.handleEditSplitAccount },
          { htmlId: "deleteButton", buttonStyle: "danger",  className: "table-delete-button", text: commonTranslate.delete, isDisabled: this.handleDisabledDeleteButton, onClick: this.handleShowErrorModal, type: "button" }
        ]
      },
    ]

    return(
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify key={3} data={splitAccountsList} tableTitle={splitAccountsTranslate.splitAccountList} columns={columns} scrollY={650} scrollX={630} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { splitAccountData, isShowLoaderModal, isShowDeleteModal, isError, loaderStatus, loaderMessage, summary,
      isSaveAndContinue, splitAccountsList, isCheckSaveAndRetain } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'VehicleInventory')} />;
    }

    try {
      if (splitAccountsList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <BlockText
          title={splitAccountsTranslate.pageTitle}
          paragraph={splitAccountsTranslate.pageInstruction}
        />
        <Grid htmlId="splitAccount">
          <SplitAccountsForm splitAccount={splitAccountData} isError={isError}
            onSave={this.handleSave}
            summary={summary} props={this.props}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderSplitAccountList()}
          <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete}
            onSaveAndContinue={this.handleSaveContinue} linkTo={'ManagedAccounts'} summary={summary}
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

SplitAccountsPage.propTypes = {
  splitAccounts: PropTypes.any.isRequired,
  splitAccountsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default SplitAccountsPage;
