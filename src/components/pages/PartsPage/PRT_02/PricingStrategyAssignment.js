
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_02.scss';
import pricingTranslate from '../../../../translation/parts/pricingStrategyAssignment.json';
import PricingStrategyAssignmtForm from '../../../widgets/Parts/PricingStrategyAssignments';
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { addPartsSection, removeParts } from '../../../../api/parts/partsSectionApi';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class PricingStrategyAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pricingAssignmentList: [],
      pricingAssignment: {},
      pricingAssignmentRowDelete: {},
      descriptionOptions: [],
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {}
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPartsList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let pricingAssignmentList = state.pricingAssignmentList;
    let summary = state.summary;
    let descriptionOptions = state.descriptionOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.pricingAssignment.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            pricingAssignment: nextProps.pricingAssignment.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            pricingAssignment: nextProps.pricingAssignment.data.model[0]
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
        if (nextProps.pricingAssignment.isOk === true ) {
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
    } catch (e) {

    }

    /**
     * Handle response on Delete data
     */
    try {
      if (state.onDelete === true) {
        if (nextProps.pricingAssignment.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
          }
        } else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.pricingAssignmentList.data.model !== state.pricingAssignmentList) {
        pricingAssignmentList = nextProps.pricingAssignmentList.data.model;
        summary = nextProps.pricingAssignmentList.data.summary;
        descriptionOptions = nextProps.pricingAssignmentList.data.descriptionOptions;

        if (pricingAssignmentList.length !== undefined || Object.keys(pricingAssignmentList).length > 0) {
          return {pricingAssignmentList, summary, descriptionOptions};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaderStatus } = this.state;
    if (prevState.onSave === true && loaderStatus === 'success') {
      this.setState({ onSave: false })
      this.componentReload();
    }

    /**
      * Show Alert Message on success save
      */
    if (prevState.onEdit === true && loaderStatus === 'success') {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: '', onSave: false, onEdit: false })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === 'error') {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: '', onEdit: false })
    }
  }

  handleChangeInput = (event, id, target) => {
    const { pricingAssignmentList } = Object.assign({}, this.state);
    let selectedRow = pricingAssignmentList.findIndex(selectedRow => selectedRow.id == id);

    pricingAssignmentList[selectedRow][target] = event.value;
    this.setState({ pricingAssignmentList });
  }

  handleChangeSave = (event, id, target) => {
    const { pricingAssignmentList } = Object.assign({}, this.state);
    let selectedRow = pricingAssignmentList.findIndex(selectedRow => selectedRow.id == id);

    pricingAssignmentList[selectedRow][target] = event.value;
    this.setState({ pricingAssignmentList });
    this.handleSave();
  }

  /**
  * method that handle save/update data
  */
  handleSave = () => {
    const { summary, pricingAssignmentList } = this.state;
    this.setState({ onSave: true, onEdit: true });

    let params = {
      model : pricingAssignmentList,
      summary
    }

    this.props.dispatch(addPartsSection(params));
  }

  handleAddItem = (account) => {
    const { summary } = this.state;
    this.setState({ onSave: true });

    this.props.dispatch(addPartsSection(getParams(account, summary)));
  }

  handleOnBlur = () => {
    this.handleSave()
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
   * method that show error modal
   */
  handleShowErrorModal = (pricingAssignmentRowDelete) => {
    this.setState({ pricingAssignmentRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '', isEdit: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, pricingAssignmentRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(pricingAssignmentRowDelete, summary)));
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      pricingAssignment: {}
    })
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

    this.props.dispatch(addPartsSection(params));
  }

  /**
  * Method that handle save and continue to next section
  */
  handleOnSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  /**
    * Method that handle select onclick save
    */
  handleOnClick = (event) => {
    this.handleSave()
  }

  render() {
    const { isSaveAndContinue, pricingAssignmentList, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, descriptionOptions } = this.state;
    let disabledClearData = true;

    if (pricingAssignmentList.length > 0) {
      disabledClearData = false;
    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Manufacturers')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={pricingTranslate.pageTitle}
          paragraph={pricingTranslate.pageInstruction}
        />
        <Grid htmlId="pricingStrategyAssignment">
          <PricingStrategyAssignmtForm
            pricingAssignmentList={pricingAssignmentList}
            descriptionOptions={descriptionOptions}
            props={this.props}
            isEdit={isEdit}
            // onSave={this.handleSave}
            summary={summary}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onChangeSave={this.handleChangeSave}
            onAddItem={this.handleAddItem}
            onHideAddModal={this.handleLoaderModalHide}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
            onClick={this.handleOnClick}
          />
          <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.handleOnClearDataComplete}
            onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'PricingStrategies'} />
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

PricingStrategyAssignment.propTypes = {
  pricingAssignment: PropTypes.any.isRequired,
  pricingAssignmentList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PricingStrategyAssignment;
