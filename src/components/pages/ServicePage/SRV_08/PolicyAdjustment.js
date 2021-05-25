import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import policyAdjTranslate from '../../../../translation/service/policyAdjustment.json';
import BlockText from '../../../reusable/BlockText';
import PolicyAdjustmentForm from '../../../widgets/Service/PolicyAdjustment';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../../translation/common.json';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class PolicyAdjustment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linePaymentMethodOptions: [],
      partsPricingOptions: [],
      policyAdjustmentList: [],
      policyAdjustment: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
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
    this.props.dispatch(getServiceList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let policyAdjustmentList = state.policyAdjustmentList;
    let summary = state.summary;
    let partsPricingOptions = state.partsPricingOptions;
    let linePaymentMethodOptions = state.linePaymentMethodOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.policyAdjustment.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            policyAdjustment: nextProps.policyAdjustment.data.model[0],
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            policyAdjustment: nextProps.policyAdjustment.data.model[0]
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
        if (nextProps.policyAdjustment.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            policyAdjustment: nextProps.policyAdjustment.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
            policyAdjustment: nextProps.policyAdjustment.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.policyAdjustment.isOk === true ) {
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
      if (nextProps.policyAdjustmentList.data.model !== state.policyAdjustmentList) {
        policyAdjustmentList = nextProps.policyAdjustmentList.data.model;
        summary = nextProps.policyAdjustmentList.data.summary;
        partsPricingOptions = nextProps.policyAdjustmentList.data.partsPricingOptions;
        linePaymentMethodOptions = nextProps.policyAdjustmentList.data.linePaymentMethodOptions;

        if (policyAdjustmentList.length !== undefined || Object.keys(policyAdjustmentList).length > 0) {
          return {policyAdjustmentList, summary, partsPricingOptions, linePaymentMethodOptions};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, policyAdjustment, policyAdjustmentList } = this.state;

    /**
    * Update List with single updated Row
    */
   if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(policyAdjustment, policyAdjustmentList);

      this.setState({ policyAdjustmentList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ policyAdjustment: {}, loaderStatus: '' })
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
    const { summary, policyAdjustmentList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : policyAdjustmentList,
      summary
    }

    this.props.dispatch(addServiceSection(params));
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
    const { policyAdjustmentList } = Object.assign({}, this.state);
    let selectedRow = policyAdjustmentList.findIndex(selectedRow => selectedRow.id == id);

    policyAdjustmentList[selectedRow][target] = event.value;
    this.setState({ policyAdjustmentList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { policyAdjustmentList } = Object.assign({}, this.state);
    let selectedRow = policyAdjustmentList.findIndex(selectedRow => selectedRow.id == id);

    policyAdjustmentList[selectedRow][target] = event.value;
    this.setState({ policyAdjustmentList });

    let model = policyAdjustmentList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addServiceSection(params));
  }

  handleAddItem = (policyAdjustment) => {
    const { summary } = this.state;
    this.setState({ policyAdjustment, onSave: true });
    this.props.dispatch(addServiceSection(getParams(policyAdjustment, summary)));
  }

  handleShowErrorModal = (policyAdjustmentRowDelete) => {
    this.setState({ policyAdjustmentRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, policyAdjustmentRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(policyAdjustmentRowDelete, summary)));
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

    this.props.dispatch(addServiceSection(params));
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

  clearData = () => {
    this.setState({
      onMarkAsComplete: false
    })
  }


  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      policyAdjustment: {}
    })
  }

  render() {
    const { isSaveAndContinue, isShowLoaderModal, isShowDeleteModal, loaderStatus,
      loaderMessage, policyAdjustmentList, policyAdjustment, summary, isMarkAsComplete ,
      partsPricingOptions, linePaymentMethodOptions
    } = this.state;

    // if (isMarkAsComplete === true) {
    //   window.location.reload(true);
    // }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'InternalPayTypes')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={policyAdjTranslate.pageTitle}
          paragraph={policyAdjTranslate.pageInstruction}
        />
        <Grid htmlId="policyAdjustment">
          <PolicyAdjustmentForm
            summary={summary}
            policyAdjustmentList={policyAdjustmentList}
            policyAdjustment={policyAdjustment}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            isAddStatus={loaderStatus}
            onClearLoaderProps={this.handleClearLoaderProps}
            onShowErrorModal={this.handleShowErrorModal}
            props={this.props}
            onMarkAsComplete={this.handleMarkAsComplete}
            partsPricingOptions={partsPricingOptions}
            linePaymentMethodOptions={linePaymentMethodOptions}
            componentReload={this.componentReload}
            clearData={this.clearData}
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

PolicyAdjustment.propTypes = {
  policyAdjustmentList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PolicyAdjustment;
