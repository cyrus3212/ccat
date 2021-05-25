import React from 'react';

export function listTableColumns(handleInputOnChange) {
  return [
    {
      title: 'From',
      dataIndex: 'priceStart',
      refId: 'cId',
      type: "numericInput",
      defaultValue: "0",
      onChange: handleInputOnChange,
      columnSortable:false,
      isDisabled :true,
      allowDecimal: true
    },
    {
      title: 'To',
      dataIndex: 'priceRange',
      refId: 'cId',
      type: "numericInput",
      defaultValue: "0",
      onChange: handleInputOnChange,
      columnSortable:false,
      allowDecimal: true,
      maxLength: 9,
      isCheckValidation: true
    },
    {
      title: 'Percent',
      dataIndex: 'rangePercent',
      refId: 'cId',
      type: "numericInput",
      defaultValue: "0",
      onChange: handleInputOnChange,
      columnSortable:false,
      allowDecimal: true,
      maxLength: 3,
      isCheckValidation: true
    },
  ]
}
