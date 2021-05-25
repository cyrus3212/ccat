import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateColumns} from './TableColumns';
import {generateForm} from './FormFields';

class DepartmentCodesForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      departmentCodeList: [],
      data: {},
      isAddStatus: '',
    };

  }

  static getDerivedStateFromProps(nextProps, state) {
    const { departmentCodeList, departmentCode, isAddStatus } = nextProps;
    return { departmentCodeList, data: departmentCode, isAddStatus };
  }

  /**
   *
   */
  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true});
    this.props.onClearLoaderProps();
    // let data = generateProps(columns);
  }

  /**
   * Handle change text cell input
   */
  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
  }

  /**
   * Handle change radio cell input
   */
  // handleOnChangeRadio = (event, id, target) => {
  //   this.props.onChangeRadio(event, id, target);
  // }

  /**
   * Handle modal input change
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'attendanceDisplay' && value === '') {
      data['attendanceDisplay'] = 'N';
    }

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

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnShowErrorModal = (department) => {
    this.props.onShowErrorModal(department);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { departmentCodeList, data, radioOptions, isAddStatus } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const tableColumns = generateColumns(this.handleOnBlur, this.handleOnShowErrorModal, radioOptions, this.props.securityApplicationLinkOptions);
    const formFields = generateForm(this.handleOnChangeModalInput, this.props.securityApplicationLinkOptions, validationResult);

    let isDisabled = true;

    if (data.code  && data.description) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <TableEdify data={departmentCodeList} tableTitle="" columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true} />
            </Col>
          </Row>

          <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
            <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
              onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
          </Modal>
        </form>
      </Fragment>
    );
  }

}

DepartmentCodesForm.propTypes = {};

export default DepartmentCodesForm;
