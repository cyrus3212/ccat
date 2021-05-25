import React from 'react';
export function listTableColumns(handleInputOnChange) {

  return [
    {
      title: '',
      dataIndex: 'description',
      type: "textLabel",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      refId: 'cId',
    },
    {
      title: 'Customer Pay',
      dataIndex: 'customerPay',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      refId: 'cId',
      maxLength: 10,
      enableBatchUpdate: true

    },
    {
      title: 'Internal',
      dataIndex: 'internal',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      refId: 'cId',
      maxLength: 10,
      enableBatchUpdate: true
    },
    {
      title: 'Warranty',
      dataIndex: 'warranty',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      refId: 'cId',
      maxLength: 10,
      enableBatchUpdate: true
    },
    {
      title: 'Service Contract',
      dataIndex: 'serviceContract',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      refId: 'cId',
      maxLength: 10,
      enableBatchUpdate: true
    },
  ]
}
