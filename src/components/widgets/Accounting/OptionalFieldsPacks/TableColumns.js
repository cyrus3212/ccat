import React from "react";
import commonTranslate from "../../../../translation/common.json";

export function generateColumns(handleOnChangeInput, handleOnShowErrorModal, typeOptions, schedList, requiredStockOptions, type,
  handleDisableDan, handleDisableCan, handleDisableRow)
{
  const maxLength = 50;
  return [
    {
      title: "Sequence Number",
      dataIndex: "sequenceNumber",
      refId: "cId",
      maxLength: 3,
      type: "numericInput",
      onChange: handleOnChangeInput,
      // onBlur: handleTableInputOnBlur,
      columnSortable: false,
      isCheckValidation: true,
      isDisabled: handleDisableRow
    },
    {
      title: "Description",
      dataIndex: "description",
      refId: "cId",
      maxLength: maxLength,
      type: "textInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      isDisabled: handleDisableRow
    },
    {
      title: "Type",
      dataIndex: "type",
      refId: "cId",
      maxLength: maxLength,
      type: "selectInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      options: typeOptions,
      isDisabled: handleDisableRow
    },
    {
      title: "Required w/ Stock In?",
      dataIndex: "requiredStockOptionValues",
      refId: "cId",
      maxLength: maxLength,
      type: "searchableSelect",
      onChange: handleOnChangeInput,
      columnSortable: false,
      options: requiredStockOptions,
      isCheckValidation: true,
      isDisabled: handleDisableRow
    },
    {
      title: "Default Value New",
      dataIndex: "defaultValueNew",
      refId: "cId",
      maxLength: maxLength,
      type: "textInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      isDisabled: handleDisableRow
    },
    {
      title: "Default Value Used",
      dataIndex: "defaultValueUsed",
      refId: "cId",
      maxLength: maxLength,
      type: "textInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      isDisabled: handleDisableRow
    },
    {
      title: "Schedule By",
      dataIndex: "scheduleBy",
      refId: "cId",
      maxLength: maxLength,
      type: "selectInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      options: schedList,
      isDisabled: handleDisableRow
    },
    {
      title: "Debit Account",
      dataIndex: "debitAccount",
      refId: "cId",
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isDisabled: handleDisableDan,
      isCheckValidation: true,
      // onBlur: handleTableInputOnBlur
    },
    {
      title: "Credit Account",
      dataIndex: "creditAccount",
      refId: "cId",
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isDisabled: handleDisableCan,
      isCheckValidation: true,
      // onBlur: handleTableInputOnBlur
    },
    {
      title: "Entry required for Trade-Ins",
      dataIndex: "generalGLEntryforTradeIns",
      refId: "cId",
      maxLength: maxLength,
      type: "radioInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      options: type,
      onChangeRadio: handleOnChangeInput,
      isDisabled: handleDisableRow
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
          isDisabled: handleDisableRow,
          type: "button"
        }
      ]
    }
  ];
}
