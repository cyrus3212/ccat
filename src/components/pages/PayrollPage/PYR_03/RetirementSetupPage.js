import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import retirementTranslate from '../../../../translation/payroll/retirementSetup.json';
import commonTranslate from '../../../../translation/common.json';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection } from '../../../../api/payroll/payrollSectionApi';
import RetirementSetupForm from '../../../widgets/Payroll/RetirementSetup'
import BlockText from '../../../reusable/BlockText';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class RetirementSetupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      retirementSetupList: [],
      retirementSetup: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      summary: {},
      deductionOptions: [],
      onSave: false,
      hasError: false,
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
    let retirementSetupList = state.retirementSetupList;
    let retirementSetup = state.retirementSetup;
    let summary = state.summary;
    let deductionOptions = state.deductionOptions;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.retirementSetup.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            retirementSetup : nextProps.retirementSetup.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            retirementSetup : nextProps.retirementSetup.data.model[0]
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
        if (nextProps.retirementSetup.isOk === true ) {
          return {
            loaderStatus: 'success',
            hasError: false,
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            retirementSetup : nextProps.retirementSetup.data.model[0]
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            hasError: true,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            retirementSetup : nextProps.retirementSetup.data.model[0]
          }
        }
      }
    }
    catch (e) {

    }

    try {
      if (nextProps.retirementSetupList.data.model !== state.retirementSetupList) {
        retirementSetupList = nextProps.retirementSetupList.data.model;
        summary = nextProps.retirementSetupList.data.summary;
        retirementSetup = nextProps.retirementSetupList.data.model[0] || {};
        deductionOptions = nextProps.retirementSetupList.data.deductionOptions;

        if (retirementSetupList.length !== undefined || Object.keys(retirementSetupList).length > 0) {
          return {retirementSetupList, summary, retirementSetup, deductionOptions};
        }
        else {
          return {
            isRedirect: true
          };
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
  handleMarkAsComplete = (status) => {
    const { summary, retirementSetup } = this.state;
    summary.isCompleted = status;
    this.setState({
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      model: [
        retirementSetup
      ],
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
      })
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
      loaderStatus: ''
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    let retirementSetup = Object.assign({}, this.state.retirementSetup);
    retirementSetup[name] = value;
    this.setState({ retirementSetup });
  }

  render() {
    const { retirementSetup, retirementSetupList, loaderStatus, loaderMessage, isShowLoaderModal, summary, isSaveAndContinue, deductionOptions, hasError } = this.state;
    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'DistributionCodes')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={retirementTranslate.pageTitle}
          paragraph=""
        />

        <RetirementSetupForm
          summary={summary}
          hasError={hasError}
          props={this.props}
          retirementSetupList={retirementSetupList}
          retirementSetup={retirementSetup}
          onSave={this.handleOnSave}
          onMarkAsComplete={this.handleMarkAsComplete}
          onInputChange={this.handleInputChange}
          deductionOptions={deductionOptions}
          componentReload={this.componentReload}
        />

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>

      </Fragment>
    )
  }
}

RetirementSetupPage.propTypes = {
  retirementSetup: PropTypes.any.isRequired,
  retirementSetupList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default RetirementSetupPage;
