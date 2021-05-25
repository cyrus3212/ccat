import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './_table.scss';
import TableEdify from '../TableEdify/TableEdify';

class TableEdifyLazyLoad extends React.Component {
  state = {
    data: [],
    isDisabled: false,
    direction: '',
    lastScrollPos: 0
  };

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
            this.props.onLoadPrev();
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
            if (typeof this.props.onLoadMore === 'function') {
              this.setState({
                lastScrollPos:tbody.scrollTop
              });
              this.props.onLoadMore();
            }
          }
        }
      });

      if (this.props.isAddTopScroll === true)
      {
        tbody.scrollTop = 200;
        this.props.onStopPrevScroll()
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

  render () {

    const htmlId = this.props.htmlId || "tableEdifyLazyLoad";
    const scrollY = this.props.scrollY || 0;
    const scrollX = this.props.scrollX || 0;
    const isLoading = this.props.isLoading || false;
    const pageSize = this.props.pageSize || 20000000;
    const displayPageSizeSelector = this.props.displayPageSizeSelector || false;
    const enablePagination = this.props.enablePagination || false;
    const displayFilter = this.props.displayFilter === undefined ? true : this.props.displayFilter;
    const displayHeader = this.props.displayHeader === undefined ? true : this.props.displayHeader;
    const sortableColumns = this.props.sortableColumns === undefined ? true : this.props.sortableColumns;

    const {columns, data, tableTitle} = this.props;

    this.delayInitializeScroll()

    return (
      <Fragment>
        <span className="tableTitle">{tableTitle}</span>
        <TableEdify
          htmlId={htmlId}
          dataDensity="comfortable"
          data={data}
          columns={columns}
          isLoading={isLoading}
          sortableColumns={sortableColumns}
          displayFilter={displayFilter}
          scrollY={scrollY}
          displayHeader={displayHeader}
          forceScrollX={this.props.forceScrollX || false}
          scrollX={scrollX}
          pageSize={pageSize}
          displayPageSizeSelector={displayPageSizeSelector}
          enablePagination={enablePagination}
        />
      </Fragment>

    );
  }
}

TableEdifyLazyLoad.propTypes = {
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

export default TableEdifyLazyLoad;
