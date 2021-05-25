import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class TableTaxForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taxGroupData: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return {...nextProps, ...state}
  }


  onTableInputChange = (event, id, target) => {
    this.props.onTableInputChange(event, id, target);
  }

  render () {
    const { taxGroupData } = this.props;
    const columnsTaxGroup = [
      {
        title: 'Description',
        dataIndex: 'taxDesc',
        refId: 'cId',
        maxLength: 15,
        type: "alphaNumericInput",
        onChange: this.onTableInputChange,
        isCheckValidation: true,
        columnSortable:false
      },
      {
        title: 'Tax Rate',
        dataIndex: 'taxRate',
        refId: 'cId',
        maxLength: 7,
        type: "numericInput",
        allowDecimal: true,
        onChange: this.onTableInputChange,
        isCheckValidation: true,
        columnSortable:false,
        defaultValue: "0"
      },
      {
        title: 'Threshold',
        dataIndex: 'threshold',
        refId: 'cId',
        maxLength: 6,
        type: "numericInput",
        onChange: this.onTableInputChange,
        isCheckValidation: true,
        columnSortable:false,
        defaultValue: "0"
      },
      {
        title: 'Ceiling',
        dataIndex: 'ceiling',
        refId: 'cId',
        maxLength: 6,
        type: "numericInput",
        onChange: this.onTableInputChange,
        isCheckValidation: true,
        columnSortable:false,
        defaultValue: "0",
        required: true
      },
      {
        title: 'G/L Account (Liability)',
        dataIndex: 'glNumber',
        refId: 'cId',
        maxLength: 10,
        type: "coaTextInput",
        onChange: this.onTableInputChange,
        isCheckValidation: true,
        columnSortable:false
      },
    ];

    return (
      <Fragment>
          <Row>
            <Col md={12}>
              <TableEdify displayFilter={false} data={taxGroupData} columns={columnsTaxGroup} scrollY={650} scrollX={630} />
            </Col>
          </Row>
      </Fragment>
    );
  }

}

TableTaxForm.propTypes = {};

export default TableTaxForm;
