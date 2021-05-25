import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import deductionCodeTranslate from '../../../../translation/payroll/deductionCode.json';
import commonTranslate from '../../../../translation/common.json';
import DeductionCodeForm from '../../../widgets/Payroll/DeductionCode';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
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
import { deductionCodeTableColumn } from './DeductionCodeTableColumn';

class DeductionCodePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deductionCode: {},
      deductionCodeList: [],
      deductionCodeRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      onSaveAndContinue: false,
      isCheckSaveAndRetain: false,
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
      this.setState({ loaderStatus: "" });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let deductionCodeList = state.deductionCodeList;
    let summary = state.summary;
    let isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let deductionCode = state.deductionCode;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.deductionCode.isOk === false ) {
          return {
            loaderStatus: "error",
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            deductionCode: nextProps.deductionCode.data.model[0]
          }
        } else {
          if (isCheckSaveAndRetain) {
            deductionCode = nextProps.deductionCode.data.model[0];
            deductionCode.id = null;
            deductionCode.dedpayCode = '';
            deductionCode.dedControlNumber = '';
            deductionCode.w2Code = '';
            deductionCode.w2Box = '';
            deductionCode.description = '';
            deductionCode.accountNumber = '';
          } else {
            deductionCode = {};
          }

          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successMessage,
            deductionCode,
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
        if (nextProps.deductionCode.isOk === true ) {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successDeleteMessage
          }
        }
        else {
          return {
            loaderStatus: "error",
            loaderMessage: commonTranslate.failedDeleteMessage,
            deductionCode: nextProps.deductionCode.data.model[0]
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
        if (nextProps.deductionCode.isOk === true ) {
          // deductionCode = nextProps.deductionCode.data.model[0];
          deductionCode.accountNumber = "BLANK";
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            deductionCode: deductionCode
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            deductionCode: nextProps.deductionCode.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.deductionCodeList.data.model !== state.deductionCodeList) {
        deductionCodeList = nextProps.deductionCodeList.data.model;
        summary = nextProps.deductionCodeList.data.summary;

        if (deductionCodeList.length !== undefined || Object.keys(deductionCodeList).length > 0) {
          return {deductionCodeList, summary};
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
  handleEdit = (deductionCode) => {
    scrollToTop();
    this.setState({ deductionCode, isEdit: true });
  }

  /**
   * method that handle add/save bank
   */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isCheckSaveAndRetain: response,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (customerRowDelete) => {
    this.setState({ customerRowDelete, isShowDeleteModal: true, isEdit: false, deductionCode: { accountNumber: "BLANK" } });
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
      loaderStatus: "",
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
      onSaveAndContinue: true
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

  renderDeductionCodeList = () => {
    const { deductionCodeList, summary } = this.state;
    const tableColumns = deductionCodeTableColumn(this.handleShowErrorModal, this.handleEdit);
    let disabledClearData = true;

    if (deductionCodeList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={deductionCodeList} tableTitle="Deduction Code List" columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={"GeneralSetup"} />
      </Fragment>
    )
  }

  render() {
    const { deductionCode, isShowLoaderModal, onSaveAndContinue, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, isCheckSaveAndRetain } = this.state;

    if (onSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, "OtherPayCodes")} />;
    }

    return(
      <Fragment>
        <BlockText
          title={deductionCodeTranslate.pageTitle}
          paragraph={deductionCodeTranslate.pageInstruction}
        />

        <Grid htmlId="deductionCode">
          <DeductionCodeForm
            deductionCode={deductionCode}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            checkSaveAndRetain={isCheckSaveAndRetain}
            summary={summary}
          />
          {this.renderDeductionCodeList()}
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

DeductionCodePage.propTypes = {
  dispatch: PropTypes.func,
};

export default DeductionCodePage;
