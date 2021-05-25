import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import taxTranslate from '../../../../translation/payroll/taxWithholding.json';
import TaxWithholdingForm from '../../../widgets/Payroll/TaxWithholding';
import commonTranslate from '../../../../translation/common.json';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import { taxwithholdingTableColumn } from './TaxWithholdingTableColumn';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import { Redirect } from 'react-router-dom';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class TaxWithholdingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taxwithholdingList: [],
      taxwithholdingRowDelete: {},
      taxwithholding: {},
      taxingUnitTypeOptions:[],
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      summary: {}
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
    let taxwithholdingList = state.taxwithholdingList;
    let summary = state.summary;
    let taxingUnitTypeOptions = state.taxingUnitTypeOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.taxwithholding.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: taxTranslate.saveError,
            taxwithholding: nextProps.taxwithholding.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: taxTranslate.saveSuccess,
            taxwithholding: {}
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
        if (nextProps.taxwithholding.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: taxTranslate.deleteSuccess,
            taxwithholding: {}
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: taxTranslate.deleteError,
            taxwithholding: nextProps.taxwithholding.data.model[0]
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
        if (nextProps.taxwithholding.isOk === true ) {
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
      if (nextProps.taxwithholdingList.data.model !== state.taxwithholdingList) {
        taxwithholdingList = nextProps.taxwithholdingList.data.model;
        summary = nextProps.taxwithholdingList.data.summary;
        taxingUnitTypeOptions = nextProps.taxwithholdingList.data.taxingUnitTypeOptions;

        if (taxwithholdingList.length !== undefined || Object.keys(taxwithholdingList).length > 0) {
          return {taxwithholdingList, summary, taxingUnitTypeOptions};
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
  handleEdit = (taxwithholding) => {
    scrollToTop();
    this.setState({ taxwithholding, isEdit: true });
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
      loaderMessage: taxTranslate.savingAlert,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (taxwithholdingRowDelete) => {
    this.setState({ taxwithholdingRowDelete, isShowDeleteModal: true, isEdit: false, taxwithholding: {} });
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
    const { summary, taxwithholdingRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(taxwithholdingRowDelete, summary)));
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

  renderTaxwithholdingList = () => {
    const {taxwithholdingList, summary} = this.state
    const tableColumns = taxwithholdingTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (taxwithholdingList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={taxwithholdingList} tableTitle={taxTranslate.taxwithholdingTypesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'DepartmentCodes'} />
      </Fragment>
    )
  }

  render() {
    const { taxwithholding, taxingUnitTypeOptions, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, isSaveAndContinue } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'StateWithholdingTax')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={taxTranslate.pageTitle}
          paragraph={taxTranslate.pageInstruction}
        />

        <Grid htmlId="serviceTypes">
        <TaxWithholdingForm
          props={this.props}
          taxwithholding={taxwithholding}
          taxingUnitTypeOptions = {taxingUnitTypeOptions}
          isEdit={isEdit}
          onSave={this.handleSave}
          onSaveContinue={this.handleSaveContinue}
          summary={summary}
          loaderStatus={loaderStatus}
        />
        {this.renderTaxwithholdingList()}
        </Grid>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    )
  }
}

TaxWithholdingPage.propTypes = {
  taxwithholding: PropTypes.any.isRequired,
  taxwithholdingList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default TaxWithholdingPage;
