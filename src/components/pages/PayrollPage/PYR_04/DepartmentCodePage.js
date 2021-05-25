import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import deptCodeTranslate from '../../../../translation/payroll/departmentCodes.json';
import BlockText from '../../../reusable/BlockText';
import DepartmentCodesForm from '../../../widgets/Payroll/DepartmentCodes/DepartmentCodesForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import {getSectionLink} from '../../../../helpers/routesHelper';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class DepartmentCodePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentCodeList: [],
      departmentCode: {},
      securityApplicationLinkOptions: [],
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      isEdit: false,
      summary: {},
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPayrollList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: "" });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let departmentCodeList = state.departmentCodeList;
    let summary = state.summary;
    let securityApplicationLinkOptions = state.securityApplicationLinkOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.departmentCode.isOk === false ) {
          return {
            loaderStatus: state.onSave ? "" : "error",
            onSave: false,
            onEdit: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            departmentCode: nextProps.departmentCode.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successSaveMessage,
            departmentCode: nextProps.departmentCode.data.model[0]
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
        if (nextProps.departmentCode.isOk === true ) {
          return {
            loaderStatus: "success",
            loaderMessage: commonTranslate.successDeleteMessage,
            departmentCode: {}
          }
        }
        else {
          return {
            loaderStatus: "error",
            loaderMessage: commonTranslate.failedDeleteMessage,
            departmentCode: nextProps.departmentCode.data.model[0]
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
        if (nextProps.departmentCode.isOk === true ) {
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
      if (nextProps.departmentCodeList.data.model !== state.departmentCodeList) {
        departmentCodeList = nextProps.departmentCodeList.data.model;
        summary = nextProps.departmentCodeList.data.summary;
        securityApplicationLinkOptions = nextProps.departmentCodeList.data.securityApplicationLinkOptions;

        if (departmentCodeList.length !== undefined || Object.keys(departmentCodeList).length > 0) {
          return {securityApplicationLinkOptions, departmentCodeList, summary};
        }

      }
    }
    catch (e) {

    }
    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, departmentCode, departmentCodeList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== "" || prevState.onEdit === true && loaderStatus !== "") {
      let updatedList = updateTableList(departmentCode, departmentCodeList);

      this.setState({ departmentCodeList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ departmentCode: {}, loaderStatus: "" })
      }, 1000)
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === "success") {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: "" })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === "error") {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: "" })
    }
  }

  /**
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, departmentCodeList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : departmentCodeList,
      summary
    }

    this.props.dispatch(addPayrollSection(params));
  }

  /**
   * Method that handle save and continue to next section
   */
  handleSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
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

    this.props.dispatch(addPayrollSection(params));
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    } else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      })
      this.componentReload();
    }
  }

  handleChangeInput = (event, id, target) => {
    const { departmentCodeList } = Object.assign({}, this.state);
    let selectedRow = departmentCodeList.findIndex(selectedRow => selectedRow.id == id);

    departmentCodeList[selectedRow][target] = event.value;
    this.setState({ departmentCodeList });
  }

  // handleChangeRadio = (event, id, target) => {
  //   const { departmentCodeList, summary } = Object.assign({}, this.state);
  //   let selectedRow = departmentCodeList.findIndex(selectedRow => selectedRow.id == id);
  //   departmentCodeList[selectedRow][target] = event.value;

  //   let model = departmentCodeList[selectedRow];
  //   let params = { model:[model], summary }

  //   this.setState({ departmentCodeList, onEdit: true });
  //   this.props.dispatch(addPayrollSection(params));
  // }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { departmentCodeList } = Object.assign({}, this.state);
    let selectedRow = departmentCodeList.findIndex(selectedRow => selectedRow.id == id);

    departmentCodeList[selectedRow][target] = event.value;
    let model = departmentCodeList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ departmentCodeList, onEdit: true });
    this.props.dispatch(addPayrollSection(params));
  }

  handleAddItem = (departmentCode) => {
    const { summary } = this.state;
    this.setState({ onSave: true, departmentCode });

    this.props.dispatch(addPayrollSection(getParams(departmentCode, summary)));
  }

  handleShowErrorModal = (accountRowDelete) => {
    this.setState({ accountRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, accountRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(accountRowDelete, summary)));
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: "",
      departmentCode: {}
    })
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: "", isEdit: false });
  };

  handleOnClearDataComplete = () => {
    this.componentReload();
    this.setState({
      onMarkAsComplete: false
    })
  }

  render() {
    const { isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, departmentCodeList, departmentCode, securityApplicationLinkOptions, summary, isSaveAndContinue } = this.state;
    let disabledClearData = true;

    if (departmentCodeList.length > 0) {
      disabledClearData = false;
    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'TaxWithholding')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={deptCodeTranslate.pageTitle}
          paragraph={deptCodeTranslate.pageInstruction}
        />
        <Grid htmlId="departmentCodes">
          <DepartmentCodesForm
            props={this.props}
            summary={summary}
            departmentCodeList={departmentCodeList}
            departmentCode={departmentCode}
            onBlur={this.handleOnBlur}
            // onChangeRadio={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            securityApplicationLinkOptions={securityApplicationLinkOptions}
            onMarkAsComplete={this.handleMarkAsComplete}
          />

          <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'PayCodeOverride'} />

          <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
            <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
          </Modal>

          <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
            <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
          </Modal>
        </Grid>
      </Fragment>
    )
  }
}

DepartmentCodePage.propTypes = {
  dispatch: PropTypes.func,
};

export default DepartmentCodePage;
