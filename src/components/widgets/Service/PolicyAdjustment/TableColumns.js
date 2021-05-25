import React from "react";
import commonTranslate from "../../../../translation/common.json";
import policyAdjTranslate from "../../../../translation/service/policyAdjustment.json";

export function generateColumns(
  onChangeInput,
  handleOnBlur,
  handleOnShowErrorModal,
  partsPricingOptions,
  linePaymentMethodOptions
) {
  return [
    {
      title: policyAdjTranslate.policyAdjustmentCode,
      dataIndex: "policyAdjustmentCode",
      refId: "id",
      type: "textInput",
      maxLength: 1,
      required: true,
      onChange: onChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: policyAdjTranslate.description,
      dataIndex: "description",
      refId: "id",
      required: true,
      maxLength: 10,
      type: "alphaNumericInput",
      onChange: onChangeInput,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: policyAdjTranslate.linePaymentMethod,
      dataIndex: "linePaymentMethod",
      refId: "id",
      type: "selectInput",
      onChange: handleOnBlur,
      columnSortable: false,
      isCheckValidation: true,
      options: linePaymentMethodOptions
    },
    {
      title: policyAdjTranslate.policyAdjustment,
      dataIndex: "policyAdjustmentAccount",
      refId: "id",
      type: "coaTextInput",
      onChange: onChangeInput,
      maxLength: 10,
      columnSortable: false,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: policyAdjTranslate.laborRate,
      dataIndex: "laborRate",
      refId: "id",
      type: "numericInput",
      onChange: onChangeInput,
      columnSortable: false,
      allowDecimal: true,
      maxLength: 7,
      isCheckValidation: true,
      onBlur: handleOnBlur
    },
    {
      title: policyAdjTranslate.partsPricing,
      dataIndex: "partsPricing",
      refId: "id",
      type: "selectInput",
      onChange: handleOnBlur,
      columnSortable: false,
      options: partsPricingOptions
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
