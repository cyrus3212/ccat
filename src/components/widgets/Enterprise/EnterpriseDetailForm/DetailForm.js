import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockText from '../../../reusable/BlockText';
import Modal from 'react-bootstrap/lib/Modal';
import { Redirect } from 'react-router-dom';
import EnterpriseForm from '../../../widgets/Enterprise/EnterpriseForm';
import CompanyDeleteRowModal from '../../../reusable/DeleteRowModal';
import "../_enterpriseWidget.scss";
import { getUid } from '../../../../helpers/generateUid';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import TableEdify from '../../../reusable/TableEdify';
import SubmitButton from '@coxautokc/fusion-ui-components/lib/SubmitButton';
import { getEnterpriseDetail, updateEnterprise, addEnterprise } from '../../../../api/enterpriseApi';
import { saveDataTransaction, fetchDataTransaction } from '../../../../api/dataTransactionApi';
import entepriseTranslate from '../../../../translation/enterprise.json';
import commonTranslate from '../../../../translation/common.json';
import { Link } from 'react-router-dom';
import MessageAlertModal from '../../../reusable/MessageAlertModal';
import AddCompanyModal from '../../Company/AddCompanyModal';
import CopyOrExportDataModal from '../../CopyOrExportData/CopyOrExportDataModal';
import ImportDataModal from '../../ImportData/ImportDataModal';
import LoaderModal from '../../../reusable/LoaderModal';
import api from '../../../../utils/Http';
import {listTableColumns} from './TableColumns';
import ConfirmationModal from '../../../reusable/ConfirmationModal';
import { getMenuWorkbooks } from '../../../../api/menuApi';

class DetailForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterprise : {},
      stores: [],
      enterpriseCode: "",
      description: "",
      isShowDeleteModal: false,
      companyDeleteId: {},
      isAddCompanyActive: true,
      selectedCompany: {},
      enterpriseId: 0,
      submitLoading: false,
      isSave: false,
      currentPage: 0,
      isEditMode: true,
      isNew: true,
      isSaveButtonActive: true,
      isSaveEnterpriseSuccess: false,
      isShowAddCompanyModal: false,
      isShowMessageAlert: false,
      isShowLoaderModal: false,
      isShowExportDataModal: false,
      isShowCopyDataModal: false,
      isShowImportDataModal: false,
      dataTransactionStatus: "",
      loaderMessage: "",
      isRedirect: false,
      redirectUrl: "",
      isMoveInProgress: false,
      actionStatus: "",
      dataTransaction: {},
      paramsData: "",
      destination: {},
      confirmationMessage: "",
      isShowConfirmationModal: false,
      selectedDtid: "",
      messageAlert: '',
      menus: []
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    let _enterpriseCode = this.props.enterpriseId;
    if (_enterpriseCode !== undefined && _enterpriseCode !== 0) {
      this.props.dispatch(getEnterpriseDetail(_enterpriseCode));
      this.setState({
        isNew: false
      });
    }
  }

  static getDerivedStateFromProps(nextProps, state) {

    let submitLoading = state.submitLoading;
    let isShowMessageAlert = state.isShowMessageAlert;
    // let errorAddingMessage = state.errorAddingMessage;
    let messageAlert = state.messageAlert;
    let messageType = state.messageType;
    let isSave = state.isSave;
    let res = nextProps.enterprise.data;
    let isSaveButtonActive = state.isSaveButtonActive;
    let dataTransaction = nextProps.dataTransaction;
    let stores = nextProps.enterprise.data.stores
    // let menus = nextProps.menus.data
    let menus = state.menus;

    try {
      if (state.isSave === true) {
        if (nextProps.enterprise.isOk === true) {

          // Check if store has data, then will redirect to enterprise list
          if (!res.stores.length) {
            return {
              isSaveEnterpriseSuccess: true,
              enterpriseId: res.enterprise.id,
              enterpriseCode: res.enterprise.enterpriseCode,
              messageAlert: entepriseTranslate.successSaveEnterprise,
              isShowMessageAlert: true,
              messageType: "success",
              submitLoading: false
            }
          }
          else {
            return {
              submitLoading: submitLoading,
              enterpriseCode: res.enterprise.enterpriseCode,
              isRedirect: true,
              redirectUrl: "/admin"
            }
          }

        }
        // if failed
        else {
          return {
            enterprise: res.enterprise,
            stores: stores,
            submitLoading: false,
            isSave: false,
            messageType: 'error',
            messageAlert : res.enterprise.validationResult[0].message
          }
        }
      }
      else
      {
        submitLoading = false;
        let stores = [];
        if (res.enterprise.enterpriseCode !== "") {
          isSaveButtonActive = false;
        }

        // We loop the store data since API cannot save if we generated unique identifier on id object. So we added rid(row unique identifier) property assigned on table
        for (let i = 0; i < res.stores.length; i++) {
          let store = res.stores[i];
          store.cId = getUid();
          stores.push(store);
        }

        if (res.enterprise.validationResult.length)
        {
          isShowMessageAlert =  true;
          messageAlert = res.enterprise.validationResult[0].message;
          messageType = "error";
          isSave = false
        }

        return {
          enterpriseCode: res.enterprise.enterpriseCode,
          enterpriseId: res.enterprise.id,
          description: res.enterprise.description,
          enterprise: res.enterprise,
          submitLoading: submitLoading,
          isShowMessageAlert: isShowMessageAlert,
          messageAlert: messageAlert,
          messageType: messageType,
          isSave: isSave,
          isSaveButtonActive: isSaveButtonActive,
          dataTransaction : dataTransaction.data.destinationStores,
          stores: stores,
        }
      }
    }
    catch (e) {

    }

    return {...nextProps, ...state, dataTransaction, stores}
  }

  /**
   * Handle Row Delete
   */
  handleRowDel = (company) => {
    let companyID = this.state.companyDeleteId;
    let index = this.state.stores.indexOf(companyID);
    let companyList = this.state.stores;
    companyList.splice(index, 1);

    this.setState({
      stores : companyList,
      isShowDeleteModal: false,
      isAddCompanyActive: true
    });
  };

  /**
   * Handle Add new Row
   */
  handleAddEvent = (company) => {
    const { stores } = this.state;
    let activePage = document.getElementsByClassName("ant-pagination-item-active");
    if (activePage.length > 0)
    {
      if (parseInt(activePage[0].innerText, 10) > 1) {
        let lastRow = (activePage[0].innerText * 9) + 1;
        stores.splice(lastRow,0,company);
      }
      else {
        stores.splice(9,0,company);
      }
    } else {
      stores.push(company);
    }
  }

  /**
   * method that handle save enterprise
   */
  handleOnSaveCompany = (company) => {
    this.setState({
      // isAddCompanyActive: false,
      isEditMode: false
    });
    this.handleAddEvent(company);
  }

  /**
   * method that handle to disable the row based on status
   */
  handleAddCompany = () => {
    this.setState({
      isShowAddCompanyModal: true
    })
  }

  /**
   * method that handle to disable the row based on status
   */
  handleDisabledField = (data) => {
    return true;
  }

  /**
   * Disable Delete Button
   */
  handleDisabledDeleteBtn = (data) => {
    // if (data.statusText === entepriseTranslate.created || data.statusText === entepriseTranslate.scraped || data.statusText === entepriseTranslate.imported || data.statusText === entepriseTranslate.submitted) {
    return false;
  }

  /**
   * Disable Export To DMS Button
   */
  handleDisabledExportBtn = (data) => {
    // Activate/Enable Export button only if status is completed
    if (data.statusText === entepriseTranslate.completed) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Disable Import Button
   */
  handleDisabledImportBtn = (data) => {
    if (data.id) {
      if (data.statusText === entepriseTranslate.imported || data.statusText === entepriseTranslate.created || data.statusText === entepriseTranslate.inprogress) {
        return false;
      } else {
        return true;
      }
    }
    else {
      // if created and it was not saved then disabled the import button
      return true;
    }

  }

  /**
   * Disable Copy Data Button
   */
  handleDisabledCopyDataBtn = (data) => {
    if (data.statusText === entepriseTranslate.scraped || data.statusText === entepriseTranslate.imported || data.statusText === entepriseTranslate.inprogress || data.statusText === entepriseTranslate.completed || data.statusText === entepriseTranslate.exported ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * View Work Button
   */
  handleDisabledViewWorkbookBtn = (data) => {
    if (data.statusText === entepriseTranslate.created) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Disable Move In Progress Button
   */
  handleDisabledMoveInProgessBtn = (data) => {
    // Activate/Enable Move In Progress button if status is exported, completed
    if (data.statusText === entepriseTranslate.completed || data.statusText === entepriseTranslate.exported || data.statusText === entepriseTranslate.imported) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * method that handle if cell text input is on focus
   */
  handleCellOnFocus = (evt) => {
    this.setState({isEditMode: evt});
  }

  handleCompanyTable = (event, rowId, target) => {
    try {
      const { stores } = this.state;
      let selectedStore = stores.findIndex(selectedStore => selectedStore.cId == rowId)
      stores[selectedStore][target] = event.value;

      this.setState({
        stores : stores
      }, () => {
        for (let i = 0; i < stores.length; i++) {
          if (stores[i].dtid === "" || stores[i].companyNumber === "" || stores[i].name === "") {
            this.setState({
              isAddCompanyActive: false
            });
            break;
          } else {
            this.setState({
              isAddCompanyActive: true
            });
          }
        }
      });
    }
    catch (e) {

    }
  }

  /**
   * Method to handle OnChange on Enterprise Form
   */
  handleChangeEnterpriseForm = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });

    if (evt.target.name === "enterpriseCode" && evt.target.value === "") {
      this.setState({
        isSaveButtonActive: true
      });
    } else {
      this.setState({
        isSaveButtonActive: false
      });
    }
  }

  /**
   * Method that will call the api or service to update/save the enterprise
   */
  handleSaveEnterprise = () => {
    const { enterpriseId, stores, enterpriseCode, description } = this.state;
    let enterpriseDetail = {
      enterprise : {
        enterpriseCode: enterpriseCode,
        description: description,
        schemaId: 1,
        status: 0,
        id: enterpriseId
      },
      stores: stores
    }

    this.setState({
      isSave: true,
      submitLoading: true,
      messageType: '',
      messageAlert: ''
    });

    if (this.state.isNew === false) {
      this.props.dispatch(updateEnterprise(enterpriseDetail));
    } else {
      this.props.dispatch(addEnterprise(enterpriseDetail));
    }
  }

  /**
   * Method used to redirect to edit enterprise page
   */
  handleRedirectEditPage = () => {
    const { isNew, isSave, enterpriseCode } = this.state;
    const stores = this.state.stores || [];

    this.setState({
      isShowMessageAlert: false
    })

    try {
      if (isNew && isSave && stores.length === 0) {
        this.setState({
          isRedirect: true,
          redirectUrl: `/setup/enterprises/edit/${enterpriseCode}`
        });
      }
    } catch (e) {

    }
  }

  /**
   * Method used on selecting enterprise code from autosuggest
   */
  handleSelectEnterprise = (enterprise) => {
    const { enterpriseCode, description } = enterprise
    this.setState({ enterpriseCode, description });
  }

  /**
   * Method used on displaying error message from importing/exporting
   */
  showLoaderErrorStatus = (actionType) => {
    this.setState({
      dataTransactionStatus: "error",
      loaderMessage: `${actionType} data failed.`
    });
  }

  /****************************************************
   * ONCLICK ACTION BUTTON HANDLER
   *
   * copydata, import, export, move in progress, view workbook
   ***************************************************/

  /**
   * Method that handle on click view workbook action button
   */
  handleOnClickViewWorkbook = (event) => {
    const { enterpriseCode } = this.state;
    const { dtid } = event;
    this.setState({isRedirect: true, redirectUrl: `/dashboard/${enterpriseCode}/${dtid}`});
  }

  /**
   * Method that handle on click copy data action button
   */
  handleOnClickCopyData = (event) => {
    const { enterpriseCode } = this.state;
    const { dtid } = event;
    const paramsData = { enterpriseCode: enterpriseCode, dtid: dtid }

    this.props.dispatch(fetchDataTransaction({paramsData, storeURL: "/CopyData"}))
    this.setState({ copyData: event, enterpriseCode: enterpriseCode, isShowCopyDataModal:true })
    // this.componentDidMount();
  }

  /**
   * Method that handle on click move in progress action button
   */
  handleOnClickMoveInProgress = (event) => {
    const { dtid } = event;

    this.setState({
      selectedDtid: dtid,
      actionStatus: "moveInprogress",
      isShowConfirmationModal: true,
      confirmationMessage: "Changing the status to in progress allows the users to edit the data. Click yes to proceed."
    });
  }

  /**
   * Method that handle on click import data action button
   */
  handleOnClickImport = (event) => {
    // const { dtid } = event;

    // this.setState({
    //   selectedDtid: dtid,
    //   actionStatus: "import",
    //   isShowConfirmationModal: true,
    //   confirmationMessage: "Are you sure you want to import data? Click yes to proceed."
    // });

    this.setState({ importData: event, isShowImportDataModal:true })
  }

  // handleOnClickImportData = () => {
  //   console.log('test');
  // }

  /**
   * Method that handle on click export to DMS action button
   */
  handleOnClickExportToDms = (event) => {
    // const { dtid } = event;

    // this.setState({
    //   selectedDtid: dtid,
    //   actionStatus: "export",
    //   isShowConfirmationModal: true,
    //   confirmationMessage: "Are you sure you want to export to DMS? Click yes to proceed."
    // });

    this.setState({ exportData: event, isShowExportDataModal:true })
  }
  /****************************************************
   * END OF ONCLICK ACTION BUTTON HANDLER
   ***************************************************/

  /****************************************************
   * Method used to handle on confirmation modal
   ***************************************************/
  onConfirm = (action) => {
    const { selectedDtid, actionStatus } = this.state;

    if (action === "yes") {
      this.setState({
        isShowConfirmationModal: false,
        isShowLoaderModal: true,
      });

      if (actionStatus === "moveInprogress") {
        this.processMoveInprogress(selectedDtid);
      }

      if (actionStatus === "import") {
        this.processImport(selectedDtid);
      }

      if (actionStatus === "export") {
        this.processExportToDms(selectedDtid);
      }
    }

    this.setState({ isShowConfirmationModal: false });
  };
  /****************************************************
   * End of Method used to handle on confirmation modal
   ***************************************************/

  /****************************************************
   * PROCESS ACTION HANDLER
   ***************************************************/
  processMoveInprogress = (selectedDtid) => {
    const { enterpriseCode } = this.state;
    const paramsData = { enterpriseCode, dtid: selectedDtid }

    this.setState({
      loaderMessage: "Moving to in-progress. Please wait"
    });

    this.props.dispatch(saveDataTransaction({paramsData, storeURL: "/MoveToInprogress"}))

    setTimeout(() => {
      this.setState({
        dataTransactionStatus: "success" ,
        loaderMessage: "Moved to in-progress successfully."
      })
    }, 1000);
  }

  processImport = (selectedDtid) => {
    const http = api("settings");
    const { enterpriseCode } = this.state;

    this.setState({
      isShowLoaderModal: true,
      loaderMessage: "Importing Data. Please wait"
    });

    http.get(`/stores/ImportFromS3PerSection/${enterpriseCode}/${selectedDtid}`).then(res => {
        let result = res.data;

        if (result.isOk === true) {
          this.setState({
            dataTransactionStatus: "success" ,
            loaderMessage: "Import data successful."
          });
          this.componentDidMount();
        } else {
          this.showLoaderErrorStatus("Import");
          this.componentDidMount();
        }
    }).catch(err => {
      this.showLoaderErrorStatus("Import");
    });
  }

  processExportToDms = (selectedDtid) => {
    const http = api("settings");
    const { enterpriseCode } = this.state;

    this.setState({
      isShowLoaderModal: true,
      loaderMessage: "Exporting Data to DMS. Please wait"
    });

    http.get(`/stores/ExportToS3/${enterpriseCode}/${selectedDtid}`).then(res => {
      let result = res.data;
      if (result.isOk === true) {
        this.setState({
          dataTransactionStatus: "success" ,
          loaderMessage: 'Export data successful.'
        })
      } else {
        this.showLoaderErrorStatus("Export");
      }
    }).catch(err => {
      this.showLoaderErrorStatus("Export");
    });
  }
  /****************************************************
   * END OF PROCESS ACTION HANDLER
   ***************************************************/

  /**********************************************
   * Methods that handle display, close/hide modal
   *********************************************/

  /**
   * Display modal delete confirmation
   */
  handleShowDeleteModal = (company) => {
    this.setState({ companyDeleteId: company, isShowDeleteModal: true });
  }

  /**
   * method that handle to hide modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  }

  handleCloseImportDataModal = () => {
    this.setState({ isShowImportDataModal: false })
    this.componentDidMount();
  }

  handleCloseExportDataModal = () => {
    this.setState({ isShowExportDataModal: false })
    this.componentDidMount();
  }

  handleCloseCopyDataModal = () => {
    this.setState({ isShowCopyDataModal: false })
    this.componentDidMount();
  }

  handleConfirmationModalHide = () => {
    this.setState({ isShowConfirmationModal: false });
  }

  handleLoaderModalHide = () => {
    this.setState({
      isShowLoaderModal: false,
      dataTransactionStatus: "",
      loaderMessage: ""
    });

    this.componentDidMount();
  }

  handleCloseAddCompanyModal = () => {
    this.setState({ isShowAddCompanyModal: false })
  }
  /**********************************************
   * End of method  that handle close/hide modal
   *********************************************/

  render() {
    const { stores, dataTransaction, enterpriseCode, description, isRedirect, isAddCompanyActive, redirectUrl, messageAlert, messageType,
      dataTransactionStatus, loaderMessage, copyData, exportData, importData, confirmationMessage, isShowConfirmationModal, submitLoading, menus } = this.state;

    if (isRedirect) {
      return <Redirect to={redirectUrl} />;
    }

    stores === undefined ? true : false

    const tableColumns = listTableColumns(this.handleDisabledField, this.handleCompanyTable, this.handleCellOnFocus,
      this.handleDisabledViewWorkbookBtn, this.handleDisabledImportBtn, this.handleDisabledExportBtn, this.handleDisabledCopyDataBtn, this.handleDisabledMoveInProgessBtn, this.handleDisabledDeleteBtn,
      this.handleOnClickViewWorkbook, this.handleOnClickImport, this.handleOnClickExportToDms, this.handleOnClickCopyData, this.handleOnClickMoveInProgress, this.handleShowDeleteModal);

    return (
      <Grid htmlId="GridExample">
        <Row>
          <Col md={12}>
            <BlockText
              title={entepriseTranslate.welcomeWizard}
              paragraph={entepriseTranslate.aboutSetupEnterprise}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <EnterpriseForm
              enterprise={this.state.enterprise}
              code={enterpriseCode}
              description={description}
              onChangeEnterpriseForm={this.handleChangeEnterpriseForm}
              onSelectEnterprise={this.handleSelectEnterprise}
              messageType={messageType}
              messageAlert={messageAlert}
              disabledSearchInput={this.props.enterpriseId ? true : false}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <TableEdify data={stores || []} tableTitle="Company List" columns={tableColumns} htmlId="enterpriseList" scrollY={650} scrollX={630} />
          </Col>
        </Row>

        <Row>
          <Col md={12} className="add-row-button">
            <SubmitButton
              htmlId="addCompany"
              onClick={this.handleAddCompany}
              buttonStyle="link" className="icon-link-button"
              disabled={!isAddCompanyActive || stores === undefined ? true : false}
            >
              <i className="fas fa-plus" /> {commonTranslate.addCompany}
            </SubmitButton>
          </Col>
        </Row>

        <Row className="show-grid footer-options">
          <Col md={12}>
            <Link className="btn btn-link back-button" to="/admin">{commonTranslate.back}</Link>
            <SubmitButton
              htmlId="saveButton" buttonStyle="primary"
              onClick={this.handleSaveEnterprise}
              loading={submitLoading}
              disabled={this.state.isSaveButtonActive}
              loadingText={commonTranslate.pleaseWait}
            >{commonTranslate.save}</SubmitButton>
          </Col>
        </Row>

        <Modal show={this.state.isShowAddCompanyModal} onHide={this.handleCloseAddCompanyModal}>
          <AddCompanyModal onClickAddCompany={this.handleOnSaveCompany} stores={stores} onClickClose={this.handleCloseAddCompanyModal} enterpriseCode={enterpriseCode}/>
        </Modal>

        <Modal show={this.state.isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <CompanyDeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>

        <Modal show={this.state.isShowMessageAlert} onHide={this.handleRedirectEditPage}>
          <MessageAlertModal onHide={this.handleRedirectEditPage} messageAlert={messageAlert} messageType={messageType}/>
        </Modal>

        <Modal show={this.state.isShowLoaderModal}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={dataTransactionStatus} loaderMessage={loaderMessage}/>
        </Modal>

        <Modal show={this.state.isShowExportDataModal}>
          <CopyOrExportDataModal onClickClose={this.handleCloseExportDataModal} title={'Export'} destinations={dataTransaction} stores={stores} resourceData={exportData} dispatch={this.props.dispatch} enterpriseCode={enterpriseCode}/>
        </Modal>

        <Modal show={this.state.isShowCopyDataModal}>
          <CopyOrExportDataModal onClickClose={this.handleCloseCopyDataModal} title={'Copy'} destinations={dataTransaction} stores={stores} resourceData={copyData} dispatch={this.props.dispatch} enterpriseCode={enterpriseCode}/>
        </Modal>

        <Modal show={this.state.isShowImportDataModal}>
          <ImportDataModal onClickClose={this.handleCloseImportDataModal} title={'Import'} destinations={dataTransaction} stores={stores} resourceData={importData} dispatch={this.props.dispatch} enterpriseCode={enterpriseCode}/>
        </Modal>

        <Modal show={isShowConfirmationModal} onHide={this.handleConfirmationModalHide}>
          <ConfirmationModal confirmationMessage={confirmationMessage} onConfirm={this.onConfirm}/>
        </Modal>

      </Grid>
    );
  }

}

DetailForm.propTypes = {
  enterpriseId: PropTypes.any,
  dispatch: PropTypes.func
};

DetailForm.displayName = 'Enterprise Detail Form Page';

export default DetailForm;
