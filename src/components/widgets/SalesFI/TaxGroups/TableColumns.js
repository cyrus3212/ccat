import React from 'react';

export function generateTableColumns(handleInputOnChange, options) {

  return [
    {
      title: 'Description',
      dataIndex: 'description',
      refId: "cId",
      type: "alphaNumericInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 15
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      refId: "cId",
      type: "numericInput",
      allowDecimal: true,
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 12
    },
    {
      title: 'Tax Rebate',
      dataIndex: 'taxRebate',
      refId: "cId",
      type: "radioInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      options: options
    },
    {
      title: 'Exclude Trade',
      dataIndex: 'excludeTrade',
      refId: "cId",
      type: "radioInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      options: options
    },
    {
      title: 'Threshold',
      dataIndex: 'threshold',
      refId: "cId",
      type: "numericInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      defaultValue: "0",
      maxLength: 7
    },
    {
      title: 'Ceiling',
      dataIndex: 'ceiling',
      refId: "cId",
      type: "numericInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      defaultValue: "0",
      maxLength: 7
    },
    {
      title: 'Account',
      dataIndex: 'account',
      refId: "cId",
      type: "coaTextInput",
      isCheckValidation: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 10
    },
    // { title: 'Special Tax Type',  dataIndex: 'specialTaxType',  refId:"cId", type: "textInput",  onChange: handleInputOnChange, columnSortable:false, },
  ]
}
