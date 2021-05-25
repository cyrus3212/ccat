import React, { Fragment, Component } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { getUid } from '../../../../src/helpers/generateUid';

import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import storeTranslate from '../../../translation/store.json';
import CompanySearchInput from '../../reusable/CompanySearchInput';

class AddCompanyModal extends Component {
  state = {
    dtid: '',
    companyNumber: '',
    name: '',
    isShowSuccessMessage: false,
    isShowErrorMessage: false,
  }

  onChange = (event) => {
    const { name, value } = event.target

    this.setState({ [name] : value })
  }

  onAddCompany = () => {
    const { dtid, companyNumber, name } = this.state;
    const { stores } = this.props;

    let isDtidExist = false;
    for(let i = 0; i < stores.length; i++) {
      let store = stores[i];

      if (store.dtid == dtid) {
        this.setState({
          isShowErrorMessage: true,
          isShowSuccessMessage: false
        });
        isDtidExist = false;
        break;
      } else {
        isDtidExist = true;
      }
    }

    if (stores.length === 0 || isDtidExist === true) {
      this.setState({
        isShowSuccessMessage: true,
        isShowErrorMessage: false
      });

      let companyDetail = {
        cId: getUid(),
        dtid,
        name,
        companyNumber,
        code: "",
        enterpriseId: 0,
        description: "",
        statusText: "Created",
        isAddNew: true,
        validationResult: []
      }

      this.props.onClickAddCompany(companyDetail);
      this.clearData();
    }

    setTimeout( () => {
      this.setState({
        isShowSuccessMessage: false,
        isShowErrorMessage: false,
      });
    }, 2000)
  }

  clearData = () => {
    this.setState({companyNumber: '', dtid: '', name: ''});
  }

  onSelectStore = (store) => {
    const {dtid, companyNumber, name} = store;

    this.setState({ dtid, companyNumber, name })
  }

  render () {
    const { dtid, companyNumber, name, isShowSuccessMessage, isShowErrorMessage } = this.state;
    const { onClickClose, enterpriseCode } = this.props;

    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompanySearchInput
            onSelectStore={this.onSelectStore}
            enterpriseCode={enterpriseCode}
            clearData={this.clearData}
            dtid={dtid}
            onChange={this.onChange}
          />
          <TextInput
            htmlId="companyNumber"
            label="Company Number"
            name="companyNumber"
            maxLength={3}
            onChange={this.onChange}
            value={this.state.companyNumber}
          />
          <TextInput
            htmlId="name"
            label="Company Name"
            name="name"
            maxLength={50}
            onChange={this.onChange}
            value={this.state.name}
          />
        </Modal.Body>
        <Modal.Footer>
          { !isShowSuccessMessage ? null :
            <span className="pull-left text-alert--green">
              <i className="fas fa-check" /> {storeTranslate.successAddMessage}
            </span>
          }

          { !isShowErrorMessage ? null :
            <span className="pull-left text-alert--red">
              <i className="fas fa-times" /> {storeTranslate.errorAddMessage}
            </span>
          }
          <Button htmlId="ButtonLink" buttonStyle="link" onClick={onClickClose}>
            Close
          </Button>
          <Button
            htmlId="AddCompanyButton"
            buttonStyle="primary"
            onClick={this.onAddCompany}
            disabled={(dtid && companyNumber && name) ? false : true}
          >
            Add
          </Button>
        </Modal.Footer>
      </Fragment>
    )
  }
}

export default AddCompanyModal;
