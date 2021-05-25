import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import serviceWritersTranslate from '../../../../translation/service/serviceWriters.json';
import BlockText from '../../../reusable/BlockText';
import ServiceWritersForm from '../../../widgets/Service/ServiceWriters';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import Footer from '../../../common/Footer';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import commonTranslate from '../../../../translation/common.json';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getUrlWithParams } from '../../../../helpers/urlParam';

class ServiceWriters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceWritersList: [],
      serviceWritersListCopy: [],
      serviceWriters: {},
      serviceWritersRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      summary: {},
      isMarkAsComplete: false,
      isSaveAndContinue: false,
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
    const url = getUrlWithParams(this.props.match, this.state)
    this.props.dispatch(getServiceList(url));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    console.log('nextPropssssssss', nextProps);
    let serviceWritersList = state.serviceWritersList;
    let serviceWritersListCopy = state.serviceWritersListCopy;
    let totalPages = state.totalPages;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.serviceWriters.isOk === false ) {
          return {
            loaderStatus: state.onSave ? "" : "error",
            onSave: false,
            onEdit: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            serviceWriters: nextProps.serviceWriters.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            serviceWriters: nextProps.serviceWriters.data.model[0]
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
        if (nextProps.serviceWriters.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
          }
        }
        else {
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
        if (nextProps.serviceWriters.isOk === true ) {
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
      if (nextProps.serviceWritersList.data.model !== state.serviceWritersList) {
        serviceWritersList = nextProps.serviceWritersList.data.model;
        serviceWritersListCopy = nextProps.serviceWritersList.data.model;
        totalPages = nextProps.serviceWritersList.data.totalPages;
        summary = nextProps.serviceWritersList.data.summary;

        if (serviceWritersList.length !== undefined || Object.keys(serviceWritersList).length > 0) {
          return {serviceWritersList, summary, serviceWritersListCopy, totalPages};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, serviceWriters, serviceWritersList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== "" || prevState.onEdit === true && loaderStatus !== "") {
      let updatedList = updateTableList(serviceWriters, serviceWritersList);
      this.setState({ serviceWritersList: updatedList, onEdit: false, onSave: false });
      setTimeout(() => {
        this.setState({ serviceWriters: {}, loaderStatus: '' })
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
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, serviceWritersList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : serviceWritersList,
      summary
    }

    this.props.dispatch(addServiceSection(params));
  }

  handleSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  handleChangeInput = (event, id, target) => {
    const { serviceWritersList } = Object.assign({}, this.state);
    let selectedRow = serviceWritersList.findIndex(selectedRow => selectedRow.id == id);

    serviceWritersList[selectedRow][target] = event.value;
    this.setState({ serviceWritersList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { serviceWritersList } = Object.assign({}, this.state);
    let selectedRow = serviceWritersList.findIndex(selectedRow => selectedRow.id == id);

    let model = serviceWritersList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addServiceSection(params));
  }

  handleAddItem = (serviceWriters) => {
    const { summary } = this.state;
    this.setState({ serviceWriters, onSave: true });
    this.props.dispatch(addServiceSection(getParams(serviceWriters, summary)));
  }

  handleShowErrorModal = (serviceWritersRowDelete) => {
    this.setState({ serviceWritersRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceWritersRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(serviceWritersRowDelete, summary)));
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

    this.props.dispatch(addServiceSection(params));
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
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      serviceWriters: {}
    })
  }

  updateData = (data, dataCopy) => {
    this.setState({
      serviceWritersList: data,
      serviceWritersListCopy: dataCopy
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

  handleOnClearDataComplete = () => {
    this.componentReload();
    this.setState({
      onMarkAsComplete: false
    })
  }

  render() {
    const { serviceWritersListCopy, isSaveAndContinue, isShowLoaderModal, isShowDeleteModal,
      loaderStatus, loaderMessage, serviceWritersList, serviceWriters, summary, isMarkAsComplete,
      totalPages, searchVal } = this.state;

    // if (isMarkAsComplete === true) {
    //   window.location.reload(true);
    // }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Technicians')} />;
    };

    let disabledClearData = true;

    if (serviceWritersList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <BlockText
          title={serviceWritersTranslate.pageTitle}
          paragraph=""
        />
        <Grid htmlId="serviceWriters">
          <ServiceWritersForm
            serviceWritersList={serviceWritersList}
            serviceWritersListCopy={serviceWritersListCopy}
            summary={summary}
            serviceWriters={serviceWriters}
            isAddStatus={loaderStatus}
            totalPages={totalPages}
            onClearLoaderProps={this.handleClearLoaderProps}
            onMarkAsComplete={this.handleMarkAsComplete}
            onShowErrorModal={this.handleShowErrorModal}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            searchVal={searchVal}
            props={this.props}
            match={this.props.match}
            updateData={this.updateData}
            onSearch={this.handleSearch}
            onClear={this.handleClearlist}
            componentReload={this.componentReload}
          />
        </Grid>

        <Footer match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'ServicePricing'} summary={summary}
        />

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

ServiceWriters.propTypes = {
  serviceWritersList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServiceWriters;
