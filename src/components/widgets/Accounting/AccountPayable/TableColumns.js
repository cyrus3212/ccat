import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import apTranslate from '../../../../translation/accounting/accountsPayable.json';

export function generateColumns(handleOnChangeRadio, handleOnBlur, handleOnShowErrorModal, options) {
  const maxLength = 50;
  return [
    {
      title: apTranslate.description,
      dataIndex: 'description',
      refId:'id',
      maxLength: maxLength,
      type: "textInput",
      columnSortable: false,
      onBlur: handleOnBlur,
      maxLength: 110,
      required: true,
      isCheckValidation: true
    },
    {
      title: apTranslate.apAccount,
      dataIndex: 'apAccount',
      refId:'id',
      maxLength: maxLength,
      type: "coaTextInput",
      maxLength: 10,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: apTranslate.discountAccount,
      dataIndex: 'discountAccount',
      refId:'id',
      maxLength: maxLength,
      type: "coaTextInput",
      maxLength: 10,
      columnSortable: false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: apTranslate.selectAPInvoicesbyAccount,
      dataIndex: 'selectAPInvoicesbyAccount',
      refId:'id',
      maxLength: maxLength,
      type: "radioInput",
      options:options,
      onChange: handleOnChangeRadio,
      columnSortable: false,
    },
    {
      title: apTranslate.poAprovalsRequired,
      dataIndex: 'poAprovalsRequired',
      refId:'id',
      maxLength: maxLength,
      defaultValue: "N",
      type: "radioInput",
      options:options,
      onChange: handleOnChangeRadio,
      columnSortable: false,
    },
    {
      title: apTranslate.emailTextApprovals,
      dataIndex: 'emailTextApprovals',
      refId: 'id',
      maxLength: maxLength,
      defaultValue: "N",
      type: "radioInput",
      options: options,
      onChange: handleOnChangeRadio,
      columnSortable: false,
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
