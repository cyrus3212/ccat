
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_07.scss';
import partsDiscountTranslate from '../../../../translation/parts/partsDiscount.json'
import PartsDiscountsForm from '../../../widgets/Parts/PartsDiscounts'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { partsDiscountsTableColumn } from './TableColumn'
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

class PartsDiscounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partsDiscountList: [],
      partDiscount: {},
      partsDiscountRowDelete: {},
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
    let partsDiscountList = state.partsDiscountList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.partsDiscount.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            partDiscount: nextProps.partsDiscount.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            loaderMessage: commonTranslate.successSaveMessage,
            partDiscount: {},
            percentage: false,
            flatAmount: false
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
        if (nextProps.partsDiscount.isOk === true ) {
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
        if (nextProps.partsDiscount.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            partDiscount: {},
            percentage: false,
            flatAmount: false
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
      if (nextProps.partsDiscountList.data.model !== state.partsDiscountList) {
        partsDiscountList = nextProps.partsDiscountList.data.model;
        summary = nextProps.partsDiscountList.data.summary;

        if (partsDiscountList.length !== undefined || Object.keys(partsDiscountList).length > 0) {
          return {partsDiscountList, summary};
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
  handleEdit = (partDiscount) => {
    scrollToTop();
    this.setState({ partDiscount, isEdit: true })
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
  handleShowErrorModal = (partsDiscountRowDelete) => {
    this.setState({ partsDiscountRowDelete, isShowDeleteModal: true, isEdit: false, partDiscount: {} });
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
    const { summary, partsDiscountRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(partsDiscountRowDelete, summary)));
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

  renderPartsDiscounts = () => {
    const {partsDiscountList, summary} = this.state
    const tableColumns = partsDiscountsTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    if (partsDiscountList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={partsDiscountList} tableTitle={'Parts Discount List'} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'RestockingCharge'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, partDiscount, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary, percentage, flatAmount } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PartsFees')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={partsDiscountTranslate.pageTitle}
          paragraph={partsDiscountTranslate.pageInstruction}
        />
        <Grid htmlId="partsDiscounts">
          <PartsDiscountsForm
            props={this.props}
            partDiscount={partDiscount}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
            percentage={percentage}
            flatAmount={flatAmount}
          />
          {this.renderPartsDiscounts()}
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

PartsDiscounts.propTypes = {
  partsDiscount: PropTypes.any.isRequired,
  partsDiscountList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default PartsDiscounts;
