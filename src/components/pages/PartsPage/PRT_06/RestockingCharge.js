
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_prt_06.scss';
import restockingTranslate from '../../../../translation/parts/restockingCharge.json';
import commonTranslate from '../../../../translation/common.json';
import BlockText from '../../../reusable/BlockText';
import RestockingChargeForm from '../../../widgets/Parts/RestockingCharge';
import { getPartsList } from '../../../../api/parts/partsSectionListApi';
import { addPartsSection } from '../../../../api/parts/partsSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import LoaderModal from '../../../reusable/LoaderModal';
import Modal from 'react-bootstrap/lib/Modal';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink, getWorkbookUrl } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class RestockingCharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restockingChargeList: [],
      restockingChargeRec: {},
      isShowLoaderModal: false,
      loaderStatus: '',
      loaderMessage: '',
      onSave: false,
      summary: {}
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
    let restockingChargeList = state.restockingChargeList;
    let summary = state.summary;
    let restockingChargeRec = state.restockingChargeRec;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.restockingCharge.isOk === false ) {
          return {
            loaderStatus: 'error',
            onSave: false,
            loaderMessage: commonTranslate.failedSaveMessage,
            restockingChargeRec : nextProps.restockingCharge.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            onMarkAsComplete: false,
            loaderMessage: commonTranslate.successSaveMessage,
            restockingChargeRec : nextProps.restockingCharge.data.model[0]
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
        if (nextProps.restockingCharge.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
            restockingChargeRec : nextProps.restockingCharge.data.model[0]
          }
        } else {
          return {
            loaderStatus: 'error',
            onMarkAsComplete: false,
            loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
            restockingChargeRec : nextProps.restockingCharge.data.model[0]
          }
        }
      }
    } catch (e) {

    }

    try {
      if (nextProps.restockingChargeList.data.model !== state.restockingChargeList) {
        restockingChargeList = nextProps.restockingChargeList.data.model;
        summary = nextProps.restockingChargeList.data.summary;
        restockingChargeRec = nextProps.restockingChargeList.data.model[0] || {};

        if (restockingChargeList.length !== undefined || Object.keys(restockingChargeList).length > 0) {
          return {restockingChargeList, summary, restockingChargeRec};
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
  handleOnSave = (model) => {
    const { summary } = this.state;

    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderStatus: '',
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addPartsSection(getParams(model, summary)));
  }

  handleInputChange = (event) => {
    const { name, value } = event;
    let restockingChargeRec = Object.assign({}, this.state.restockingChargeRec);
    restockingChargeRec[name] = value;
    this.setState({ restockingChargeRec });
  }

  /**
  * Method that handle mark as complete
  */
  handleMarkAsComplete = (status) => {
    const { restockingChargeRec, summary, restockingChargeList } = this.state;
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
        restockingChargeRec
      ],
      summary
    }

    this.props.dispatch(addPartsSection(params));
  }

  render() {
    const { isSaveAndContinue, restockingChargeRec, loaderStatus, loaderMessage, isShowLoaderModal, summary } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'PartsDiscounts')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={restockingTranslate.pageTitle}
          paragraph={restockingTranslate.pageInstruction}
        />
        <Grid htmlId="restockingCharge">
          <RestockingChargeForm
            summary={summary}
            props={this.props}
            restockingCharge={restockingChargeRec}
            onSave={this.handleOnSave}
            onMarkAsComplete={this.handleMarkAsComplete}
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

RestockingCharge.propTypes = {
  restockingCharge: PropTypes.any.isRequired,
  restockingChargeList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default RestockingCharge;
