import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../_payroll.scss";
import FormEdify from '../../../reusable/FormEdify/FormEdify';
import {generateForm} from './FormFields';
import Footer from '../../../common/Footer';

class GeneralSetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dba: false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let data = nextProps.generalSetup || {};
    let dba = state.dba;

    if (data.addressType) {
      data.isAddressType = ['DBA'];
      dba = true;
    } else {
      data.isAddressType = [];
      dba = false;
    }

    // try {
    //   if (data.addressType[0] !== null || data.addressType[0] !== []) {
    //     if (Array.isArray(data.addressType)) {
    //       data['addressType'] = data.addressType.toString();
    //     }
    //     data['addressType'] = new Array(data['addressType']);
    //     dba = true;
    //   } else {
    //     data['addressType'] = new Array();
    //     dba = false;
    //   }
    // } catch (e) {

    // }
    return { data, dba }
  }

  handleInputOnChange = (event) => {
    const { name, value } = event;
    let data = Object.assign({}, this.state.data);

    data[name] = value;

    if (name === "addressType" || name === "isAddressType") {
      if (value.length > 0) {
        this.setState({ dba: true });
      } else {
        this.setState({ dba: false});
      }
    }
    this.setState({ data });
  }

  handleGetProps = (data) => {
    this.setState({ data });
  }

  handleOnSave = () => {
    const { data, dba } = this.state;
    let addressType = null;
    if (dba) {
      addressType = "DBA";
    }
    data["addressType"] = addressType;
    this.props.onSave(data);
  }

  handleOnClearDataComplete = () => {
    this.props.componentReload();
  }

  onMarkAsComplete = (status) => {
    const { data, dba } = this.state;
    let addressType = null;
    if (dba) {
      addressType = "DBA";
    }
    data["addressType"] = addressType;
    this.props.onMarkAsComplete(status, data)
  }

  render () {
    const { data, dba } = this.state;
    const { summary, hasError } = this.props;

    let validationResult = [];
    let disabledClearData = true;

    try {
      validationResult = data.validationResult;

      if (Object.keys(data).length !== 0) {
        disabledClearData = false;
      }

    } catch (e) {

    }

    let disabledSave = false;
    const formFields = generateForm(this.handleInputOnChange, this.props.workWeekOptions, validationResult, dba);

    return (
      <Fragment>
        <div className="general-setup-form">
          {data === undefined ? null : <FormEdify fields={formFields} data={data} onGetProps={this.handleGetProps} />}
          {<Footer match={this.props.props.match} disabledClearData={disabledClearData} onClearDataComplete={this.handleOnClearDataComplete} isClearDataShow={true}
            onMarkAsComplete={status => this.onMarkAsComplete(status, data)} onSaveAndContinue={this.handleOnSave} disabledSave={disabledSave} linkTo={'FederalTax'} summary={summary}
            hasError={hasError}
          />}
        </div>
      </Fragment>
    );
  }

}

GeneralSetupForm.propTypes = {};

export default GeneralSetupForm;
