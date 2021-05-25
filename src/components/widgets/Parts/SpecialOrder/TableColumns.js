import React from 'react';
import commonTranslate from '../../../../translation/common.json';

export function generateTableColumns(handleOnChangeRadio, handleOnBlur, handleOnShowErrorModal, options) {

  return [
    {
      title: 'Description',
      dataIndex: 'description',
      refId: 'id',
      type: "alphaNumericInput",
      onBlur: handleOnBlur,
      columnSortable:false,
      required: true,
      isCheckValidation: true,
      maxLength: 20
    },
    {
      title: 'Preferred',
      dataIndex: 'preferred',
      refId: 'id',
      type: "radioInput",
      onBlur:handleOnBlur,
      onChange: handleOnChangeRadio,
      columnSortable:false,
      options: options
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
    },
  ]
}
