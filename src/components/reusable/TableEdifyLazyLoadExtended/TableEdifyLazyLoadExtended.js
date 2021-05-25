import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import chartAccountsTranslate from '../../../translation/chartAccounts/reviewAccounts.json';
import './_table.scss';
import api from '../../../utils/Http';
import TableEdify from '../TableEdify/TableEdify';
import { getUrlWithParams } from '../../../helpers/urlParam';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import TextInputSearch from '../TextInputSearch/index.js';
import { Spin } from 'antd';

const http = api('data');

class TableEdifyLazyLoadExtended extends React.Component {
  state = {
    data: [],
    dataCopy: [],
    isDisabled: false,
    direction: '',
    lastScrollPos: 0,
    isLoadDisable: false,
    scrollDirection: 'bottom',
    loadingState: false,
    limit: 15,
    hasError:false,
    page: 1,
    sortType: "desc",
    dataLength: 0,
    sortBy: '',
    isDataMaximum: false,
    isAddTopScroll: false,
    messageAlert: '',
    messageType: 'success',
    messageTip: '',
    totalPages: 0,
    loaderMessage: '',
    searchVal: '',
  };

  static getDerivedStateFromProps(nextProps, state) {
    const { data, dataCopy, totalPages, searchVal } = nextProps;
    return { data, dataCopy, totalPages, searchVal }
  }

  initializeScroll = () => {
    try {
      let tbody = document.getElementsByClassName('ant-table-body')[0];
      tbody.addEventListener("scroll", () => {
        /**
         Checking if scroll direction is top
        **/
        if (this.state.lastScrollPos > tbody.scrollTop) {
          this.setState({
            direction:'top',
            lastScrollPos:tbody.scrollTop
          });

          /**
           Checking if scroll bar reaches top
          **/
          if (tbody.scrollTop === 0) {
            this.handleLoadPrev();
          }

          /**
           Checking if scroll direction is bottom
          **/
        } else if (this.state.lastScrollPos < tbody.scrollTop) {
          this.setState({
            direction:'bottom',
            lastScrollPos:tbody.scrollTop
          });

          /**
           Checking if scroll bar reaches bottom
          **/
          if ((tbody.scrollTop + tbody.clientHeight) >= tbody.scrollHeight) {
            this.setState({
              lastScrollPos:tbody.scrollTop
            });
            this.handleLoadMore();
          }
        }
      });

      if (this.state.isAddTopScroll === true)
      {
        tbody.scrollTop = 200;
        this.handleStopPrevScroll()
      }
    }
    catch (e) {

    }
  }

  delayInitializeScroll = () => {
    setTimeout(() => {
      this.initializeScroll();
    }, 1000)
  }

  handleLoadPrev = () => {
    const { isLoadDisable } = this.state;
    if ( isLoadDisable === false ) {
      this.setState({ scrollDirection: 'top' });
      this.handlePreLoadData();
    }
  }

  handleProceedLoadPrev = () => {
    const { hasError } = this.state;
    if (hasError === false) {
      this.updatedListWithPrevData();
    }
  }

  updatedListWithPrevData = () => {
    const { isDataMaximum, page, loadingState } = this.state;
    if (page > 3 && loadingState === false) {
      this.setState({
        loadingState: true,
        isAddTopScroll: false,
        page: page - 2
      }, () => {
        if (isDataMaximum === false) {
          const url = getUrlWithParams(this.props.match, this.state);
          http.get(url).then(res => {
            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: chartAccountsTranslate.messageAlert,
                messageType: 'error',
                messageTip: chartAccountsTranslate.messageTip
              })
            } else {
              let dataResult = res.data.data.model;
              let data = [...dataResult, ...this.props.data.slice(0, 10)];
              this.props.updateData(data, this.props.dataCopy);
              this.setState({
                loadingState: false,
                isAddTopScroll: true
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
          const url = getUrlWithParams(this.props.match, this.state);
          http.get(url).then(res => {
            if (res.data.isOk === false) {
              this.setState({
                isShowMessageAlert: true,
                messageAlert: chartAccountsTranslate.messageAlert,
                messageType: 'error',
                messageTip: chartAccountsTranslate.messageTip
              })
            } else {
              let data = res.data.data.model;
              this.props.updateData(data, data);

              this.setState({
                // data,
                // dataCopy: data,
                loadingState: false,
              });
            }
          });
        }
      });
    }
  }

  handleStopPrevScroll = () => {
    this.setState({
      isAddTopScroll: false
    });
  }

  handleLoadMore = () => {
    const { isLoadDisable } = this.state;

    if (isLoadDisable === false) {
      this.setState({ scrollDirection: 'bottom' });
      this.handlePreLoadData();
    }
  }

  handlePreLoadData = () => {
    const { scrollDirection } = this.state;
    if (scrollDirection === 'bottom') {
      this.handleProceedLoadMore();
    }
    else if (scrollDirection === 'top') {
      this.handleProceedLoadPrev();
    }
  }

  /**
    We call this method upon getting more items.
    The response are from the API Service
  **/
  handleProceedLoadMore = () => {
    const { totalPages, page, hasError } = this.state;
    // process load more
    if (totalPages >= (page + 1)) {
      // check has error
      if (hasError === false) {
        this.updatedListWithNextData();
      }
    } else {
      // reached limit
    }

  }

  /**
   Method that will update or assign the existing data with new response data.
  **/
  updatedListWithNextData = () => {
    const { data, dataCopy } = this.props;

    this.props.updateData(dataCopy, data);
    this.setState({
      loadingState: true,
      page: this.state.page + 1
    }, () => {
      const url = getUrlWithParams(this.props.match, this.state);
      http.get(url).then(res => {
        if (res.data.isOk === false) {
          // this handle the provision error from API

        } else {
          let dataCopy = res.data.data.model;
          let data = [...this.props.data, ...dataCopy];

          this.props.updateData(data, dataCopy);
          this.setState({ loadingState: false });
        }
      });
    });
  }

  generateCustomHeader = (columns) => {
    let customColumns = [];
    columns.map(res => {
      if (res.displayCustomTitle) {
        customColumns.push(res.customHeaderTitle);
      } else {
        customColumns.push('')
      }
    });

    return customColumns.map(res => {
      return <span>{res}</span>
    });
  }

  handleOnApiBatchUpdate = (response, message) => {
    if (typeof this.props.onApiBatchUpdate === 'function') {
      this.props.onApiBatchUpdate(response, message);
    }
  }

  render () {
    const htmlId = this.props.htmlId || "TableEdifyLazyLoadExtended";
    const scrollY = this.props.scrollY || 0;
    const scrollX = this.props.scrollX || 0;
    const isLoading = this.props.isLoading || false;
    const pageSize = this.props.pageSize || 20000000;
    const displayPageSizeSelector = this.props.displayPageSizeSelector || false;
    const enablePagination = this.props.enablePagination || false;
    const displayFilter = this.props.displayFilter === undefined ? true : this.props.displayFilter;
    const displayHeader = this.props.displayHeader === undefined ? true : this.props.displayHeader;
    const sortableColumns = this.props.sortableColumns === undefined ? true : this.props.sortableColumns;
    const enableSearch = this.props.enableSearch || false;
    const displayAddItem = this.props.displayAddItem || false;
    const onAddItemClick = this.props.onAddItemClick;
    const enableCustomHeader = this.props.enableCustomHeader ? true : false;
    const enableCustomUpperHeader = this.props.enableCustomUpperHeader ? true : false;
    const { columns } = this.props;
    const { data, onClear, onSearch } = this.props;

    // this.delayInitializeScroll()
    this.initializeScroll();

    return (
      <Fragment>

        { !enableSearch ? null :
          <Row>
            <Col md={4} mdOffset={8} className="text-right">
              <TextInputSearch onClear={onClear} onSearch={onSearch} />
            </Col>
          </Row>
        }

        <Row className={`${enableCustomHeader ? 'enable-custom-header' : ''}`}>
          <Col md={12}>
            <TableEdify
              className="table-lazy-load-extended"
              htmlId={htmlId}
              dataDensity="comfortable"
              data={data}
              columns={columns}
              isLoading={isLoading}
              sortableColumns={sortableColumns}
              displayFilter={displayFilter}
              scrollY={scrollY}
              enableCustomHeader={enableCustomHeader}
              enableCustomUpperHeader={enableCustomUpperHeader}
              displayHeader={displayHeader}
              scrollX={scrollX}
              pageSize={pageSize}
              displayPageSizeSelector={displayPageSizeSelector}
              enablePagination={enablePagination}
              displayAddItem={displayAddItem}
              onAddItemClick={onAddItemClick}
              onApiBatchUpdate={this.handleOnApiBatchUpdate}
              dispatch={this.props.dispatch}
            />
          </Col>
        </Row>

        <div className="lazy-load-spinner loading-block text-center">
          <div className="loading-block__inner">
            {this.state.loadingState ?  <Spin tip="Loading"/>  : ""}
          </div>
        </div>
      </Fragment>
    );
  }
}

TableEdifyLazyLoadExtended.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  displayPageSizeSelector: PropTypes.bool,
  enablePagination: PropTypes.bool,
  displayFilter: PropTypes.bool,
  displayHeader: PropTypes.bool,
  sortableColumns: PropTypes.bool,
  htmlId: PropTypes.string,
  pageSize: PropTypes.number,
  scrollX: PropTypes.number,
  scrollY: PropTypes.number
};

export default TableEdifyLazyLoadExtended;
