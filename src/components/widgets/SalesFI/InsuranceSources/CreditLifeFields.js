import React from 'react';
import iSourcesTranslate from '../../../../translation/salesfi/insuranceSources.json';
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateCreditLifeForm(handleInputOnChange, creditLifeRender) {
  return [
    {
      columns: [
        {
          label: iSourcesTranslate.useTableRate,
          dataIndex: 'useClRateTable',
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
          component: creditLifeRender,
          xsColSize: 12,
          mdColSize: 12
        }
      ]
    },
  ]
}
