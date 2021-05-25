import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import genDeptTranslate from '../../../../translation/accounting/generalDepartment.json';
import commonTranslate from '../../../../translation/common.json';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import { addAccountingSection } from '../../../../api/accounting/accountingSectionApi';
import BlockText from '../../../reusable/BlockText';
import GenDeptForm from '../../../widgets/Accounting/GeneralDepartment';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import { Redirect } from 'react-router-dom';
import {getSectionLink} from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class GeneralDepartment extends Component {
  _isMounted = false
  constructor(props) {
    super(props);

    this.state = {
      generalDepartmentList: [],
      generalDepartment: {},
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
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
      setTimeout(() => {
        this.setState({ loaderStatus: "" });
      }, 2000)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let generalDepartmentList = state.generalDepartmentList;
    let summary = state.summary;
    let generalDepartment = state.generalDepartment;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.generalDepartment.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: genDeptTranslate.saveError,
          generalDepartment : nextProps.generalDepartment.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'success',
          onMarkAsComplete: false,
          loaderMessage: genDeptTranslate.saveSuccess,
          generalDepartment : nextProps.generalDepartment.data.model[0]
          // isSaveAndContinue: true,
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.generalDepartment.isOk === true ) {
        return {
          loaderStatus: 'success',
          hasError: false,
          loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
          generalDepartment : nextProps.generalDepartment.data.model[0]
        }
      } else {
        return {
          loaderStatus: 'error',
          onMarkAsComplete: false,
          hasError: true,
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
          generalDepartment : nextProps.generalDepartment.data.model[0]
        }
      }
    }

    try {
      if (nextProps.generalDepartmentList.data.model !== state.generalDepartmentList) {
        generalDepartmentList = nextProps.generalDepartmentList.data.model;
        summary = nextProps.generalDepartmentList.data.summary;
        generalDepartment = nextProps.generalDepartmentList.data.model[0] || {};

        if (generalDepartmentList.length !== undefined || Object.keys(generalDepartmentList).length > 0) {
          return {generalDepartmentList, summary, generalDepartment};
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
    const { summary, generalDepartment } = this.state;
    summary.isCompleted = status;
    this.setState({
      loaderStatus: "",
      onMarkAsComplete: true,
      isShowLoaderModal: true,
      isMarkAsComplete: status,
      loaderMessage: (!status) ? commonTranslate.unCompletingMessage : commonTranslate.completingMessage
    });

    let params = {
      model: [
        generalDepartment
      ],
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
    } else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });

      // this.componentReload();
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
    });

    this.props.dispatch(addAccountingSection(getParams(model, summary)));
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    let generalDepartment = Object.assign({}, this.state.generalDepartment);
    generalDepartment[name] = value;
    this.setState({ generalDepartment });
  }

  render() {
    const { generalDepartment, generalDepartmentList, loaderStatus, loaderMessage, isShowLoaderModal, summary, isSaveAndContinue, hasError } = this.state;
    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'TaxGroup')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={genDeptTranslate.pageTitle}
          paragraph={genDeptTranslate.pageInstruction}
        />
        <GenDeptForm
          summary={summary}
          props={this.props}
          generalDepartmentList={generalDepartmentList}
          generalDepartment={generalDepartment}
          onSave={this.handleOnSave}
          onMarkAsComplete={this.handleMarkAsComplete}
          hasError={hasError}
          onInputChange={this.handleInputChange}
          onClearDataComplete={this.componentReload}
        />

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>
      </Fragment>
    )
  }
}

GeneralDepartment.propTypes = {};

export default GeneralDepartment;
