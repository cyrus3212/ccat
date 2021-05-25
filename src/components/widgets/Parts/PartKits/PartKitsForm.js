import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import kitTranslate from '../../../../translation/parts/partKits.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { getUidInteger } from '../../../../helpers/generateUid';
import {generateForm} from './FormFields';
import {generateModalForm} from './ModalFormFields';
import {listTableColumns} from './TableColumns';
import DeleteRowModal from '../../../reusable/DeleteRowModal';

class PartKitsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      partKitsList: [],
      item: {},
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { partKits } = nextProps;
    return { data: partKits, partKitsList: partKits.items || [] }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
  }

    /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { name, value } = event;
    const { partKitsList } = Object.assign({}, this.state);
    let selectedRow = partKitsList.findIndex(selectedRow => selectedRow.cId === id);
    partKitsList[selectedRow][target] = value;
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, partKitsList } = this.state;
    data['items'] = partKitsList;
    let model = data;
    this.props.onSave(model)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
    this.setState({ data: {}, partKitsList: [] })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleModalGetProps = (item) => {
    item['cId'] = getUidInteger();
    this.setState({ item });
  }

    /**
   * method that reset loader status to default
   */
  handleClearLoaderProps = () => {
    this.setState({
      loaderStatus: '',
      data: {},
      partKitsList: []
    })
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleOnShowErrorModal = (partKitsRowDelete) => {
    this.setState({ partKitsRowDelete, isShowDeleteModal: true });
  }

    /**
   * method to handle add new item
   */
  handleAddItem = () => {
    let item = Object.assign({}, this.state.item);
    this.setState({ partKitsList: [...this.state.partKitsList, item], isAddStatus: 'success', item: {} });

    setTimeout(() => {
      this.setState({
        isAddStatus: ''
      })
    }, 1000)
  }

  handleRowDel = () => {
    const { partKitsList, partKitsRowDelete } = Object.assign({}, this.state);
    // delete account
    let index = partKitsList.indexOf(partKitsRowDelete);
    partKitsList.splice(index, 1);
    if (partKitsList.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ partKitsList, isShowDeleteModal: false });
  }

  /**
   * method to handle data input changes
   */
  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    let item = Object.assign({}, this.state.item);
    item[name] = value;

    this.setState({ item });
  }

  /**
   * Handle show add modal event
   */
  handleShowAddModal = () => {
    this.setState({ isShowAddModal: true });
  }

  handleChangeModal = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  handleCloseDeleteModal = () => {
    this.setState({
      isShowDeleteModal: false
    })
  }

  render () {
    const { partKitsList, data, item, isAddStatus, isShowDeleteModal } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateModalForm(this.handleOnChangeModalInput);
    const generateFieldsForm = generateForm(this.handleInputOnChange, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange, this.handleDisabledDeleteButton, this.handleOnShowErrorModal, this.handleChangeModal)
    let isDisabledSave = true;

    if (data.kitDescription && data.kitNumber) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={generateFieldsForm} data={data} onGetProps={this.handleGetProps}/>
            <TableEdify data={partKitsList} tableTitle={kitTranslate.partsInKit} columns={tableColumns} scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true} displayFilter={false}/>
            <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
              <ModalFormEdify fields={formFields} data={item} onGetProps={this.handleModalGetProps} isAddStatus={isAddStatus} title="Add New Item"
                onHide={this.handleHideAddModal} onAdd={this.handleAddItem}/>
            </Modal>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabledSave}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>
        </form>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    );
  }

}

PartKitsForm.propTypes = {};

export default PartKitsForm;
