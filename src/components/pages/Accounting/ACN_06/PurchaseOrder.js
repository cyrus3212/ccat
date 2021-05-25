import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import purchaseOrderTranslate from '../../../../translation/accounting/purchaseOrder.json';
import BlockText from '../../../reusable/BlockText';
import PurchaseOrderForm from '../../../widgets/Accounting/PurchaseOrder/PurchaseOrderForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class PurchaseOrder extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderList: [],
      purchaseOrder: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      isMarkAsComplete: false,
      onMarkAsComplete: false,
      accountRowDelete: {},
      summary: {}
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
    let purchaseOrderList = state.purchaseOrderList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onEdit === true || state.onSave === true) {
      if (nextProps.purchaseOrder.isOk === false ) {
        return {
          loaderStatus: state.onSave ? '' : 'error',
          loaderMessage: purchaseOrderTranslate.saveError,
          purchaseOrder: nextProps.purchaseOrder.data.model[0],
          onSave: false,
          onEdit: false
        }
      } else {
        return {
          loaderStatus: 'success',
          onSave: false,
          loaderMessage: purchaseOrderTranslate.saveSuccess,
          purchaseOrder: nextProps.purchaseOrder.data.model[0]
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.purchaseOrder.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: purchaseOrderTranslate.deleteSuccess,
          purchaseOrder: nextProps.purchaseOrder.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: purchaseOrderTranslate.deleteError,
          purchaseOrder: nextProps.purchaseOrder.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.purchaseOrder.isOk === true ) {
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
      if (nextProps.purchaseOrderList.data.model !== state.purchaseOrderList) {
        purchaseOrderList = nextProps.purchaseOrderList.data.model;
        summary = nextProps.purchaseOrderList.data.summary;

        if (purchaseOrderList.length !== undefined || Object.keys(purchaseOrderList).length > 0) {
          return {purchaseOrderList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, purchaseOrder, purchaseOrderList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(purchaseOrder, purchaseOrderList);

      this.setState({ purchaseOrderList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ purchaseOrder: {}, loaderStatus: '' })
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
    const { summary, purchaseOrderList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : purchaseOrderList,
      summary
    }

    this.props.dispatch(addAccountingSection(params));
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
    const { purchaseOrderList } = Object.assign({}, this.state);
    let selectedRow = purchaseOrderList.findIndex(selectedRow => selectedRow.id == id);
    purchaseOrderList[selectedRow][target] = event.value;
    this.setState({ purchaseOrderList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { purchaseOrderList } = Object.assign({}, this.state);
    let selectedRow = purchaseOrderList.findIndex(selectedRow => selectedRow.id == id);
    purchaseOrderList[selectedRow][target] = event.value;

    let model = purchaseOrderList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addAccountingSection(params));
  }

  handleOnClick = (event) => {
    this.handleSave()
  }

  handleAddItem = (purchaseOrder) => {
    const { summary } = this.state;
    this.setState({ onSave: true, purchaseOrder, loaderStatus: '' });
    this.props.dispatch(addAccountingSection(getParams(purchaseOrder, summary)));
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
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(accountRowDelete, summary)));
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      purchaseOrder: {}
    })
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '' });
  };

  render() {
    const { purchaseOrderList, isShowDeleteModal, purchaseOrder, isShowLoaderModal, loaderStatus, loaderMessage, summary, isSaveAndContinue } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'CashReceipt')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={purchaseOrderTranslate.pageTitle}
          paragraph={purchaseOrderTranslate.pageInstruction}
        />
        <Grid htmlId="PurchaseOrder">
          <PurchaseOrderForm
            props={this.props}
            summary={summary}
            purchaseOrderList={purchaseOrderList}
            purchaseOrder={purchaseOrder}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onClick={this.handleOnClick}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            isAddStatus={loaderStatus}
            onClearLoaderProps={this.handleClearLoaderProps}
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

PurchaseOrder.propTypes = {
  purchaseOrderList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PurchaseOrder;
