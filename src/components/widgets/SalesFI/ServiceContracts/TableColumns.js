import React from 'react';
export function listTableColumns(handleTableInputOnChange) {

  return [
    {
      title: 'Sale Group',
      dataIndex: 'description',
      refId:'cId',
      // type: "textInput",
      onChange: handleTableInputOnChange,
      columnSortable:false
    },
    {
      title: 'Sale Account',
      dataIndex: 'accountNo1',
      refId:'cId',
      type: "coaTextInput",
      onChange: handleTableInputOnChange,
      columnSortable:false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: 'Cost of Sale Account',
      dataIndex: 'accountNo2',
      refId:'cId',
      type: "coaTextInput",
      onChange: handleTableInputOnChange,
      columnSortable:false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    // {
    //   title: 'Inventory Account',
    //   dataIndex: 'accountNo3',
    //   refId:'cId',
    //   type: "alphaNumericInput",
    //   onChange: handleTableInputOnChange,
    //   columnSortable:false,
    //   maxLength: 10,
    //   isCheckValidation: true
    // },
  ]
}
