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

class PaymentMethodForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowAddModal: false,
      paymentMethodList: [],
      data: {},
      isAddStatus: '',
      clearDisabled: false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { paymentMethodList, paymentMethod, isAddStatus } = nextProps;
    return { paymentMethodList, data: paymentMethod, isAddStatus };
  }

  handleShowAddModal = (event, columns) => {
    this.props.onClearLoaderProps();
    this.setState({ isShowAddModal: true, data: {},  isAddStatus: ''});
  }

  handleOnChangeInput = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleOnChangeInputSave = (event, id, target) => {
    this.props.onChangeInputSave(event, id, target);
  }

  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (data['paymentType'] !== '5') {
      data['transFeePercent'] = '';
      data['transFeeAccount'] = '';
    } else {
      data[name] = value;
    }

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
    this.setState({ isShowAddModal: false });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnSaveAndContinue = () => {
    this.props.onSave();
  }

  onShowErrorModal = (account) => {
    this.props.onShowErrorModal(account);
  }

  handleOnClick = (event) => {
    this.props.onClick(event);
  }

  handleDisabledButton = (event) => {
    let val = true;
    if (event.isDefault !== true) {
      val = false;
    }
    return val;
  }

  handleDisabledPaymentType = (event) => {
    // Credit Card
    if (event.paymentType === "5") {
      return false;
    } else {
      return true;
    }
  }

  render () {
    const { paymentMethodList, data, isAddStatus, clearDisabled } = this.state;
    const { paymentTypeOptions, summary } = this.props;
    let validationResult = [];
    let isDisabled = true;
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleOnChangeModalInput, paymentTypeOptions, data, validationResult);
    const tableColumns = generateColumns(this.handleOnChangeInput, this.onShowErrorModal, paymentTypeOptions, this.handleOnChangeInputSave, this.handleDisabledButton, this.handleDisabledPaymentType, clearDisabled);

    if (data.paymentMethods && data.description) {
      isDisabled = false;
    }

    try {
      if (paymentMethodList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={paymentMethodList} tableTitle="" columns={tableColumns} htmlId="" disableNumberRows={2}
              scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true}
            />
            <Footer match={this.props.props.match} onMarkAsComplete={this.props.onMarkAsComplete}
              onSaveAndContinue={this.handleOnSaveAndContinue} linkTo={'CashDrawers'} summary={summary}
              disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete}
            />
          </Col>
        </Row>

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>
      </Fragment>
    );
  }

}

PaymentMethodForm.propTypes = {};

export default PaymentMethodForm;
