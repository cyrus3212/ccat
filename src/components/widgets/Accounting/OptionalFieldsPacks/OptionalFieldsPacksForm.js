import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import opticalFieldsTranslate from '../../../../translation/accounting/opticalFields.json';
import {generateForm} from './FormFields';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import { generateColumns } from './TableColumns';
import { generateModalForm } from './ModalFormFields';
import Modal from 'react-bootstrap/lib/Modal';
import Footer from '../../../common/Footer';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import { getUid } from '../../../../helpers/generateUid';

class SplitAccoutnsForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      highestSequenceNumber: "",
      sequenceNumbers: [],
      data: {},
      item: {},
      customField: [],
      isAddStatus: "",
      type: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' }
      ]
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { optionalFieldsList, isAddStatus } = nextProps;

    if (optionalFieldsList.length) {
      let items = optionalFieldsList[0].items || [];
      let sequenceNumbers = [];

      items.map(i => {
        sequenceNumbers.push(i.sequenceNumber)
      });
      let highestSequenceNumber = Math.max(...sequenceNumbers) + 1 + "";

      return { data: optionalFieldsList[0] || {}, customField: items || [], highestSequenceNumber, sequenceNumbers, isAddStatus }
    }

    return {
      data: {},
      customField: [],
      isAddStatus: "",
      highestSequenceNumber: "1",
      sequenceNumbers: [],
    };
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { customField, data } = this.state;
    const { name, value } = event;

    if (name === 'defaultHoldbackAccount') {
      customField.map(row => {
        if (row.sequenceNumber === '4') {
          row.creditAccount = value;
        }
      })
    }

    if (name === 'defaultFlooringAccountNewVehicles') {
      customField.map(row => {
        if (row.sequenceNumber === '5') {
          row.creditAccount = value;
        }
      })
    }

    if (name === 'defaultPayoffAccountUsedVehicles') {
      customField.map(row => {
        if (row.sequenceNumber === '5') {
          row.debitAccount = value;
        }
      })
    }

    data[name] = value;
    this.setState({ data, customField });
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { value } = event;
    const { customField } = Object.assign({}, this.state);
    let selectedRow = customField.findIndex(selectedRow => selectedRow.cId == id);
    customField[selectedRow][target] = value;

    if (target === 'type') {
      if (value === 'B') {
        customField[selectedRow].creditAccount = "";
      } else if (value === 'C') {
        customField[selectedRow].debitAccount = "";
      }
      else {
        customField[selectedRow].debitAccount = "";
        customField[selectedRow].creditAccount = "";
      }
    }

    this.setState({ customField });
  }

  handleTableInputOnBlur = (event, id, target) => {
    const { value } = event;

    const { sequenceNumbers, customField } = this.state;
    let selectedRow = customField.findIndex(selectedRow => selectedRow.cId == id);

    if (target === 'sequenceNumber') {
      if (sequenceNumbers.includes(value)) {
        customField[selectedRow].validationResult = [{
          key: 'sequenceNumber',
          message: 'Sequence number already exist.'
        }]
      } else {
        customField[selectedRow].validationResult = []
      }
    }

    this.setState({ customField });
  }
  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleModalGetProps = (item) => {
    item['cId'] = getUid();
    this.setState({ item });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleShowAddModal = () => {
    // this.props.onClearLoaderProps();
    let item = {};
    item.sequenceNumber = this.state.highestSequenceNumber;
    item.addToCost = null;
    item.validationResult = []

    this.setState({ isShowAddModal: true, item });
  }

  handleChangeModal = (event) => {
    const { name, value } = event;
    const { item } = this.state;
    item[name] = value;

    if (name === 'type') {
      if (event.value === 'B') {
        item.creditAccount = "";
      } else if (event.value === 'C') {
        item.debitAccount = "";
      } else {
        item.debitAccount = "";
        item.creditAccount = "";
      }
    }

    this.setState({ item });
  }

  handleAddItem = () => {
    let { item, data } = this.state;
    item.requiredStockOptionValues = item.requiredStockOptionValues || [];
    item.sequenceNumber = this.state.highestSequenceNumber;

    let newItem = {}
    newItem['sequenceNumber'] = (parseInt(this.state.highestSequenceNumber) + 1);

    this.props.onAddItem(item, data);
    this.setState({
      item: newItem,
      highestSequenceNumber:  (parseInt(this.state.highestSequenceNumber) + 1)
    });
  }

  handleOnShowErrorModal = (rowDelete) => {
    this.setState({
      rowDelete,
      isShowDeleteModal: true
    });
  }

  /**
   * method that handle delete row
   */
  handleRowDel = () => {
    const { customField, rowDelete } = Object.assign({}, this.state);
    // delete account
    let index = customField.indexOf(rowDelete);
    customField.splice(index, 1);

    this.setState({ isShowDeleteModal: false });
  }

  /**
   * method that handle general dept save
   */
  handleOnSaveAndContinue = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  handleOnMarkAsComplete = (status) => {
    const { data, customField } = this.state;
    data.items = customField;

    this.props.onHandleMarkAsComplete(data, status);
  }

  handleDisableDan = (row) => {
    if (row.type === 'B' || row.type === 'G') {
      return false;
    }
    return true;
  }

  handleDisableCan = (row) => {
    if ( row.type === 'C' || row.type === 'G') {
      return false;
    }
    return true;
  }

  /**
   * method that hide error modal
   */

  handleCloseDeleteModal = () => {
    this.setState({ isShowDeleteModal: false });
  };

  handleDisableRow = (e) => {
    let sNum = e.isDefault;
    if (sNum) {
      return true;
    }
  };

  render () {
    let { data, isShowAddModal, customField, type, isShowDeleteModal, item, highestSequenceNumber, isAddStatus } = this.state;
    const { requiredStockOptions, typeOptions, scheduleByOptions, summary, hasError } = this.props;
    let validationResult = [];
    let validationResultModal = [];

    try {
      validationResult = data.validationResult;
      validationResultModal = customField[customField.length - 1].validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, validationResult);
    const ModalFormFields = generateModalForm(this.handleChangeModal, typeOptions, scheduleByOptions, requiredStockOptions, type, validationResultModal,
      this.handleDisableDan(item), this.handleDisableCan(item));
    const tableColumns = generateColumns(this.handleTableInputOnChange, this.handleOnShowErrorModal, typeOptions, scheduleByOptions,
      requiredStockOptions, type, this.handleDisableDan, this.handleDisableCan, this.handleDisableRow);

    let newRow = item;
    if (isAddStatus === 'success') {
      newRow = {};
      newRow.sequenceNumber = this.state.highestSequenceNumber + "";
    }

    return (
      <Fragment>
        <form className="form-horizontal optional-field">
            <div className="optionalFPFormRow">
              <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
            </div>
            <Row md={12}>
              <TableEdify displayFilter={true} data={customField} tableTitle={opticalFieldsTranslate.addCustomField} htmlId="optional-table-list"
                scrollY={650} scrollX={1024} forceScrollX={true} columns={tableColumns} onAddItemClick={this.handleShowAddModal} displayAddItem={true}/>
            </Row>

            <Modal show={isShowAddModal} onHide={this.handleHideAddModal}>
              <ModalFormEdify isAddStatus={isAddStatus} fields={ModalFormFields} data={newRow} onGetProps={this.handleModalGetProps} title="Add New Item"
              onHide={this.handleHideAddModal} onAdd={this.handleAddItem}/>
            </Modal>
        </form>

        <Footer match={this.props.props.match} onMarkAsComplete={this.handleOnMarkAsComplete}
          onSaveAndContinue={this.handleOnSaveAndContinue} linkTo={'VehicleInventory'} summary={summary} hasError={hasError}
          disabledClearData={false} isClearDataShow={true} onClearDataComplete={this.props.onClearDataComplete}
        />

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    );
  }

}

SplitAccoutnsForm.propTypes = {};

export default SplitAccoutnsForm;
