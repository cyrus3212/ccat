import React from 'react';
// import "../_accountingWidget.scss";
import financeCoTranslate from '../../../../translation/salesfi/financeCo.json';

export function generateForm() {
  return [
    {
      columns: [
        {
          label: financeCoTranslate.addFile,
          dataIndex: "addFile",
          type: "textInputH",
          required: true,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5
        },
      ]
    },
  ]
}
