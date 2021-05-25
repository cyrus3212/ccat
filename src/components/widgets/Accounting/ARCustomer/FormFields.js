import React from 'react';
import "../_accountingWidget.scss";
import arCustomerTranslate from '../../../../translation/accounting/arCustomer.json'
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateForm(handleInputOnChange,customerTypeOptions, assessFC, errorFields) {
  return [
    {
      rowClassName: "show-grid",
      columns: [
        {
          label: arCustomerTranslate.arCustomerType,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.description,
          dataIndex: 'description',
          type: "alphaNumericInputH",
          required: true,
          onChange: handleInputOnChange,
          size: 20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.customerType,
          dataIndex: 'customerType',
          type: "selectInputH",
          isCheckValidation: "true",
          defaultValue: 'R',
          labelColSize: 5,
          InputColSize: 4,
          size: 20,
          options: customerTypeOptions,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.arAccount,
          dataIndex: 'arAccount',
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          required: true,
          size: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.disAccnt,
          dataIndex: "discountAccount",
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          size: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.defCredLimit,
          dataIndex: "defaultCreditLimit",
          type: "numericInputH",
          onChange: handleInputOnChange,
          defaultValue: "0",
          size: 14,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.printStatements,
          dataIndex: "printStatements",
          type: "radioInputH",
          onChange: handleInputOnChange,
          defaultValue: "Y",
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.statementPrnting,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.printIfZeroBal,
          dataIndex: "printStatementWithZeroBalance",
          onChange: handleInputOnChange,
          type: "radioInputH",
          defaultValue: "0",
          options: [
            {
              value: "1",
              label: "Yes"
            },
            {
              value: "0",
              label: "No"
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.financeChrages,
          type: "header",
          mdColSize: 10
        }
      ]
    },
    {
      columns: [
        {
          label: arCustomerTranslate.accessFinChrge,
          className: "radio-with-text radio-bottom-space",
          onChange: handleInputOnChange,
          dataIndex: "assessFinanceCharge",
          type: "radioInputH",
          defaultValue: 'N',
          mdColSize: 10,
          labelColSize: 3,
          InputColSize: 9,
          options: [
            {
              "value": "Y",
              "label": "Yes"
            },
            {
              "value": "N",
              "label":  <TextMarkUp label={arCustomerTranslate.ifYes} />
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          className: assessFC === false ? 'hide' : 'visible',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: arCustomerTranslate.mnthlyIntrstRate,
                  dataIndex: "monthlyInterestRate",
                  onChange: handleInputOnChange,
                  type: "percentageInput",
                  defaultValue: "0",
                  size: 5,
                  isDisabled: assessFC !== true ? true : false,
                  allowDecimal: true,
                  labelColSize: 5,
                  InputColSize: 5,
                  validationResult: errorFields
                },
                {
                  label: 'Minimum Interest',
                  dataIndex: "minimumInterest",
                  onChange: handleInputOnChange,
                  type: "percentageInput",
                  defaultValue: "0",
                  size: 5,
                  isDisabled: assessFC !== true ? true : false,
                  allowDecimal: true,
                  labelColSize: 5,
                  InputColSize: 5,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: arCustomerTranslate.intrstOnBalanec,
                  dataIndex: "interestonBalanceOver",
                  onChange: handleInputOnChange,
                  type: "percentageInput",
                  defaultValue: "0",
                  size: 7,
                  isDisabled: assessFC !== true ? true : false,
                  allowDecimal: true,
                  labelColSize: 5,
                  InputColSize: 5,
                  validationResult: errorFields
                },
                {
                  label: arCustomerTranslate.chrgeIntrstOnIntrst,
                  dataIndex: "chargeInterestonInterest",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  className: "radio-with-text",
                  options: [
                    {
                      value: "Y",
                      label: "Yes",
                      disabled: assessFC === true ? false : true
                    },
                    {
                      value: "N",
                      label: "No",
                      disabled: assessFC === true ? false : true
                    }
                  ],
                }
              ]
            },
            {
              columns: [
                {
                  label: "Interest Income Account",
                  dataIndex: "interestIncomeAccount",
                  onChange: handleInputOnChange,
                  type: "coaTextInputH",
                  size: 10,
                  labelColSize: 5,
                  InputColSize: 5,
                  isDisabled: assessFC !== true ? true : false,
                  validationResult: errorFields
                },
                {
                  label: "A/R Statement Form",
                  dataIndex: "arStatementForm",
                  onChange: handleInputOnChange,
                  type: "alphaNumericInputH",
                  size: 5,
                  labelColSize: 5,
                  InputColSize: 5,
                  isDisabled: assessFC !== true ? true : false,
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
