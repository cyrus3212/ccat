import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import taxGroupTranslate from '../../../../translation/accounting/taxGroup.json';
import BlockText from '../../../reusable/BlockText';
import TaxGroupSetupsForm from '../../../widgets/Accounting/TaxGroupSetups/TaxGroupSetupsForm';
import TableEdify from '../../../reusable/TableEdify';
import commonTranslate from '../../../../translation/common.json';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection, removeAccounting } from '../../../../api/accounting/accountingSectionApi';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import Footer from '../../../common/Footer';
import { Redirect } from 'react-router-dom';
import {getSectionLink} from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class TaxGroup extends Component {
  _isMounted = false
  constructor(props) {
    super(props);

    this.state = {
      taxGroup: [],
      taxGroupList: [],
      taxGroupDetail: {},
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      taxGroupRowDelete: {},
      onSave: false,
      summary: {},
      isMarkAsComplete: false,
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
    let taxGroupList = state.taxGroupList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.taxGroup.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: taxGroupTranslate.saveError,
          taxGroupDetail: nextProps.taxGroup.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'success',
          onSave: false,
          loaderMessage: taxGroupTranslate.saveSuccess,
          taxGroupDetail: {},
          onMarkAsComplete: false
        }
      }
    }

    // /**
    //  * Handle response on Delete data
    //  */
    if (state.onDelete === true) {
      if (nextProps.taxGroup.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: taxGroupTranslate.deleteSuccess,
          taxGroupDetail: {}
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: taxGroupTranslate.deleteError,
          taxGroupDetail: nextProps.taxGroup.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.taxGroup.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage
        }
      } else {
        return {
          loaderStatus: 'error',
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage
        }
      }
    }

    try {
      if (nextProps.taxGroupList.data.model !== state.taxGroupList) {
        taxGroupList = nextProps.taxGroupList.data.model;
        summary = nextProps.taxGroupList.data.summary;

        if (taxGroupList.length !== undefined || Object.keys(taxGroupList).length > 0) {
          return {taxGroupList, summary};
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
   * method that handle add/save
   */
  handleSave = () => {
    const { summary, taxGroupList } = this.state;
    this.setState({ onSave: true });
    let params = {
      model : taxGroupList,
      summary
    }
    this.props.dispatch(addAccountingSection(params));
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { summary } = this.state;
    summary.isCompleted = status;
    this.setState({
      loaderStatus: "",
      onMarkAsComplete: true,
      isShowLoaderModal: true,
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

  handleChangeInput = (event, id, target) => {
    const { taxGroupList } = Object.assign({}, this.state);
    let selectedRow = taxGroupList.findIndex(selectedRow => selectedRow.id == id);
    taxGroupList[selectedRow][target] = event.value;
    this.setState({ taxGroupList });
  }

  handleOnBlur = () => {
    this.handleSave()
  }

  handleAddItem = (paymentMethod) => {
    const { summary } = this.state;
    this.setState({ onSave: true });

    this.props.dispatch(addAccountingSection(getParams(paymentMethod, summary)));
  }

  handleShowErrorModal = (taxGroupRowDelete) => {
    this.setState({ taxGroupRowDelete, isShowDeleteModal: true, isEdit: false, taxGroupDetail: {} });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, taxGroupRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeAccounting(getParams(taxGroupRowDelete, summary)));
  }

  handleEdit = (taxGroupDetail) => {
    scrollToTop();

    this.setState({
      taxGroupDetail,
      isEdit: true
    })
  }

  /**
   * method that handle save/update data
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
  };

  /**
   * Method that handle save and continue to next section
   */
  handleSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  renderTaxGroupList = () => {
    const { taxGroupList } = this.state;
    const columns = [
      { title: 'Tax Group State',   dataIndex: 'groupDesc',    maxLength: 20, refId:'cId', type: "label", columnSortable: false },
      { title: 'Date',              dataIndex: 'createdDate',  refId:'cId', type: "label", columnSortable: false},
      { title: 'Action',            dataIndex: 'extraData',   type: "actionButtons",  columnSortable: false,
                actionButtons: [
                  { htmlId: "editAccount",  buttonStyle: "primary", className: "btn btn-primary",     text: commonTranslate.edit,   type: "button", onClick:this.handleEdit},
                  { htmlId: "deleteButton", buttonStyle: "danger",  className: "table-delete-button", text: commonTranslate.delete, isDisabled: this.handleDisabledDeleteButton, onClick: this.handleShowErrorModal, type: "button" }
                ]
      },
    ]

    return (
      <Fragment>
        <Row className="taxGroupItems">
          <Col md={12}>
            <TableEdify className="taxGroupItems" key={3} data={taxGroupList} tableTitle="Tax Group Items" columns={columns} scrollY={650} scrollX={630} />
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    const { taxGroupDetail, isShowDeleteModal, isEdit, isShowLoaderModal, loaderStatus, loaderMessage, isSaveAndContinue, summary, taxGroupList } = this.state;
    let disabledClearData = true;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'CashDrawers')} />;
    }

    try {
      if (taxGroupList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
      <Fragment>
        <BlockText
          title={taxGroupTranslate.pageTitle}
          paragraph={taxGroupTranslate.pageInstruction}
        />
        <Grid htmlId="taxGroup">
          <TaxGroupSetupsForm key="taxGroupSetupForm" summary={summary} taxGroupDetail={taxGroupDetail} isEdit={isEdit} onSave={this.handleOnSave} props={this.props}/>
          {this.renderTaxGroupList()}
          <Footer match={this.props.match} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleSaveContinue} linkTo={'GeneralDepartment'}
            disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.componentReload}
            summary={summary} />
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

TaxGroup.propTypes = {
  taxGroup: PropTypes.any.isRequired,
  taxGroupList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default TaxGroup;
