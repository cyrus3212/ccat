import React from 'react';
import payCodeOverrideTranslate from '../../../../translation/payroll/payCodeOverride.json';

export function generateForm(handleInputOnChange, errorFields, distributionCodeOptions) {
  return [
    {
      columns: [
        {
          label: payCodeOverrideTranslate.distCode,
          dataIndex: "distributionCode",
          maxLength: 4,
          required: true,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          type: "selectInputH",
          options: distributionCodeOptions
        },
      ]
    }
  ]
}
