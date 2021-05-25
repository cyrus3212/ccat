import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import generalTranslate from '../../../../translation/payroll/generalSetup.json';
import GeneralSetupForm from '../../../widgets/Payroll/GeneralSetup';
import commonTranslate from '../../../../translation/common.json';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection } from '../../../../api/payroll/payrollSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import BlockText from '../../../reusable/BlockText';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class GeneralSetupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalSetupList: [],
      generalSetup: {},
      workWeekOptions:[],
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      onSave: false,
      hasError: false
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getPayrollList(getWorkbookUrl(this.props.match)));
  }

  static getDerivedStateFromProps(nextProps, state) {
    let generalSetupList = state.generalSetupList;
    let summary = state.summary;
    let generalSetup = state.generalSetup;
    let workWeekOptions = state.workWeekOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.generalSetup.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            generalSetup : nextProps.generalSetup.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            generalSetup : nextProps.generalSetup.data.model[0]
            // isSaveAndContinue: true,
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
        if (nextProps.generalSetup.isOk === true ) {
          return {
            loaderStatus: 'success',
            hasError: false,
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            generalSetup : nextProps.generalSetup.data.model[0]
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            hasError: true,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            generalSetup : nextProps.generalSetup.data.model[0]
          }
        }

      }
    }
    catch (e) {

    }

    try {
      if (nextProps.generalSetupList.data.model !== state.generalSetupList) {
        generalSetupList = nextProps.generalSetupList.data.model;
        summary = nextProps.generalSetupList.data.summary;
        workWeekOptions = nextProps.generalSetupList.data.workWeekOptions;
        generalSetup = nextProps.generalSetupList.data.model[0] || {};

        if (generalSetupList.length !== undefined || Object.keys(generalSetupList).length > 0) {
          return {generalSetupList, summary, generalSetup, workWeekOptions};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status, data) => {
    const { summary, generalSetup } = this.state;
    summary.isCompleted = status;
    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      model: [data],
      summary
    }

    this.props.dispatch(addPayrollSection(params));
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete, onSave, loaderStatus } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;
    this.setState({ loaderMessage: "", loaderStatus: ""});

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
    }
    else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });
    }
  }

  /**
   * method that handle general dept save
  */
  handleOnSave = (model, isValid) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderMessage: commonTranslate.savingRecordMessage,
      loaderStatus: ""
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  render() {
    const { generalSetup, generalSetupList, workWeekOptions, loaderStatus, loaderMessage, isShowLoaderModal, summary, isSaveAndContinue, hasError } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'DeductionCode')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={generalTranslate.pageTitle}
          paragraph=""
        />

        <GeneralSetupForm
          summary={summary}
          hasError={hasError}
          props={this.props}
          generalSetupList={generalSetupList}
          generalSetup={generalSetup}
          workWeekOptions={workWeekOptions}
          onSave={this.handleOnSave}
          onMarkAsComplete={this.handleMarkAsComplete}
          componentReload={this.componentReload}
        />

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

      </Fragment>
    )
  }
}

GeneralSetupPage.propTypes = {
  generalSetup: PropTypes.any.isRequired,
  generalSetupList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default GeneralSetupPage;
