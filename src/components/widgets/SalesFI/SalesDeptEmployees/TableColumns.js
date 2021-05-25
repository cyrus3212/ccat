import React from 'react';
import commonTranslate from '../../../../translation/common.json';

export function generateTableColumns(handleInputOnChange, handleDisabledDeleteButton, handleShowErrorModal, salesPersonTypeOptions, handleOnBlur) {

  return [
    {
      title: 'Salesperson ID',
      dataIndex: 'salesId',
      refId: 'id',
      type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      maxLength: 3,
      isCheckValidation: true,
      required: true,
      onBlur: handleOnBlur
    },
    {
      title: 'Salesperson Name',
      dataIndex: 'name',
      refId: 'id',
      type: "alphaNumericInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      maxLength: 20,
      isCheckValidation: true,
      required: true,
      onBlur: handleOnBlur
    },
    {
      title: 'Salesperson Type',
      dataIndex: 'type',
      refId: 'id',
      type: "selectInput",
      onChange: handleOnBlur,
      maxLength: 10,
      columnSortable:false,
      options: salesPersonTypeOptions,
      isCheckValidation: true
    },
    {
      title: 'Employee #',
      dataIndex: 'employeeNumber',
      refId: 'id',
      type: "alphaNumericInput",
      maxLength: 9,
      onChange: handleInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
    },
    {
      title: 'Gross Commission',
      dataIndex: 'grossRate',
      refId: 'id',
      type: "percentageInput",
      maxLength: 6,
      onChange: handleInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true,
    },
    {
      title: 'Gross Spiff Amount',
      dataIndex: 'grossBonus',
      refId: 'id',
      type: "amountInput",
      maxLength: 6,
      onChange: handleInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true,
    },
    {
      title: 'Gross Minimum',
      dataIndex: 'grossMinimum',
      refId: 'id',
      type: "amountInput",
      maxLength: 8,
      onChange: handleInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        { htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete, isDisabled: handleDisabledDeleteButton, onClick: handleShowErrorModal, type: "button", }
      ]
    },
  ]
}
