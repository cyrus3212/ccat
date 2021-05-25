
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_03.scss';
import commonTranslate from '../../../../translation/common.json'
import insuranceTranslate from '../../../../translation/salesfi/insuranceSources.json'
import InsuranceSourcesForm from '../../../widgets/SalesFI/InsuranceSources';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { insuranceSourcesTableColumn } from './InsuranceSourcesTableColumn'
import Footer from '../../../common/Footer';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection, removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class InsuranceSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesGroupItems: [],
      insuranceList: [],
      summary: {},
      itemDelete: {},
      insurance: {},
      isMarkAsComplete: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      onSave: false,
      isEdit: false,
      onDelete: false,
      isShowDeleteModal: false,
      isSaveAndContinue: false,
      isCheckSaveAndRetain: false,
      isError: false
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getSalesFIList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: "" });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let insuranceList = state.insuranceList;
    let summary = state.summary;
    let salesGroupItems = state.salesGroupItems;
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let insuranceData = state.insurance;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.insurance.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            isError: true,
            insurance: nextProps.insurance.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            insuranceData = nextProps.insurance.data.model[0];
            insuranceData.id = "";
          } else {
            insuranceData = {}
          }

          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            isError: false,
            insurance: insuranceData
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
        if (nextProps.insurance.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            insurance: {}
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
        if (nextProps.insurance.isOk === true ) {
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
      if (nextProps.insuranceList.data.model !== state.insuranceList) {
        insuranceList = nextProps.insuranceList.data.model;
        summary = nextProps.insuranceList.data.summary;
        salesGroupItems = nextProps.insuranceList.data.salesGroupItems;

        if (insuranceList.length !== undefined || Object.keys(insuranceList).length > 0) {
          return {insuranceList, summary, salesGroupItems};
        }

      }
    } catch (e) {

    }

    return {...nextProps, ...state};
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
        // isMarkAsComplete: true
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
  handleShowErrorModal = (itemDelete) => {
    this.setState({ itemDelete, isShowDeleteModal: true, insurance: {} });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, isCheckSaveAndRetain: false, isError: false });
  };

  /**
   * method that handle edit row
   */
  handleOnEdit = (insurance) => {
    scrollToTop();
    this.setState({ insurance: insurance, isEdit: true, isCheckSaveAndRetain: false, isError: false });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, itemDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deleteMessage,
    });

    this.props.dispatch(removSalesFI(getParams(itemDelete, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { insuranceList, summary } = this.state;
    summary.isCompleted = status;
    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      summary
    }

    this.props.dispatch(addSalesFISection(params));
  }

  /**
   * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  /**
   * method that handle saving record
   */
  handleOnSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      isCheckSaveAndRetain: response,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderInsuranceSourcesList = () => {
    const { insuranceList, summary } = this.state
    const tableColumns = insuranceSourcesTableColumn(this.handleOnEdit, this.handleDisabledDeleteButton, this.handleShowErrorModal)
    let disabledClearData = true;

    try {
      if (insuranceList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={insuranceList} tableTitle={insuranceTranslate.iSourcesRecordItems} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'SalesGroups'} />
      </Fragment>
    )
  }

  /**
   * Method that handle save and continue to next section
   */
  handleOnSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  render() {
    const {salesGroupItems, isSaveAndContinue, isError, isShowLoaderModal, loaderMessage, loaderStatus, isShowDeleteModal, isMarkAsComplete, insurance, isCheckSaveAndRetain} = this.state;

    // if (isMarkAsComplete === true) {
    //   window.location.reload(true);
    // }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'GapSources')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={insuranceTranslate.pageTitle}
          paragraph={insuranceTranslate.pageInstruction}
        />
        <Grid htmlId="insuranceSources">
          <InsuranceSourcesForm props={this.props} insurance={insurance} checkSaveAndRetain={isCheckSaveAndRetain}
            onSave={this.handleOnSave} salesGroupItems={salesGroupItems} isError={isError}
          />
          {this.renderInsuranceSourcesList()}
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

InsuranceSources.propTypes = {
  insurance: PropTypes.any.isRequired,
  insuranceList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default InsuranceSources;
