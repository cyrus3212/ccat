
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_05.scss';
import counterpersonsTranslate from '../../../../translation/parts/counterpersons.json';
import CounterpersonsForm from '../../../widgets/Parts/Counterpersons'
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { addPartsSection, removeParts } from '../../../../api/parts/partsSectionApi';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';

class Counterpersons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counterpersonList: [],
      counterperson: {},
      counterpersonRowDelete: {},
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
    let counterpersonList = state.counterpersonList;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.counterperson.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            counterperson: nextProps.counterperson.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            counterperson: {}
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
        if (nextProps.counterperson.isOk === true ) {
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
        if (nextProps.counterperson.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
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
      if (nextProps.counterpersonList.data.model !== state.counterpersonList) {
        counterpersonList = nextProps.counterpersonList.data.model;
        summary = nextProps.counterpersonList.data.summary;

        if (counterpersonList.length !== undefined || Object.keys(counterpersonList).length > 0) {
          return {counterpersonList, summary};
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
      this.setState({ loaderStatus: '', onEdit: false })
    }
  }

  handleChangeInput = (event, id, target) => {
    const { counterpersonList } = Object.assign({}, this.state);
    let selectedRow = counterpersonList.findIndex(selectedRow => selectedRow.id == id);

    counterpersonList[selectedRow][target] = event.value;
    this.setState({ counterpersonList });
  }

  handleChangeSave = (event, id, target) => {
    const { counterpersonList } = Object.assign({}, this.state);
    let selectedRow = counterpersonList.findIndex(selectedRow => selectedRow.id == id);

    counterpersonList[selectedRow][target] = event.value;
    this.setState({ counterpersonList });
    this.handleSave();
  }

  /**
  * method that handle save/update data
  */
  handleSave = () => {
    const { summary, counterpersonList } = this.state;
    this.setState({ onSave: true, onEdit: true });

    let params = {
      model : counterpersonList,
      summary
    }

    this.props.dispatch(addPartsSection(params));
  }

  handleAddItem = (account) => {
    const { summary } = this.state;
    this.setState({ onSave: true });

    this.props.dispatch(addPartsSection(getParams(account, summary)));
  }

  handleOnBlur = () => {
    this.handleSave()
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
  handleShowErrorModal = (counterpersonRowDelete) => {
    this.setState({ counterpersonRowDelete, isShowDeleteModal: true });
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
    const { summary, counterpersonRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeParts(getParams(counterpersonRowDelete, summary)));
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      counterperson: {}
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
  * Method that handle save and continue to next section
  */
  handleOnSaveContinue = () => {
    this.setState({
      isSaveAndContinue: true
    });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
    this.setState({
      onMarkAsComplete: false
    })
  }

  render() {
    const { isSaveAndContinue, counterpersonList, counterperson, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage, isEdit, summary } = this.state;
    let disabledClearData = true;

    if (counterpersonList.length > 0) {
      disabledClearData = false;
    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'RestockingCharge')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={counterpersonsTranslate.pageTitle}
          paragraph={counterpersonsTranslate.pageInstruction}
        />
        <Grid className="counterpersons">
          <CounterpersonsForm
            counterpersonList={counterpersonList}
            counterperson={counterperson}
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
          />
          <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.handleOnClearDataComplete} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'StockingGroups'} />
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

Counterpersons.propTypes = {
  counterperson: PropTypes.any.isRequired,
  counterpersonList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default Counterpersons;
