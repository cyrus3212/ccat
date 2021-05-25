import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import stateWithholdingTaxTranslate from '../../../../translation/payroll/stateWithholdingTax.json';
import StateWithholdingTaxForm from '../../../widgets/Payroll/StateWithholdingTax';
import commonTranslate from '../../../../translation/common.json';
import { stateWithholdingTaxTableColumn } from './StateWithholdingTaxTableColumn';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import Footer from '../../../common/Footer';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class StateWithholdingTaxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateWithholdingTaxList: [],
      stateWithholdingTax: {},
      isShowLoaderModal: false,
      taxWitholdingOptions:[],
      taxingUnitTypeOptions: [],
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      isEdit: false,
      stateWithholdingTaxRowDelete: {},
      summary: {},
      deductionOptions: []
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPayrollList(getWorkbookUrl(this.props.match)));
  }

  static getDerivedStateFromProps(nextProps, state) {
    let stateWithholdingTaxList = state.stateWithholdingTaxList;
    let deductionOptions = state.deductionOptions;
    let summary = state.summary;
    let taxWitholdingOptions = state.taxWitholdingOptions;
    let taxingUnitTypeOptions = state.taxingUnitTypeOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.stateWithholdingTax.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: stateWithholdingTaxTranslate.saveError,
            stateWithholdingTax: nextProps.stateWithholdingTax.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: stateWithholdingTaxTranslate.saveSuccess,
            stateWithholdingTax: {}
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
        if (nextProps.stateWithholdingTax.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: stateWithholdingTaxTranslate.deleteSuccess,
            stateWithholdingTax: {}
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: stateWithholdingTaxTranslate.deleteError,
            stateWithholdingTax: nextProps.stateWithholdingTax.data.model[0]
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
        if (nextProps.stateWithholdingTax.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            stateWithholdingTax: {}
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            stateWithholdingTax: nextProps.stateWithholdingTax.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.stateWithholdingTaxList.data.model !== state.stateWithholdingTaxList) {
        stateWithholdingTaxList = nextProps.stateWithholdingTaxList.data.model;
        summary = nextProps.stateWithholdingTaxList.data.summary;
        taxWitholdingOptions = nextProps.stateWithholdingTaxList.data.taxWitholdingOptions;
        taxingUnitTypeOptions = nextProps.stateWithholdingTaxList.data.taxingUnitTypeOptions;
        deductionOptions = nextProps.stateWithholdingTaxList.data.deductionOptions;

        if (stateWithholdingTaxList.length !== undefined || Object.keys(stateWithholdingTaxList).length > 0) {
          return {stateWithholdingTaxList, summary, taxWitholdingOptions, taxingUnitTypeOptions, deductionOptions };
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
  handleEdit = (stateWithholdingTax) => {
    scrollToTop();
    this.setState({ stateWithholdingTax, isEdit: true });
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
      loaderMessage: stateWithholdingTaxTranslate.savingAlert,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (stateWithholdingTaxRowDelete) => {
    this.setState({ stateWithholdingTaxRowDelete, isShowDeleteModal: true, isEdit: false, stateWithholdingTax: {} });
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
    const { summary, stateWithholdingTaxRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(stateWithholdingTaxRowDelete, summary)));
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

    this.props.dispatch(addPayrollSection(params));
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
    } else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      })
      this.componentReload();
    }
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderStateWithholdingTaxList() {
    const {stateWithholdingTaxList, summary} = this.state
    const tableColumns = stateWithholdingTaxTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (stateWithholdingTaxList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={stateWithholdingTaxList} tableTitle={stateWithholdingTaxTranslate.taxwithholdingTypesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'TaxWithholding'} />
      </Fragment>
    )
  }

  render() {
    const { stateWithholdingTax, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, taxWitholdingOptions, taxingUnitTypeOptions, isMarkAsComplete, isSaveAndContinue, deductionOptions } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'StateWorkers')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={stateWithholdingTaxTranslate.pageTitle}
          paragraph={stateWithholdingTaxTranslate.pageInstruction}
        />

      <Grid htmlId="stateWithholdingTax">
        <StateWithholdingTaxForm
          props={this.props}
          stateWithholdingTax={stateWithholdingTax}
          taxWitholdingOptions = {taxWitholdingOptions}
          taxingUnitTypeOptions = {taxingUnitTypeOptions}
          isEdit={isEdit}
          onSave={this.handleSave}
          onSaveContinue={this.handleSaveContinue}
          summary={summary}
          loaderStatus={loaderStatus}
          deductionOptions={deductionOptions}
        />
        {this.renderStateWithholdingTaxList()}
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

StateWithholdingTaxPage.propTypes = {
  stateWithholdingTax: PropTypes.any.isRequired,
  stateWithholdingTaxList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default StateWithholdingTaxPage;
