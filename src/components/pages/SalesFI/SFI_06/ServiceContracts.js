
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_06.scss';
import ServiceContractsForm from '../../../widgets/SalesFI/ServiceContracts'
import serviceTranslate from '../../../../translation/salesfi/serviceContracts.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { serviceContractsTableColumn } from './ServiceContractsTableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection, removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class ServiceContracts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceContractList: [],
      serviceContract: {},
      serviceContractRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      summary: {},
      salesGroupItems: [],
      typeOptions: [],
      isCheckSaveAndRetain: false,
      isError: false,
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
    let serviceContractList = state.serviceContractList;
    let summary = state.summary;
    let salesGroupItems = state.salesGroupItems;
    let typeOptions = state.typeOptions;
    let serviceContract = state.serviceContract;
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.serviceContract.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            isError: true,
            serviceContract: nextProps.serviceContract.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            serviceContract = nextProps.serviceContract.data.model[0];
            serviceContract.id = "";
          } else {
            serviceContract = {}
          }

          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            isError: false,
            serviceContract: serviceContract
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
    } catch (e) {

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
      if (nextProps.serviceContractList.data.model !== state.serviceContractList) {
        serviceContractList = nextProps.serviceContractList.data.model;
        summary = nextProps.serviceContractList.data.summary;
        salesGroupItems = nextProps.serviceContractList.data.salesGroupItems;
        typeOptions = nextProps.serviceContractList.data.typeOptions;

        if (serviceContractList.length !== undefined || Object.keys(serviceContractList).length > 0) {
          return {serviceContractList, summary, salesGroupItems, typeOptions};
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
  handleEdit = (serviceContract) => {
    scrollToTop();
    this.setState({ serviceContract, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isCheckSaveAndRetain: response,
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
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
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceContractRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(serviceContractRowDelete, summary)));
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

    this.props.dispatch(addSalesFISection(params));
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

  renderServiceContract() {
    const { serviceContractList, summary } = this.state;
    const tableColumns = serviceContractsTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit);
    let disabledClearData = true;

    try {
      if (serviceContractList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={serviceContractList} tableTitle={serviceTranslate.serviceContractList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Aftermarkets'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, salesGroupItems, serviceContract, isShowLoaderModal, isShowDeleteModal, loaderStatus,
      loaderMessage, isError, summary, typeOptions, isCheckSaveAndRetain } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Accessories')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={serviceTranslate.pageTitle}
          paragraph={serviceTranslate.pageInstruction}
        />
        <Grid htmlId="serviceContacts">
          <ServiceContractsForm
            salesGroupItems={salesGroupItems}
            serviceContract={serviceContract}
            props={this.props}
            isError={isError}
            onSave={this.handleSave}
            summary={summary}
            typeOptions={typeOptions}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderServiceContract()}
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
  serviceContractList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ServiceContracts;
