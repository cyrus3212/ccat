import React from 'react';
import cDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: cDrawersTranslate.accountNumber,
          type: "coaTextInput",
          dataIndex: 'accountNumber',
          maxLength: 10,
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: cDrawersTranslate.description,
          type: "alphaNumericInput",
          dataIndex: 'description',
          required: true,
          maxLength: 20,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: cDrawersTranslate.overAccount,
          type: "coaTextInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'overShortAccount',
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: cDrawersTranslate.lastReceiptNum,
          type: "numericInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'lastReceiptNumber',
          defaultValue: "100000000",
          maxLength: 9
        }
      ]
    },
    {
      columns: [
        {
          label: cDrawersTranslate.depBankAccNum,
          type: "coaTextInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'depositBankAccountNumber',
          required: true,
          maxLength: 10,
        }
      ]
    }
  ]
}
