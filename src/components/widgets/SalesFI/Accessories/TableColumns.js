import React from 'react';
export function listTableColumns(handleInputOnChange) {

  return [
    {
      title: 'Sale Group',
      dataIndex: 'description',
      // type: "textInput",
      refId:'cId',
      onChange: handleInputOnChange,
      columnSortable:false
    },
    {
      title: 'Sale Account',
      dataIndex: 'accountNo1',
      type: "coaTextInput",
      refId:'cId',
      onChange: handleInputOnChange,
      columnSortable:false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: 'Cost of Sale Account',
      dataIndex: 'accountNo2',
      type: "coaTextInput",
      refId:'cId',
      onChange: handleInputOnChange,
      columnSortable:false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: 'Inventory Account',
      dataIndex: 'accountNo3',
      type: "coaTextInput",
      refId:'cId',
      onChange: handleInputOnChange,
      columnSortable:false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
  ]
}
