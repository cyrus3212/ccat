
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_03.scss';
import manufacturerTranslate from '../../../../translation/parts/manufacturer.json';
import ManufacturerForm from '../../../widgets/Parts/Manufacturer'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { manufacturerTableColumn } from './TableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { addPartsSection, removeParts } from '../../../../api/parts/partsSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class Manufacturers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturerList: [],
      manufacturer: {},
      manufacturerRowDelete: {},
      onSave: false,
      isEdit: false,
      isCheckSaveAndRetain: false,
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
    this.props.dispatch(getPartsList(getWorkbookUrl(this.props.match)));
  }

  static getDerivedStateFromProps(nextProps, state) {
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let manufacturerList = state.manufacturerList;
    let summary = state.summary;
    let manufacturerData = state.manufacturer;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.manufacturer.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            isError: true,
            loaderMessage: commonTranslate.failedSaveMessage,
            manufacturer: nextProps.manufacturer.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            manufacturerData = nextProps.manufacturer.data.model[0];
            manufacturerData.id = "";
          } else {
            manufacturerData = {};
          }

          return {
            loaderStatus: 'success',
            onSave: false,
            isError: false,
            loaderMessage: commonTranslate.successSaveMessage,
            manufacturer: manufacturerData
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
        if (nextProps.manufacturer.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            manufacturer: {}
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
        if (nextProps.manufacturer.isOk === true ) {
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
      if (nextProps.manufacturerList.data.model !== state.manufacturerList) {
        manufacturerList = nextProps.manufacturerList.data.model;
        summary = nextProps.manufacturerList.data.summary;

        if (manufacturerList.length !== undefined || Object.keys(manufacturerList).length > 0) {
          return {manufacturerList, summary};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
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
   * method that handle edit managed account
   */
  handleEdit = (manufacturer) => {
    scrollToTop();
    this.setState({ manufacturer, isEdit: true, isCheckSaveAndRetain: false, isError: false })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      isCheckSaveAndRetain: response,
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPartsSection(getParams(model, summary)));
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
  handleShowErrorModal = (manufacturerRowDelete) => {
    this.setState({ manufacturerRowDelete, isShowDeleteModal: true, manufacturer: {} });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '', isEdit: false, isCheckSaveAndRetain: false, isError: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, manufacturerRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(manufacturerRowDelete, summary)));
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

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderManufacturer = () => {
    const {manufacturerList, summary} = this.state
    const tableColumns = manufacturerTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (manufacturerList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={manufacturerList} tableTitle={manufacturerTranslate.partsManufacturer} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} isClearDataShow={true}
          onClearDataComplete={this.handleOnClearDataComplete} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'PricingStrategyAssignment'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, manufacturer, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isError, summary, isCheckSaveAndRetain } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'StockingGroups')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={manufacturerTranslate.pageTitle}
          paragraph={manufacturerTranslate.pageInstruction1+manufacturerTranslate.pageInstruction2+manufacturerTranslate.pageInstruction3}
        />
        <Grid htmlId="manufacturer">
          <ManufacturerForm
            props={this.props}
            manufacturer={manufacturer}
            props={this.props}
            isError={isError}
            onSave={this.handleSave}
            summary={summary}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderManufacturer()}
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

Manufacturers.propTypes = {
  manufacturer: PropTypes.any.isRequired,
  manufacturerList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default Manufacturers;
