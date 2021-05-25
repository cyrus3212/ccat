
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_srv_03.scss';
import pricingTranslate from '../../../../translation/service/servicePricing.json';
import ServicePricingForm from '../../../widgets/Service/ServicePricing'
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection } from '../../../../api/service/serviceSectionApi';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getUrlWithParams } from '../../../../helpers/urlParam';

class ServicePricings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceLevelOptions: [],
      servicePricingList: [],
      servicePricingListCopy: [],
      servicePricing: {},
      servicePricingRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      limit: 15,
      page: 1,
      sortBy: '',
      sortType: '',
      searchVal: '',
      totalPages: 0
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    const url = getUrlWithParams(this.props.match, this.state);
    this.props.dispatch(getServiceList(url));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let servicePricingList = state.servicePricingList;
    let servicePricingListCopy = state.servicePricingListCopy;
    let totalPages = state.totalPages;
    let summary = state.summary;
    let priceLevelOptions = state.priceLevelOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.servicePricing.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            servicePricing: nextProps.servicePricing.data.model[0]
          }
        } else {
            return {
            loaderStatus: 'success',
            onSave: false,
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            servicePricing: nextProps.servicePricing.data.model[0]
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
        if (nextProps.servicePricing.isOk === true ) {
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

    /**
     * Handle response on mark as complete
     */
    try {
      if (state.onMarkAsComplete === true) {
        if (nextProps.servicePricing.isOk === true ) {
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
      if (nextProps.servicePricingList.data.model !== state.servicePricingList) {
        // temporarily limit table data
        // to be changed when id is available
        servicePricingList = nextProps.servicePricingList.data.model;
        servicePricingListCopy = nextProps.servicePricingList.data.model;
        totalPages = nextProps.servicePricingList.data.totalPages;
        summary = nextProps.servicePricingList.data.summary;
        priceLevelOptions = nextProps.servicePricingList.data.priceLevelOptions;

        if (servicePricingList.length !== undefined || Object.keys(servicePricingList).length > 0) {
          return {servicePricingList, summary, totalPages, priceLevelOptions, servicePricingListCopy};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, servicePricing, servicePricingList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(servicePricing, servicePricingList);

      this.setState({ servicePricingList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ servicePricing: {}, loaderStatus: '' })
      }, 1000)
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === 'success') {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: '' })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === 'error') {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: '' })
    }
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;
    this.setState({ loaderMessage: '', loaderStatus: ''});

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
   * method that handle mark as complete
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
      model: [{}],
      summary
    }

    this.props.dispatch(addServiceSection(params));
  }

  /**
   * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  handleChangeInput = (event, id, target) => {
    const { servicePricingList } = Object.assign({}, this.state);
    let selectedRow = servicePricingList.findIndex(selectedRow => selectedRow.rid == id);

    servicePricingList[selectedRow][target] = event.value;
    this.setState({ servicePricingList });
  }

  handleChangeInputSave = (event, id, target) => {
    const { summary } = this.state;
    const { servicePricingList } = Object.assign({}, this.state);
    let selectedRow = servicePricingList.findIndex(selectedRow => selectedRow.rid == id);
    servicePricingList[selectedRow][target] = event.value;

    let model = servicePricingList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addServiceSection(params));
  }

  updateData = (data, dataCopy) => {
    this.setState({
      servicePricingList: data,
      servicePricingListCopy: dataCopy
    });
  }

  handleClearlist = () => {
    this.setState({ searchVal: '', page: 1}, () => {
      this.componentReload();
    });
  }

  handleSearch = (searchVal) => {
    this.setState({ loadingState: true, page: 1, searchVal }, () => {
      this.componentReload();
    });
  }

  render() {
    const { isSaveAndContinue, servicePricingList, servicePricingListCopy, priceLevelOptions, servicePricing, isShowLoaderModal,
      isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, totalPages, searchVal } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ServiceWriters')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={pricingTranslate.pageTitle}
          paragraph=""
        />

        <Grid htmlId="servicePricing">
          <ServicePricingForm
            props={this.props}
            totalPages={totalPages}
            servicePricing={servicePricing}
            servicePricingList={servicePricingList}
            servicePricingListCopy={servicePricingListCopy}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleOnSave}
            onChangeInput={this.handleChangeInput}
            onMarkAsComplete={this.handleMarkAsComplete}
            onChangeInputSave={this.handleChangeInputSave}
            onSaveAndContinue={this.handleOnSaveContinue}
            summary={summary}
            searchVal={searchVal}
            priceLevelOptions={priceLevelOptions}
            match={this.props.match}
            updateData={this.updateData}
            onSearch={this.handleSearch}
            onClear={this.handleClearlist}
            componentReload={this.componentReload}
          />
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

ServicePricings.propTypes = {
  servicePricing: PropTypes.any.isRequired,
  servicePricingList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServicePricings;
