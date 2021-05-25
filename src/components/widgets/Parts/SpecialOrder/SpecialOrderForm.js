import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import "../_parts.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateProps } from '../../../../helpers/workbookHelper';
import {generateTableColumns} from './TableColumns';
import {generateForm} from './FormFields';

class SpecialOrderForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      specialOrderList: [],
      options: [
        {value: "Y", label: "Yes"},
        {value: "N", label: "No"}
      ],
      data: {}
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { specialOrderList, isAddStatus } = nextProps;
    return { specialOrderList, isAddStatus };
  }

  handleInputOnChange = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
  }

  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
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
    this.setState({ isShowAddModal: false, isAddStatus: '' });
  }

  /**
   * Method that handle show delete confirmation
   */
  handleOnShowErrorModal = (order) => {
    this.props.onShowErrorModal(order);
  }

  /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = () => {
    const { summary } = this.state;
    summary.isCompleted = true;
    this.setState({ isMarkAsComplete: true });
    // this.props.dispatch(addSalesFISection(getParams([], summary)));
  }

  handleGetProps = (data) => {
    this.setState({ data: [] });
  }

  render () {
    const { specialOrderList, data, options } = this.state;
    const { isAddStatus } = this.props;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const TableColumns = generateTableColumns(this.handleOnChangeRadio, this.handleOnBlur, this.handleOnShowErrorModal, options);
    const formFields = generateForm(this.handleOnChangeModalInput, options, validationResult);

    let isDisabledAdd = true;

    if (data.description) {
      isDisabledAdd = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
        <Row>
          <Col md={12}>
            <TableEdify data={specialOrderList} columns={TableColumns} onAddItemClick={this.handleShowAddModal} displayAddItem={true} />
          </Col>`
        </Row>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify isAddStatus={isAddStatus} fields={formFields} title="Add New Item"
                onHide={this.handleHideAddModal} data={data} isDisabled={isDisabledAdd} onGetProps={this.handleGetProps} onAdd={this.handleAddItem}/>
        </Modal>
        </form>
      </Fragment>
    );
  }

}

SpecialOrderForm.propTypes = {};

export default SpecialOrderForm;
