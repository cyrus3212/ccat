import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import arCustomerTranslate from '../../../../translation/accounting/arCustomer.json';
import BlockText from '../../../reusable/BlockText';
import ARCustomerForm from '../../../widgets/Accounting/ARCustomer';
import TableEdify from '../../../reusable/TableEdify';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getSectionLink } from '../../../../helpers/routesHelper';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import Footer from '../../../common/Footer';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';

class ARCustomer extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      arCustomerList: [],
      customerTypeOptions: [],
      arCustomer: {},
      summary: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      onSave: false,
      customerRowDelete: {},
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
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let arCustomerList = state.arCustomerList;
    let customerTypeOptions = state.customerTypeOptions;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.arCustomer.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: arCustomerTranslate.saveError,
          arCustomer: nextProps.arCustomer.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'success',
          onSave: false,
          loaderMessage: arCustomerTranslate.saveSuccess,
          arCustomer: {},
          onMarkAsComplete: false
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.arCustomer.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: arCustomerTranslate.deleteSuccess,
          arCustomer: {}
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: arCustomerTranslate.deleteError,
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.arCustomer.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
          arCustomer: {}
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
          arCustomer: nextProps.arCustomer.data.model[0]
        }
      }
    }

    try {
      if (nextProps.arCustomerList.data.model !== state.arCustomerList) {
        arCustomerList = nextProps.arCustomerList.data.model;
        summary = nextProps.arCustomerList.data.summary;
        customerTypeOptions = nextProps.arCustomerList.data.customerTypeOptions;

        if (arCustomerList.length !== undefined || Object.keys(arCustomerList).length > 0) {
          return {arCustomerList, summary, customerTypeOptions};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaderStatus } = this.state;
    if (prevState.onSave === true && loaderStatus === 'success') {
      this.setState({ onSave: false })
      this.componentReload();
    }
  }

  /**
   * method that handle edit row
   */
  handleEdit = (arCustomer) => {
    scrollToTop();
    this.setState({ arCustomer, isEdit: true });
  }

  /**
   * method that handle add/save bank
   */
  handleOnSave = (model) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
  }

  /**
   * method that show error modal
   */
  handleShowErrorModal = (customerRowDelete) => {
    this.setState({ customerRowDelete, isShowDeleteModal: true, isEdit: false, onMarkAsComplete: false, arCustomer: {} });
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
    const { summary, customerRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(customerRowDelete, summary)));
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

  renderArCustomerTypeList = () => {
    const { arCustomerList } = this.state
    const columns = [
      { title: 'Description',         dataIndex: 'description',  refId: 'id', type: "label",          columnSortable: false, },
      { title: 'A/R Account Number',  dataIndex: 'arAccount',    refId: 'id', type: "label",          columnSortable: false,},
      { title: 'Action',              dataIndex: 'extraData',    type: "actionButtons",  columnSortable: false,
                actionButtons: [
                  { htmlId: "editAccount",  buttonStyle: "primary", className: "btn btn-primary",     text: commonTranslate.edit,   type: "button",  onClick : this.handleEdit},
                  { htmlId: "deleteButton", buttonStyle: "danger",  className: "table-delete-button", text: commonTranslate.delete, isDisabled: this.handleDisabledDeleteButton, onClick: this.handleShowErrorModal, type: "button" }
                ]
      },
    ]

    return(
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify key={3} data={arCustomerList} tableTitle={arCustomerTranslate.arCustomerTypeList} columns={columns} scrollY={536} scrollX={530} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { arCustomer, isEdit, customerTypeOptions, isShowLoaderModal, loaderMessage, loaderStatus, isShowDeleteModal, isSaveAndContinue, arCustomerList, summary } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'APVendorTypes')} />;
    }

    try {
      if (arCustomerList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <BlockText
          title={arCustomerTranslate.pageTitle}
          paragraph={arCustomerTranslate.pageInstruction}
        />
        <Grid htmlId="arCustomer">
          <ARCustomerForm
            arCustomer={arCustomer}
            isEdit={isEdit}
            customerTypeOptions={customerTypeOptions}
            props={this.props}
            onSave={this.handleOnSave}
            onSaveContinue={this.handleSaveContinue}
            loaderStatus={loaderStatus}
          />
          {this.renderArCustomerTypeList()}
          <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete}
            onSaveAndContinue={this.handleSaveContinue} linkTo={'CashReceipt'} summary={summary}
            disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.componentReload}
          />
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

ARCustomer.propTypes = {
  arCustomer: PropTypes.any.isRequired,
  arCustomerList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default ARCustomer;
