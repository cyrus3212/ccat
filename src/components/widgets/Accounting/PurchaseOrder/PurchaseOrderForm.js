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

class PurchaseOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowAddModal: false,
      purchaseOrderList: [],
      data: {},
      defaultOptions: [{value: "Y",label: "Y"},{value: "N",label: "N"}],
      isAddStatus: ''
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { purchaseOrderList, purchaseOrder, isAddStatus } = nextProps;
    return { purchaseOrderList, data: purchaseOrder, isAddStatus: isAddStatus };
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

  handleShowAddModal = (event, columns) => {
    this.props.onClearLoaderProps();
    this.setState({ isShowAddModal: true, data: {},  isAddStatus: '' });
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

  handleSaveAndContinue = () => {
    this.props.onSave();
  }

  handleOnShowErrorModal = (account) => {
    this.props.onShowErrorModal(account);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { purchaseOrderList, data, isAddStatus, defaultOptions } = this.state;
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
      if (purchaseOrderList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={purchaseOrderList} tableTitle="" columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true}/>
          </Col>
        </Row>

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>

        <Footer match={this.props.props.match} onMarkAsComplete={this.props.onMarkAsComplete} summary={summary}
          onSaveAndContinue={this.handleSaveAndContinue} linkTo={'PaymentMethod'}
          disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete} />
      </Fragment>
    );
  }

}

PurchaseOrder.propTypes = {};

export default PurchaseOrder;
