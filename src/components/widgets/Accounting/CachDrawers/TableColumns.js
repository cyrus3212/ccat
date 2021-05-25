import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import cDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';

export function generateCashDrawersColumns(handleCellInputOnChange, handleOnBlur, handleOnShowErrorModal) {
  return [
    {
      title: cDrawersTranslate.accountNumber,
      refId:'id',
      dataIndex: 'accountNumber',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true,
      required: true
    },
    {
      title: cDrawersTranslate.description,
      refId:'id',
      dataIndex: 'description',
      maxLength: 20, type: "alphaNumericInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true,
      required: true
    },
    {
      title: cDrawersTranslate.overAccount,
      refId:'id',
      dataIndex: 'overShortAccount',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true},
    {
      title: cDrawersTranslate.lastReceiptNum,
      refId:'id',
      dataIndex: 'lastReceiptNumber',
      maxLength: 9,
      type: "numericInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      defaultValue: "100000000",
      isCheckValidation: true
    },
    {
      title: cDrawersTranslate.depBankAccNum,
      refId:'id',
      dataIndex: 'depositBankAccountNumber',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true,
      required: true
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          onClick: handleOnShowErrorModal,
          type: "button",
        }
      ]
    }
  ]
}
