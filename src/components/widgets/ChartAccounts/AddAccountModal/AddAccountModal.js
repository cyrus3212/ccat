import React, { Fragment, Component } from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import TextInput from '@coxautokc/fusion-ui-components/lib/TextInput';
import SelectInput from '@coxautokc/fusion-ui-components/lib/SelectInput';
import accountsTranslate from '../../../../translation/chartAccounts/reviewAccounts.json';
import commonTranslate from '../../../../translation/common.json';
import { updateReviewAccount } from '../../../../api/chartAccounts/chartAccountApi';
import CustomTextInput from '../../../reusable/CustomTextInput';
import ModalCoaInput from '../../../reusable/ModalCoaInput/index.js';

class AddAccountModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      oldAccountNumber: "",
      newAccountNumber: "",
      description: "",
      creditSaleAccountNumber: "",
      inventoryAccountNumber: "",
      accountType: "",
      departmentCode: "",
      balanceType: "",
      interCompanyType: "",
      isShowSuccessMessage: false,
      isShowErrorMessage: false,
      hasData: false,
      onSave: false,
      onAdd: false,
      isAddStatus: '',
      isSaveStatus : '',
      selectedEditAccount: {},
      isClearData: false,
      selectedAccountType: '',
      accountTypes: [],
      alertMessage: '',
      errorFields: []
    }

  }

  static getDerivedStateFromProps(nextProps, state) {
    if (state.onSave === true && nextProps.chartAccounts.isOk === true)
    {
      return { isSaveStatus :'success', errorFields: [] }
    }
    else if (state.onSave === true && nextProps.chartAccounts.isOk === false) {
      return { isSaveStatus :'error' }
    }

    if (state.onAdd === true && nextProps.chartAccounts.isOk === true)
    {
      return { isAddStatus :'success', errorFields: [], description: '' }
    }
    else if (state.onAdd === true && nextProps.chartAccounts.isOk === false) {
      let errorFields = nextProps.chartAccounts.data.model[0].validationResult;

      return { isAddStatus :'error', errorFields }
    }

    if (nextProps.isAddNew === false) {
      const {
        id,
        oldAccountNumber,
        newAccountNumber,
        description,
        creditSaleAccountNumber,
        inventoryAccountNumber,
        accountType,
        departmentCode,
        balanceType,
        interCompanyType
      } = nextProps.selectedEditAccount;

      return {
        id,
        oldAccountNumber,
        newAccountNumber,
        description,
        creditSaleAccountNumber,
        inventoryAccountNumber,
        accountType,
        departmentCode,
        balanceType,
        interCompanyType,
        hasData: true
      };
    }
    else {
      return {hasData: false, accountTypes: nextProps.accountTypes};
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.onAdd === true && prevProps.chartAccounts.isOk === true)
    {
      this.props.onClickEditAccount();
    }

    if (prevProps.chartAccounts.isOk === true && prevState.isAddStatus === 'success') {
      setTimeout(() => {
        this.setState({isAddStatus: '', onAdd: false});
        this.clearData();
      }, 1000)

    }
  }

  isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  getErrorMessage = (fieldName) => {
    const {errorFields} = this.state;

    try {
      const filteredErrorMessage = errorFields.filter(errorField => {
        return errorField.key === fieldName;
      });

      return filteredErrorMessage[0].mesasge;
    }
    catch (e) {
      return '';
    }
  }

  /**
   * Get Account Type By Value
   */
  getAccountType = (val) => {
    const {accountTypes} = this.state;

    try {
      const filteredAccountType = accountTypes.filter(accountType => {
        return accountType.value === val;
      });

      return filteredAccountType[0].label;
    }
    catch (e) {
      return '';
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event;

    if (name === 'accountType') {
      this.setState({selectedAccountType: this.getAccountType(value)});
    }

    this.setState({ [name] : value });
  }

  onAddAccount = () => {

    const {
      id,
      oldAccountNumber,
      newAccountNumber,
      description,
      creditSaleAccountNumber,
      inventoryAccountNumber,
      accountType,
      departmentCode,
      balanceType,
      interCompanyType,
      hasData
    } = this.state;

    const { accounts, code, dtid, summary } = this.props;

    let accountDetail = {
      oldAccountNumber: newAccountNumber,
      newAccountNumber,
      description,
      creditSaleAccountNumber,
      inventoryAccountNumber,
      accountType,
      departmentCode,
      balanceType,
      interCompanyType,
      enterpriseCode: summary.enterpriseCode,
      dtid: summary.dtid,
      workbook: summary.workbook,
      section: summary.section,
      validationResult: []
    }

    let params = {
      model: [accountDetail],
      summary
    }

    if (!hasData) {

      let isCompanyExist = false;
      for (let i = 0; i < accounts.length; i++) {
        let account = accounts[i];

        if (account.oldAccountNumber == oldAccountNumber) {
          this.setState({
            isShowErrorMessage: true,
            isShowSuccessMessage: false
          });
          isCompanyExist = false;
          break;
        } else {
          isCompanyExist = true;
        }
      }

      this.setState({
        isShowSuccessMessage: true,
        isShowErrorMessage: false
      });

      this.setState({ onSave: false, onAdd: true })
      this.props.dispatch(updateReviewAccount(params));
    } else {
      accountDetail['id'] = id;

      this.setState({ onSave: true, onAdd: false })

      this.props.dispatch(updateReviewAccount(params));

    }

    setTimeout( () => {
      this.setState({
        isShowSuccessMessage: false,
        isShowErrorMessage: false,
      });
    }, 2000)
  }

  clearData = () => {
    this.setState({
      id: "",
      oldAccountNumber: "",
      newAccountNumber: "",
      description: "",
      creditSaleAccountNumber: "",
      inventoryAccountNumber: "",
      accountType: "",
      departmentCode: "",
      balanceType: "",
      interCompanyType: "",
      isClearData: false
    });
  }

  render () {

    const {
      oldAccountNumber,
      newAccountNumber,
      description,
      creditSaleAccountNumber,
      inventoryAccountNumber,
      accountType,
      departmentCode,
      balanceType,
      isShowSuccessMessage,
      isShowErrorMessage,
      interCompanyType,
      hasData,
      isSaveStatus,
      isAddStatus,
      selectedAccountType
    } = this.state;

    const {
      onHide,
    } = this.props;

    const accountTypes = this.props.accountTypes || [];
    const departments = this.props.departments || [];
    const balanceTypes = this.props.balanceTypes || [];

    return (
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title>{accountsTranslate.addAccount}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            htmlId="oldAccountNumber"
            label="Old Account Number"
            name="oldAccountNumber"
            maxLength={10}
            onChange={this.handleOnChange}
            value={newAccountNumber}
            disabled={true}
            isCheckValidation={true}
          />
          <CustomTextInput
            htmlId="newAccountNumber"
            label="New Account Number"
            name="newAccountNumber"
            validationResult={this.state.errorFields}
            maxLength={10}
            onChange={this.handleOnChange}
            value={newAccountNumber}
            isCheckValidation={true}
          />
          <CustomTextInput
            htmlId="description"
            label="Description"
            name="description"
            maxLength={30}
            onChange={this.handleOnChange}
            value={description}
            isCheckValidation={true}
            validationResult={this.state.errorFields}
          />
          <SelectInput
            htmlId="accountType"
            label="Account Type"
            name="accountType"
            onChange={(event) => this.handleOnChange(event.target)}
            value={accountType}
            options={accountTypes}
            isCheckValidation={true}
          />
          {/* <CustomTextInput
            htmlId="creditSaleAccountNumber"
            label="Credit Sale Account Number"
            name="creditSaleAccountNumber"
            validationResult={this.state.errorFields}
            maxLength={10}
            onChange={this.handleOnChange}
            value={selectedAccountType === 'Sale' ? creditSaleAccountNumber : ''}
            disabled={selectedAccountType === 'Sale' ? false : true}
            isCheckValidation={true}
          /> */}
          {/* <CustomTextInput
            htmlId="inventoryAccountNumber"
            label="Inventory Account Number"
            name="inventoryAccountNumber"
            validationResult={this.state.errorFields}
            maxLength={10}
            onChange={this.handleOnChange}
            value={selectedAccountType === 'Sale' ? inventoryAccountNumber : ''}
            disabled={selectedAccountType === 'Sale' ? false : true}
            isCheckValidation={true}
          /> */}
          <ModalCoaInput
            key={4}
            isDisabled={selectedAccountType === 'Sale' ? false : true}
            field={creditSaleAccountNumber}
            required={false}
            maxLength={10}
            label="Credit Sale Account Number"
            value={selectedAccountType === 'Sale' ? creditSaleAccountNumber : ''}
            name="creditSaleAccountNumber"
            htmlId="creditSaleAccountNumber"
            onChange={this.handleOnChange}
            validationResult={this.state.errorFields}
          />
          <ModalCoaInput
            key={5}
            isDisabled={selectedAccountType === 'Sale' ? false : true}
            field={inventoryAccountNumber}
            required={false}
            maxLength={10}
            label="Inventory Account Number"
            value={selectedAccountType === 'Sale' ? inventoryAccountNumber : ''}
            name="inventoryAccountNumber"
            htmlId="inventoryAccountNumber"
            onChange={this.handleOnChange}
            validationResult={this.state.errorFields}
          />
          <SelectInput
            htmlId="departmentCode"
            label="Department"
            name="departmentCode"
            onChange={(event) => this.handleOnChange(event.target)}
            value={departmentCode}
            options={departments}
            isCheckValidation={true}
          />
          <SelectInput
            htmlId="balanceType"
            label="Balance Type"
            name="balanceType"
            onChange={(event) => this.handleOnChange(event.target)}
            value={balanceType}
            options={balanceTypes}
            isCheckValidation={true}
          />
          <CustomTextInput
            htmlId="interCompanyType"
            label="Intercompany Type"
            name="interCompanyType"
            validationResult={this.state.errorFields}
            maxLength={1}
            onChange={this.handleOnChange}
            value={interCompanyType}
            isCheckValidation={true}
          />
        </Modal.Body>
        <Modal.Footer>
          { isSaveStatus === 'success' ?
            <span className="pull-left text-alert--green">
              <i className="fas fa-check" /> {accountsTranslate.succesUpdateAccount}
            </span>
            : null
          }

          { isSaveStatus === 'error' ?
            <span className="pull-left text-alert--red">
              <i className="fas fa-times" /> {accountsTranslate.failedUpdateAccount}
            </span>
            : null
          }

          { isAddStatus === 'success' ?
            <span className="pull-left text-alert--green">
              <i className="fas fa-check" /> {accountsTranslate.successAddAccount}
            </span>
            : null
          }

          { isAddStatus === 'error' ?
            <span className="pull-left text-alert--red">
              <i className="fas fa-times" /> {accountsTranslate.failedAddAccount}
            </span>
            : null
          }

          <Button htmlId="ButtonLink" buttonStyle="link" onClick={onHide}>
            {commonTranslate.close}
          </Button>
          <Button
            htmlId="AddCompanyButton"
            buttonStyle="primary"
            onClick={this.onAddAccount}
            disabled={(
              newAccountNumber &&
              description &&
              accountType &&
              departmentCode &&
              balanceType) ? false : true}
          >
            { hasData ? "Save" : "Add" }
          </Button>
        </Modal.Footer>
      </Fragment>
    )
  }
}

AddAccountModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddAccountModal;
