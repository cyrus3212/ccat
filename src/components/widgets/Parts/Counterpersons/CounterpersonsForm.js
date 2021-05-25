import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import "../_parts.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateTableColumns } from './TableColumns';
import { generateForm } from './FormFields';

class CounterpersonsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAddModal: false,
      counterpersonList: [],
      data: {},
      isAddStatus: ''
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { counterpersonList, isAddStatus, counterperson } = nextProps;
    return { counterpersonList, isAddStatus, data: counterperson };
  }

  handleInputOnChange = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
  }

  handleOnBlur = (event) => {
    this.props.onBlur(event);
  }

  /**
   * Handle modal input change
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    // data['key'] = 0;
    this.setState({ data });
  }

  handleChangeModal = (event) => {
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

    this.props.onAddItem(data);
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false, isAddStatus: '' });
  }

  handleOnShowErrorModal = (counterPerson) => {
    this.props.onShowErrorModal(counterPerson);
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
    this.setState({ data });
  }

  render () {
    const { counterpersonList, data, isAddStatus } = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    }
    catch (e) {

    }

    const TableColumns = generateTableColumns(this.handleInputOnChange, this.handleDisabledDeleteButton, this.handleOnShowErrorModal, this.handleChangeModal, this.handleOnBlur);
    const formFields = generateForm(this.handleOnChangeModalInput, validationResult);

    let isDisabledAdd = true;

    if (data.password && data.employeeNumber && data.name && data.key) {
      isDisabledAdd = false;
    }
    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={counterpersonList} columns={TableColumns} onAddItemClick={this.handleShowAddModal} displayAddItem={true} scrollY={620} />
          </Col>
        </Row>
        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
              onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabledAdd}/>
        </Modal>
      </Fragment>
    );
  }

}

CounterpersonsForm.propTypes = {};

export default CounterpersonsForm;
