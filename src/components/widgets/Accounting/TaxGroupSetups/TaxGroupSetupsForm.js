import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import AlphaNumericInputHorizontal from '../../../reusable/AlphaNumericInputHorizontal';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import TableTaxGroup from './TableTaxGroup';
import TableRepairOrder from './TableRepairOrder';
import { taxGroupDataDefault, repairOrderTaxDefault } from './TaxGroupDefaultValues'

class TaxGroupSetupsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      groupDesc: '',
      taxGroupDetail: {},
      taxGroupData: [],
      repairOrderTax: []
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { taxGroupDetail } = nextProps;
    const { id, groupDesc, items, components } = nextProps.taxGroupDetail;

    return {
      id : id || '',
      groupDesc : groupDesc || '',
      taxGroupData: items || taxGroupDataDefault(),
      repairOrderTax: components || repairOrderTaxDefault(),
      taxGroupDetail : taxGroupDetail || {}
    };
  }

  handleOnChange = (event) => {
    this.setState({errorFields: []});
    const { name, value } = event;

    this.setState({ [name]: value })
  };

  handleTaxGroupInputChange = (event, id, target) => {
    const { taxGroupData } = Object.assign({}, this.state);
    let selectedRow = taxGroupData.findIndex(selectedRow => selectedRow.cId == id);

    taxGroupData[selectedRow][target] = event.value;
    this.setState({ taxGroupData });
  }

  handleRepairOrderTaxInputChange = (event, id, target) => {
    const { repairOrderTax } = Object.assign({}, this.state);
    let selectedRow = repairOrderTax.findIndex(selectedRow => selectedRow.cId == id);

    repairOrderTax[selectedRow][target] = event.value;
    this.setState({ repairOrderTax });
  }

  handleOnSave = () => {
    const { groupDesc, taxGroupData, repairOrderTax, taxGroupDetail } = this.state;
    const { enterpriseCode, dtid, workbook, section } = this.props.summary;

    let model = taxGroupDetail;

    model.groupDesc = groupDesc;
    model.items = taxGroupData;
    model.components = repairOrderTax;
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
    this.setState({
      id: '',
      groupDesc: '',
      taxGroupDetail: {},
      taxGroupData: taxGroupDataDefault(),
      repairOrderTax: repairOrderTaxDefault()
    })
  }

  render () {
    const { groupDesc, taxGroupData, repairOrderTax, taxGroupDetail } = this.state;
    let validationResult = [];
    try {
      validationResult = taxGroupDetail.validationResult;
    } catch (e) {

    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <Row>
              <Col>
                <AlphaNumericInputHorizontal
                  id="groupDesc"
                  displayLabel={true}
                  field="groupDesc"
                  label={'Tax Group State'}
                  name="groupDesc"
                  onChange={this.handleOnChange}
                  maxLength={20}
                  required={true}
                  value={groupDesc}
                  labelColSize={2}
                  InputColSize={5}
                  validationResult={validationResult}
                />
              </Col>
            </Row>
            <TableTaxGroup key={1} taxGroupData={taxGroupData} onTableInputChange={this.handleTaxGroupInputChange}/><br />
            <TableRepairOrder key={2} repairOrderTax={repairOrderTax} onRepairOrderTaxInputChange={this.handleRepairOrderTaxInputChange} onChangeRadio={this.handleChangeRadio}/>
          </div>
        </form>
        <Row className="footer-action-btn">
          <Col xs={12} md={12} className="text-right">
            <Button htmlId="SaveButton" buttonStyle="primary" onClick={this.handleOnSave} disabled={groupDesc ? false : true}>Save</Button>
            <Button htmlId="ClearButton" buttonStyle="default" onClick={this.clearForm}>Clear</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }

}

TaxGroupSetupsForm.propTypes = {};

export default TaxGroupSetupsForm;
