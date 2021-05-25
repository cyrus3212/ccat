import React from "react";
import commonTranslate from "../../../../translation/common.json";

export function generateCreditTableColumns(handleInputOnChange) {
  return [
    {
      title: "Sale Group",
      dataIndex: "description",
      // type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId"
    },
    {
      title: "Sale Account",
      dataIndex: "accountNo1",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: "Cost of Sale Account",
      dataIndex: "accountNo2",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    }
  ];
}

export function generateAccidentTableColumns(handleInputOnChange) {
  return [
    {
      title: "Sale Group",
      dataIndex: "description",
      // type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId"
    },
    {
      title: "Sale Account",
      dataIndex: "accountNo1",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: "Cost of Sale Account",
      dataIndex: "accountNo2",
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      maxLength: 10,
      isCheckValidation: true,
      enableBatchUpdate: true
    }
  ];
}

export function generateCreditRateTableColumns(
  handleInputOnChange,
  useCLTableRate
) {
  return [
    {
      title: "",
      dataIndex: "description",
      type: "label",
      columnSortable: false,
      refId: "cId"
    },
    {
      title: "Single",
      dataIndex: "single",
      type: "numericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      allowDecimal: true,
      maxLength: 10,
      // isDisabled: useCLTableRate,
      isCheckValidation: true
    },
    {
      title: "Joint",
      dataIndex: "joint",
      type: "numericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      allowDecimal: true,
      maxLength: 10,
      // isDisabled: useCLTableRate,
      isCheckValidation: true
    }
  ];
}

export function generateAccidentRateTableColumns(
  handleInputOnChange,
  enableAHTableRate
) {
  return [
    {
      title: "Description",
      dataIndex: "description",
      type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      allowDecimal: true,
      maxLength: 10,
      // isDisabled: enableAHTableRate,
      isCheckValidation: true
    },
    {
      title: "Rate/100/Yr",
      dataIndex: "rate",
      type: "numericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      allowDecimal: true,
      maxLength: 10,
      defaultValue: "0",
      // isDisabled: enableAHTableRate,
      isCheckValidation: true
    },
    {
      title: "Commission Rate",
      dataIndex: "comission",
      type: "numericInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      refId: "cId",
      allowDecimal: true,
      maxLength: 6,
      defaultValue: "0",
      // isDisabled: enableAHTableRate,
      isCheckValidation: true
    }
  ];
}
