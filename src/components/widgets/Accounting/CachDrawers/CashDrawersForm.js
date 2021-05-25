import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateCashDrawersColumns} from './TableColumns';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class CashDrawersForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      cashDrawerList: [],
      data: {},
      isAddStatus: '',
    };

  }

  static getDerivedStateFromProps(nextProps, state) {
    const { cashDrawerList, cashDrawer,  isAddStatus } = nextProps;
    return { cashDrawerList, data: cashDrawer, isAddStatus };
  }

  /**
   * Method used on modal edit from inline event
   */
  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
  }

  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
  }

  /**
   * Handle change cell input
   */
  handleCellInputOnChange = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  /**
   * Handle modal input change
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

  /**
   * Handle on add item
   */
  handleAddItem = () => {
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;
    let data = Object.assign({}, this.state.data);

    data['dtid'] = dtid;
    data['enterpriseCode'] = enterpriseCode;
    data['workbook'] = workbook;
    data['section'] = section;

    this.props.onAddItem(data);
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false, isAddStatus: '' });
  }

  handleOnSaveAndContinue = () => {
    this.props.onSave();
  }

  onShowErrorModal = (account) => {
    this.props.onShowErrorModal(account);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { cashDrawerList, data, isAddStatus } = this.state;
    const { summary } = this.props;
    let validationResult = [];
    let isDisabled = true;
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const tableColumns = generateCashDrawersColumns(this.handleCellInputOnChange, this.handleOnBlur, this.onShowErrorModal);
    const formFields = generateForm(this.handleOnChangeModalInput, validationResult);

    if (data.accountNumber && data.description && data.depositBankAccountNumber) {
      isDisabled = false;
    }

    try {
      if (cashDrawerList.length > 0) {
        disabledClearData = false;
      }
    } catch (e) {

    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={cashDrawerList} columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true}/>
          </Col>
        </Row>
         <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}  isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>

        <Footer match={this.props.props.match} onMarkAsComplete={this.props.onMarkAsComplete} summary={summary}
          onSaveAndContinue={this.handleOnSaveAndContinue} linkTo={'TaxGroup'}
          disabledClearData={disabledClearData} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete} />
      </Fragment>
    );
  }

}

CashDrawersForm.propTypes = {};

export default CashDrawersForm;
