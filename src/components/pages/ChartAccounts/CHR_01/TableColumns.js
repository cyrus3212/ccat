import React from 'react';
import commonTranslate from '../../../../translation/common.json';

export function generateReviewAccounts(handleInputOnChange, handleDisabledField, accountTypes, departments, balanceTypes, onChangeInputSave) {

  return [
    {
      title: "Old Account Number",
      dataIndex: 'oldAccountNumber',
      refId: 'id',
      maxLength: 10,
      columnSortable: false,
    },
    {
      title: "New Account Number",
      dataIndex: 'newAccountNumber',
      refId: 'id',
      type: 'textInput',
      maxLength: 10,
      columnSortable: false,
      isCheckValidation: true,
      required: true,
      onChange: handleInputOnChange,
      onBlur: onChangeInputSave
    },
    {
      title: "Description",
      dataIndex: 'description',
      refId: 'id',
      type: 'textInput',
      columnSortable: false,
      isCheckValidation: true,
      required: true,
      onChange: handleInputOnChange,
      onBlur: onChangeInputSave
    },
    {
      title: "Account Type",
      dataIndex: 'accountType',
      refId: 'id',
      type: 'selectInput',
      options: accountTypes,
      isCheckValidation: true,
      required: true,
      onChange: onChangeInputSave
    },
    {
      title: "Credit",
      dataIndex: 'inventoryAccountNumber',
      refId: 'id',
      maxLength: 10,
      type: 'coaTextInput',
      columnSortable: false,
      isCheckValidation: true,
      onChange: handleInputOnChange,
      isDisabled: handleDisabledField,
      forceEmpty: handleDisabledField,
      onBlur: onChangeInputSave
    },
    {
      title: "Debit",
      dataIndex: 'creditSaleAccountNumber',
      refId: 'id',
      maxLength: 10,
      type: 'coaTextInput',
      columnSortable: false,
      isCheckValidation: true,
      onChange: handleInputOnChange,
      isDisabled: handleDisabledField,
      forceEmpty: handleDisabledField,
      onBlur: onChangeInputSave
    },
    {
      title: "Department Code",
      dataIndex: 'departmentCode',
      refId: 'id',
      type: 'selectInput',
      options: departments,
      isCheckValidation: true,
      required: true,
      onChange: onChangeInputSave
    },
    {
      title: "Balance Type",
      dataIndex: 'balanceType',
      refId: 'id',
      type: 'selectInput',
      options: balanceTypes,
      isCheckValidation: true,
      required: true,
      onChange: onChangeInputSave
    },
    {
      title: "Inter Company Type",
      dataIndex: 'interCompanyType',
      refId: 'id',
      maxLength: 1,
      type: 'textInput',
      columnSortable: false,
      isCheckValidation: true,
      onChange: handleInputOnChange,
      onBlur: onChangeInputSave
    }
  ]
}
