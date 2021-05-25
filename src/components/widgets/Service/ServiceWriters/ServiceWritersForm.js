import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateColumns} from './TableColumns';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';
import TableEdifyLazyLoadExtended from '../../../reusable/TableEdifyLazyLoadExtended';

class ServiceWritersForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      data: {}
    };

  }

  static getDerivedStateFromProps(nextProps, state) {
    const { serviceWriters } = nextProps;
    return { data: serviceWriters };
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

    if (name == 'serviceWriterId') {
      data.password = value;
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

  handleOnSaveAndContinue = () => {
    this.props.onSave();
  }

  onShowErrorModal = (account) => {
    this.props.onShowErrorModal(account);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  render () {
    const { data } = this.state;
    const { isAddStatus, serviceWritersList, serviceWritersListCopy, totalPages, updateData, onSearch, onClear, searchVal, summary } = this.props;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleOnChangeModalInput, validationResult);
    const tableColumns = generateColumns(this.handleCellInputOnChange, this.handleOnBlur, this.onShowErrorModal)

    let disabledAdd = true;
    let disabledClearData = true;

    if (serviceWritersList.length > 0) {
      disabledClearData = false;
    }

    if (data.serviceWriterId && data.name) {
      disabledAdd = false;
    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdifyLazyLoadExtended
              displayFilter={false}
              match={this.props.match}
              data={serviceWritersList}
              dataCopy={serviceWritersListCopy}
              totalPages={totalPages}
              columns={tableColumns}
              searchVal={searchVal}
              scrollY={350}
              updateData={updateData}
              displayAddItem={true}
              onAddItemClick={this.handleShowAddModal}
              onSearch={onSearch}
              onClear={onClear}
              enableSearch={true}
              dispatch={this.props.dispatch}
            />
          </Col>
        </Row>

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={disabledAdd} />
        </Modal>
      </Fragment>
    );
  }

}

ServiceWritersForm.propTypes = {};

export default ServiceWritersForm;
