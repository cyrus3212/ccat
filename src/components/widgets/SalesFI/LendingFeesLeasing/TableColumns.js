import React from 'react';
import commonTranslate from '../../../../translation/common.json';
export function generateTableColumns(onChangeInput, handleDisabledDeleteButton, handleShowErrorModal, handleChangeModal, recordTypeOptions, radioOtions, onBlur, onChangeSave, fetTaxableOptions, taxCodeOptions) {

  return [
    {
      title: 'Lending Or Leasing',
      dataIndex: 'recordType',
      refId: 'id',
      required: true,
      type: "selectInput",
      onChange: onBlur,
      columnSortable: false,
      options: recordTypeOptions
    },
    {
      title: 'Description',
      dataIndex: 'description',
      refId: 'id',
      required: true,
      maxLength: 20,
      type: "alphaNumericInput",
      onBlur: onBlur,
      onChange: onChangeInput,
      columnSortable:false,
      isCheckValidation: true
    },
    {
      title: 'Default Amount New',
      dataIndex: 'amountNew',
      refId: 'id',
      maxLength: 9,
      type: "amountInput",
      onBlur:onBlur,
      onChange: onChangeInput,
      columnSortable:false,
      isCheckValidation: true,
    },
    {
      title: 'Default Amount Used',
      dataIndex: 'amountUsed',
      refId: 'id',
      maxLength: 9,
      type: "amountInput",
      onBlur:onBlur,
      onChange: onChangeInput,
      columnSortable:false,
      isCheckValidation: true
    },
    {
      title: 'Include New',
      dataIndex: 'includeNew',
      refId: 'id',
      type: "radioInput",
      onChange:onBlur,
      columnSortable:false, options: radioOtions},
    {
      title: 'Include Used',
      dataIndex: 'includeUsed',
      refId: 'id',
      type: "radioInput",
      onChange:onBlur ,
      columnSortable:false,
      options: radioOtions
    },
    {
      title: 'Taxable',
      dataIndex: 'taxable',
      refId: 'id',
      type: "selectInput",
      onChange:onBlur ,
      columnSortable:false,
      options: taxCodeOptions
    },
    {
      title: 'G/L Account to Credit (Income/Payable)',
      dataIndex: 'glAccountNumber',
      refId: 'id',
      type: "coaTextInput",
      maxLength: 10,
      onBlur:onBlur,
      onChange: onChangeInput,
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
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteButton,
          onClick: handleShowErrorModal,
          type: "button"
        }
      ]
    },
  ]
}
