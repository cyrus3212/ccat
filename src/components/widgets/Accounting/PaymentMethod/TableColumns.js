import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import paymentTranslate from '../../../../translation/accounting/paymentMethod.json';

export function generateColumns(onChangeInput, handleOnShowErrorModal, paymentTypes, handleOnChangeInputSave, handleDisabledButton, handleDisabledPaymentType, clearDisabled) {
  return [
    {
      title: paymentTranslate.code,
      dataIndex: 'paymentMethods',
      refId: 'id',
      type: "alphaNumericInput",
      onChange: onChangeInput,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      required: true,
      maxLength: 2,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.description,
      dataIndex: 'description',
      refId: 'id',
      type: "alphaNumericInput",
      onChange: onChangeInput,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      required: true,
      maxLength: 15,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.glAccount,
      dataIndex: 'accountNumber',
      refId: 'id',
      type: "coaTextInput",
      onChange: onChangeInput,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      // isDisabled: handleDisabledPaymentType,
      required: true,
      maxLength: 10,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.transFeePercent,
      dataIndex: clearDisabled === true ? null : 'transFeePercent',
      refId: 'id',
      type: "percentageInput",
      onChange: onChangeInput,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      isDisabled: handleDisabledPaymentType,
      defaultValue: 0,
      maxLength: 6,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.transFeeAccount,
      dataIndex: clearDisabled === true ? null : 'transFeeAccount',
      refId: 'id',
      type: "coaTextInput",
      onChange: onChangeInput,
      isDisabled: handleDisabledPaymentType,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      maxLength: 10,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.bankAcc,
      dataIndex: 'bankAccount',
      refId: 'id',
      type: "coaTextInput",
      onChange: onChangeInput,
      // isDisabled: handleDisabledPaymentType,
      columnSortable:false,
      onBlur: handleOnChangeInputSave,
      maxLength: 10,
      isCheckValidation: true
    },
    {
      title: paymentTranslate.paymentType,
      dataIndex: 'paymentType',
      refId: 'id',
      type: "selectInput",
      onChange: handleOnChangeInputSave,
      columnSortable:false,
      options: paymentTypes,
      displayLabel:false,
      isCheckValidation: true
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete,
          onClick: handleOnShowErrorModal, type: "button", isDisabled: handleDisabledButton
        }
      ]
    }
  ]
}
