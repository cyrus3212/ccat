import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';

class TableRepairOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairOrderTax: [],
      options:[{value: "Y",label: "Y"},{value: "Y",label: "N"}]
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { repairOrderTax } = nextProps;
    return repairOrderTax;
  }

  onTableInputChange = (event, id, target) => {
    this.props.onRepairOrderTaxInputChange(event, id, target);
  }

  onChangeRadio = (event, id, target) => {
    this.props.onRepairOrderTaxInputChange(event, id, target);
  }

  handleDisabledOptions = (repairOrderTax) => {
    let tax = [];
    for (let i = 0; i < repairOrderTax.length; i++) {
      let _repairOrderTax = repairOrderTax[i];

      if (i >= 6) {
        _repairOrderTax.isDefault = true;
      }
      else {
        _repairOrderTax.isDefault = false;
      }
      tax.push(_repairOrderTax);
    }
    return tax;
  }

  render () {
    let maxLength = 50
    const { repairOrderTax, options } = this.props;

    const columnRepairOrder = [
      {
        title: '',
        dataIndex: 'label',
        refId:'cId',
        maxLength:
        maxLength, type: "label",
        columnSortable:false,
        isCheckValidation: true,
      },
      {
        title: 'Customer Pay',
        dataIndex: 'custPay',
        refId:'cId',
        maxLength:
        maxLength, type: "radioInput",
        options:options,
        onChangeRadio:this.onChangeRadio,
        onChange: this.onTableInputChange,
        columnSortable:false,
        isCheckValidation: true,
      },
      {
        title: 'Warranty',
        dataIndex: 'warranty',
        refId:'cId',
        maxLength:
        maxLength, type: "radioInput",
        options:options,
        onChangeRadio:this.onChangeRadio,
        onChange: this.onTableInputChange,
        columnSortable:false,
        isCheckValidation: true,
      },
      {
        title: 'Internal',
        dataIndex: 'internal',
        refId:'cId',
        maxLength:
        maxLength, type: "radioInput",
        options:options,
        onChangeRadio:this.onChangeRadio,
        onChange: this.onTableInputChange,
        columnSortable:false,
        isCheckValidation: true,
      },
      {
        title: 'Service Contract',
        dataIndex: 'svcCont',
        refId:'cId',
        maxLength:
        maxLength, type: "radioInput",
        options:options,
        onChangeRadio:this.onChangeRadio,
        onChange: this.onTableInputChange,
        columnSortable:false,
        isCheckValidation: true,
      },
    ]

    return (
      <Fragment>
          <Row>
            <Col md={12}>
              <TableEdify key={2} displayFilter={false} data={this.handleDisabledOptions(repairOrderTax)} tableTitle="Repair Order Components to Tax" columns={columnRepairOrder} scrollY={650} scrollX={630} />
            </Col>
          </Row>
      </Fragment>
    );
  }

}

TableRepairOrder.propTypes = {};

export default TableRepairOrder;
