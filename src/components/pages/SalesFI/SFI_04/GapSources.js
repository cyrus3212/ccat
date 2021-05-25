
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_04.scss';
import GapSourcesForm from '../../../widgets/SalesFI/GapSources'
import gapTranslate from '../../../../translation/salesfi/gapSources.json';
import BlockText from '../../../reusable/BlockText';
import TableEdify from '../../../reusable/TableEdify';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import scrollToTop from '../../../../helpers/scrollToTop';
import { gapSourcesTableColumn } from './GapSourcesTableColumn'
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection, removSalesFI } from '../../../../api/salesfi/salesfiSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { getWorkbookUrl } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { Redirect } from 'react-router-dom';

class GapSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iRecordItem: [],
      formulaOptions: [],
      salesGroupItems: [],
      gapSourceList: [],
      gapSource: {},
      gapSourceRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loaderStatus: "",
      loaderMessage: "",
      summary: {},
      onDelete: false,
      isCheckSaveAndRetain: false,
      isError: false
    };
    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.props.dispatch(getSalesFIList(getWorkbookUrl(this.props.match)));
    setTimeout(() => {
      this.setState({ loaderStatus: "" });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    const isCheckSaveAndRetain = state.isCheckSaveAndRetain;
    let gapSourceData = state.gapSource;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.gapSource.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            onSave: false,
            isError: true,
            gapSource: nextProps.gapSource.data.model[0]
          }
        }
        else {
          if (isCheckSaveAndRetain) {
            gapSourceData = nextProps.gapSource.data.model[0];
            gapSourceData.id = "";
          } else {
            gapSourceData = {}
          }

          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            onSave: false,
            isError: false,
            gapSource: gapSourceData
          }
        }
      }
    }
    catch (e) {

    }

    /**
     * Handle response on Delete data
     */
    try {
      if (state.onDelete === true) {
        if (nextProps.gapSource.isOk === true ) {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successDeleteMessage,
            gapSource: {}
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
        if (nextProps.gapSource.isOk === true ) {
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
      if (nextProps.gapSourceList.isOk === true) {
        return {
          gapSourceList: nextProps.gapSourceList.data.model,
          summary: nextProps.gapSourceList.data.summary,
          formulaOptions: nextProps.gapSourceList.data.formulaOptions,
          salesGroupItems: nextProps.gapSourceList.data.salesGroupItems
        };
      }
    }
    catch (e) {

    }

    return null;
  }

  /**
   * method that handle edit managed account
   */
  handleEdit = (gapSource) => {
    scrollToTop();
    this.setState({ gapSource: gapSource, isEdit: true, isCheckSaveAndRetain: false, isError: false });
  }

  /**
   * method that handle save/update data
   */
  handleSave = (model, response) => {
    const { summary } = this.state;
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      isCheckSaveAndRetain: response,
      loaderStatus: "",
      loaderMessage: commonTranslate.savingRecordMessage,
    });

    this.props.dispatch(addSalesFISection(getParams(model, summary)));
  }

  /**
   * method that hide loader modal
   */
  handleLoaderModalHide = () => {
    const { onMarkAsComplete } = this.state;
    const { enterpriseCode, dtid, workbook } = this.state.summary;

    if (onMarkAsComplete === true) {
      this.setState({
        isShowLoaderModal: false,
        onMarkAsComplete: false
        // isMarkAsComplete: true
      })
      this.props.dispatch(getWorkbookSections(`${enterpriseCode}/${dtid}/${workbook}`));
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
  handleShowErrorModal = (gapSourceRowDelete) => {
    this.setState({ gapSourceRowDelete, isShowDeleteModal: true, gapSource: {} });
  }

  /**
   * method that hide error modal
   */
  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false, isCheckSaveAndRetain: false, isError: false });
  };

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { summary, gapSourceRowDelete } = this.state;
    this.setState({
      onDelete: true,
      isShowDeleteModal: false,
      isShowLoaderModal: true,
      loaderStatus: "",
      loaderMessage: commonTranslate.deletingRecordMessage,
    });

    this.props.dispatch(removSalesFI(getParams(gapSourceRowDelete, summary)));
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = (status) => {
    const { summary, gapSourceList } = this.state;
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

    this.props.dispatch(addSalesFISection(params));
  }

  /**
   * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      isSaveAndContinue: true,
      loaderMessage: commonTranslate.savingRecordMessage
    });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  renderGapSources = () => {
    const {gapSourceList, summary} = this.state;
    const tableColumns = gapSourcesTableColumn(this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleEdit)
    let disabledClearData = true;

    try {
      if (gapSourceList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return(
    <Fragment>
        <TableEdify key={3} data={gapSourceList} tableTitle={gapTranslate.iRecordItems} columns={tableColumns} scrollY={650} scrollX={630} />
        <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'InsuranceSources'} />
      </Fragment>
    )
  }

  render() {
    const { isSaveAndContinue, gapSourceList, gapSource, isShowLoaderModal, isShowDeleteModal,
      loaderStatus, loaderMessage, isError, summary, formulaOptions, salesGroupItems, isCheckSaveAndRetain } = this.state;

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'Aftermarkets')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={gapTranslate.pageTitle}
          paragraph={gapTranslate.pageInstruction}
        />
        <Grid htmlId="gapSources">
          <GapSourcesForm
            gapSource={gapSource}
            props={this.props}
            isError={isError}
            onSave={this.handleSave}
            formulaOptions={formulaOptions}
            salesGroupItems={salesGroupItems}
            summary={summary}
            gapSourceList={gapSourceList}
            checkSaveAndRetain={isCheckSaveAndRetain}
          />
          {this.renderGapSources()}
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

GapSources.propTypes = {
  gapSource: PropTypes.any.isRequired,
  gapSourceList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default GapSources;
