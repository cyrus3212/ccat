import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
// import kitTranslate from '../../../../translation/parts/distributionCodes.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { getUidInteger } from '../../../../helpers/generateUid';
import {generateForm} from './FormFields';
import {generateModalForm} from './ModalFormFields';
import {listTableColumns} from './TableColumns';
import {distributionCodesListDefaultValues} from './DistributionCodesListDefaultValues';
import DeleteRowModal from '../../../reusable/DeleteRowModal';
import FormSectionFooterAction from '../../../reusable/FormSectionFooterAction/FormSectionFooterAction';

class DistributionCodesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      distributionCodesList: [],
      item: {},
      isCheckSaveAndRetain: false
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { distributionCodes, checkSaveAndRetain } = nextProps;

    try{
      return {
        data: distributionCodes,
        distributionCodesList: distributionCodes.items || [],
        isCheckSaveAndRetain: checkSaveAndRetain
      }
    }catch (e) {}
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
    const { distributionCodesList } = Object.assign({}, this.state);
    let selectedRow = distributionCodesList.findIndex(selectedRow => selectedRow.cId === id);
    distributionCodesList[selectedRow][target] = value;
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, distributionCodesList, isCheckSaveAndRetain } = this.state;
    data['items'] = distributionCodesList;
    let model = data;
    this.props.onSave(model, isCheckSaveAndRetain)
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState)
    this.setState({ data: {}, distributionCodesList: [] })
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
      distributionCodesList: []
    })
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleShowErrorModal = (distributionCodesRowDelete) => {
    this.setState({ distributionCodesRowDelete, isShowDeleteModal: true });
  }

    /**
   * method to handle add new item
   */
  handleAddItem = () => {
    let item = Object.assign({}, this.state.item);
    this.setState({ distributionCodesList: [...this.state.distributionCodesList, item], isAddStatus: 'success', item: {} });

    setTimeout(() => {
      this.setState({
        isAddStatus: ''
      })
    }, 1000)
  }

  handleRowDel = () => {
    const { distributionCodesList, distributionCodesRowDelete } = Object.assign({}, this.state);
    // delete account
    let index = distributionCodesList.indexOf(distributionCodesRowDelete);
    distributionCodesList.splice(index, 1);
    if (distributionCodesList.length === 0) {
      this.setState({
        isSaveButtonDisabled: true
      });
    }

    this.setState({ distributionCodesList, isShowDeleteModal: false });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

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
  };

  /**
   * Method used to set if to Retain the data as next entry
   */
  handleOnChangeSaveAndRetain = (response) => {
    this.setState({isCheckSaveAndRetain: response});
  }

  render () {
    const { distributionCodesList, data, item, isAddStatus, isShowDeleteModal, isCheckSaveAndRetain } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateModalForm(this.handleOnChangeModalInput);
    const generateFieldsForm = generateForm(this.handleInputOnChange, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange, this.handleDisabledDeleteButton, this.handleShowErrorModal, this.handleChangeModal)
    let isDisabledSave = true;

    if (data.code && data.description) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={generateFieldsForm} data={data || []} onGetProps={this.handleGetProps}/>
            <TableEdify data={distributionCodesList} columns={tableColumns} scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal}
              displayAddItem={true} displayFilter={false} htmlId="distributionCodesItemList"/>
            <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
              <ModalFormEdify fields={formFields} data={item} onGetProps={this.handleModalGetProps} isAddStatus={isAddStatus} title="Add New Item"
                onHide={this.handleHideAddModal} onAdd={this.handleAddItem}/>
            </Modal>
          </div>
          {/* <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabledSave}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row> */}
          <FormSectionFooterAction disabledSave={isDisabledSave} checkSaveAndRetain={isCheckSaveAndRetain} onSave={this.handleOnSave} onClearForm={this.clearForm}
            onChangeSaveAndRetain={this.handleOnChangeSaveAndRetain}
          />
        </form>

        <Modal show={isShowDeleteModal} onHide={this.handleCloseDeleteModal}>
          <DeleteRowModal onHide={this.handleCloseDeleteModal} onClickDelete={this.handleRowDel}/>
        </Modal>
      </Fragment>
    );
  }

}

DistributionCodesForm.propTypes = {};

export default DistributionCodesForm;
