import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import stateWorkersTranslate from '../../../../translation/payroll/stateWorkers.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import {generateForm} from './FormFields';
import {listTableColumns} from './TableColumns';
import {stateWorkersClassListDefaultValues} from './StateWorkersClassListDefaultValues'

class StateWorkersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      stateWorkers: [],
    }
    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps) {
    const {stateWorkers, taxWitholdingOptions} = nextProps;
    return { data: stateWorkers, stateWorkers: stateWorkers.items || stateWorkersClassListDefaultValues(), taxWitholdingOptions}
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
    const { stateWorkers } = Object.assign({}, this.state);
    let selectedRow = stateWorkers.findIndex(selectedRow => selectedRow.cId == id);
      stateWorkers[selectedRow][target] = event.value;
      this.setState({ stateWorkers });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, stateWorkers } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;

    let model = data ;
    model.items = stateWorkers;
    model.dtid = dtid;
    model.enterpriseCode = enterpriseCode;
    model.workbook = workbook;
    model.section = section;

    this.props.onSave(model);
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState);
    this.setState({
      stateWorkers: stateWorkersClassListDefaultValues()
    })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  render () {
    const {stateWorkers, data, taxWitholdingOptions} = this.state;
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }
    const formFields = generateForm(this.handleInputOnChange, validationResult, taxWitholdingOptions);
    const tableColumns = listTableColumns(this.handleTableInputOnChange)

    let isDisabledSave = true;

    if (data.workersCompensationLimit && data.stateWorkersCompAccount) {
      isDisabledSave = false;
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps}/>
            <TableEdify data={stateWorkers} tableTitle={""} columns={tableColumns} scrollY={650} scrollX={630} displayFilter={false}/>
          </div>
          <Row className="footer-action-btn">
            <Col xs={12} md={12} className="text-right">
              <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={isDisabledSave}>Save</Button>
              <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }

}

StateWorkersForm.propTypes = {};

export default StateWorkersForm;
