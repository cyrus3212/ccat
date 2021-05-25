import React, { Component, Fragment } from 'react';
import federalTaxTranslate from '../../../../translation/payroll/federalTax.json';
import commonTranslate from '../../../../translation/common.json';
import BlockText from '../../../reusable/BlockText';
import { getPayrollList } from '../../../../api/payroll/payrollSectionListApi';
import { addPayrollSection} from '../../../../api/payroll/payrollSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl, getSectionLink } from '../../../../helpers/routesHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import FederalTaxForm from '../../../widgets/Payroll/FederalTax';
import { Redirect } from 'react-router-dom';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

class FederalTaxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      federalTaxList: [],
      federalTax: {},
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
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
    let federalTaxList = state.federalTaxList;
    let summary = state.summary;
    let federalTax = state.federalTax;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.federalTax.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            federalTax : nextProps.federalTax.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            federalTax : nextProps.federalTax.data.model[0],
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
        if (nextProps.federalTax.isOk === true ) {
          return {
            loaderStatus: 'success',
            hasError: false,
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            federalTax : nextProps.federalTax.data.model[0]
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            hasError: true,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            federalTax : nextProps.federalTax.data.model[0]
          }
        }
      }
    }
    catch (e) {
    }

    try {
      if (nextProps.federalTaxList.data.model !== state.federalTaxList) {
        federalTaxList = nextProps.federalTaxList.data.model;
        summary = nextProps.federalTaxList.data.summary;
        federalTax = nextProps.federalTaxList.data.model[0] || {};

        if (federalTaxList.length !== undefined || Object.keys(federalTaxList).length > 0) {
          return {federalTaxList, summary, federalTax};
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
    const { summary, federalTax } = this.state;
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
        federalTax
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
    } else {
      this.setState({
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });

    }
  }

  /**
   * method that handle federal tax save
  */
  handleOnSave = (model, isValid) => {
    const { summary } = this.state;

    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPayrollSection(getParams(model, summary)));
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    let federalTax = Object.assign({}, this.state.federalTax);
    federalTax[name] = value;
    this.setState({ federalTax });
  }

  render() {
    const { federalTax, federalTaxList, loaderStatus, loaderMessage, isShowLoaderModal, summary, isSaveAndContinue, hasError} = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'GeneralSetup')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={federalTaxTranslate.pageTitle}
          paragraph={federalTaxTranslate.pageInstruction}
        />

        <Grid htmlId="federalTax">
          <FederalTaxForm
            summary={summary}
            props={this.props}
            federalTaxList={federalTaxList}
            federalTax={federalTax}
            onSave={this.handleOnSave}
            onMarkAsComplete={this.handleMarkAsComplete}
            onInputChange={this.handleInputChange}
            componentReload={this.componentReload}
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

FederalTaxPage.propTypes = {};

export default FederalTaxPage;
