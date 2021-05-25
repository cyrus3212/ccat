import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_acn_09.scss';
import accountsPayableTranslate from '../../../../translation/accounting/accountsPayable.json';
import BlockText from '../../../reusable/BlockText';
import AccountPayableForm from '../../../widgets/Accounting/AccountPayable/AccountPayableForm';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import Footer from '../../../common/Footer';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class AccountPayable extends Component {
  _isMounted = false
  constructor(props) {
    super(props);

    this.state = {
      apVendorList: [],
      apVendor: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      summary: {},
      isMarkAsComplete: false
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this._isMounted = true
    if (this._isMounted) {
      this.props.dispatch(getAccountingList(getWorkbookUrl(this.props.match)));
      setTimeout(() => {
        this.setState({ loaderStatus: '' });
      }, 2000)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let apVendorList = state.apVendorList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.apVendor.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: accountsPayableTranslate.saveError,
            apVendor: nextProps.apVendor.data.model[0],
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: accountsPayableTranslate.saveSuccess,
            apVendor: nextProps.apVendor.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.apVendor.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: accountsPayableTranslate.deleteSuccess,
          apVendor: {}
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: accountsPayableTranslate.deleteError,
          apVendor: nextProps.apVendor.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.apVendor.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
        }
      }
    }

    try {
      if (nextProps.apVendorList.data.model !== state.apVendorList) {
        apVendorList = nextProps.apVendorList.data.model;
        summary = nextProps.apVendorList.data.summary;

        if (apVendorList.length !== undefined || Object.keys(apVendorList).length > 0) {
          return {apVendorList, summary};
        }

      }
    }
    catch (e) {

    }
    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, apVendor, apVendorList } = this.state;

    /**
      * Update List with single updated Row
      */
     if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(apVendor, apVendorList);

      this.setState({ apVendorList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ apVendor: {}, loaderStatus: '' })
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
    const { summary, apVendorList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : apVendorList,
      summary
    }

    this.props.dispatch(addAccountingSection(params));
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

    this.props.dispatch(addAccountingSection(params));
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

  onClearDataComplete = () => {
    this.setState({
      onMarkAsComplete: false
    });
    this.componentReload();
  };

  handleChangeInput = (event, id, target) => {
    const { apVendorList } = Object.assign({}, this.state);
    let selectedRow = apVendorList.findIndex(selectedRow => selectedRow.id == id);

    apVendorList[selectedRow][target] = event.value;
    this.setState({ apVendorList });
  }

  handleChangeRadio = (event, id, target) => {
    const { apVendorList, summary } = Object.assign({}, this.state);
    let selectedRow = apVendorList.findIndex(selectedRow => selectedRow.id == id);

    apVendorList[selectedRow][target] = event.value;
    let model = apVendorList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ apVendorList, onEdit: true });
    this.props.dispatch(addAccountingSection(params));
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    renderSuccessAlertMessage('Saving...');
    const { apVendorList } = Object.assign({}, this.state);
    let selectedRow = apVendorList.findIndex(selectedRow => selectedRow.id == id);

    apVendorList[selectedRow][target] = event.value;
    this.setState({ apVendorList });

    let model = apVendorList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addAccountingSection(params));
  }

  handleAddItem = (apVendor) => {
    const { summary } = this.state;
    this.setState({ onSave: true, apVendor });

    this.props.dispatch(addAccountingSection(getParams(apVendor, summary)));
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

    this.props.dispatch(removeAccounting(getParams(accountRowDelete, summary)));
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      apVendor: {}
    })
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '', isEdit: false });
  };

  render() {
    const { isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, apVendorList, apVendor, summary, isSaveAndContinue } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ManagedAccounts')} />;
    }

    try {
      if (apVendorList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <BlockText
          title={accountsPayableTranslate.pageTitle}
          paragraph={accountsPayableTranslate.pageInstruction+accountsPayableTranslate.pageInstruction2
                    +accountsPayableTranslate.pageInstruction3+accountsPayableTranslate.pageInstruction4}
        />
        <Grid htmlId="accountPayable">
          <AccountPayableForm
            props={this.props}
            summary={summary}
            apVendorList={apVendorList}
            apVendor={apVendor}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onChangeRadio={this.handleChangeRadio}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
          />

          <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete}
            onSaveAndContinue={this.handleSaveContinue} linkTo={'ARCustomer'} summary={summary}
            disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.onClearDataComplete}
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

AccountPayable.propTypes = {
  apVendorList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default AccountPayable;
