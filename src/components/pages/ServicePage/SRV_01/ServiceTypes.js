
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './_srv_01.scss';
import sTypesTranslate from '../../../../translation/service/serviceTypes.json';
import ServiceTypesForm from '../../../widgets/Service/ServiceTypes'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { serviceTableColumn } from './ServiceTableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class ServiceTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceTypesList: [],
      serviceType: {},
      serviceTypeRowDelete: {},
      onSave: false,
      onMarkAsComplete: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getServiceList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let serviceTypesList = state.serviceTypesList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.serviceType.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            serviceType: nextProps.serviceType.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            serviceType: {}
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
        if (nextProps.serviceType.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            serviceType: {}
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
        if (nextProps.serviceType.isOk === true ) {
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
      if (nextProps.serviceTypesList.data.model !== state.serviceTypesList) {
        serviceTypesList = nextProps.serviceTypesList.data.model;
        summary = nextProps.serviceTypesList.data.summary;

        if (serviceTypesList.length !== undefined || Object.keys(serviceTypesList).length > 0) {
          return {serviceTypesList, summary};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
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
   * method that show error modal
   */
  handleShowErrorModal = (serviceTypeRowDelete) => {
    this.setState({ serviceTypeRowDelete, isShowDeleteModal: true, serviceType: {} });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  /**
   * method that handle edit row
   */
  handleOnEdit = (serviceType) => {
    scrollToTop();
    this.setState({ serviceType, isEdit: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceTypeRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(serviceTypeRowDelete, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { serviceTypesList, summary } = this.state;
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
   * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  /**
   * method that handle saving record
   */
  handleOnSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addServiceSection(getParams(model, summary)));
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderServiceList = () => {
    const {serviceTypesList, summary} = this.state
    const tableColumns = serviceTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleOnEdit)
    let disabledClearData = true;

    if (serviceTypesList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={serviceTypesList} tableTitle={sTypesTranslate.serviceTypesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'dashboard'} summary={summary}
        />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, serviceType, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ServiceContracts')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={sTypesTranslate.pageTitle}
          paragraph={sTypesTranslate.pageInstruction}
        />
        <Grid htmlId="serviceTypes">
          <ServiceTypesForm
            props={this.props}
            serviceType={serviceType}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleOnSave}
            summary={summary}
          />
          {this.renderServiceList()}
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

ServiceTypes.propTypes = {
  serviceType: PropTypes.any.isRequired,
  serviceTypesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServiceTypes;
