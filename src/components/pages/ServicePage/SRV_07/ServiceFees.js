
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_srv_07.scss';
import serviceFeesTranslate from '../../../../translation/service/serviceFees.json';
import ServiceFeesForm from '../../../widgets/Service/ServiceFees'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { serviceFeesTableColumn } from './TableColumn'
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
import { Redirect } from 'react-router-dom';

class ServiceFees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceFeesList: [],
      serviceFees: {},
      serviceTypeOptions: [],
      serviceFeesRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
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
      this.setState({ loaderStatus: "" });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let serviceFeesList = state.serviceFeesList;
    let summary = state.summary;
    let serviceTypeOptions = state.serviceTypeOptions;
    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.serviceFees.isOk === false ) {
          return {
            loaderStatus: "error",
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            serviceFees: nextProps.serviceFees.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: "success",
            onSave: false,
            loaderMessage: commonTranslate.successSaveMessage,
            serviceFees: {}
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
        if (nextProps.serviceFees.isOk === true ) {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successDeleteMessage,
            serviceFees: {}
          }
        }
        else {
          return {
            loaderStatus: "error",
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
        if (nextProps.serviceFees.isOk === true ) {
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
      if (nextProps.serviceFeesList.data.model !== state.serviceFeesList) {
        serviceFeesList = nextProps.serviceFeesList.data.model;
        summary = nextProps.serviceFeesList.data.summary;
        serviceTypeOptions = nextProps.serviceFeesList.data.serviceTypeOptions

        if (serviceFeesList.length !== undefined || Object.keys(serviceFeesList).length > 0) {
          return {serviceFeesList, summary, serviceTypeOptions};
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
  handleEdit = (serviceFees) => {
    scrollToTop();
    this.setState({ serviceFees, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model) => {
    const { summary } = this.state;
    // delete model.serviceType;
    model.validFrom = model.validFrom || '';
    model.validTill = model.validTill || '';

    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addServiceSection(getParams(model, summary)));
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
  handleShowErrorModal = (serviceFeesRowDelete) => {
    this.setState({ serviceFeesRowDelete, isShowDeleteModal: true, serviceFees: {} });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceFeesRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(serviceFeesRowDelete, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { serviceFeesList, summary } = this.state;
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

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderServiceFees = () => {
    const { serviceFeesList, summary } = this.state
    const tableColumns = serviceFeesTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (serviceFeesList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={serviceFeesList} tableTitle={serviceFeesTranslate.serviceFeesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Discounts'} summary={summary} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, serviceFees, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, serviceTypeOptions } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PolicyAdjustment')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={serviceFeesTranslate.pageTitle}
          paragraph={serviceFeesTranslate.pageInstruction}
        />
        <Grid htmlId="serviceFees">
          <ServiceFeesForm
            props={this.props}
            serviceFees={serviceFees}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            serviceTypeOptions={serviceTypeOptions}
          />
          {this.renderServiceFees()}
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

ServiceFees.propTypes = {
  serviceFees: PropTypes.any.isRequired,
  serviceFeesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServiceFees;
