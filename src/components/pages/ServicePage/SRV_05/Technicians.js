import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import techTranslate from '../../../../translation/service/technicians.json';
import BlockText from '../../../reusable/BlockText';
import TechniciansForm from '../../../widgets/Service/Technicians';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getServiceList } from '../../../../api/service/serviceSectionListApi';
import { addServiceSection, removeService } from '../../../../api/service/serviceSectionApi';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import commonTranslate from '../../../../translation/common.json';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { updateTableList } from '../../../../helpers/updateTableList';
import { renderSuccessAlertMessage, renderErrorAlertMessage } from '../../../../helpers/messageAlert';
import { getUrlWithParams } from '../../../../helpers/urlParam';

class Technicians extends Component {
  constructor(props) {
    super(props);

    this.state = {
      techniciansList: [],
      techniciansListCopy: [],
      technicians: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      isEdit: false,
      summary: {},
      isMarkAsComplete: false,
      isSaveAndContinue: false,
      limit: 15,
      page: 1,
      sortBy: '',
      sortType: '',
      searchVal: '',
      totalPages: 0
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    const url = getUrlWithParams(this.props.match, this.state)
    this.props.dispatch(getServiceList(url));
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let techniciansList = state.techniciansList;
    let techniciansListCopy = state.techniciansListCopy;
    let totalPages = state.totalPages;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onEdit === true || state.onSave === true) {
        if (nextProps.technicians.isOk === false ) {
          return {
            loaderStatus: state.onSave ? "" : "error",
            onSave: false,
            onEdit: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            technicians: nextProps.technicians.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            technicians: nextProps.technicians.data.model[0]
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
        if (nextProps.technicians.isOk === true ) {
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

    /**
     * Handle response on mark as complete
     */
    try {
      if (state.onMarkAsComplete === true) {
        if (nextProps.technicians.isOk === true ) {
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
      if (nextProps.techniciansList.data.model !== state.techniciansList) {
        techniciansList = nextProps.techniciansList.data.model;
        techniciansListCopy = nextProps.techniciansList.data.model;
        totalPages = nextProps.techniciansList.data.totalPages;
        summary = nextProps.techniciansList.data.summary;

        if (techniciansList.length !== undefined || Object.keys(techniciansList).length > 0) {
          return {techniciansList, summary, techniciansListCopy, totalPages};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    let { loaderStatus, technicians, techniciansList } = this.state;

    /**
    * Update List with single updated Row
    */
    if (prevState.onSave === true && loaderStatus !== "" || prevState.onEdit === true && loaderStatus !== "") {
      let updatedList = updateTableList(technicians, techniciansList);
      this.setState({ techniciansList: updatedList, onEdit: false, onSave: false });
      setTimeout(() => {
        this.setState({ technicians: {}, loaderStatus: '' })
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
    const { summary, techniciansList } = this.state;
    this.setState({ onSave: true });

    let params = {
      model : techniciansList,
      summary
    }

    this.props.dispatch(addServiceSection(params));
  }

  handleSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  handleChangeInput = (event, id, target) => {
    const { techniciansList } = Object.assign({}, this.state);
    let selectedRow = techniciansList.findIndex(selectedRow => selectedRow.id == id);

    techniciansList[selectedRow][target] = event.value;
    this.setState({ techniciansList });
  }

  handleOnBlur = (event, id, target) => {
    const { summary } = this.state;
    const { techniciansList } = Object.assign({}, this.state);
    let selectedRow = techniciansList.findIndex(selectedRow => selectedRow.id == id);

    let model = techniciansList[selectedRow];
    let params = { model:[model], summary }

    this.setState({ onEdit: true });

    this.props.dispatch(addServiceSection(params));
  }

  handleAddItem = (technicians) => {
    const { summary } = this.state;
    this.setState({ technicians, onSave: true });
    this.props.dispatch(addServiceSection(getParams(technicians, summary)));
  }

  handleShowErrorModal = (techniciansRowDelete) => {
    this.setState({ techniciansRowDelete, isShowDeleteModal: true });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, techniciansRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removeService(getParams(techniciansRowDelete, summary)));
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
      model: [{}],
      summary
    }

    this.props.dispatch(addServiceSection(params));
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

  clearData = () => {
    this.setState({
      onMarkAsComplete: false
    })
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      technicians: {}
    })
  }

  updateData = (data, dataCopy) => {
    this.setState({
      techniciansList: data,
      techniciansListCopy: dataCopy
    });
  }

  handleClearlist = () => {
    this.setState({ searchVal: '', page: 1}, () => {
      this.componentReload();
    });
  }

  handleSearch = (searchVal) => {
    this.setState({ loadingState: true, page: 1, searchVal }, () => {
      this.componentReload();
    });
  }

  render() {
    const { isSaveAndContinue, isShowLoaderModal, isShowDeleteModal, loaderStatus, loaderMessage,
      techniciansList, techniciansListCopy, technicians, summary, isMarkAsComplete, totalPages, searchVal } = this.state;

    // if (isMarkAsComplete === true) {
    //   window.location.reload(true);
    // }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Discounts')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={techTranslate.pageTitle}
          paragraph=""
        />
        <Grid htmlId="technicians">
          <TechniciansForm
            summary={summary}
            techniciansList={techniciansList}
            techniciansListCopy={techniciansListCopy}
            technicians={technicians}
            totalPages={totalPages}
            onChangeInput={this.handleChangeInput}
            onBlur={this.handleOnBlur}
            onAddItem={this.handleAddItem}
            onSave={this.handleSaveContinue}
            onHideAddModal={this.handleLoaderModalHide}
            isAddStatus={loaderStatus}
            onClearLoaderProps={this.handleClearLoaderProps}
            onShowErrorModal={this.handleShowErrorModal}
            props={this.props}
            searchVal={searchVal}
            onMarkAsComplete={this.handleMarkAsComplete}
            match={this.props.match}
            updateData={this.updateData}
            onSearch={this.handleSearch}
            onClear={this.handleClearlist}
            componentReload={this.componentReload}
            clearData={this.clearData}
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

Technicians.propTypes = {
  techniciansList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default Technicians;
