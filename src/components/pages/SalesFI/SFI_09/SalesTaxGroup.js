
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_09.scss';
import salesTaxTranslate from '../../../../translation/salesfi/salesTaxGroup.json';
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import TaxGroupForm from '../../../widgets/SalesFI/TaxGroups';
import TableEdify from '../../../reusable/TableEdify';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection, removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { salesTaxTableColumn } from './SalesTaxTableColumn';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class SalesTaxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesTaxGroupList: [],
      salesTaxGroup: {},
      salesTaxGroupRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      isSaveAndContinue: false
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
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let salesTaxGroupList = state.salesTaxGroupList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.salesTaxGroup.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            salesTaxGroup: nextProps.salesTaxGroup.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            salesTaxGroup: {}
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
        if (nextProps.salesTaxGroup.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            salesTaxGroup: {}
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
        if (nextProps.salesTaxGroup.isOk === true ) {
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
      if (nextProps.salesTaxGroupList.data.model !== state.salesTaxGroupList) {
        salesTaxGroupList = nextProps.salesTaxGroupList.data.model;
        summary = nextProps.salesTaxGroupList.data.summary;

        if (salesTaxGroupList.length !== undefined || Object.keys(salesTaxGroupList).length > 0) {
          return {salesTaxGroupList, summary};
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
  handleEdit = (salesTaxGroup) => {
    scrollToTop();
    this.setState({ salesTaxGroup })
  }

  /**
  * method that handle save/update data
  */
  handleSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
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
  handleShowErrorModal = (salesTaxGroupRowDelete) => {
    this.setState({ salesTaxGroupRowDelete, isShowDeleteModal: true, salesTaxGroup: {} });
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
    const { summary, salesTaxGroupRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(salesTaxGroupRowDelete, summary)));
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
      model: [],
      summary
    }

    this.props.dispatch(addSalesFISection(params));
  }

  /**
  * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderTaxGroup() {
    const {salesTaxGroupList, summary} = this.state
    const tableColumns = salesTaxTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    try {
      if (salesTaxGroupList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <TableEdify data={salesTaxGroupList} tableTitle={'Tax Group List'} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'LendingFeesLeasing'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, salesTaxGroup, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'SalesDeptEmployees')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={salesTaxTranslate.pageTitle}
          paragraph={salesTaxTranslate.pageInstruction}
        />
        <Grid htmlId="taxGroup">
          <TaxGroupForm
            props={this.props}
            salesTaxGroup={salesTaxGroup}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
          />
          {this.renderTaxGroup()}
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

SalesTaxGroup.propTypes = {
  salesTaxGroup: PropTypes.any.isRequired,
  salesTaxGroupList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default SalesTaxGroup;
