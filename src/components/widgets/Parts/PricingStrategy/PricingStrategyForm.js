import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import TableEdify from '../../../reusable/TableEdify';
import {generateForm} from './FormFields';
import {listTableColumns} from './TableColumns';
import {pricingStategyListDefaultValues} from './PricingStategyListDefaultValues';

class PricingStrategyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      pricingStrategyList: [],
      pricingMethod: false,
    };

    this.baseState = this.state;
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { isEdit, pricing } = nextProps;
    return { data: pricing, pricingStrategyList: pricing.priceRanges || pricingStategyListDefaultValues(), isEdit }
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    const { isEdit } = this.state

    if (isEdit === true) {
      const { data } = this.state
      if (data.pricingMethod === 'MATRIX') {
        this.setState({pricingMethod:true})
      }else if (data.pricingMethod !== 'MATRIX') {
        this.setState({pricingMethod:false})
      }
    } else {
      if (name === 'pricingMethod' && value === 'MATRIX') {
        this.setState({pricingMethod:true})
      } else if (name === 'pricingMethod' && value !== 'MATRIX') {
        this.setState({pricingMethod:false})
      }
    }

    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });
    this.setState({ isEdit:false })
  }

  /**
   * method that handle inline editing
   */
  handleTableInputOnChange = (event, id, target) => {
    const { pricingStrategyList } = Object.assign({}, this.state);
    let selectedRow = pricingStrategyList.findIndex(selectedRow => selectedRow.cId == id);
    pricingStrategyList[selectedRow][target] = event.value;

    try {
      if (event.name === 'priceRange') {
        pricingStrategyList[selectedRow + 1]['priceStart'] = parseFloat(event.value) + parseFloat(pricingStrategyList[0].priceStart);

        this.setState({ selectedRow })
      }
    }
    catch (e) {

    }

    this.setState({ pricingStrategyList });
  }

  /**
   * method to pass data to parent on save
   */
  handleOnSave = () => {
    const { data, pricingStrategyList } = this.state;
    data['priceRanges'] = pricingStrategyList;
    let model = data;
    this.props.onSave(model);
  }

  /**
   * method to clear form fields
   */
  clearForm = () => {
    this.setState(this.baseState);
    this.setState({
      pricingStrategyList: pricingStategyListDefaultValues()
    })
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleHideAddModal = () => {
    this.setState({ isShowAddModal: false });
  }

  handleChangeModal = (event) => {
  const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;

    this.setState({ data });
  }

  render () {
    const { pricingStrategyList, pricingMethod, data } = this.state
    let validationResult = [];
    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, pricingMethod, validationResult);
    const tableColumns = listTableColumns(this.handleTableInputOnChange)
    let isDisabledSave = true;

    if (data.pricingMethod === "MATRIX") {
      if (data.listPricePercentage && data.description) {
        isDisabledSave = false;
      }
    }
    else {
      if (data.netPricePercent && data.description) {
        isDisabledSave = false;
      }
    }

    return (
      <Fragment>
        <form className="form-horizontal">
          <div className="wrap-form-box">
            <FormEdify fields={formFields} data={data}/>
            <TableEdify className={pricingMethod === false ? 'hide' : 'visible'} data={pricingStrategyList} columns={tableColumns} htmlId="" scrollY={650} scrollX={630} displayFilter={false}/>
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

PricingStrategyForm.propTypes = {};

export default PricingStrategyForm;
