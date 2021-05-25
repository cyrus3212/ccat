
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_02.scss';
import saleGTranslate from '../../../../translation/salesfi/salesGroups.json';
import commonTranslate from '../../../../translation/common.json';
import SalesGroupsForm from '../../../widgets/SalesFI/SalesGroups';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { generateSalesGroupList } from './TableColumns';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection,removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class SalesGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesGroupsList: [],
      salesGroupDelete: {},
      salesGroupTypeOptions: [],
      isMarkAsComplete: false,
      summary: {},
      salesGroup: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      isShowLoaderModal: false,
      isShowDeleteModal: false,
      onSave: false,
      onDelete: false
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
    let salesGroupsList = state.salesGroupsList;
    let summary = state.summary;
    let salesGroupTypeOptions = state.salesGroupTypeOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.salesGroups.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            salesGroup: nextProps.salesGroups.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            salesGroup: {}
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
        if (nextProps.salesGroups.isOk === true ) {
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

    /**
     * Handle response on Delete data
     */
    try {
      if (state.onDelete === true) {
        if (nextProps.salesGroups.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            salesGroup: {}
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

    try {
      if (nextProps.salesGroupsList.data.model !== state.salesGroupsList) {
        salesGroupsList = nextProps.salesGroupsList.data.model;
        summary = nextProps.salesGroupsList.data.summary;
        salesGroupTypeOptions = nextProps.salesGroupsList.data.newUsedOptions;

        if (salesGroupsList.length !== undefined || Object.keys(salesGroupsList).length > 0) {
          return {salesGroupsList, summary, salesGroupTypeOptions};
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
  handleShowErrorModal = (salesGroupDelete) => {
    this.setState({ salesGroupDelete, isShowDeleteModal: true, salesGroup: {} });
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
  handleOnEdit = (salesGroup) => {
    scrollToTop();
    this.setState({ salesGroup, isEdit: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, salesGroupDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deleteMessage,
    });

    this.props.dispatch(removSalesFI(getParams(salesGroupDelete, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { salesGroupsList, summary } = this.state;
    summary.isCompleted = status;
    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      model: salesGroupsList,
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

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderSalesGroupList = () => {
    const { salesGroupsList, summary } = this.state;
    const salesGroupColumns = generateSalesGroupList(this.handleOnEdit, this.handleDisabledDeleteButton, this.handleShowErrorModal);
    let disabledClearData = true;

    try {
      if (salesGroupsList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify key={3} data={salesGroupsList} tableTitle={saleGTranslate.saleGroupsDef} columns={salesGroupColumns} scrollY={650} scrollX={630} />
            <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'AccountAssignments'} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, salesGroupTypeOptions, isEdit, isShowLoaderModal, loaderMessage, loaderStatus, isShowDeleteModal, isMarkAsComplete, salesGroup} = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'InsuranceSources')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={saleGTranslate.pageTitle}
          paragraph={saleGTranslate.pageInstruction}
        />
        <Grid htmlId="salesGroups">
          <SalesGroupsForm
            props={this.props}
            salesGroup={salesGroup}
            salesTypeOptions={salesGroupTypeOptions}
            isEdit={isEdit}
            onSave={this.handleOnSave}
          />
          {this.renderSalesGroupList()}
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

SalesGroups.propTypes = {
  salesGroups: PropTypes.any.isRequired,
  salesGroupsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default SalesGroups;
