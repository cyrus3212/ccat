import React from "react";
import commonTranslate from "../../../../translation/common.json";
import swTranslate from "../../../../translation/service/serviceWriters.json";

export function generateColumns(
  onChangeInput,
  handleOnBlur,
  handleOnShowErrorModal
) {
  return [
    {
      title: swTranslate.serviceWriterID,
      dataIndex: "serviceWriterId",
      refId: "id",
      type: "alphaNumericInput",
      maxLength: 3,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: swTranslate.swName,
      dataIndex: "name",
      refId: "id",
      type: "alphaNumericInput",
      required: true,
      maxLength: 20,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: swTranslate.swInitials,
      dataIndex: "initials",
      refId: "id",
      type: "alphaNumericInput",
      maxLength: 2,
      onChange: onChangeInput,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: swTranslate.swPass,
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
      title: swTranslate.empNum,
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
