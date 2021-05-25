
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_05.scss';
import AftermarketsForm from '../../../widgets/SalesFI/Aftermarkets'
import aftermarketsTranslate from '../../../../translation/salesfi/aftermarkets.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { aftermarketsTableColumn } from './AftermarketsTableColumn'
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

class Aftermarkets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignGrossOptions: [],
      salesGroupItems: [],
      tableTypeOptions: [],
      taxCodeOptions: [],
      aftermarketList: [],
      aftermarket: {},
      aftermarketRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      summary: {},
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
    let aftermarketList = state.aftermarketList;
    let summary = state.summary;
    let assignGrossOptions = state.assignGrossOptions;
    let tableTypeOptions = state.tableTypeOptions;
    let taxCodeOptions = state.taxCodeOptions;
    let salesGroupItems = state.salesGroupItems;
    let aftermarket = state.aftermarket;
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.aftermarket.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            isError: true,
            aftermarket: nextProps.aftermarket.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            aftermarket = nextProps.aftermarket.data.model[0];
            aftermarket.id = "";
          } else {
            aftermarket = {}
          }

          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            isError: false,
            aftermarket: aftermarket
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
        if (nextProps.aftermarket.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            aftermarket: {}
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
        if (nextProps.aftermarket.isOk === true ) {
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
      if (nextProps.aftermarketList.data.model !== state.aftermarketList) {
        aftermarketList = nextProps.aftermarketList.data.model || [];
        summary = nextProps.aftermarketList.data.summary || {};
        assignGrossOptions = nextProps.aftermarketList.data.assignGrossOptions || [];
        tableTypeOptions = nextProps.aftermarketList.data.tableTypeOptions || [];
        taxCodeOptions = nextProps.aftermarketList.data.taxCodeOptions || [];
        salesGroupItems = nextProps.aftermarketList.data.salesGroupItems || [];

        return {
          aftermarketList,
          summary,
          assignGrossOptions,
          tableTypeOptions,
          taxCodeOptions,
          salesGroupItems
        };
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle edit managed account
   */
  handleEdit = (aftermarket) => {
    scrollToTop();
    this.setState({ aftermarket: aftermarket, isEdit: true, isCheckSaveAndRetain: false, isError: false })
  }

 /**
  * method that handle save/update data
  */
  handleOnSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      isCheckSaveAndRetain: response,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (aftermarketRowDelete) => {
    this.setState({ aftermarketRowDelete, isShowDeleteModal: true, aftermarket: {} });
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
    const { summary, aftermarketRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(aftermarketRowDelete, summary)));
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

  renderAfterMarket() {
    const {aftermarketList, summary} = this.state
    const tableColumns = aftermarketsTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    try {
      if (aftermarketList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify key={3} data={aftermarketList} tableTitle={aftermarketsTranslate.aOptionList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'GapSources'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, assignGrossOptions, tableTypeOptions, taxCodeOptions, aftermarketList, aftermarket,
      isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isError, summary, salesGroupItems, isCheckSaveAndRetain
    } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'SalesServiceContracts')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={aftermarketsTranslate.pageTitle}
          paragraph={aftermarketsTranslate.pageInstruction1+aftermarketsTranslate.pageInstruction2+aftermarketsTranslate.pageInstruction3}
        />
        <Grid htmlId="aftermarkets">
          <AftermarketsForm
            assignGrossOptions={assignGrossOptions}
            tableTypeOptions={tableTypeOptions}
            taxCodeOptions={taxCodeOptions}
            salesGroupItems={salesGroupItems}
            aftermarket={aftermarket}
            aftermarketList={aftermarketList}
            props={this.props}
            isError={isError}
            onSave={this.handleOnSave}
            summary={summary}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderAfterMarket()}
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

Aftermarkets.propTypes = {
  aftermarket: PropTypes.any.isRequired,
  aftermarketList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default Aftermarkets;
