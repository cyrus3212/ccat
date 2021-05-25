
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_04.scss';
import stockingGrpTranslate from '../../../../translation/parts/stockingGroup.json';
import StockingGroupsForm from '../../../widgets/Parts/StockingGroups'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { stockingGroupTableColumn } from './TableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { addPartsSection, removeParts } from '../../../../api/parts/partsSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class StockingGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockingGroupList: [],
      stockingGroup: {},
      stockingGroupRowDelete: {},
      salesGroupItems: [],
      manufacturerOptions: [],
      onSave: false,
      isCheckSaveAndRetain: false,
      isEdit: false,
      isError: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      tableItems: []
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
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let stockingGroupList = state.stockingGroupList;
    let summary = state.summary;
    let salesGroupItems = state.salesGroupItems;
    let manufacturerOptions = state.manufacturerOptions;
    let stockingGroupData = state.stockingGroup;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.stockingGroup.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            isError: true,
            loaderMessage: commonTranslate.failedSaveMessage,
            stockingGroup: nextProps.stockingGroup.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            stockingGroupData = nextProps.stockingGroup.data.model[0];
            stockingGroupData.id = "";
          } else {
            stockingGroupData = {};
          };

          return {
            loaderStatus: 'success',
            onSave: false,
            isError: false,
            loaderMessage: commonTranslate.successSaveMessage,
            stockingGroup: stockingGroupData,
            tableItems: stockingGroupData.saleAccountRepairOrders
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
        if (nextProps.stockingGroup.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            stockingGroup: {}
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
        if (nextProps.stockingGroup.isOk === true ) {
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
      if (nextProps.stockingGroupList.data.model !== state.stockingGroupList) {
        stockingGroupList = nextProps.stockingGroupList.data.model;
        summary = nextProps.stockingGroupList.data.summary;
        salesGroupItems = nextProps.stockingGroupList.data.salesGroupItems
        manufacturerOptions = nextProps.stockingGroupList.data.manufacturerOptions

        if (stockingGroupList.length !== undefined || Object.keys(stockingGroupList).length > 0) {
          return {stockingGroupList, summary, salesGroupItems, manufacturerOptions};
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
  handleEdit = (stockingGroup) => {
    scrollToTop();
    this.setState({ stockingGroup: stockingGroup, isEdit: true, isCheckSaveAndRetain: false, isError: false })
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
  handleShowErrorModal = (stockingGroupRowDelete) => {
    this.setState({ stockingGroupRowDelete, isShowDeleteModal: true, stockingGroup: {} });
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
    const { summary, stockingGroupRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(stockingGroupRowDelete, summary)));
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

  renderStockingGroup = () => {
    const {stockingGroupList, summary} = this.state
    const tableColumns = stockingGroupTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (stockingGroupList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={stockingGroupList} tableTitle={stockingGrpTranslate.stockingGroups} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Manufacturers'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, stockingGroup, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isError,
      summary, salesGroupItems, manufacturerOptions, isCheckSaveAndRetain } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Counterpersons')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={stockingGrpTranslate.pageTitle}
          paragraph={stockingGrpTranslate.pageInstruction}
        />
        <Grid htmlId="stockingGroup">
          <StockingGroupsForm
            props={this.props}
            stockingGroup={stockingGroup}
            props={this.props}
            isError={isError}
            onSave={this.handleSave}
            summary={summary}
            salesGroupItems={salesGroupItems}
            manufacturerOptions={manufacturerOptions}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderStockingGroup()}
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

StockingGroups.propTypes = {
  stockingGroups: PropTypes.any.isRequired,
  stockingGroupList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default StockingGroups;
