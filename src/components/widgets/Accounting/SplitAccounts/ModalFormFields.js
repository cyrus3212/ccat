import React from 'react';
import spTranslate from '../../../../translation/accounting/splitAccounts.json';

export function generateModalForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: spTranslate.account,
          type: "coaTextInput",
          dataIndex: 'account',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: spTranslate.splitPercent,
          type: "percentageInput",
          dataIndex: 'splitPercent',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 5,
          allowDecimal: true
        }
      ]
    },
    {
      columns: [
        {
          label: spTranslate.splitAmount,
          type: "amountInput",
          dataIndex: 'splitAmount',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 14
        }
      ]
    },
    {
      columns: [
        {
          label: spTranslate.controlOverride,
          type: "alphaNumericInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'ctlOveride',
          maxLength: 9
        }
      ]
    }

  ]
}
