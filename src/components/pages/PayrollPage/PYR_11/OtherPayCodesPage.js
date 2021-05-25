import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import otherPayCodeTranslate from '../../../../translation/payroll/otherPayCode.json';
import commonTranslate from '../../../../translation/common.json';
import OtherPayCodeForm from '../../../widgets/Payroll/OtherPayCode';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
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
import { otherPayCodeTableColumn } from './OtherPayCodeTableColumn';

class OtherPayCodesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deductionCodeOptions: [],
      otherPayCodeList: [],
      otherPayCodeRowDelete: {},
      otherPayCode: {},
      loaderStatus: "",
      loaderMessage: "",
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      isCheckSaveAndRetain: false,
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
    let otherPayCodeList = state.otherPayCodeList;
    let deductionCodeOptions = state.deductionCodeOptions;
    let summary = state.summary;
    let otherPayCode = state.otherPayCode;
    let isCheckSaveAndRetain = state.isCheckSaveAndRetain;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.otherPayCode.isOk === false ) {
          return {
            loaderStatus: "error",
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            otherPayCode: nextProps.otherPayCode.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            otherPayCode = nextProps.otherPayCode.data.model[0];
            otherPayCode.id = null;
            otherPayCode.dedpayCode = '';
            otherPayCode.deductionCodeLink = '';
            otherPayCode.description = '';
          } else {
            otherPayCode = {}
            otherPayCode.accountNumber = "BLANK";
          }

          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successMessage,
            otherPayCode,
            onMarkAsComplete: false
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
        if (nextProps.otherPayCode.isOk === true ) {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successDeleteMessage,
            otherPayCode: {
              accountNumber: "BLANK"
            }
          }
        }
        else {
          return {
            loaderStatus: "error",
            loaderMessage: commonTranslate.failedDeleteMessage,
            otherPayCode: nextProps.otherPayCode.data.model[0]
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
        if (nextProps.otherPayCode.isOk === true ) {
          // otherPayCode = nextProps.otherPayCode.data.model[0];
          otherPayCode.accountNumber = "BLANK";
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            otherPayCode
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
      if (nextProps.otherPayCodeList.data.model !== state.otherPayCodeList) {
        otherPayCodeList = nextProps.otherPayCodeList.data.model;
        summary = nextProps.otherPayCodeList.data.summary;
        deductionCodeOptions = nextProps.otherPayCodeList.data.deductionCodeOptions;

        if (otherPayCodeList.length !== undefined || Object.keys(otherPayCodeList).length > 0) {
          return {otherPayCodeList, summary, deductionCodeOptions};
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
  handleEdit = (otherPayCode) => {
    scrollToTop();
    this.setState({ otherPayCode, isEdit: true });
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (otherPayCodeRowDelete) => {
    this.setState({ otherPayCodeRowDelete, isShowDeleteModal: true, isEdit: false, otherPayCode: { accountNumber: "BLANK" } });
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
    const { summary, otherPayCodeRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(otherPayCodeRowDelete, summary)));
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
    this.setState({ loaderMessage: '', loaderStatus: ''});

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    }
    else {
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
   * method that handle add/save bank
   */
  handleOnSave = (model, response) => {
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

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderOtherPayCodeList() {
    const { otherPayCodeList, summary } = this.state;
    const tableColumns = otherPayCodeTableColumn(this.handleShowErrorModal, this.handleEdit);
    let disabledClearData = true;

    if (otherPayCodeList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={otherPayCodeList} tableTitle="Other Pay Code List" columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={"DeductionCode"} />
      </Fragment>
    )
  }

  render() {
    const { otherPayCode, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, isSaveAndContinue, deductionCodeOptions,
      isCheckSaveAndRetain
    } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, "RetirementSetup")} />;
    }

    return(
      <Fragment>
        <BlockText
          title={otherPayCodeTranslate.pageTitle}
          paragraph={otherPayCodeTranslate.pageInstruction1+otherPayCodeTranslate.pageInstruction2+otherPayCodeTranslate.pageInstruction3+otherPayCodeTranslate.pageInstruction4}
        />

        <Grid htmlId="otherPayCodes">
          <OtherPayCodeForm
            otherPayCode={otherPayCode}
            deductionCodeOptions={deductionCodeOptions}
            checkSaveAndRetain={isCheckSaveAndRetain}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleOnSave}
            summary={summary}
          />
          {this.renderOtherPayCodeList()}
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

OtherPayCodesPage.propTypes = {
  dispatch: PropTypes.func,
};

export default OtherPayCodesPage;
