import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ipTypesTranslate from '../../../../translation/service/internalPayTypes.json';
import BlockText from '../../../reusable/BlockText';
import InternalPayTypesForm from '../../../widgets/Service/InternalPayTypes';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class InternalPayTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      internalPayTypesList: [],
      internalPayTypes: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      summary: {},
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
    let internalPayTypesList = state.internalPayTypesList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.internalPayTypes.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            internalPayTypes: nextProps.internalPayTypes.data.model[0],
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            internalPayTypes: nextProps.internalPayTypes.data.model[0]
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
        if (nextProps.internalPayTypes.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
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
        if (nextProps.internalPayTypes.isOk === true ) {
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
    }
    catch (e) {

    }

    try {
      if (nextProps.internalPayTypesList.data.model !== state.internalPayTypesList) {
        internalPayTypesList = nextProps.internalPayTypesList.data.model;
        summary = nextProps.internalPayTypesList.data.summary;

        if (internalPayTypesList.length !== undefined || Object.keys(internalPayTypesList).length > 0) {
          return {internalPayTypesList, summary};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, internalPayTypes, internalPayTypesList } = this.state;

    /**
    * Update List with single updated Row
    */
   if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(internalPayTypes, internalPayTypesList);

      this.setState({ internalPayTypesList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ internalPayTypes: {}, loaderStatus: '' })
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
    const { summary, internalPayTypesList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : internalPayTypesList,
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
    const { internalPayTypesList } = Object.assign({}, this.state);
    let selectedRow = internalPayTypesList.findIndex(selectedRow => selectedRow.id == id);

    internalPayTypesList[selectedRow][target] = event.value;
    this.setState({ internalPayTypesList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { internalPayTypesList } = Object.assign({}, this.state);
    let selectedRow = internalPayTypesList.findIndex(selectedRow => selectedRow.id == id);

    let model = internalPayTypesList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addServiceSection(params));
  }

  handleAddItem = (internalPayTypes) => {
    const { summary } = this.state;
    this.setState({ internalPayTypes, onSave: true });
    this.props.dispatch(addServiceSection(getParams(internalPayTypes, summary)));
  }

  handleShowErrorModal = (internalPayTypesRowDelete) => {
    this.setState({ internalPayTypesRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, internalPayTypesRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(internalPayTypesRowDelete, summary)));
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
      internalPayTypes: {}
    })
  }

  render() {
    const { isSaveAndContinue, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, internalPayTypesList, internalPayTypes, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'review')} />;
    }

    console.log('summary', summary);
    return(
      <Fragment>
        <BlockText
          title={ipTypesTranslate.pageTitle}
          paragraph={ipTypesTranslate.pageInstruction}
        />
        <Grid htmlId="internalPayTypes">
          <InternalPayTypesForm
            summary={summary}
            internalPayTypesList={internalPayTypesList}
            internalPayTypes={internalPayTypes}
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

InternalPayTypes.propTypes = {
  internalPayTypesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default InternalPayTypes;
