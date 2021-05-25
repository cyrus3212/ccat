import React from 'react';
import dcTranslate from '../../../../translation/payroll/departmentCodes.json';

export function generateForm(handleInputOnChange, securityApplicationLinkOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: dcTranslate.deptCode,
          type: "alphaNumericInput",
          dataIndex: 'code',
          maxLength: 2,
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: dcTranslate.deptDesc,
          type: "alphaNumericInput",
          dataIndex: 'description',
          required: true,
          maxLength: 30,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: dcTranslate.attendanceDisp,
          type: "radioInput",
          onChange: handleInputOnChange,
          dataIndex: 'attendanceDisplay',
          labelColSize: 4,
          InputColSize: 2,
          mdColSize: 8,
          validationResult: errorFields,
          defaultValue: 'N',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: dcTranslate.secAppLink,
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'securityApplicationLink',
          labelColSize: 5,
          InputColSize: 4,
          validationResult: errorFields,
          size: 3,
          defaultValue: "Please Select",
          options: securityApplicationLinkOptions
        }
      ]
    },
  ]
}
