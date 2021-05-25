import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import countyCityTaxTranslate from '../../../../translation/payroll/countyCityTax.json';

export function generateCountyTaxTableColumns(handleCellInputOnChange, handleOnBlur, handleShowErrorModal) {

  return [
    {
      title: countyCityTaxTranslate.taxUnitName,
      refId:'id',
      dataIndex: 'taxEntityName',
      maxLength: 25,
      type: "alphaNumericInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      required: true,
      isDisabled: true,
      isCheckValidation: true,
    },
    {
      title: countyCityTaxTranslate.liabilityAccounttoAccrueTax,
      refId:'id',
      dataIndex: 'liabilityAccounttoAccrueTax',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleCellInputOnChange,
      columnSortable:false,
      onBlur: handleOnBlur,
      required: true,
      isCheckValidation: true,
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        { htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete, onClick: handleShowErrorModal, type: "button", }
      ]
    }
  ]
}
