import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import StateWorkersForm from '../../../widgets/Payroll/StateWorkers';
import stateWorkersTranslate from '../../../../translation/payroll/stateWorkers.json';
import commonTranslate from '../../../../translation/common.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { stateWorkersTableColumn } from './StateWorkersTableColumn';
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import {stateWorkersClassListDefaultValues} from '../../../widgets/Payroll/StateWorkers/StateWorkersClassListDefaultValues'

class StateWorkersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateWorkers: {},
      stateWorkersList: [],
      stateWorkersRowDelete: {},
      taxWitholdingOptions:[],
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isSaveAndContinue: false,
      summary: {},
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPayrollList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let stateWorkersList = state.stateWorkersList;
    let summary = state.summary;
    let taxWitholdingOptions = state.taxWitholdingOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.stateWorkers.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            stateWorkers: nextProps.stateWorkers.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            stateWorkers: {
              items: stateWorkersClassListDefaultValues()
            }
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
        if (nextProps.stateWorkers.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            stateWorkers: {
              items: stateWorkersClassListDefaultValues()
            }
          }
        } else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
            stateWorkers: nextProps.stateWorkers.data.model[0]
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
        if (nextProps.stateWorkers.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            stateWorkers: {
              items: stateWorkersClassListDefaultValues()
            }
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            stateWorkers: nextProps.stateWorkers.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.stateWorkersList.data.model !== state.stateWorkersList) {
        stateWorkersList = nextProps.stateWorkersList.data.model;
        taxWitholdingOptions = nextProps.stateWorkersList.data.taxWitholdingOptions;
        summary = nextProps.stateWorkersList.data.summary;

        if (stateWorkersList.length !== undefined || Object.keys(stateWorkersList).length > 0) {
          return {stateWorkersList, summary, taxWitholdingOptions};
        }
        else {
          return {
            isRedirect: true
          };
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit row
   */
  handleEdit = (stateWorkers) => {
    scrollToTop();
    this.setState({ stateWorkers, isEdit: true });
  }

  /**
   * method that handle add/save bank
   */
  handleSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }


  /**
   * method that show error modal
   */
  handleShowErrorModal = (customerRowDelete) => {
    this.setState({ customerRowDelete, isShowDeleteModal: true, isEdit: false, stateWorkers: {
      items: stateWorkersClassListDefaultValues()
    } });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
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
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(customerRowDelete, summary)));
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
    this.props.dispatch(addPayrollSection(params));
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
    // } else if (onSave === true && loaderStatus === 'success') {
    //   this.setState({
    //     isSaveAndContinue: true
    //   })
    }else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });

      this.componentReload();
    }
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  stateWorkersListRender() {
    const {stateWorkersList, summary} = this.state
    const tableColumns = stateWorkersTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (stateWorkersList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={stateWorkersList} tableTitle={stateWorkersTranslate.stateWorkersCompList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'StateWithholdingTax'} />
      </Fragment>
    )
  }

  render() {
    const { stateWorkers, isShowLoaderModal, isSaveAndContinue, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, taxWitholdingOptions } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'CountyCityTax')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={stateWorkersTranslate.pageTitle}
          paragraph={stateWorkersTranslate.pageInstruction}
        />

      <Grid htmlId="stateWorkers">
        <StateWorkersForm
          props={this.props}
          stateWorkers={stateWorkers}
          isEdit={isEdit}
          onSave={this.handleSave}
          summary={summary}
          taxWitholdingOptions = {taxWitholdingOptions}
          //onSaveContinue={this.handleSaveContinue}
          loaderStatus={loaderStatus}
        />
        {this.stateWorkersListRender()}
        </Grid>

        {/* <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'StateWithholdingTax'} /> */}

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

StateWorkersPage.propTypes = {
  stateWorkers: PropTypes.any.isRequired,
  stateWorkersList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default StateWorkersPage;
