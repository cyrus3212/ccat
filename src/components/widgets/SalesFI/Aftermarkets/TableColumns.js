import React from "react";
export function listTableColumns(handleInputOnChange) {
  return [
    {
      title: "Sale Group",
      dataIndex: "description",
      refId: "cId",
      // type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: "Sale Account",
      dataIndex: "accountNo1",
      refId: "cId",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: "Cost of Sale Account",
      dataIndex: "accountNo2",
      refId: "cId",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: "Inventory Account",
      dataIndex: "accountNo3",
      refId: "cId",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    }
  ];
}
