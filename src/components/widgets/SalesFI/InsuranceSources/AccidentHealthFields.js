import React from 'react';
import iSourcesTranslate from '../../../../translation/salesfi/insuranceSources.json';

export function generateAccidentFieldsForm(handleInputOnChange, accidentHealthRender) {
  return [
    {
      columns: [
        {
          label: iSourcesTranslate.useTableRate,
          dataIndex: 'useAhRateTable',
          type: "checkboxH",
          onChange: handleInputOnChange,
          options: [
            { "value": "1", "label": iSourcesTranslate.useTableRate}
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "component",
          component: accidentHealthRender,
          xsColSize: 12,
          mdColSize: 12
        }
      ]
    },
  ]
}
