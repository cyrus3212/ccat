import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import spTranslate from '../../../../translation/accounting/splitAccounts.json';

export function generateColumns(handleOnChangeInput, handleOnShowErrorModal) {
  return [
    {
      title: spTranslate.account,
      dataIndex: 'account',
      refId:'cId',
      type: "coaTextInput",
      maxLength: 10,
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true,
    },
    {
      title: spTranslate.splitPercent,
      dataIndex: 'splitPercent',
      refId:'cId',
      type: "percentageInput",
      maxLength: 5,
      onChange: handleOnChangeInput,
      columnSortable: false,
      allowDecimal: true,
      isCheckValidation: true
    },
    {
      title: spTranslate.splitAmount,
      dataIndex: 'splitAmount',
      refId:'cId',
      maxLength: 9,
      type: "amountInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
    },
    {
      title: spTranslate.controlOverride,
      dataIndex: 'ctlOveride',
      refId:'cId',
      maxLength: 14,
      type: "alphaNumericInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button",
          text: commonTranslate.delete, onClick: handleOnShowErrorModal, type: "button",
        }
      ]
    }
  ]
}
