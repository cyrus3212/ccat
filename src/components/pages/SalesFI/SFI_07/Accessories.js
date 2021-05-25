
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_07.scss';
import AccessoriesForm from '../../../widgets/SalesFI/Accessories'
import accessoriesTranslate from '../../../../translation/salesfi/accessories.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { accessoriesTableColumn } from './AccessoriesTableColumn'
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

class Accessories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesGroupItems: [],
      accessoriesList: [],
      accessories: {},
      accessoriesRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      isSaveAndContinue: false,
      summary: {},
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
    }, 3000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let accessoriesList = state.accessoriesList;
    let summary = state.summary;
    let salesGroupItems = state.salesGroupItems;
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let accessoriesData = state.accessories;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.accessories.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            isError: true,
            accessories: nextProps.accessories.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            accessoriesData = nextProps.accessories.data.model[0];
            accessoriesData.id = "";
          } else {
            accessoriesData = {}
          }

          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            isError: false,
            accessories: accessoriesData
          }
        }
      }
    }
    catch (e)
    {

    }

    /**
     * Handle response on Delete data
     */
    try {
      if (state.onDelete === true) {
        if (nextProps.accessories.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            accessories: {}
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
        if (nextProps.accessories.isOk === true ) {
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
      if (nextProps.accessoriesList.data.model !== state.accessoriesList) {
        accessoriesList = nextProps.accessoriesList.data.model;
        summary = nextProps.accessoriesList.data.summary;
        salesGroupItems = nextProps.accessoriesList.data.salesGroupItems;

        if (accessoriesList.length !== undefined || Object.keys(accessoriesList).length > 0) {
          return {accessoriesList, summary, salesGroupItems};
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
  handleEdit = (accessories) => {
    scrollToTop();
    this.setState({ accessories, isEdit: true, isCheckSaveAndRetain: false, isError: false })
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
  handleShowErrorModal = (accessoriesRowDelete) => {
    this.setState({ accessoriesRowDelete, isShowDeleteModal: true, accessories: {} });
  }

  /**
 * method that hide error modal
 */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, isCheckSaveAndRetain: false, isError: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, accessoriesRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(accessoriesRowDelete, summary)));
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

  renderAccessories() {
    const {accessoriesList, summary} = this.state
    const tableColumns = accessoriesTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    try {
      if (accessoriesList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={accessoriesList} tableTitle={accessoriesTranslate.accessoriesList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'SalesServiceContracts'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, salesGroupItems, accessories, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isError, summary, isCheckSaveAndRetain } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'LendingFeesLeasing')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={accessoriesTranslate.pageTitle}
          paragraph={accessoriesTranslate.pageInstruction}
        />
        <Grid htmlId="accessories">
          <AccessoriesForm
            salesGroupItems={salesGroupItems}
            accessories={accessories}
            props={this.props}
            isError={isError}
            onSave={this.handleSave}
            summary={summary}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderAccessories()}
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

Accessories.propTypes = {
  accessories: PropTypes.any.isRequired,
  accessoriesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default Accessories;
