import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateProps } from '../../../../helpers/workbookHelper';
import {generateColumns} from './TableColumns';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class AccountPayableForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      apVendorList: [],
      data: {},
      options: [
        {
          value: "Y",
          label: "Y"
        },
        {
          value: "N",
          label: "N"
        }
      ]
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { apVendorList, apVendor } = nextProps;
    return { apVendorList, data: apVendor };
  }

  handleShowAddModal = (event, columns) => {
    this.props.onClearLoaderProps();
    let data = generateProps(columns);
    this.setState({ isShowAddModal: true, data });
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

    if (name === 'emailTextApprovals' && value === '') {
      data['emailTextApprovals'] = 'N';
    }

    if (name === 'poAprovalsRequired' && value === '') {
      data['poAprovalsRequired'] = 'N';
    }

    this.setState({ data });
  }

  handleOnChangeRadio = (event, id, target) => {
    this.props.onChangeRadio(event, id, target);
  }

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
    this.setState({ isShowAddModal: false });
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
    const { apVendorList, data, options } = this.state;
    const { isAddStatus } = this.props;

    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleOnChangeModalInput, this.handleOnChangeRadio, options, validationResult);
    const tableColumns = generateColumns(this.handleOnChangeRadio, this.handleOnBlur, this.handleOnShowErrorModal, options);

    let isDisabled = true;

    if (data.description) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <TableEdify data={apVendorList} tableTitle="" columns={tableColumns} scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true}/>
            </Col>
          </Row>
        </form>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields}  data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>
      </Fragment>
    );
  }

}

AccountPayableForm.propTypes = {};

export default AccountPayableForm;
