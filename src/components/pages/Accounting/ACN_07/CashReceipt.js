import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cashReceiptTranslate from '../../../../translation/accounting/cashReceipt.json';
import BlockText from '../../../reusable/BlockText';
import CashReceiptForm from '../../../widgets/Accounting/CashReceipt/CashReceiptForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class CashReceipt extends Component {
  _isMounted = false
  constructor(props) {
    super(props);

    this.state = {
      cashReceiptList: [],
      cashReceiptRowDelete: {},
      isShowLoaderModal: false,
      cashReceipt: {},
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      summary: {},
      isMarkAsComplete: false,
      isShowDeleteModal: false
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
    let cashReceiptList = state.cashReceiptList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onEdit === true || state.onSave === true) {
      if (nextProps.cashReceipt.isOk === false ) {
        return {
          loaderStatus: state.onSave ? '' : 'error',
          loaderMessage: cashReceiptTranslate.saveError,
          cashReceipt: nextProps.cashReceipt.data.model[0],
          onSave: false,
          onEdit: false
        }
      } else {
        return {
          loaderStatus: 'success',
          onSave: false,
          loaderMessage: cashReceiptTranslate.saveSuccess,
          cashReceipt: nextProps.cashReceipt.data.model[0]
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.cashReceipt.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: cashReceiptTranslate.deleteSuccess,
          cashReceipt: nextProps.cashReceipt.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: cashReceiptTranslate.deleteError,
          cashReceipt: nextProps.cashReceipt.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.cashReceipt.isOk === true ) {
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
      if (nextProps.cashReceiptList.data.model !== state.cashReceiptList) {
        cashReceiptList = nextProps.cashReceiptList.data.model;
        summary = nextProps.cashReceiptList.data.summary;

        if (cashReceiptList.length !== undefined || Object.keys(cashReceiptList).length > 0) {
          return {cashReceiptList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, cashReceipt, cashReceiptList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(cashReceipt, cashReceiptList);

      this.setState({ cashReceiptList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ cashReceipt: {}, loaderStatus: '' })
      }, 1000)
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === 'success') {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: '' })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === 'error') {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: '' })
    }
  }

  /**
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, cashReceiptList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : cashReceiptList,
      summary
    }

    this.props.dispatch(addAccountingSection(params));
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
  };

  onClearDataComplete = () => {
    this.setState({
      onMarkAsComplete: false
    });
    this.componentReload();
  };

  handleChangeInput = (event, id, target) => {
    const { cashReceiptList } = Object.assign({}, this.state);
    let selectedRow = cashReceiptList.findIndex(selectedRow => selectedRow.id == id);

    cashReceiptList[selectedRow][target] = event.value;
    this.setState({ cashReceiptList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { cashReceiptList } = Object.assign({}, this.state);
    let selectedRow = cashReceiptList.findIndex(selectedRow => selectedRow.id == id);
    cashReceiptList[selectedRow][target] = event.value;

    let model = cashReceiptList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addAccountingSection(params));
  }

  handleAddItem = (cashReceipt) => {
    const { summary } = this.state;
    this.setState({ onSave: true, cashReceipt });
    this.props.dispatch(addAccountingSection(getParams(cashReceipt, summary)));
  }

  handleShowErrorModal = (cashReceiptRowDelete) => {
    this.setState({ cashReceiptRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  /**
   * Method that handle save and continue to next section
   */
  handleSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, cashReceiptRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(cashReceiptRowDelete, summary)));
  }

  handleSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      cashReceipt: {}
    })
  }

  render() {
    const { cashReceiptList, cashReceipt, isShowLoaderModal, loaderStatus, loaderMessage, summary, isShowDeleteModal, isSaveAndContinue } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ARCustomer')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={cashReceiptTranslate.pageTitle}
          paragraph={cashReceiptTranslate.pageInstruction+cashReceiptTranslate.pageInstruction2}
        />
        <Grid htmlId="CashReceipt">
          <CashReceiptForm
            summary={summary}
            props={this.props}
            cashReceiptList={cashReceiptList}
            cashReceipt={cashReceipt}
            onChangeInput={this.handleChangeInput}
            onMarkAsComplete={this.handleMarkAsComplete}
            onBlur={this.handleOnBlur}
            onSave={this.handleSaveContinue}
            isAddStatus={loaderStatus}
            onClearLoaderProps={this.handleClearLoaderProps}
            onShowErrorModal={this.handleShowErrorModal}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
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

CashReceipt.propTypes = {
  cashReceiptList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default CashReceipt;
