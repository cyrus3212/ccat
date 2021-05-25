
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_10.scss';
import spOrderTranslate from '../../../../translation/parts/specialOrder.json';
import SpecialOrderForm from '../../../widgets/Parts/SpecialOrder'
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { addPartsSection, removeParts } from '../../../../api/parts/partsSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class SpecialOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specialOrderList: [],
      specialOrderRowDelete: {},
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
    let specialOrderList = state.specialOrderList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.specialOrder.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            specialOrder: []
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
        if (nextProps.specialOrderList.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage
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
        if (nextProps.specialOrderList.isOk === true ) {
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
      if (nextProps.specialOrderList.data.model !== state.specialOrderList) {
        specialOrderList = nextProps.specialOrderList.data.model;
        summary = nextProps.specialOrderList.data.summary;

        if (specialOrderList.length !== undefined || Object.keys(specialOrderList).length > 0) {
          return {specialOrderList, summary};
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
      this.setState({ onSave: false, specialOrder: [] });
      this.componentReload();
    }

    /**
    * Show Alert Message on success save
    */
    if (prevState.onEdit === true && loaderStatus === 'success') {
      renderSuccessAlertMessage('Update Success');
      this.setState({ loaderStatus: '', onSave: false, onEdit: false })
    }

    /**
    * Show Alert Message on error save
    */
    if (prevState.onEdit === true && loaderStatus === 'error') {
      renderErrorAlertMessage('Update Failed');
      this.setState({ loaderStatus: '', onEdit: false });
    }
  }

  handleChangeInput = (event, id, target) => {
    const { specialOrderList } = Object.assign({}, this.state);
    let selectedRow = specialOrderList.findIndex(selectedRow => selectedRow.id == id);

    specialOrderList[selectedRow][target] = event.value;
    this.setState({ specialOrderList });
  }

  /**
  * method that handle save/update data
  */
  handleSave = () => {
    const { summary, specialOrderList } = this.state;
    this.setState({ onSave: true, onEdit: true });

    let params = {
      model : specialOrderList,
      summary
    }

    this.props.dispatch(addPartsSection(params));
  }

  handleAddItem = (account) => {
    const { summary } = this.state;
    this.setState({ onSave: true });

    this.props.dispatch(addPartsSection(getParams(account, summary)));
  }

  /**
   * Handle Change On Cell Text Input
   */
  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { specialOrderList } = Object.assign({}, this.state);``
    let selectedRow = specialOrderList.findIndex(selectedRow => selectedRow.id == id);

    specialOrderList[selectedRow][target] = event.value;
    this.setState({ specialOrderList });

    let model = specialOrderList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addPartsSection(params));
  }

  /**
   * Handle Change On Cell Radio Button
   */
  handleChangeRadio = (event, id, target) => {
    const { specialOrderList, summary } = Object.assign({}, this.state);
    let selectedRow = specialOrderList.findIndex(selectedRow => selectedRow.id == id);

    specialOrderList[selectedRow][target] = event.value;
    let model = specialOrderList[selectedRow];

    let params = { model:[model], summary }

    this.setState({ specialOrderList, onEdit: true });

    this.props.dispatch(addPartsSection(params));
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
  handleShowErrorModal = (specialOrderRowDelete) => {
    this.setState({ specialOrderRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, specialOrderRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(specialOrderRowDelete, summary)));
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, loaderStatus: '', isEdit: false });
  };

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      specialOrder: []
    })
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
  * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
    this.setState({
      onMarkAsComplete: false
    })
  }

  render() {
    const { isSaveAndContinue, specialOrderList, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;
    let disabledClearData = true;

    if (specialOrderList.length > 0) {
      disabledClearData = false;
    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'review')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={spOrderTranslate.pageTitle}
          paragraph=""
        />
        <Grid className="specialOrders">
          <SpecialOrderForm
            specialOrderList={specialOrderList}
            props={this.props}
            isEdit={isEdit}
            onSave={this.handleSave}
            summary={summary}
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
          <Footer match={this.props.match} disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.handleOnClearDataComplete}
            onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'PartKits'} summary={summary}/>
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

SpecialOrder.propTypes = {
  specialOrder: PropTypes.any.isRequired,
  specialOrderList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default SpecialOrder;
