import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import viTranslate from '../../../../translation/accounting/vehicleInventory.json';
import BlockText from '../../../reusable/BlockText';
import VehicleInventoryForm from '../../../widgets/Accounting/VehicleInventory';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection } from '../../../../api/accounting/accountingSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';

class VehicleInventory extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      vehicleInventoryList: [],
      vehicleInventory: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      onSave: false,
      isMarkAsComplete: false,
      hasError: false
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
    let vehicleInventoryList = state.vehicleInventoryList;
    let summary = state.summary;
    let vehicleInventory = state.vehicleInventory;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.vehicleInventory.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: viTranslate.saveError,
          vehicleInventory: nextProps.vehicleInventory.data.model[0],
          onMarkAsComplete: false
        }
      }
      else {
        return {
          loaderStatus: 'success',
          isMarkAsComplete: false,
          loaderMessage: viTranslate.saveSuccess,
          vehicleInventory: nextProps.vehicleInventory.data.model[0],
          onMarkAsComplete: false
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.vehicleInventory.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: viTranslate.deleteSuccess,
          vehicleInventory: {}
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: viTranslate.deleteError,
          vehicleInventory: nextProps.vehicleInventory.data.model[0]
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.vehicleInventory.isOk === true ) {
        return {
          loaderStatus: 'success',
          hasError: false,
          loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
          vehicleInventory: nextProps.vehicleInventory.data.model[0],
        }
      }
      else {
        return {
          loaderStatus: 'error',
          hasError: true,
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
          vehicleInventory: nextProps.vehicleInventory.data.model[0]
        }
      }
    }

    try {
      if (nextProps.vehicleInventoryList.data.model !== state.vehicleInventoryList) {
        vehicleInventoryList = nextProps.vehicleInventoryList.data.model;
        summary = nextProps.vehicleInventoryList.data.summary;
        vehicleInventory = nextProps.vehicleInventoryList.data.model[0] || {};

        if (vehicleInventoryList.length !== undefined || Object.keys(vehicleInventoryList).length > 0) {
          return {vehicleInventoryList, summary, vehicleInventory};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle general dept save
  */
  handleOnSave = (data) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    let params = {
      model: [
        data
      ],
      summary
    }

    this.props.dispatch(addAccountingSection(params));
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = (model, status) => {
    const { summary } = this.state;
    summary.isCompleted = status;
    this.setState({
      loaderStatus: "",
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
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
        onMarkAsComplete: false,
        loaderStatus: ''
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

      // this.componentReload();
    };

    this.setState({ loaderStatus: '' });
  }

  render() {
    const { vehicleInventory, loaderStatus, loaderMessage, isShowLoaderModal, summary, isSaveAndContinue, hasError } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'OptionalFields')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={viTranslate.pageTitle}
          paragraph={viTranslate.pageInstruction}
        />
        <Grid htmlId="vehicleInventory">
          <VehicleInventoryForm
            summary={summary}
            props={this.props}
            vehicleInventory={vehicleInventory}
            onMarkAsComplete={this.handleMarkAsComplete}
            onSaveContinue={this.handleOnSave}
            onClearDataComplete={this.componentReload}
            hasError={hasError}
          />
        </Grid>
        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>
      </Fragment>
    )
  }
}

VehicleInventory.propTypes = {
  vehicleInventory: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default VehicleInventory;
