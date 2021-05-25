import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateTableColumns} from './TableColumns';

class PricingStrategyAssignmtForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAddModal: false,
      priceLevelList: [],
      descriptionOptions: [],
      data: {}
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { pricingAssignmentList, descriptionOptions } = nextProps;
    return { pricingAssignmentList, descriptionOptions };
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

    /**
   * Method that handle mark as complete
   */
  handleMarkAsComplete = () => {
    const { summary } = this.state;
    summary.isCompleted = true;
    this.setState({ isMarkAsComplete: true });
  }

  generateProps = (columns) => {
    let data = {};
    columns.map(col => {
      if (col.type !== 'actionButtons') {
        data[col.refId] = '';
      }
    });
    return data;
  }

  handleShowAddModal = (event, columns) => {
    this.props.onClearLoaderProps();
    let data = generateProps(columns);
    this.setState({ isShowAddModal: true, data });
  }

  handleOnBlur = (event) => {
    this.props.onBlur(event);
  }

  onChangeSave = (eveonChangeInputnt, id, target) => {
    this.props.onChangeSave(event, id, target);
  }

  handleInputOnChange = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  onChangeInput = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }


  onShowErrorModal = (counterPerson) => {
    this.props.onShowErrorModal(counterPerson);
  }

  handleOnClick = (event) => {
    this.props.onClick(event);
  }

  render () {
    const { pricingAssignmentList, data, descriptionOptions } = this.state
    const TableColumns = generateTableColumns(this.handleInputOnChange, this.onShowErrorModal, descriptionOptions, this.handleOnClick);

    return (
      <Fragment>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <TableEdify data={pricingAssignmentList} columns={TableColumns} onAddItemCLick={this.handleShowAddModal} scrollY={620} />
            </Col>
          </Row>
          <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
            <ModalFormEdify fields={TableColumns} title="Add New Item" onHide={this.handleHideAddModal} data={data}/>
          </Modal>
        </form>
      </Fragment>
    );
  }

}

PricingStrategyAssignmtForm.propTypes = {};

export default PricingStrategyAssignmtForm;
