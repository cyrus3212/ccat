import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_01.scss';
import accountAssignmentTranslate from '../../../../translation/salesfi/accountAssignments.json';
import AccountAssignmentForm from '../../../widgets/SalesFI/AccountAssignments';
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getSalesFISection, addSalesFISection } from '../../../../api/salesfi/salesfiSectionApi';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getParams } from '../../../../helpers/workbookHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { getSectionLink } from '../../../../helpers/routesHelper';
import commonTranslate from '../../../../translation/common.json';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class AccountAssignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      summary: {},
      hasError: false,
      onSave: false,
      loaderStatus: '',
      loaderMessage: '',
      isMarkAsComplete: false,
      isSave: false,
      isShowLoaderModal: false
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getSalesFISection(getWorkbookUrl(this.props.match)));
  }

  static getDerivedStateFromProps(nextProps, state) {
    let account = state.account;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.isSave === true) {
        if (nextProps.account.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: accountAssignmentTranslate.saveError,
            account : nextProps.account.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onMarkAsComplete: false,
            loaderMessage: accountAssignmentTranslate.saveSuccess,
            account : nextProps.account.data.model[0]
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
        if (nextProps.account.isOk === true ) {
          return {
            loaderStatus: 'success',
            hasError: false,
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            account : nextProps.account.data.model[0]
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            hasError: true,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            account : nextProps.account.data.model[0]
          }
        }
      }
    } catch (e) {

    }


    try {
      if (nextProps.account.data.model !== state.account) {
        account = nextProps.account.data.model[0];
        summary = nextProps.account.data.summary;

        if (account.length !== undefined || Object.keys(account).length > 0) {
          return {account, summary};
        }

      }
    }
    catch (e) {

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
        // isMarkAsComplete: true
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
   * method that handle save event
  */
  handleOnSave = (model) => {
    const { summary } = this.state;

    this.setState({
      onSave: true,
      isSave: true,
      isShowLoaderModal: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
  }

  /**
   * method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { account, summary } = this.state;
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
        account
      ],
      summary
    }

    this.props.dispatch(addSalesFISection(params));
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    let account = Object.assign({}, this.state.account);
    account[name] = value;
    this.setState({ account });
  }

  render() {
    const { account, loaderStatus, loaderMessage, isShowLoaderModal, isSaveAndContinue, summary, hasError } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'SalesGroups')} />;
    }
    return(
      <Fragment>
        <BlockText
          title={accountAssignmentTranslate.pageTitle}
          paragraph={accountAssignmentTranslate.pageInstruction}
        />
        <Grid htmlId="accountAssignments">
          <AccountAssignmentForm
            summary={summary}
            props={this.props}
            hasError={hasError}
            accountAssignment={account}
            onMarkAsComplete={this.handleMarkAsComplete}
            onSave={this.handleOnSave}
            componentReload={this.componentReload}
            onInputChange={this.handleInputChange}
          />
        </Grid>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>
      </Fragment>
    )
  }
}

AccountAssignments.propTypes = {
  account: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default AccountAssignments;
