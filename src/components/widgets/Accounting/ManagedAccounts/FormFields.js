import React from 'react';
import "../_accountingWidget.scss";
import managedAccountsTranslate from '../../../../translation/accounting/managedAccounts.json';
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateForm(handleInputOnChange, handleOnclick, toolsOptions, checkStubInfoOptions, controlledByOptions, lienPayoffs, tools, errorFields) {
  return [
    {
      columns: [
        {
          label: managedAccountsTranslate.managedAccountDesc,
          dataIndex: 'managedAcctDesc',
          type: "alphaNumericAreaH",
          size: 30,
          labelColSize: 3,
          required: true,
          isCheckValidation: true,
          InputColSize: 7,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: managedAccountsTranslate.controlledBy,
          dataIndex: 'controlledBy',
          type: "selectInputH",
          defaultValue: "C",
          labelColSize: 3,
          InputColSize: 7,
          onChange: handleInputOnChange,
          options: controlledByOptions
        }
      ]
    },
    {
      columns: [
        {
          label: managedAccountsTranslate.attnReqAfter,
          dataIndex: 'attentionRequiredAfter',
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          placeholder: "# of days",
          labelColSize: 3,
          InputColSize: 7,
          size: 3,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: managedAccountsTranslate.tools,
          dataIndex: "tools",
          type: "selectInputH",
          // defaultValue: "None",
          labelColSize: 3,
          InputColSize: 7,
          onChange: handleInputOnChange,
          options: toolsOptions
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          label: managedAccountsTranslate.bankAccntNum,
          dataIndex: "payableBankAcct",
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 6,
          mdColSize: 4,
          size: 10,
          isDisabled: tools === true ? true : false,
          validationResult: errorFields
        },
        {
          label: managedAccountsTranslate.stubInfo,
          dataIndex: "checkStubInfo",
          type: "selectInputH",
          defaultValue: "",
          onChange: handleInputOnChange,
          options: checkStubInfoOptions,
          labelColSize: 4,
          InputColSize: 8,
          mdColSize: 4,
          isDisabled: tools === true ? true : false
        },
        {
          label: managedAccountsTranslate.controlNumber,
          dataIndex: "controlNumber",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 5,
          mdColSize: 4,
          size: 9,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          className: lienPayoffs === true ? 'hide' : 'visible',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: managedAccountsTranslate.remittanceAddress,
                  type: "header"
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.contact,
                  dataIndex: "contact",
                  onChange: handleInputOnChange,
                  type: "alphaNumericInputH",
                  size: 50,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.street,
                  dataIndex: "address1",
                  onChange: handleInputOnChange,
                  type: "alphaNumericInputH",
                  size: 60,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.city,
                  dataIndex: "city",
                  type: "alphaNumericInputH",
                  onChange: handleInputOnChange,
                  size: 20,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.state,
                  dataIndex: "stateCode",
                  onChange: handleInputOnChange,
                  type: "alphaNumericInputH",
                  size: 2,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.zip,
                  dataIndex: "zipCode",
                  onChange: handleInputOnChange,
                  type: "alphaNumericInputH",
                  size: 10,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: managedAccountsTranslate.phone,
                  dataIndex: "phoneNumber",
                  type: "alphaNumericInputH",
                  onChange: handleInputOnChange,
                  size: 10,
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 6,
                  isDisabled: lienPayoffs === true ? true : false,
                  validationResult: errorFields
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
