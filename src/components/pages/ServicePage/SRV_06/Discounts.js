
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_srv_06.scss';
import discountsTranslate from '../../../../translation/service/discounts.json';
import DiscountsForm from '../../../widgets/Service/Discounts'
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { discountsTableColumn } from './TableColumn'
import Footer from '../../../common/Footer';
import scrollToTop from '../../../../helpers/scrollToTop';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class Discounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discountsList: [],
      discounts: {},
      discountRowDelete: {},
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
    this.props.dispatch(getServiceList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let discountsList = state.discountsList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.discounts.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            discounts: nextProps.discounts.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onSave: false,
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            discounts: {
              startDate: "",
              endDate: ""
            }
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
        if (nextProps.discounts.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            discounts: {
              startDate: "",
              endDate: ""
            }
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
        if (nextProps.discounts.isOk === true ) {
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
      if (nextProps.discountsList.data.model !== state.discountsList) {
        discountsList = nextProps.discountsList.data.model;
        summary = nextProps.discountsList.data.summary;

        if (discountsList.length !== undefined || Object.keys(discountsList).length > 0) {
          return {discountsList, summary};
        }

      }
    } catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;
    this.setState({ loaderMessage: '', loaderStatus: ''});

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
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
  handleShowErrorModal = (serviceTypeDelete) => {
    this.setState({ serviceTypeDelete, isShowDeleteModal: true, discounts: {startDate: "", endDate: ""} });
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
  handleOnEdit = (discounts) => {
    scrollToTop();
    this.setState({ discounts, isEdit: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, serviceTypeDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(serviceTypeDelete, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { discountsList, summary } = this.state;
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

    this.props.dispatch(addServiceSection(params));
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

    this.props.dispatch(addServiceSection(getParams(model, summary)));
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderDiscount() {
    const { discountsList, summary } = this.state;
    const tableColumns = discountsTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleOnEdit);
    let disabledClearData = true;

    if (discountsList.length > 0) {
      disabledClearData = false;
    }

    return(
      <Fragment>
        <TableEdify key={3} data={discountsList} tableTitle={discountsTranslate.discountList} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} summary={summary}
          isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'Technicians'}
          />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, discounts, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'ServiceFees')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={discountsTranslate.pageTitle}
          paragraph={discountsTranslate.pageInstruction1+discountsTranslate.pageInstruction2+discountsTranslate.pageInstruction3+discountsTranslate.pageInstruction4+discountsTranslate.pageInstruction5+discountsTranslate.pageInstruction6}
        />
        <Grid htmlId="discount">
          <DiscountsForm
            props={this.props}
            discounts={discounts}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleOnSave}
            summary={summary}
          />
          {this.renderDiscount()}
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

Discounts.propTypes = {
  dispatch: PropTypes.func,
};

export default Discounts;
