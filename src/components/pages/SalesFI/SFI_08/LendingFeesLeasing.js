
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_08.scss';
import lendingTranslate from '../../../../translation/salesfi/lendingFeesLeasing.json'
import LendingFLForm from '../../../widgets/SalesFI/LendingFeesLeasing';
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
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class LendingFeesLeasing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taxCodeOptions: [],
      fetTaxableOptions: [],
      recordTypeOptions: [],
      lendingList: [],
      lending: {},
      lendingRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      isSaveAndContinue: false,
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
    this.getDataList();
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let lendingList = state.lendingList;
    let summary = state.summary;
    let recordTypeOptions = state.recordTypeOptions;
    let result = nextProps.lending.data;
    let fetTaxableOptions = state.fetTaxableOptions;
    let taxCodeOptions = state.taxCodeOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        let lending = result.model[0];

        if (nextProps.lending.isOk === false ) {
          return {
            loaderStatus: state.onSave ? '' : 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            lending,
            onSave: false,
            onEdit: false
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            lending
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
        if (nextProps.lending.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
          }
        } else {
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
        if (nextProps.lending.isOk === true ) {
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
      if (nextProps.lendingList.data.model !== state.lendingList) {
        lendingList = nextProps.lendingList.data.model;
        summary = nextProps.lendingList.data.summary;
        recordTypeOptions = nextProps.lendingList.data.recordTypeOptions;
        fetTaxableOptions = nextProps.lendingList.data.fetTaxableOptions;
        taxCodeOptions = nextProps.lendingList.data.taxCodeOptions;

        if (lendingList.length !== undefined || Object.keys(lendingList).length > 0) {
          return {lendingList, summary, recordTypeOptions, fetTaxableOptions, taxCodeOptions};
        }

      }
    } catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, lending, lendingList } = this.state;

    /**
    * Update List with single updated Row
    */
   if (prevState.onSave === true && loaderStatus !== '' || prevState.onEdit === true && loaderStatus !== '') {
      let updatedList = updateTableList(lending, lendingList);

      this.setState({ lendingList: updatedList, onEdit: false, onSave: false });

      setTimeout(() => {
        this.setState({ lending: {}, loaderStatus: '' })
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

  getDataList = () => {
    this.props.dispatch(getSalesFIList(getWorkbookUrl(this.props.match)));
  }

  handleChangeInput = (event, id, target) => {
    const { lendingList } = Object.assign({}, this.state);
    let selectedRow = lendingList.findIndex(selectedRow => selectedRow.id == id);

    lendingList[selectedRow][target] = event.value;
    this.setState({ lendingList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { lendingList } = Object.assign({}, this.state);
    let selectedRow = lendingList.findIndex(selectedRow => selectedRow.id == id);

    lendingList[selectedRow][target] = event.value;
    let model = lendingList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ lendingList, onEdit: true });
    this.props.dispatch(addSalesFISection(params));
  }

  handleAddItem = (lending) => {
    const { summary } = this.state;
    this.setState({ lending, onSave: true });
    this.props.dispatch(addSalesFISection(getParams(lending, summary)));
  }

  handleShowErrorModal = (accountRowDelete) => {
    this.setState({ accountRowDelete, isShowDeleteModal: true });
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
    const { summary, accountRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage
    });

    this.props.dispatch(removSalesFI(getParams(accountRowDelete, summary)));
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
    } else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });

      this.componentReload();
    }
  };

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      lending: {}
    })
  }

  /**
   * method that handle save event
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
    const { isSaveAndContinue, lending, taxCodeOptions, fetTaxableOptions, recordTypeOptions, lendingList, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;

    let disabledClearData = true;

    try {
      if (lendingList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'SalesTaxGroup')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={lendingTranslate.pageTitle}
          paragraph={lendingTranslate.pageInstruction}
        />
        <Grid htmlId="lendingFeesLeasing">
          <LendingFLForm
            recordTypeOptions={recordTypeOptions}
            lendingList={lendingList}
            lending={lending}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onChangeSave={this.handleChangeSave}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            onClearLoaderProps={this.handleClearLoaderProps}
            isAddStatus={loaderStatus}
            onShowErrorModal={this.handleShowErrorModal}
            onMarkAsComplete={this.handleMarkAsComplete}
            fetTaxableOptions={fetTaxableOptions}
            taxCodeOptions={taxCodeOptions}
          />
          <Footer match={this.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Accessories'} />
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

LendingFeesLeasing.propTypes = {
  lending: PropTypes.any.isRequired,
  lendingList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default LendingFeesLeasing;
