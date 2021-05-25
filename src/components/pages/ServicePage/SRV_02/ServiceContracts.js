
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import './_srv_01.scss';
import { Redirect } from 'react-router-dom';
import sContractsTranslate from '../../../../translation/service/serviceContracts.json';
import ServiceContractsForm from '../../../widgets/Service/ServiceContracts'
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
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';

class ServiceContracts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceContractsList: [
        { companyName: 'Company A', receivableAcct: '0001', key: 1, id: 1 }
      ],
      serviceContract: {},
      serviceContractRowDelete: {},
      onSave: false,
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
    let serviceContractsList = state.serviceContractsList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.serviceContract.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            serviceContract: nextProps.serviceContract.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            serviceContract: {}
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
        if (nextProps.serviceContract.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            serviceContract: {}
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
        if (nextProps.serviceContract.isOk === true ) {
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
      if (nextProps.serviceContractsList.data.model !== state.serviceContractsList) {
        serviceContractsList = nextProps.serviceContractsList.data.model;
        summary = nextProps.serviceContractsList.data.summary;

        if (serviceContractsList.length !== undefined || Object.keys(serviceContractsList).length > 0) {
          return {serviceContractsList, summary};
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
  handleShowErrorModal = (serviceContractRowDelete) => {
    this.setState({ serviceContractRowDelete, isShowDeleteModal: true, serviceContract: {} });
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
  handleOnEdit = (serviceContract) => {
    scrollToTop();
    this.setState({ serviceContract, isEdit: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceContractRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(serviceContractRowDelete, summary)));
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

  renderServiceContractsList = () => {
    const { serviceContractsList, summary } = this.state;
    const tableColumns = serviceTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleOnEdit);
    let disabledClearData = true;

    if (serviceContractsList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={serviceContractsList} tableTitle={sContractsTranslate.serviceContract} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'ServiceTypes'} summary={summary}
        />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, serviceContract, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;
    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ServicePricing')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={sContractsTranslate.pageTitle}
          paragraph={sContractsTranslate.pageInstruction}
        />
        <Grid htmlId="serviceContracts">
          <ServiceContractsForm
            props={this.props}
            serviceContract={serviceContract}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleOnSave}
            summary={summary}
          />
          {this.renderServiceContractsList()}
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

ServiceContracts.propTypes = {
  serviceContract: PropTypes.any.isRequired,
  serviceContractsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServiceContracts;
