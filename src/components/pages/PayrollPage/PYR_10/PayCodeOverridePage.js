import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import payCodeOverrideTranslate from '../../../../translation/payroll/payCodeOverride.json';
import PayCodeOverrideForm from '../../../widgets/Payroll/PayCodeOverride';
import commonTranslate from '../../../../translation/common.json';
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
import { payCodeOverrideTableColumn } from './PayCodeOverrideTableColumn';
import { getUserStoreList } from '../../../../api/userStoreApi';

class PayCodeOverridePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payCodeOverrideList: [],
      payCodeOverride: {},
      distributionCodeOptions: [],
      isShowLoaderModal: false,
      payCodeOptions: [],
      companyNumberOptions: [],
      loaderStatus: "",
      loaderMessage: "",
      onSave: false,
      isEdit: false,
      payCodeOverrideRowDelete: {},
      isCheckSaveAndRetain: false,
      summary: {},
      defaultCompanyNumber: ""
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPayrollList(getWorkbookUrl(this.props.match)));
    if (this.props.match.code !== undefined || this.props.match.code !== "") {
      this.props.dispatch(getUserStoreList(this.props.match.code));
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    let payCodeOverrideList = state.payCodeOverrideList;
    let distributionCodeOptions = state.distributionCodeOptions;
    let summary = state.summary;
    let payCodeOptions = state.payCodeOptions || [];
    let defaultCompanyNumber = state.defaultCompanyNumber;
    let isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let payCodeOverride = state.payCodeOverride;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.payCodeOverride.isOk === false ) {
          return {
            loaderStatus: "error",
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            payCodeOverride: nextProps.payCodeOverride.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            payCodeOverride = nextProps.payCodeOverride.data.model[0];
            payCodeOverride.id = null;
            payCodeOverride.distributionCode = '';
          } else {
            payCodeOverride = {}
          }

          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successMessage,
            payCodeOverride,
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
        if (nextProps.payCodeOverride.isOk === true ) {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successDeleteMessage,
            payCodeOverride: {}
          }
        }
        else {
          return {
            loaderStatus: "error",
            loaderMessage: commonTranslate.failedDeleteMessage,
            payCodeOverride: nextProps.payCodeOverride.data.model[0]
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
        if (nextProps.payCodeOverride.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            payCodeOverride: {}
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            payCodeOverride: nextProps.payCodeOverride.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.payCodeOverrideList.data.model !== state.payCodeOverrideList) {
        payCodeOverrideList = nextProps.payCodeOverrideList.data.model;
        summary = nextProps.payCodeOverrideList.data.summary;
        payCodeOptions = nextProps.payCodeOverrideList.data.payCodeOptions;
        distributionCodeOptions = nextProps.payCodeOverrideList.data.distributionCodeOptions;
      }

      let tmpListCompanyName = [];
      if (nextProps.userStoreList.isOk) {
        let listStores = [];
        listStores = nextProps.userStoreList.data.stores || [];

        // We loop the stores to parse that will fit on the dropdown component format
        for (let i = 0; i < listStores.length; i++) {
          let store = listStores[i];
          store.value = store.companyNumber;
          store.label = store.companyNumber;
          tmpListCompanyName.push(store);

          if (nextProps.match.dtid === store.dtid) {
            defaultCompanyNumber = store.companyNumber;
          }
        }
      }

      return {
        payCodeOverrideList, summary, payCodeOptions, companyNumberOptions: tmpListCompanyName, distributionCodeOptions, defaultCompanyNumber
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit row
   */
  handleEdit = (payCodeOverride) => {
    scrollToTop();
    this.setState({ payCodeOverride, isEdit: true });
  }

  /**
   * method that handle add/save bank
   */
  handleSave = (model, response) => {
    console.log('model, response', model, response);
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
  handleShowErrorModal = (payCodeOverrideRowDelete) => {
    this.setState({ payCodeOverrideRowDelete, isShowDeleteModal: true, isEdit: false, payCodeOverride: {} });
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
    const { summary, payCodeOverrideRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(payCodeOverrideRowDelete, summary)));
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
      });
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

  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: "",
      payCodeOverride: {}
    })
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderPayCodeOverrideList = () => {
    const { payCodeOverrideList, summary } = this.state;
    const tableColumns = payCodeOverrideTableColumn(this.handleShowErrorModal, this.handleEdit);
    let disabledClearData = true;

    try {
      if (payCodeOverrideList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={payCodeOverrideList || []} tableTitle="Pay Code Overrides List" columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={"DistributionCodes"} />
      </Fragment>
    )
  }

  render() {
    const { payCodeOverride, payCodeOptions, distributionCodeOptions, defaultCompanyNumber, companyNumberOptions,
      isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, onSaveAndContinue, isCheckSaveAndRetain
    } = this.state;

    if (onSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, "DepartmentCodes")} />;
    }

    return(
      <Fragment>
        <BlockText
          title={payCodeOverrideTranslate.pageTitle}
          paragraph={payCodeOverrideTranslate.pageInstruction}
        />
        <Grid htmlId="payCodeOverride">
          <PayCodeOverrideForm
            payCodeOverride={payCodeOverride}
            checkSaveAndRetain={isCheckSaveAndRetain}
            payCodeOptions={payCodeOptions}
            distributionCodeOptions={distributionCodeOptions}
            companyNumberOptions={companyNumberOptions}
            defaultCompanyNumber={defaultCompanyNumber}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
          />
          {this.renderPayCodeOverrideList()}
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

PayCodeOverridePage.propTypes = {
  dispatch: PropTypes.func,
};

export default PayCodeOverridePage;
