import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateColumns } from './TableColumns';
import { generateForm } from './FormFields';
import Footer from '../../../common/Footer';

class CashReceipt extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      cashReceiptList: [],
      defaultOptions: [{value: "Y",label: "Y"},{value: "N",label: "N"}],
      data: {},
      isAddStatus: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { cashReceiptList, cashReceipt, isAddStatus } = nextProps;
    return { cashReceiptList, data: cashReceipt, isAddStatus: isAddStatus };
  }

  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
  }

  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
  }

  handleOnChangeInput = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  handleAddItem = () => {
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;
    let data = Object.assign({}, this.state.data);

    data['dtid'] = dtid;
    data['enterpriseCode'] = enterpriseCode;
    data['workbook'] = workbook;
    data['section'] = section;
    this.setState({isAddStatus: ''});
    this.props.onAddItem(data);
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false, isAddStatus: '' });
  }

  handleOnShowErrorModal = (cashReceipt) => {
    this.props.onShowErrorModal(cashReceipt);
  }

  handleSaveAndContinue = () => {
    this.props.onSave();
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { cashReceiptList, isShowAddModal, data, isAddStatus, defaultOptions } = this.state;
    const { summary } = this.props
    let validationResult = [];
    let isDisabled = true;
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleOnChangeModalInput, defaultOptions, validationResult);
    const tableColumns = generateColumns(this.handleOnChangeInput, this.handleOnBlur, this.handleOnShowErrorModal, defaultOptions);

    if (data.typeCode && data.description) {
      isDisabled = false;
    }

    try {
      if (cashReceiptList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={cashReceiptList} columns={tableColumns} scrollY={650} scrollX={630} displayAddItem={true} onAddItemClick={this.handleShowAddModal}/>
          </Col>
        </Row>

        <Modal show={isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields}  data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>

        <Footer match={this.props.props.match} onMarkAsComplete={this.props.onMarkAsComplete} summary={summary}
          onSaveAndContinue={this.handleSaveAndContinue} linkTo={'PurchaseOrder'}
          disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete} />
      </Fragment>
    );
  }

}

CashReceipt.propTypes = {};

export default CashReceipt;
