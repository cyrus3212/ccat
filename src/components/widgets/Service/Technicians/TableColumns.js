import React from "react";
import commonTranslate from "../../../../translation/common.json";
import techTranslate from "../../../../translation/service/technicians.json";

export function generateColumns(
  onChangeInput,
  handleOnBlur,
  handleOnShowErrorModal
) {
  return [
    {
      title: techTranslate.techID,
      dataIndex: "technicianId",
      refId: "id",
      required: true,
      type: "alphaNumericInput",
      maxLength: 3,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: techTranslate.techName,
      dataIndex: "name",
      refId: "id",
      required: true,
      type: "alphaNumericInput",
      maxLength: 20,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: techTranslate.empNum,
      dataIndex: "employeeNumber",
      refId: "id",
      type: "alphaNumericInput",
      maxLength: 9,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: techTranslate.techPass,
      dataIndex: "password",
      refId: "id",
      type: "alphaNumericInput",
      maxLength: 6,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: techTranslate.customerLabor,
      dataIndex: "customerLaborCostA",
      refId: "id",
      type: "numericInput",
      maxLength: 7,
      allowDecimal: true,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: "Action",
      dataIndex: "extraData",
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          onClick: handleOnShowErrorModal,
          type: "button"
        }
      ]
    }
  ];
}
