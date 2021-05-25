import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import opticalFieldsTranslate from '../../../../translation/accounting/opticalFields.json';
import BlockText from '../../../reusable/BlockText';
import OptionalFieldsPacksForm from '../../../widgets/Accounting/OptionalFieldsPacks';
import {  addAccountingSection } from '../../../../api/accounting/accountingSectionApi';
import { getAccountingList } from '../../../../api/accounting/accountingSectionListApi';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import { getWorkbookUrl} from '../../../../helpers/routesHelper';
import Modal from 'react-bootstrap/lib/Modal';
import scrollToTop from '../../../../helpers/scrollToTop';
import LoaderModal from '../../../reusable/LoaderModal';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import commonTranslate from '../../../../translation/common.json';
import { getSectionLink } from '../../../../helpers/routesHelper';
import "./_optionalFields.scss";

class OptionalFields extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {
      isShowLoaderModal:false,
      isSaveAndContinue: false,
      onSave: false,
      scheduleByOptions: [],
      typeOptions: [],
      requiredStockOptions: [],
      optionalFieldsList: [],
      optionalAcct: {},
      isMarkAsComplete: false,
      item: {},
      summary: {},
      loaderStatus: '',
      hasError: false
    };

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
        this.setState({ loaderStatus: '' });
      }, 2000)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  static getDerivedStateFromProps(nextProps, state) {
    let optionalFieldsList = state.optionalFieldsList;
    let summary = state.summary;
    let requiredStockOptions = state.requiredStockOptions;
    let typeOptions = state.typeOptions;
    let scheduleByOptions = state.scheduleByOptions;

    /**
     * Handle response on Save data
     */
    if (state.onSave === true) {
      if (nextProps.optionalFields.isOk === false ) {
        return {
          loaderStatus: 'error',
          onSave: false,
          loaderMessage: commonTranslate.failedSaveMessage,
          optionalFieldsList: nextProps.optionalFields.data.model
        }
      }
      else {
        return {
          loaderStatus: 'success',
          onMarkAsComplete: false,
          loaderMessage: commonTranslate.successSaveMessage,
          optionalFieldsList: nextProps.optionalFieldsList.data.model,
          item: {}
        }
      }
    }

    /**
     * Handle response on Delete data
     */
    if (state.onDelete === true) {
      if (nextProps.optionalFieldsList.isOk === true ) {
        return {
          loaderStatus: 'success',
          loaderMessage: commonTranslate.successDeleteMessage,
          optionalFieldsList: nextProps.optionalFieldsList.data.model
        }
      }
      else {
        return {
          loaderStatus: 'error',
          loaderMessage: commonTranslate.failedDeleteMessage,
          optionalFieldsList: nextProps.optionalFieldsList.data.model
        }
      }
    }

    /**
     * Handle response on mark as complete
     */
    if (state.onMarkAsComplete === true) {
      if (nextProps.optionalFields.isOk === true ) {
        return {
          loaderStatus: 'success',
          hasError: false,
          loaderMessage:  (!state.isMarkAsComplete) ? commonTranslate.succesUncompleteMessage : commonTranslate.succesCompleteMessage,
          optionalFieldsList: nextProps.optionalFields.data.model
        }
      }
      else {
        return {
          loaderStatus: 'error',
          hasError: true,
          loaderMessage: (!state.isMarkAsComplete) ? commonTranslate.failedUncompleteMessage : commonTranslate.failedCompleteMessage,
          optionalFieldsList: nextProps.optionalFields.data.model
        }
      }
    }

    try {
      if (nextProps.optionalFieldsList.data.model !== state.optionalFieldsList) {
        optionalFieldsList = nextProps.optionalFieldsList.data.model;
        summary = nextProps.optionalFieldsList.data.summary;
        requiredStockOptions = nextProps.optionalFieldsList.data.requiredStockOptions;
        typeOptions = nextProps.optionalFieldsList.data.typeOptions;
        scheduleByOptions =  nextProps.optionalFieldsList.data.scheduleByOptions;

        if (optionalFieldsList.length !== undefined || Object.keys(optionalFieldsList).length > 0) {
          return {optionalFieldsList, summary, requiredStockOptions, typeOptions, scheduleByOptions};
        }

      }
    }
    catch (e) {

    }

    return {...nextProps, ...state};
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaderStatus, onSave, isShowLoaderModal } = this.state;
    if (onSave === true && loaderStatus === 'success' && isShowLoaderModal === false) {
      this.setState({ onSave: false })
      this.componentReload();
    }
  }

  /**
   * method that handle edit managed account
   */
  handleEdit = (optionalAcct) => {
    scrollToTop();
    this.setState({ optionalAcct, isEdit: true })
  }

  /**
  * method that handle save/update data
  */
  handleAddItem = (account, optionalField) => {
    const { optionalFieldsList } = this.state;
    let data = optionalField || {}

    if (!optionalFieldsList.length) {
      data.items = [];
      data.sequenceNumber = '5';
      data.items.push(account);
    } else {
      data.items = optionalFieldsList[0].items;
      data.items.push(account);
    }

    optionalFieldsList[0] = data;

    this.setState({
      optionalFieldsList,
      loaderStatus: 'success'
    });

    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = (model, status) => {
    let { summary } = this.state;
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
        // onMarkAsComplete: false
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
    }
    else if (loaderStatus === 'success') {
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

    };

    // this.setState({ loaderStatus: '' });
  }

  /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      apVendor: {}
    })
  }

  /**
   * method that handle general dept save
   */
  handleSave = (model) => {
    const { summary, optionalFieldsList } = this.state;
    this.setState({
      loaderStatus: "",
      onSave: true,
      isShowLoaderModal: true,
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    let data = {};

    if (!optionalFieldsList.length) {
      data = { model: [], summary };
    } else {
      data = { model: [model], summary }
    }

    this.props.dispatch(addAccountingSection(data));
  }

  handleDeleteItem = (model) => {
    const { summary } = this.state;

    this.setState({
      onDelete: true,
      isShowLoaderModal: true,
      loaderMessage: commonTranslate.deletingRecordMessage
    });
    this.props.dispatch(addAccountingSection(getParams(model, summary)));
  }

  handleClearDataComplete = () => {
    this.setState({
      onMarkAsComplete: false
    });
    this.componentReload();
  }

  render() {
    const {item, typeOptions, scheduleByOptions, requiredStockOptions, isShowLoaderModal, isSaveAndContinue, loaderStatus, loaderMessage, optionalFieldsList, hasError, summary} = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'review')} />;
    };

    return(
      <Fragment>
        <BlockText

          title={opticalFieldsTranslate.pageTitle}
          paragraph={opticalFieldsTranslate.pageInstruction}
        />
        <div ref={this.textInput}>
          <p>test</p>
        </div>
        <Grid htmlId="optionalFieldsPacks">
          <OptionalFieldsPacksForm
            optionalFieldsList={optionalFieldsList}
            item={item}
            onSave={this.handleSave}
            summary={summary}
            props={this.props}
            onAddItem={this.handleAddItem}
            isAddStatus={loaderStatus}
            onHandleMarkAsComplete={this.handleMarkAsComplete}
            requiredStockOptions={requiredStockOptions}
            onClearLoaderProps={this.handleClearLoaderProps}
            onDeleteItem={this.handleDeleteItem}
            typeOptions={typeOptions}
            scheduleByOptions={scheduleByOptions}
            onClearDataComplete={this.handleClearDataComplete}
            hasError={hasError}
          />
          {/* {this.optionalFieldsList()} */}
        </Grid>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>
      </Fragment>
    )
  }
}

OptionalFields.propTypes = {
  optionalFields: PropTypes.any.isRequired,
  optionalFieldsList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default OptionalFields;
