import React from 'react';
import countyCityTaxTranslate from '../../../../translation/payroll/countyCityTax.json';
export function generateForm(handleInputOnChange, errorFields, taxWitholdingOptions) {
  return [
    {
      columns: [
        {
          label: countyCityTaxTranslate.taxUnitName,
          type: "selectInput",
          dataIndex: 'withholdingTaxingUnitType',
          maxLength: 25,
          required: true,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          options: taxWitholdingOptions
        }
      ]
    },
    {
      columns: [
        {
          label: countyCityTaxTranslate.liabilityAccounttoAccrueTax,
          type: "coaTextInput",
          dataIndex: 'liabilityAccounttoAccrueTax',
          required: true,
          maxLength: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    }
  ]
}
