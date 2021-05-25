import React from "react";
import commonTranslate from "../../../../translation/common.json";
import ipTypesTranslate from "../../../../translation/service/internalPayTypes.json";

export function generateColumns(
  onChangeInput,
  handleOnBlur,
  handleOnShowErrorModal
) {
  return [
    {
      title: ipTypesTranslate.typeCode,
      dataIndex: "typeCode",
      refId: "id",
      required: true,
      type: "alphaNumericInput",
      maxLength: 3,
      onChange: onChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: ipTypesTranslate.description,
      dataIndex: "description",
      required: true,
      refId: "id",
      type: "alphaNumericInput",
      maxLength: 20,
      onChange: onChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: ipTypesTranslate.accountNum,
      dataIndex: "accountNumber",
      refId: "id",
      type: "coaTextInput",
      maxLength: 10,
      onChange: onChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
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
