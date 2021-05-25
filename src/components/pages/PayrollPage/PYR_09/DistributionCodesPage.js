import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import distCodeTranslate from '../../../../translation/payroll/distributionCode.json';
import DistributionCodesForm from '../../../widgets/Payroll/DistributionCodes';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import scrollToTop from '../../../../helpers/scrollToTop';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { distributionCodeTableColumn } from './DistributionCodeTableColumn'
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';

class DistributionCodesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distributionCodeList: [],
      distributionCode: {},
      onSave: false,
      isShowLoaderModal: false,
      loadingState: true,
      isDataMaximum: false,
      loaderStatus: "",
      loaderMessage: "",
      isEdit: false,
      summary: {},
      limit: 20,
      page: 1,
      sortType: "asc",
      sortBy: 'key',
      searchVal: '',
      scrollDirection: 'bottom',
      totalPages: 0,
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
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let distributionCodeList = state.distributionCodeList;
    let summary = state.summary;
    let isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let distributionCodes = state.distributionCodes;
    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.distributionCode.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            distributionCodes: nextProps.distributionCode.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            distributionCodes = nextProps.distributionCode.data.model[0];
            distributionCodes.id = null;
            distributionCodes.code = '';
            distributionCodes.description = '';
          } else {
            distributionCodes = {};
          }

          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successMessage,
            distributionCodes,
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
        if (nextProps.distributionCode.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            distributionCodes: {}
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
          }
        }
      }
    } catch (e) {

    }

    /**
    * Handle response on mark as complete
    */
    try {
      if (state.onMarkAsComplete === true) {
        if (nextProps.distributionCode.isOk === true ) {
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

    try {
      if (nextProps.distributionCodeList.data.model !== state.distributionCodeList) {
        distributionCodeList = nextProps.distributionCodeList.data.model;
        summary = nextProps.distributionCodeList.data.summary;

        if (distributionCodeList.length !== undefined || Object.keys(distributionCodeList).length > 0) {
          return {distributionCodeList, summary};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit managed account
   */
  handleEdit = (distributionCodes) => {
    scrollToTop();
    this.setState({ distributionCodes, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isCheckSaveAndRetain: response,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
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
   * method that show error modal
   */
  handleShowErrorModal = (distributionCodesRowDelete) => {
    this.setState({ distributionCodesRowDelete, isShowDeleteModal: true, distributionCodes: {} });
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
    const { summary, distributionCodesRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(distributionCodesRowDelete, summary)));
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
  handleOnSaveContinue = () => {
    this.setState({
      onSaveAndContinue: true
    });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderDistributionCode = () => {
    const {distributionCodeList, summary} = this.state
    const tableColumns = distributionCodeTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (distributionCodeList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={distributionCodeList} tableTitle={'Distribution Code List'} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={"RetirementSetup"} />
      </Fragment>
    )
  }


  render() {
    const { isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, distributionCodeList, distributionCodes, summary, onSaveAndContinue, isEdit,
      isCheckSaveAndRetain } = this.state;

    if (onSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, "PayCodeOverride")} />;
    }

    return(
      <Fragment>
        <BlockText
          title={distCodeTranslate.pageTitle}
          paragraph={distCodeTranslate.pageInstruction1+distCodeTranslate.pageInstruction2+distCodeTranslate.pageInstruction3}
        />
        <Grid htmlId="distributionCodes">
          <DistributionCodesForm
            props={this.props}
            distributionCodes={distributionCodes}
            isEdit={isEdit}
            onSave={this.handleSave}
            checkSaveAndRetain={isCheckSaveAndRetain}
            summary={summary}
          />
          {this.renderDistributionCode()}

          <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
            <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
          </Modal>

          <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
            <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
          </Modal>
        </Grid>
      </Fragment>
    )
  }
}

DistributionCodesPage.propTypes = {
  dispatch: PropTypes.func,
};

export default DistributionCodesPage;
