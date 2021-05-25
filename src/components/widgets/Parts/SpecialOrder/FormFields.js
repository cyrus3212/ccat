import React from 'react';
import cDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';

export function generateForm(handleInputOnChange, options, errorFields) {
  return [
    {
      columns: [
        {
          label: "Description",
          type: "alphaNumericInput",
          dataIndex: 'description',
          validationResult: errorFields,
          required: true,
          maxLength: 20,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: "Preferred",
          type: "radioInput",
          onChange: handleInputOnChange,
          dataIndex: 'Preferred',
          options: options
        }
      ]
    },

  ]
}
