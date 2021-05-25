import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import paymentMethodTranslate from '../../../../translation/accounting/paymentMethod.json';
import BlockText from '../../../reusable/BlockText';
import PaymentMethodForm from '../../../widgets/Accounting/PaymentMethod/PaymentMethodForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class PaymentMethod extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      paymentTypeOptions: [],
      paymentMethodList: [],
      paymentMethodData: {},
      onSave: false,
      onEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      summary: {},
      isMarkAsComplete: false,
      isSaveAndContinue: false
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
        this.setState({ loaderStatus: "" });
      }, 2000)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let paymentMethodList = state.paymentMethodList;
    let summary = state.summary;
    let paymentTypeOptions = state.paymentTypeOptions;

    /**
     * Handle response on Save data
     */
    if (state.onEdit === true || state.onSave === true) {
      if (nextProps.paymentMethod.isOk === false ) {
        return {
          loaderStatus: state.onSave ? "" : "error",
          loaderMessage: paymentMethodTranslate.saveError,
          paymentMethodData: nextProps.paymentMethod.data.model[0],
          onSave: false,
          onEdit: false
        }
      } else {
        return {
          loaderStatus: "success",
          onSave: false,
          loaderMessage: paymentMethodTranslate.saveSuccess,
          paymentMethodData: nextProps.paymentMethod.data.model[0],
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.paymentMethod.isOk === true ) {
        return {
          loaderStatus: "success",
          loaderMessage: paymentMethodTranslate.deleteSuccess,
          paymentMethodData: {}
        }
      } else {
        return {
          loaderStatus: "error",
          loaderMessage: paymentMethodTranslate.deleteError,
          paymentMethodData: nextProps.paymentMethod.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.paymentMethod.isOk === true ) {
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
      if (nextProps.paymentMethodList.data.model !== state.paymentMethodList) {
        paymentMethodList = nextProps.paymentMethodList.data.model;
        summary = nextProps.paymentMethodList.data.summary;
        paymentTypeOptions = nextProps.paymentMethodList.data.paymentTypeOptions;

        if (paymentMethodList.length !== undefined || Object.keys(paymentMethodList).length > 0) {
          return {paymentMethodList, summary, paymentTypeOptions};
        }

      }

    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, paymentMethodData, paymentMethodList } = this.state;

    /**
    * Update List with single updated Row
    */
   if (prevState.onSave === true && loaderStatus !== "" || prevState.onEdit === true && loaderStatus !== "") {
      let updatedList = updateTableList(paymentMethodData, paymentMethodList);

      this.setState({ paymentMethodList: updatedList, onEdit: false, onSave: false })

      setTimeout(() => {
        this.setState({ paymentMethodData: {}, loaderStatus: "" })
      }, 1000)
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === "success") {
      renderSuccessAlertMessage("Update Success");
      this.setState({ loaderStatus: "" })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === "error") {
      renderErrorAlertMessage("Update Failed");
      this.setState({ loaderStatus: "" })
    }
  }

  /**
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, paymentMethodList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : paymentMethodList,
      summary
    }

    this.props.dispatch(addAccountingSection(params));
  }

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
    const { paymentMethodList } = Object.assign({}, this.state);
    let selectedRow = paymentMethodList.findIndex(selectedRow => selectedRow.id == id);

    paymentMethodList[selectedRow][target] = event.value;
    this.setState({ paymentMethodList });
  }

  handleChangeInputSave = (event, id, target) => {
    const { summary } = this.state;
    const { paymentMethodList } = Object.assign({}, this.state);
    let selectedRow = paymentMethodList.findIndex(selectedRow => selectedRow.id == id);
    paymentMethodList[selectedRow][target] = event.value;

    if (paymentMethodList[selectedRow].paymentType !== '5') {
      paymentMethodList[selectedRow]['transFeePercent'] = '';
      paymentMethodList[selectedRow]['transFeeAccount'] = '';
    } else {
      paymentMethodList[selectedRow][target] = event.value;
    }

    let model = paymentMethodList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addAccountingSection(params));
  }

  handleOnBlur = () => {
    this.handleSave();
  }

  handleAddItem = (paymentMethodData) => {
    const { summary } = this.state;
    this.setState({ onSave: true, paymentMethodData });
    this.props.dispatch(addAccountingSection(getParams(paymentMethodData, summary)));
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
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: "",
      paymentMethodData: {
      }
    })
  }

  handleOnClick = (event) => {
    this.handleSave()
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: "" });
  };

  render() {
    const { paymentTypeOptions, isSaveAndContinue, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, paymentMethodList, paymentMethodData, summary } = this.state;
    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, "PurchaseOrder")} />;
    }

    return(
      <Fragment>
        <BlockText
          title={paymentMethodTranslate.pageTitle}
          paragraph={paymentMethodTranslate.pageInstruction}
        />
        <Grid htmlId="PaymentMethod">
          <PaymentMethodForm
            summary={summary}
            paymentTypeOptions={paymentTypeOptions}
            paymentMethodList={paymentMethodList}
            paymentMethod={paymentMethodData}
            onChangeInput={this.handleChangeInput}
            onChangeInputSave={this.handleChangeInputSave}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onClick={this.handleOnClick}
            onHideAddModal={this.handleLoaderModalHide}
            isAddStatus={loaderStatus}
            onClearLoaderProps={this.handleClearLoaderProps}
            onShowErrorModal={this.handleShowErrorModal}
            props={this.props}
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

PaymentMethod.propTypes = {
  paymentMethodList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PaymentMethod;
