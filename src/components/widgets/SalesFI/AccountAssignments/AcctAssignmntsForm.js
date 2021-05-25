import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../_salesFI.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class AccAssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    try {
      let data = nextProps.accountAssignment;
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

  handleOnSave = () => {
    const { data } = this.state;
    this.props.onSave(data);
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  // onMarkAsComplete = () => {
  //   const { data } = this.state;
  //   this.props.onMarkAsComplete();
  // }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  render () {
    const { data } = this.state;
    const { summary, hasError } = this.props;
    let validationResult = [];
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;

      if (Object.keys(data).length !== 0) {
        disabledClearData = false;
      }
    }
    catch (e) {
    }

    const formFields = generateForm(this.handleInputOnChange, validationResult);
    return (
      <form className="form-horizontal wrap-text-with-description">
        <div className="wrap-form-box no-border">
          <FormEdify fields={formFields} data={this.state.data} onGetProps={this.handleGetProps}/>
        </div>
        <Footer summary={summary} match={this.props.props.match} disabledClearData={disabledClearData}
          onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true} hasError={hasError}
          onMarkAsComplete={this.props.onMarkAsComplete} onSaveAndContinue={this.handleOnSave} linkTo={'dashboard'}
        />
      </form>
    );
  }

}

AccAssignmentForm.propTypes = {};

export default AccAssignmentForm;
