import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cashDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';
import BlockText from '../../../reusable/BlockText';
import CashDrawersForm from '../../../widgets/Accounting/CachDrawers/CashDrawersForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import commonTranslate from '../../../../translation/common.json';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class GeneralDepartment extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      cashDrawerList: [],
      cashDrawer: {},
      isShowLoaderModal: false,
      isShowDeleteModal: false,
      loaderStatus: "",
      loaderMessage: "",
      onSave: false,
      onEdit: false,
      onDelete: false,
      accountRowDelete : {},
      summary: {},
      isMarkAsComplete: false,
    }
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
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let cashDrawerList = state.cashDrawerList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onEdit === true || state.onSave === true) {
      if (nextProps.cashDrawer.isOk === false ) {
        return {
          loaderStatus: state.onSave ? "" : 'error',
          loaderMessage: cashDrawersTranslate.saveError,
          cashDrawer: nextProps.cashDrawer.data.model[0],
          onSave: false,
          onEdit: false
        }
      } else {
        return {
          loaderStatus: 'success',
          onSave: false,
          loaderMessage: cashDrawersTranslate.saveSuccess,
          cashDrawer: nextProps.cashDrawer.data.model[0]
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.cashDrawer.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: cashDrawersTranslate.deleteSuccess,
          cashDrawer: nextProps.cashDrawer.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: cashDrawersTranslate.deleteError,
          cashDrawer: nextProps.cashDrawer.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.cashDrawer.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
        }
      }
    }

    try {
      if (nextProps.cashDrawerList.data.model !== state.cashDrawerList) {
        cashDrawerList = nextProps.cashDrawerList.data.model;
        summary = nextProps.cashDrawerList.data.summary;

        if (cashDrawerList.length !== undefined || Object.keys(cashDrawerList).length > 0) {
          return {cashDrawerList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, cashDrawer, cashDrawerList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== "" || prevState.onEdit === true && loaderStatus !== "") {
      let updatedList = updateTableList(cashDrawer, cashDrawerList);

      this.setState({ cashDrawerList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ cashDrawer: {}, loaderStatus: "" })
      }, 1000)
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === 'success') {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: "" })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === 'error') {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: "" })
    }

  }

  /**
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, cashDrawerList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : cashDrawerList,
      summary
    }

    this.props.dispatch(addAccountingSection(params));
  }

  handleSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  handleChangeInput = (event, id, target) => {
    const { cashDrawerList } = Object.assign({}, this.state);
    let selectedRow = cashDrawerList.findIndex(selectedRow => selectedRow.id == id);

    cashDrawerList[selectedRow][target] = event.value;
    this.setState({ cashDrawerList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { cashDrawerList } = Object.assign({}, this.state);
    let selectedRow = cashDrawerList.findIndex(selectedRow => selectedRow.id == id);
    cashDrawerList[selectedRow][target] = event.value;
    let model = cashDrawerList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addAccountingSection(params));
  }

  handleAddItem = (cashDrawer) => {
    const { summary } = this.state;
    this.setState({ cashDrawer, onSave: true });
    this.props.dispatch(addAccountingSection(getParams(cashDrawer, summary)));
  }

  handleShowErrorModal = (accountRowDelete) => {
    this.setState({ accountRowDelete, isShowDeleteModal: true });
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
      loaderStatus: "",
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

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        // onMarkAsComplete: false
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
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: "",
      cashDrawer: {}
    })
  };

  onClearDataComplete = () => {
    this.setState({
      onMarkAsComplete: false
    });
    this.componentReload();
  };

  render() {
    const { cashDrawerList, cashDrawer, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, summary, isSaveAndContinue } = this.state;
    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PaymentMethod')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={cashDrawersTranslate.pageTitle}
          paragraph={cashDrawersTranslate.pageInstruction}
        />
        <Grid htmlId="cashDrawers">
          <CashDrawersForm
            props={this.props}
            summary={summary}
            cashDrawerList={cashDrawerList}
            cashDrawer={cashDrawer}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
            onClearDataComplete={this.onClearDataComplete}
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

GeneralDepartment.propTypes = {
  cashDrawerList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default GeneralDepartment;
