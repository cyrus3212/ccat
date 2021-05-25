import React from 'react';
import apTranslate from '../../../../translation/accounting/accountsPayable.json';

export function generateForm(handleInputOnChange, handleOnChangeRadio, options, errorFields) {
  return [
    {
      columns: [
        {
          label: apTranslate.description,
          type: "alphaNumericInput",
          dataIndex: 'description',
          required: true,
          maxLength: 20,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          isCheckValidation: true
        }
      ]
    },
    {
      columns: [
        {
          label: apTranslate.apAccount,
          type: "coaTextInput",
          dataIndex: 'apAccount',
          maxLength: 10,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          isCheckValidation: true
        }
      ]
    },
    {
      columns: [
        {
          label: apTranslate.discountAccount,
          type: "coaTextInput",
          dataIndex: 'discountAccount',
          maxLength: 10,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          isCheckValidation: true
        }
      ]
    },
    {
      columns: [
        {
          label: apTranslate.selectAPInvoicesbyAccount,
          type: "radioInput",
          onChange: handleInputOnChange,
          options:options,
          dataIndex: 'selectAPInvoicesbyAccount'
        }
      ]
    },
    {
      columns: [
        {
          label: apTranslate.poAprovalsRequired,
          type: "radioInput",
          onChange: handleInputOnChange,
          options:options,
          dataIndex: 'poAprovalsRequired',
          defaultValue: "N"
        }
      ]
    },
    {
      columns: [
        {
          label: apTranslate.emailTextApprovals,
          type: "radioInput",
          onChange: handleInputOnChange,
          options:options,
          dataIndex: 'emailTextApprovals',
          defaultValue: "N"
        }
      ]
    }
  ]
}
