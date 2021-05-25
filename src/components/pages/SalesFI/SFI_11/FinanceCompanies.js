
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_sfi_11.scss';
import financeCoTranslate from '../../../../translation/salesfi/financeCo.json'
import FinanceCompaniesForm from '../../../widgets/SalesFI/FinanceCompanies';
import BlockText from '../../../reusable/BlockText';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Footer from '../../../common/Footer';
import commonTranslate from '../../../../translation/common.json';
import Modal from 'react-bootstrap/lib/Modal';
import LoaderModal from '../../../reusable/LoaderModal';
import { getSalesFIList } from '../../../../api/salesfi/salesfiSectionListApi';
import { addSalesFISection } from '../../../../api/salesfi/salesfiSectionApi';
import { getParams } from '../../../../helpers/workbookHelper';
import { Spin } from 'antd';
import { getBaseUrl } from '../../../../helpers/apiHelper';
import 'antd/lib/spin/style/index.css';
import api from '../../../../utils/Http';
import { Redirect } from 'react-router-dom';
import { getSectionLink } from '../../../../helpers/routesHelper';
import { getWorkbookSections } from '../../../../api/menuSectionApi';

const http = api('data');

class FinanceCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fiCompaniesList: [],
      fiCompaniesListCopy: [],
      fiCompanies: {},
      fiCompaniesRowDelete: {},
      onSave: false,
      isEdit: false,
      isShowLoaderModal: false,
      loadingState: true,
      scrollDirection: 'bottom',
      isDataMaximum: false,
      loaderStatus: '',
      loaderMessage: '',
      loaderStatus: '',
      limit: 20,
      page: 1,
      sortType: "asc",
      sortBy: 'key',
      searchVal: '',
      hasError: false,
      isAddTopScroll: false,
      isSaveAndContinue: false,
      totalPages: 0,
      summary: {},
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    this.setState(this.baseState);
    this.componentReload();
  }

  componentReload = () => {
    this.getDataList();
    setTimeout(() => {
      this.setState({ loaderStatus: '' });
    }, 2000)
  }

  static getDerivedStateFromProps(nextProps, state) {
    let fiCompaniesList = state.fiCompaniesList;
    let fiCompaniesListCopy = state.fiCompaniesListCopy;
    let totalPages = state.totalPages;
    let summary = state.summary;

    /**
     * Handle response on Save data
     */
    try {
      if (state.onSave === true) {
        if (nextProps.fiCompanies.isOk === false ) {
          return {
            loaderStatus: 'error',
            loaderMessage: commonTranslate.failedSaveMessage,
            fiCompanies: nextProps.fiCompanies.data.model[0]
          }
        }
        else {
          return {
            loaderStatus: 'success',
            loaderMessage: commonTranslate.successSaveMessage,
            fiCompanies: nextProps.fiCompanies.data.model[0]
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
        if (nextProps.fiCompanies.isOk === true ) {
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
        if (nextProps.fiCompanies.isOk === true ) {
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
      if (nextProps.fiCompaniesList.data.model !== state.fiCompaniesList) {
        fiCompaniesList = nextProps.fiCompaniesList.data.model;
        summary = nextProps.fiCompaniesList.data.summary;
        fiCompaniesListCopy = nextProps.fiCompaniesList.data.model;
        totalPages = nextProps.fiCompaniesList.data.totalPages;

        if (fiCompaniesList.length !== undefined || Object.keys(fiCompaniesList).length > 0) {
          return {fiCompaniesList, summary, fiCompaniesListCopy, totalPages, loadingState: false};
        }
      }
    } catch (e) {

    }

    return {...nextProps, ...state};
  }

  getDataList = () => {
    const { code, dtid } = this.props.match;
    const { searchVal } = this.state;
    this.setState({ enterpriseCode: code, dtid });

    this.props.dispatch(getSalesFIList(this.getUrlWithParams(searchVal)));
  }

  getUrlWithParams = () => {
    const { code, dtid, name, section } = this.props.match;
    const { limit, page, sortBy, sortType, searchVal } = this.state;
    let param = [];

    param.push('limit=' + limit);
    param.push('sortBy=' + sortBy);
    param.push('sortType=' + sortType);
    param.push('page=' + page);

    if (searchVal !== '') {
      param.push('search=' + searchVal);
    }

    let queryString = '';

    if (param.length) {
      queryString = '?' + param.join('&');
    }

    return `${code}/${dtid}/${name}/${section}${queryString}`;
  }

  handleLoadPrev = () => {
    this.setState({ scrollDirection: 'top' });
    this.handlePreLoadData();
  }

  handleLoadMore = () => {
    this.setState({ scrollDirection: 'bottom' });
    this.handlePreLoadData();
  }

  handlePreLoadData = () => {
    const { scrollDirection } = this.state;

    if (scrollDirection === 'bottom') {
      this.handleProceedLoadMore();
    }
    else if (scrollDirection === 'top') {
      this.updatedListWithPrevData();
    }
  }

  /**
    We call this method upon getting more items.
    The response are from the API Service
  **/
  handleProceedLoadMore = () => {
    const { totalPages, page } = this.state;

    if (totalPages >= (page + 1)) {
        this.updatedListWithNextData();
    } else {
      // reached limit
    }
  }

  /**
   Method that will update or assign the existing data with new response data.
  **/
  updatedListWithNextData = () => {
    this.setState({
      fiCompaniesList: this.state.fiCompaniesListCopy,
      loadingState: true,
      page: this.state.page + 1
    }, () => {

      http.get(this.getUrlWithParams()).then(res => {
        if (res.data.isOk === false) {
          // this handle the provision error from API
          this.setState({
            isShowMessageAlert: true,
            messageAlert: 'Error fetching data',
            messageType: 'error',
            messageTip: 'Click Ok to refresh'
          })
        } else {
          let fiCompaniesList = res.data.data.model;

          this.setState({
            fiCompaniesList: [...this.state.fiCompaniesListCopy, ...fiCompaniesList],
            fiCompaniesListCopy: fiCompaniesList,
            loadingState: false
          })
        }
      });
    });

  }

  updatedListWithPrevData = () => {
    const { isDataMaximum, page, loadingState, totalPages } = this.state;

    if (page > 3 && loadingState === false) {
      this.setState({
        loadingState: true,
        isAddTopScroll: false,
        page: page - 2
      }, () => {
        if (isDataMaximum === false) {
          http.get(this.getUrlWithParams()).then(res => {
            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: commonTranslate.messageAlert,
                messageType: 'error',
                messageTip: commonTranslate.messageTip
              })
            } else {
              let fiCompaniesListResult = res.data.data.model;
              let fiCompaniesList = [...fiCompaniesListResult, ...this.state.fiCompaniesList.slice(0, 10)];

              this.setState({
                fiCompaniesList,
                loadingState: false
              });

              setTimeout(() => {
                this.setState({
                  isAddTopScroll: true
                })
              }, 350)
            }
          });
        }
      });
    }

    /**
      We reset to page 1 upon reaching on page 2 or page 3
      Since we handled already the previous objects.
    **/
    if (page === 3 || page === 2 && loadingState === false ) {
      this.setState({
        loadingState: true,
        isAddTopScroll: false,
        page: 1
      }, () => {

        if (isDataMaximum === false) {
          http.get(this.getUrlWithParams()).then(res => {

            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: 'error',
                messageType: 'error',
                messageTip: 'error'
              })
            } else {
              let fiCompaniesList = res.data.data.model;

              this.setState({
                fiCompaniesList,
                fiCompaniesListCopy: fiCompaniesList,
                loadingState: false,
              });
            }
          });
        }
      });
    }
  };

  handleStopPrevScroll = () => {
    this.setState({
      isAddTopScroll: false
    });
  };

  handleExport = () => {
    const { enterpriseCode, dtid, workbook, section } = this.state.summary;
    let url = getBaseUrl('data') + `/DownloadCsv/${enterpriseCode}/${dtid}/${workbook}/${section}`;

    this.setState({
      isShowLoaderModal: true,
      loaderMessage: 'Exporting File...',
      dataTransactionStatus: ''
    });

    http.get(url).then((res, xhr) => {
      this.setState({
        loaderMessage: 'Export file successful.',
        loaderStatus: 'success'
      });

      let file = new Blob([res.data], {type: 'text/csv;charset=utf-8;'});
      let downloadLink;
      downloadLink = document.createElement("a");
      downloadLink.download = "Finance Companies.csv";
      downloadLink.href = window.URL.createObjectURL(file);
      document.body.appendChild(downloadLink);

      downloadLink.click();
    });
  }

  handleChangeFile = (event) => {
    const { enterpriseCode, dtid, workbook, section } = this.state.summary;
    let file = event.target.files[0];

    let formData = new FormData();
    formData.append('file', file)
    formData.append('enterpriseCode', enterpriseCode)
    formData.append('dtid', dtid)
    formData.append('workbook', workbook)
    formData.append('section', section)

    this.setState({
      onImport: true,
      isShowLoaderModal: true,
      loaderMessage: commonTranslate.importingDataMessage
    });

    http.post(getBaseUrl('data') + '/UploadCsv', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}).then(res => {

        // Clear Import input file -- hack fix
        document.getElementById("input-file").value = "";
        let result = res.data;
        this.setState({ page: 1, onImport: false });

        if (result.isOk === true) {
          this.setState({
            loaderStatus: 'success' ,
            loaderMessage: commonTranslate.importingDataSuccess
          });

        } else {
          this.setState({
            loaderStatus: 'error' ,
            loaderMessage: result.errorMessage
          });
        }
    }).catch(err => {
      this.showLoaderErrorStatus();
    });
  }

  showLoaderErrorStatus = () => {
    this.setState({
      loaderStatus: 'error',
      loaderMessage: commonTranslate.importingDataFailed
    });
  }

  /**
   * method that handle general dept save
  */
  handleSave = () => {
    const { summary } = this.state;

    this.setState({
      onSave: true,
      isShowLoaderModal: true,
      loaderMessage: commonTranslate.savingRecordMessage
    });

    this.props.dispatch(addSalesFISection(getParams({}, summary)));
  }

  /**
   * method that handle mark as complete
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
      model: [],
      summary
    }

    this.props.dispatch(addSalesFISection(params));
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
        onImport: false,
        isShowLoaderModal: false,
        isShowDeleteModal: false,
        onSave: false,
        onDelete: false
      });
      this.componentReload()
    }

    this.setState({ loaderMessage: '', loaderStatus: ''});
  }

  /**
  * method that handle save event
  */
  handleOnSaveContinue = () => {
    this.setState({ isSaveAndContinue: true });
  }

  handleSearchAccount = (searchVal) => {
    this.setState({ loadingState: true, page: 1, searchVal }, () => {
      this.getDataList();
    });
  }

  handleClearDataList = () => {
    this.setState({ searchVal: '', page: 1}, () => {
      this.getDataList();
    });
  }

  handleOnClearDataComplete = () => {
    this.componentReload();
  }

  render() {
    const { fiCompaniesList, isShowLoaderModal, loaderStatus, loaderMessage, isAddTopScroll, isSaveAndContinue, loadingState, summary} = this.state;
    let disabledClearData = true;

    try {
      if (fiCompaniesList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    if (isSaveAndContinue === true) {
      return <Redirect to={getSectionLink(this.props.match, 'review')} />;
    }

    return(
      <Fragment>
        <BlockText
          title={financeCoTranslate.pageTitle}
          paragraph={financeCoTranslate.pageInstruction}
        />
        <Grid htmlId="financeCompanies">
          <FinanceCompaniesForm
            props={this.props}
            onStopPrevScroll={this.handleStopPrevScroll}
            isAddTopScroll={isAddTopScroll}
            fiCompaniesList={fiCompaniesList}
            onLoadPrev={this.handleLoadPrev}
            onLoadMore={this.handleLoadMore}
            onExport={this.handleExport}
            onImport={this.handleChangeFile}
            handleSearchAccount={this.handleSearchAccount}
            handleClearDataList={this.handleClearDataList}
            loadingState={loadingState}
          />
          <div className="loading-block text-center finance-loading-state">
            <div>
              {this.state.loadingState ?  <Spin tip="Loading"/>  : ""}
            </div>
          </div>

          <Footer summary={summary} match={this.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.handleMarkAsComplete} onSaveAndContinue={this.handleOnSaveContinue} linkTo={'SalesDeptEmployees'} />
        </Grid>

        <Modal show={isShowLoaderModal} onHide={this.handleLoaderModalHide}>
          <LoaderModal onHide={this.handleLoaderModalHide} loaderStatus={loaderStatus} loaderMessage={loaderMessage}/>
        </Modal>
      </Fragment>
    )
  }
}

FinanceCompanies.propTypes = {
  fiCompanies: PropTypes.any.isRequired,
  fiCompaniesList: PropTypes.any.isRequired,
  dispatch: PropTypes.func,
};

export default FinanceCompanies;
