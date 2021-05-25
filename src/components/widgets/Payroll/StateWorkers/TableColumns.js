import React from "react";
export function listTableColumns(handleInputOnChange) {
  return [
    {
      title: "Class Code",
      dataIndex: "classCode",
      refId: "cId",
      type: "alphaNumericInput",
      maxLength: 9,
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: "Percent",
      dataIndex: "workersCompensationPercent",
      refId: "cId",
      type: "numericInput",
      maxLength: 9,
      allowDecimal: true,
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: "Description",
      dataIndex: "workersCompensationDescription",
      refId: "cId",
      type: "alphaNumericInput",
      maxLength: 15,
      onChange: handleInputOnChange,
      columnSortable: false
    }
  ];
}
