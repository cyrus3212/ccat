
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_08.scss';
import feesTranslate from '../../../../translation/parts/partFees.json'
import PartFeesForm from '../../../widgets/Parts/PartFees'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { partFeesTableColumn } from './TableColumn'
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

class PartFees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partFeesList: [],
      partFee: {},
      partFeesRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
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
    this.props.dispatch(getPartsList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let partFeesList = state.partFeesList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.partFees.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            partFee: nextProps.partFees.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successSaveMessage,
            percentage: false,
            dollarAmount: false,
            variable: false,
            partFee: {}
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
        if (nextProps.partFees.isOk === true ) {
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
        if (nextProps.partFees.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            percentage: false,
            dollarAmount: false,
            variable: false,
            partFee: {}
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
      if (nextProps.partFeesList.data.model !== state.partFeesList) {
        partFeesList = nextProps.partFeesList.data.model;
        summary = nextProps.partFeesList.data.summary;

        if (partFeesList.length !== undefined || Object.keys(partFeesList).length > 0) {
          return {partFeesList, summary};
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
  handleEdit = (partFee) => {
    scrollToTop();
    this.setState({ partFee, isEdit: true })
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
  handleShowErrorModal = (partFeesRowDelete) => {
    this.setState({ partFeesRowDelete, isShowDeleteModal: true, isEdit: false, partFee: {} });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '', isEdit: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, partFeesRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(partFeesRowDelete, summary)));
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

  renderPartFees = () => {
    const {partFeesList, summary} = this.state
    const tableColumns = partFeesTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (partFeesList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={partFeesList} tableTitle={feesTranslate.partsFeeList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'PartsDiscounts'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, partFee, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, percentage, dollarAmount, variable } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PartKits')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={feesTranslate.pageTitle}
          paragraph={feesTranslate.pageInstruction}
        />
        <Grid htmlId="partFees">
          <PartFeesForm
            props={this.props}
            partFee={partFee}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            percentage={percentage}
            dollarAmount={dollarAmount}
            variable={variable}
          />
          {this.renderPartFees()}
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

PartFees.propTypes = {
  partFees: PropTypes.any.isRequired,
  partFeesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PartFees;
