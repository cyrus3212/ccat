import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
// import "../_parts.scss";
import TableEdify from '../../../reusable/TableEdify';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import ModalFormEdify from '../../../reusable/ModalFormEdify';
import Modal from 'react-bootstrap/lib/Modal';
import { generateProps } from '../../../../helpers/workbookHelper';
import {generateCountyTaxTableColumns} from './TableColumns';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class CountyCityTax extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isShowAddModal: false,
      countyCityTaxList: [],
      data: {},
      isAddStatus: ''
    };
  }

  static getDerivedStateFromProps(nextProps, state) {

    const { countyCityTaxList, countyCityTax, isAddStatus, taxWitholdingOptions } = nextProps;
    return { data: countyCityTax, countyCityTaxList, isAddStatus, taxWitholdingOptions};
  }

  handleShowAddModal = (event, columns) => {
    this.setState({ isShowAddModal: true });
    this.props.onClearLoaderProps();
  }

  handleOnBlur = (event, id, target) => {
    this.props.onBlur(event, id, target);
  }

  handleOnClick = (event) => {
    this.props.onClick(event);
  }

  handleOnChangeInput = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleOnChangeModalInput = (event) => {
    const { name, value } = event;
    const { taxWitholdingOptions } = this.state
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    if (name === 'withholdingTaxingUnitType') {
      taxWitholdingOptions.map((taxWitholdingOption, index)=> {
        if (taxWitholdingOption.value === value) {
          data['taxEntityName'] = taxWitholdingOption.taxUnitName;
        }
      });
    }

    this.setState({ data });
  }

  handleAddItem = () => {
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;
    let data = Object.assign({}, this.state.data);

    data['dtid'] = dtid;
    data['enterpriseCode'] = enterpriseCode;
    data['workbook'] = workbook;
    data['section'] = section;
    //this.setState({isAddStatus: ''});
    this.props.onAddItem(data);
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false, isAddStatus: '' });
  }

  handleOnShowErrorModal = (cashReceipt) => {
    this.props.onShowErrorModal(cashReceipt);
  }

  handleSaveAndContinue = () => {
    this.props.onSave();
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
    this.props.clearData();
  }

  render () {
    const { countyCityTaxList, data, isAddStatus, taxWitholdingOptions } = this.state;
    const { summary } = this.props;
    let validationResult = [];
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;

      if (countyCityTaxList.length > 0) {
        disabledClearData = false;
      }

    } catch (e) {

    }

    const tableColumns = generateCountyTaxTableColumns(this.handleOnChangeInput, this.handleOnBlur, this.handleOnShowErrorModal);
    const formFields = generateForm(this.handleOnChangeModalInput, validationResult, taxWitholdingOptions);
    let isDisabled = true;

    if (data.taxEntityName  && data.liabilityAccounttoAccrueTax) {
      isDisabled = false;
    }

    return (
      <Fragment>
        <Row>
          <Col md={12}>
            <TableEdify data={countyCityTaxList} columns={tableColumns} htmlId="" scrollY={650} scrollX={630} onAddItemClick={this.handleShowAddModal} displayAddItem={true}/>
          </Col>
        </Row>
         <Modal show={this.state.isShowAddModal} onHide={this.handleHideAddModal}>
          <ModalFormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}  isAddStatus={isAddStatus} title="Add New Item"
            onHide={this.handleHideAddModal} onAdd={this.handleAddItem} isDisabled={isDisabled}/>
        </Modal>

        <Footer match={this.props.props.match} summary={summary} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} onMarkAsComplete={this.props.onMarkAsComplete} onSaveAndContinue={this.props.onSave} linkTo={'StateWorkers'} />
      </Fragment>
    );
  }

}

CountyCityTax.propTypes = {};

export default CountyCityTax;
