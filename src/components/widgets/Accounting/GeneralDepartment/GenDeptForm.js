import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_accountingWidget.scss";
import commonTranslate from '../../../../translation/common.json';
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class GenDeptForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      retainedEarningsAccount: '',
      deductibleReceivedAccount: '',
      specialOrderAccount: '',
      freightAccount: ''
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      let data = nextProps.generalDepartment;
      return { data }
    } catch (err) {
    }

    return {...nextProps, ...state};
  }

  /**
   * method to handle data input changes
   */
  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);
    data[name] = value;
    this.setState({ data });

    this.props.onInputChange(event);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnSave = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  render () {
    const { data } = this.state;
    const { summary, hasError } = this.props;
    let validationResult = [];
    let disabledSave = true;

    try {
      validationResult = data.validationResult;
    } catch (e) {

    }

    const formFields = generateForm(this.handleInputOnChange, validationResult);
    try {
      if (data.specialOrderAccount && data.retainedEarningsAccount && data.deductibleReceivedAccount  && data.freightAccount) {
        disabledSave = false;
      }
    } catch (e) {}

    return (
      <Fragment>
        <form className="form-horizontal wrap-text-with-description">
          <div className="wrap-form-box no-border">
            { data === undefined ? null :
              <FormEdify fields={formFields}  data={data} onGetProps={this.handleGetProps} />
            }
          </div>
          <Footer match={this.props.props.match} onMarkAsComplete={this.props.onMarkAsComplete} isClearDataShow={true}
            onClearDataComplete={this.props.onClearDataComplete} summary={summary} hasError={hasError}
            onSaveAndContinue={this.handleOnSave} disabledSave={disabledSave} linkTo={'BankAccount'} />
        </form>
      </Fragment>
    );
  }

}

GenDeptForm.propTypes = {};

export default GenDeptForm;
