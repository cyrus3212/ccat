import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import countyCityTaxTranslate from '../../../../translation/payroll/countyCityTax.json';
import CountyCityTaxForm from '../../../widgets/Payroll/CountyCityTax'
import commonTranslate from '../../../../translation/common.json';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import BlockText from '../../../reusable/BlockText';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection, removePayroll } from '../../../../api/payroll/payrollSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { Redirect } from 'react-router-dom';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class CountyCityTaxPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countyCityTax: {},
      countyCityTaxList: [],
      countyCityTaxRowDelete: {},
      taxWitholdingOptions:[],
      isShowLoaderModal: false,
      isShowDeleteModal: false,
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      onEdit: false,
      onDelete: false,
      accountRowDelete : {},
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
  }

  static getDerivedStateFromProps(nextProps, state) {
    let countyCityTaxList = state.countyCityTaxList;
    let summary = state.summary;
    let taxWitholdingOptions = state.taxWitholdingOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.countyCityTax.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            countyCityTax: nextProps.countyCityTax.data.model[0],
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            countyCityTax: nextProps.countyCityTax.data.model[0]
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
        if (nextProps.countyCityTax.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            countyCityTax: nextProps.countyCityTax.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedDeleteMessage,
            countyCityTax: nextProps.countyCityTax.data.model[0]
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
        if (nextProps.countyCityTax.isOk === true ) {
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
      if (nextProps.countyCityTaxList.data.model !== state.countyCityTaxList) {
        countyCityTaxList = nextProps.countyCityTaxList.data.model;
        summary = nextProps.countyCityTaxList.data.summary;
        taxWitholdingOptions = nextProps.countyCityTaxList.data.taxWitholdingOptions;

        if (countyCityTaxList.length !== undefined || Object.keys(countyCityTaxList).length > 0) {
          return {countyCityTaxList, summary, taxWitholdingOptions};
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, countyCityTax, countyCityTaxList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(countyCityTax, countyCityTaxList);

      this.setState({ countyCityTaxList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ countyCityTax: {}, loaderStatus: '' })
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
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, countyCityTaxList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : countyCityTaxList,
      summary
    }

    this.props.dispatch(addPayrollSection(params));
  }

  handleSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  handleChangeInput = (event, id, target) => {
    const { countyCityTaxList } = Object.assign({}, this.state);
    let selectedRow = countyCityTaxList.findIndex(selectedRow => selectedRow.id == id);

    countyCityTaxList[selectedRow][target] = event.value;
    this.setState({ countyCityTaxList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { countyCityTaxList } = Object.assign({}, this.state);
    let selectedRow = countyCityTaxList.findIndex(selectedRow => selectedRow.id == id);
    countyCityTaxList[selectedRow][target] = event.value;

    let model = countyCityTaxList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addPayrollSection(params));
  }

  handleAddItem = (countyCityTax) => {
    const { summary } = this.state;
    this.setState({ countyCityTax, onSave: true });
    this.props.dispatch(addPayrollSection(getParams(countyCityTax, summary)));
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
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removePayroll(getParams(accountRowDelete, summary)));
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

  clearData = () => {
    this.setState({
      onMarkAsComplete: false
    })
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      countyCityTax: {}
    })
  }

  render() {
    const { countyCityTax, countyCityTaxList, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, summary, isSaveAndContinue, taxWitholdingOptions } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'review')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={countyCityTaxTranslate.pageTitle}
          paragraph={countyCityTaxTranslate.pageInstruction1+countyCityTaxTranslate.pageInstruction2}
        />
        <Grid className="CountyCityTax">
          <CountyCityTaxForm
            props={this.props}
            summary={summary}
            countyCityTaxList={countyCityTaxList}
            countyCityTax={countyCityTax}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            taxWitholdingOptions = {taxWitholdingOptions}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
            componentReload={this.componentReload}
            clearData={this.clearData}
          />
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

CountyCityTaxPage.propTypes = {
  countyCityTax: PropTypes.any.isRequired,
  countyCityTaxList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default CountyCityTaxPage;
