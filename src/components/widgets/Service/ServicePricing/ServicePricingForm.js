import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_parts.scss";
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { tableColumns } from './TableColumns';
import { tabColumns } from './tabColumns';
import 'antd/lib/tabs/style/index.css';
import './_servicePricingForm.scss';
import Footer from '../../../common/Footer';
import TableEdifyLazyLoadExtended from '../../../reusable/TableEdifyLazyLoadExtended';
import CustomTab from '../../../reusable/CustomTab';

class ServicePricingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedTab: 'laborRates',
      servicePricingList: [],
      laborRatesList: []
    };

    this.baseState = this.state;
  }

  /**
   * Handle change cell input
   */
  handleCellInputOnChange = (event, id, target) => {
    this.props.onChangeInput(event, id, target);
  }

  handleOnChangeInputSave = (event, id, target) => {
    this.props.onChangeInputSave(event, id, target);
  }

  /**
   * method that handle to disable the warranty and inv warranty fields based on payment methods equal w
   */
  handleDisableWarrantyFld = (data) => {
    if (data.linePaymentMethod === "W") {
      return false;
    }
    else {
      return true;
    }
  }

  callback = () => {
    // tab onchange
  }

  onClickTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  /**
   * Method that handle api batch Update and reload the page.
   */
  handleOnApiBatchUpdate = (response, message) => {
    console.log('test');
    this.props.componentReload();
  }

  render () {
    const { selectedTab } = this.state;
    const { priceLevelOptions, onMarkAsComplete, onSaveAndContinue, servicePricingList,
      servicePricingListCopy, totalPages, updateData, onSearch, onClear, searchVal, summary } = this.props;

    const laborRatesTableColumns = tableColumns(this.handleCellInputOnChange, this.handleOnChangeInputSave, priceLevelOptions, selectedTab, this.handleDisableWarrantyFld);
    const tabs = tabColumns();
    let disabledClearData = true;

    if (servicePricingList.length > 0) {
      disabledClearData = false;
    }

    return (
      <Fragment>
        <CustomTab tabs={tabs} selectedTab={selectedTab} onClickTab={this.onClickTab}/>
        <form className="form-horizontal">
          <Row>
            <Col md={12}>
              <div className="service-pricing-table">
                <TableEdifyLazyLoadExtended
                  displayFilter={false}
                  match={this.props.match}
                  data={servicePricingList}
                  dataCopy={servicePricingListCopy}
                  totalPages={totalPages}
                  columns={laborRatesTableColumns}
                  scrollY={350}
                  updateData={updateData}
                  searchVal={searchVal}
                  // displayAddItem={true}
                  // onAddItemClick={this.handleShowAddModal}
                  onSearch={onSearch}
                  onClear={onClear}
                  enableSearch={true}
                  enableCustomHeader={true}
                  enableCustomUpperHeader={true}
                  dispatch={this.props.dispatch}
                  onApiBatchUpdate={this.handleOnApiBatchUpdate}
                />
              </div>
            </Col>
          </Row>
        </form>
        <Footer match={this.props.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
          onMarkAsComplete={onMarkAsComplete} onSaveAndContinue={onSaveAndContinue} linkTo={'ServiceContracts'} summary={summary}/>
      </Fragment>
    );
  }

}

ServicePricingForm.propTypes = {};

export default ServicePricingForm;
