
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_01.scss';
import PricingStrategiesForm from '../../../widgets/Parts/PricingStrategy'
import pricingTranslate from '../../../../translation/parts/pricingStrategies.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { pricingTableColumn } from './PricingTableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
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
import { postClearData } from '../../../../api/clearDataApi';

class PricingStrategies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pricingList: [],
      pricing: {},
      pricingRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      isClearData: false,
      isShowConfirmationModal: false,
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
    }, 1000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let pricingList = state.pricingList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.pricing.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            pricing: nextProps.pricing.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            pricing: {}
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
        if (nextProps.pricing.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            pricing: {}
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
        if (nextProps.pricing.isOk === true ) {
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
      if (nextProps.pricingList.data.model !== state.pricingList) {
        pricingList = nextProps.pricingList.data.model;
        summary = nextProps.pricingList.data.summary;

        if (pricingList.length !== undefined || Object.keys(pricingList).length > 0) {
          return {pricingList, summary};
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
  handleEdit = (pricing) => {
    scrollToTop();
    this.setState({ pricing, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPartsSection(getParams(model, summary)));
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus, isClearData } = this.state;
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
  handleShowErrorModal = (pricingRowDelete) => {
    this.setState({ pricingRowDelete, isShowDeleteModal: true, pricing: {} });
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
    const { summary, pricingRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(pricingRowDelete, summary)));
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

  /**
   * method that hide confirmation modal
   */
  handleConfirmationModalHide = () => {
    this.setState({ isShowConfirmationModal: false });
  }

  handleClearData = () => {
    this.setState({ isShowConfirmationModal: true });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderPricingList = () => {
    const {pricingList, summary} = this.state
    const tableColumns = pricingTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    try {
      if (pricingList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={pricingList} tableTitle={pricingTranslate.pricingStrategiesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.handleOnClearDataComplete}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'dashboard'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, pricing, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PricingStrategyAssignment')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={pricingTranslate.pageTitle}
          paragraph={pricingTranslate.pageInstruction}
        />
        <Grid htmlId="pricingStrategies">
          <PricingStrategiesForm
            props={this.props}
            pricing={pricing}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
          />
          {this.renderPricingList()}
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

PricingStrategies.propTypes = {
  pricing: PropTypes.any.isRequired,
  pricingList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PricingStrategies;
