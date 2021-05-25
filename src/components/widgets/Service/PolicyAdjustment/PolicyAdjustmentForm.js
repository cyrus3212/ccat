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

class PolicyAdjustmentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      policyAdjustmentList: [],
      // Temporarily created on Client end, will integrate on service API once available
      data: {}
    };

  }

  static getDerivedStateFromProps(nextProps, state) {
    const { policyAdjustmentList, policyAdjustment } = nextProps;
    return { policyAdjustmentList, data: policyAdjustment };
  }

  /**
   *
   */
  handleShowAddModal = (event, columns) => {
    this.props.onClearLoaderProps();
    let data = generateProps(columns);
    this.setState({ isShowAddModal: true, data });
  }

  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
  }

  handleOnChangeInput = (event, id, target) => {
    // this.props.onChangeInput(event, id, target);
  }

  handleOnChangeModalInput = (event) => {
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
    this.setState({ isShowAddModal: false });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnSaveAndContinue = () => {
    this.props.onSave();
  }

  onShowErrorModal = (account) => {
    this.props.onShowErrorModal(account);
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
    this.props.clearData();
  }

  render () {
    const { policyAdjustmentList, data } = this.state;
    const { isAddStatus, partsPricingOptions, linePaymentMethodOptions, summary } = this.props;
    let validationResult = [];
    let disabledClearData = true;

    if (policyAdjustmentList.length > 0) {
      disabledClearData = false;
    }

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleOnChangeModalInput, partsPricingOptions, linePaymentMethodOptions, validationResult);
    const tableColumns = generateColumns(this.handleOnChangeInput, this.handleOnBlur, this.onShowErrorModal, partsPricingOptions, linePaymentMethodOptions)

    let disbledAdd = true;

    if (data.policyAdjustmentCode && data.description) {
      disbledAdd = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <TableEdify data={policyAdjustmentList} tableTitle="" columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true} />
              <Footer match={this.props.props.match} disabledClearData={disabledClearData} summary={summary}
                onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.props.onMarkAsComplete}
                onSaveAndContinue={this.handleOnSaveAndContinue} linkTo={'ServiceFees'}
              />
            </Col>
          </Row>

          <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
            <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} isAddStatus={isAddStatus} title="Add New Item"
              onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={disbledAdd} />
          </Modal>
        </form>

      </Fragment>
    );
  }

}

PolicyAdjustmentForm.propTypes = {};

export default PolicyAdjustmentForm;
