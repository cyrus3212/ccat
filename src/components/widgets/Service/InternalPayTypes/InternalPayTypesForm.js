import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { generateProps } from '../../../../helpers/workbookHelper';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import {generateColumns} from './TableColumns';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class InternalPayTypesForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      internalPayTypesList: [],
      data: {}
    };

  }

  static getDerivedStateFromProps(nextProps, state) {
    const { internalPayTypesList, internalPayTypes } = nextProps;
    return { internalPayTypesList, data: internalPayTypes };
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

  handleOnClearDataComplete = () => {
    this.props.componentReload();
    this.props.clearData();
  }

  render () {
    const { internalPayTypesList, data  } = this.state;
    const { isAddStatus, summary } = this.props;
    let validationResult = [];
    let disabledClearData = true;

    if (internalPayTypesList.length > 0) {
      disabledClearData = false;
    }

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleOnChangeModalInput, validationResult);
    const tableColumns = generateColumns(this.handleCellInputOnChange, this.handleOnBlur, this.onShowErrorModal)

    let disbledAdd = true;

    if (data.typeCode && data.description) {
      disbledAdd = false;
    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={internalPayTypesList} tableTitle="" columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true} />
            <Footer match={this.props.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} summary={summary}
              isClearDataShow={true} onMarkAsComplete={this.props.onMarkAsComplete} onSaveAndContinue={this.handleOnSaveAndContinue} linkTo={'PolicyAdjustment'}
            />
          </Col>
        </Row>

        <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={disbledAdd}/>
        </Modal>
      </Fragment>
    );
  }

}

InternalPayTypesForm.propTypes = {};

export default InternalPayTypesForm;
