import React from 'react';
import commonTranslate from '../../../../translation/common.json';
import dcTranslate from '../../../../translation/payroll/departmentCodes.json';

export function generateColumns(handleOnBlur, handleOnShowErrorModal, radioOptions, selectOptions) {
  return [
    {
      title: dcTranslate.deptCode,
      dataIndex: 'code',
      refId: 'id',
      type: "textInput",
      columnSortable:false,
      onBlur: handleOnBlur,
      maxLength: 2,
      isCheckValidation: true
    },
    {
      title: dcTranslate.deptDesc,
      dataIndex: 'description',
      refId: 'id',
      type: "textInput",
      columnSortable:false,
      onBlur: handleOnBlur,
      maxLength: 30,
      isCheckValidation: true
    },
    {
      title: dcTranslate.attendanceDisp,
      dataIndex: 'attendanceDisplay',
      refId: 'id',
      type: "radioInput",
      onChange: handleOnBlur,
      columnSortable:false,
      defaultValue: 'N',
      options: radioOptions
    },
    {
      title: dcTranslate.secAppLink,
      dataIndex: 'securityApplicationLink',
      refId: 'id',
      type: "selectInput",
      onChange: handleOnBlur,
      columnSortable:false,
      options: selectOptions
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        { htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete,
          onClick: handleOnShowErrorModal, type: "button", }
      ]
    }
  ]
}
