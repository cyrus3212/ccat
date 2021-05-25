
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_10.scss';
import salesDeptEmpTranslate from '../../../../translation/salesfi/salesDeptEmployees.json';
import SalesDeptEmpForm from '../../../widgets/SalesFI/SalesDeptEmployees';
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection, removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class SalesDeptEmployees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesPersonTypeOptions: [],
      salesDeptEmpList: [],
      salesDeptEmp: {},
      salesDeptEmpRowDelete: {},
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
    let salesDeptEmpList = state.salesDeptEmpList;
    let summary = state.summary;
    let recordTypeOptions = state.recordTypeOptions;
    let salesPersonTypeOptions = state.salesPersonTypeOptions;
    let result = nextProps.salesDeptEmp;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (result.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            salesDeptEmp: nextProps.salesDeptEmp.data.model[0],
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            salesDeptEmp: nextProps.salesDeptEmp.data.model[0]
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
        if (nextProps.salesDeptEmp.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
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
        if (nextProps.salesDeptEmp.isOk === true ) {
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
      if (nextProps.salesDeptEmpList.data.model !== state.salesDeptEmpList) {
        salesDeptEmpList = nextProps.salesDeptEmpList.data.model;
        summary = nextProps.salesDeptEmpList.data.summary;
        recordTypeOptions = nextProps.salesDeptEmpList.data.recordTypeOptions;
        salesPersonTypeOptions = nextProps.salesDeptEmpList.data.salesPersonTypeOptions;

        if (salesDeptEmpList.length !== undefined || Object.keys(salesDeptEmpList).length > 0) {
          return {salesDeptEmpList, summary, recordTypeOptions, salesPersonTypeOptions};
        }
      }
    } catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, salesDeptEmp, salesDeptEmpList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(salesDeptEmp, salesDeptEmpList);
      this.setState({ salesDeptEmpList: updatedList, onEdit: false, onSave: false });
      setTimeout(() => {
        this.setState({ salesDeptEmp: {}, loaderStatus: '' })
      }, 1000)
    }

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
   * method that fetch managed accounts
   */

  handleChangeInput = (event, id, target) => {
    const { salesDeptEmpList } = Object.assign({}, this.state);
    let selectedRow = salesDeptEmpList.findIndex(selectedRow => selectedRow.id == id);

    salesDeptEmpList[selectedRow][target] = event.value;
    this.setState({ salesDeptEmpList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { salesDeptEmpList } = Object.assign({}, this.state);
    let selectedRow = salesDeptEmpList.findIndex(selectedRow => selectedRow.id == id);
    salesDeptEmpList[selectedRow][target] = event.value;
    let model = salesDeptEmpList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });
    this.props.dispatch(addSalesFISection(params));
  }

  handleAddItem = (salesDeptEmp) => {
    const { summary } = this.state;
    this.setState({ salesDeptEmp, onSave: true });
    this.props.dispatch(addSalesFISection(getParams(salesDeptEmp, summary)));
  }

  handleShowErrorModal = (salesDeptEmpRowDelete) => {
    this.setState({ salesDeptEmpRowDelete, isShowDeleteModal: true });
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
    const { summary, salesDeptEmpRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(salesDeptEmpRowDelete, summary)));
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
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        // onMarkAsComplete: false
        // isMarkAsComplete: true
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    }
    else if (onSave === true && loaderStatus === 'success') {
      this.setState({
        isSaveAndContinue: true
      })
    }
    else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      })
      this.componentReload();
    }
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      salesDeptEmp: {}
    })
  }

  /**
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, salesDeptEmpList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : salesDeptEmpList,
      summary
    }

    this.props.dispatch(addSalesFISection(params));
  }


  /**
  * method that handle save event and next section
  */
  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
    this.setState({
      onMarkAsComplete: false
    });
  }

  render() {
    const { isSaveAndContinue, salesPersonTypeOptions, salesDeptEmpList, salesDeptEmp, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;
    let disabledClearData = true;

    try {
      if (salesDeptEmpList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'FinanceCompanies')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={salesDeptEmpTranslate.pageTitle}
          paragraph={salesDeptEmpTranslate.pageInstruction}
        />
        <Grid className="SalesDeptEmployee">
          <SalesDeptEmpForm
            salesPersonTypeOptions={salesPersonTypeOptions}
            salesDeptEmpList={salesDeptEmpList}
            salesDeptEmp={salesDeptEmp}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onHideAddModal={this.handleLoaderModalHide}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
          />
          <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'SalesTaxGroup'} />
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

SalesDeptEmployees.propTypes = {
  salesDeptEmp: PropTypes.any.isRequired,
  salesDeptEmpList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default SalesDeptEmployees;
