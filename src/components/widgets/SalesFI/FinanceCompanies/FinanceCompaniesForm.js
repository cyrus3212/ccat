import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import "../_salesFI.scss";
import api from '../../../../utils/Http';
import ImportExportAction from '../../../reusable/ImportExportAction'
import {generateTableColumns} from './TableColumns';
import TableEdifyLazyLoad from '../../../reusable/TableEdifyLazyLoad/TableEdifyLazyLoad';
import TextInputSearch from '../../../reusable/TextInputSearch';

const http = api('data');

class FinanceCompaniesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { fiCompaniesList } = nextProps;
    return { data: fiCompaniesList || [] }
  }

  onImport = (files) => {
    this.props.onImport(files);
  }

  handleLoadPrev = () => {
    this.props.onLoadPrev()
  }

  handleLoadMore = () => {
    this.props.onLoadMore()
  }

  onExport = () => {
    this.props.onExport();
  }

  renderList() {
    const tableColumns = generateTableColumns(this.handleInputOnChange);
    const { data } = this.state;

    return(
      <TableEdifyLazyLoad
        htmlId="finance-companies-table"
        data={data}
        displayFilter={false}
        columns={tableColumns}
        scrollY={450}
        scrollX={2650}
        forceScrollX={true}
        onLoadPrev={this.handleLoadPrev}
        onLoadMore={this.handleLoadMore}
        sortableColumns={true}
      />
    )
  }

  render () {
    const { handleClearDataList, handleSearchAccount } = this.props;

    const importExportAction = [
      { name : 'Export Spreadsheet', icon: 'EP', type: 'export', url : '#', position : 'left',  id: 'actionBtnExport', buttonStyle : 'default', onClick: this.onExport },
      { name : 'Import Spreadsheet', icon: 'IP', type: 'import', url : '#', position : 'left',  id: 'actionBtnImport', buttonStyle : 'default', onChange: this.onImport },
    ]

    return (
      <Fragment>
        <ImportExportAction importExportAction={importExportAction} />
        <Row>
          <Row>
            <Col md={4} mdOffset={8} className="text-right">
              <TextInputSearch onClear={handleClearDataList} onSearch={handleSearchAccount} />
            </Col>
          </Row>
        </Row>
        {this.renderList()}
      </Fragment>
    );
  }

}

FinanceCompaniesForm.propTypes = {};

export default FinanceCompaniesForm;
