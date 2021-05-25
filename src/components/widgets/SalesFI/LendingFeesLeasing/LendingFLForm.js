import React, {Component, Fragment} from 'react';
// import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateTableColumns} from './TableColumns';
import {generateForm} from './FormFields';

class LendingFLForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      lendingList: [],
      radioOtions: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' }
      ],
      data: {}

    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { lendingList, lending, isAddStatus } = nextProps;
    return { lendingList: lendingList || [], data: lending || {}, isAddStatus };
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

  handleGetProps = (data) => {
    this.setState({ data });
  }

  render () {
    const { lendingList, data, radioOtions } = this.state;
    const { recordTypeOptions, isAddStatus, fetTaxableOptions, taxCodeOptions } = this.props;
    const TableColumns = generateTableColumns(this.handleCellInputOnChange,
        this.handleDisabledDeleteButton, this.onShowErrorModal, this.handleChangeModal,
        recordTypeOptions, radioOtions, this.handleOnBlur, this.onChangeSave, fetTaxableOptions, taxCodeOptions
    );

    let validationResult = [];
    try {
      validationResult = data.validationResult;
    }
    catch (e) {
    }

    const formFields = generateForm(this.handleOnChangeModalInput, recordTypeOptions, radioOtions, fetTaxableOptions, taxCodeOptions, validationResult);
    let isDisabled = true;
    if (data.recordType && data.description) {
      isDisabled = false;
    };

    return (
      <Fragment>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <TableEdify data={lendingList} columns={TableColumns} onAddItemClick={this.handleShowAddModal} displayAddItem={true} />
            </Col>
          </Row>
          <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
            <ModalFormEdify fields={formFields} isAddStatus={isAddStatus} title="Add New GL Account" onHide={this.handleHideAddModal}
              data={data} onGetProps={this.handleGetProps} onAdd={this.handleAddItem} isDisabled={isDisabled}
            />
          </Modal>
        </form>
      </Fragment>
    );
  }
}

LendingFLForm.propTypes = {};

export default LendingFLForm;
