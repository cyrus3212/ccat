import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateTableColumns} from './TableColumns';
import {generateForm} from './FormFields';
import { generateProps } from '../../../../helpers/workbookHelper';

class SalesDeptEmpForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      salesDeptEmpList: [],
      data: {}
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { salesDeptEmpList, salesDeptEmp,  isAddStatus } = nextProps;
    return { salesDeptEmpList, data: salesDeptEmp, isAddStatus };
  }

  /**
   * Method used on modal edit from inline event
   */
  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
    // let data = generateProps(columns);
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

  handleOnClick = (event) => {
    this.props.onClick(event);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { salesDeptEmpList, data } = this.state;
    const { isAddStatus, salesPersonTypeOptions } = this.props;
    const TableColumns = generateTableColumns(this.handleCellInputOnChange, this.handleDisabledDeleteButton, this.onShowErrorModal, salesPersonTypeOptions, this.handleOnBlur, this.handleOnClick);
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }
    const formFields = generateForm(this.handleOnChangeModalInput, salesPersonTypeOptions, validationResult);

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={salesDeptEmpList} columns={TableColumns} htmlId="" onAddItemClick={this.handleShowAddModal} displayAddItem={true} scrollY={650} />
          </Col>
        </Row>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} title="Add New Employee" isAddStatus={isAddStatus} onHide={this.handleHideAddModal} data={data} onGetProps={this.handleGetProps} onAdd={this.handleAddItem}/>
        </Modal>
      </Fragment>
    );
  }

}

SalesDeptEmpForm.propTypes = {};

export default SalesDeptEmpForm;
