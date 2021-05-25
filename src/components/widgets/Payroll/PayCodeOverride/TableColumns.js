import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import payCodeOverrideTranslate from '../../../../translation/payroll/payCodeOverride.json';

export function generatePayCodeOverrideTableColumns(handleInputOnChange, handleShowErrorModal, payCodeOptions, companyNumberOptions) {

  return [
    {
      title: payCodeOverrideTranslate.payCode,
      refId: "cId",
      dataIndex: 'payCode',
      maxLength: 25,
      onChange: handleInputOnChange,
      columnSortable:false,
      required: true,
      isCheckValidation: true,
      type: "selectInput",
      options: payCodeOptions,
    },
    {
      title: payCodeOverrideTranslate.companyNumber,
      refId: "cId",
      dataIndex: "companyNumber",
      maxLength: 3,
      onChange: handleInputOnChange,
      columnSortable:false,
      required: true,
      isCheckValidation: true,
      type: "selectInput",
      options: companyNumberOptions,
      enableBatchUpdate: true
    },
    {
      title: payCodeOverrideTranslate.otherPayCode,
      refId: "cId",
      dataIndex: "otherPayCodePercent",
      maxLength: 10,
      type: "percentageInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      required: true,
      isCheckValidation: true,
      enableBatchUpdate: true
    },
    {
      title: payCodeOverrideTranslate.glAccount,
      refId: "cId",
      dataIndex: "glAccount",
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      required: true,
      isCheckValidation: true,
      enableBatchUpdate: true
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
          onClick: handleShowErrorModal,
          type: "button",
        }
      ]
    }
  ]
}
