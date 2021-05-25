import React from 'react';
import accountTranslate from '../../../../translation/accounting/managedAccounts.json';

export function generateModalForm(handleInputOnChange, isLeinPayoff) {
  return [
    {
      columns: [
        {
          label: accountTranslate.account1,
          type: "coaTextInput",
          dataIndex: 'account1',
          onChange: handleInputOnChange,
          isDisabled: isLeinPayoff,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: accountTranslate.account2,
          type: "coaTextInput",
          dataIndex: 'account2',
          onChange: handleInputOnChange,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: accountTranslate.account3,
          type: "coaTextInput",
          dataIndex: 'account3',
          onChange: handleInputOnChange,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: accountTranslate.account4,
          type: "coaTextInput",
          onChange: handleInputOnChange,
          dataIndex: 'account4',
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: accountTranslate.account5,
          type: "coaTextInput",
          onChange: handleInputOnChange,
          dataIndex: 'account5',
          maxLength: 10
        }
      ]
    }

  ]
}
