import React from 'react';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: "Service Writer ID",
          type: "alphaNumericInput",
          maxLength: 3,
          required: true,
          dataIndex: 'serviceWriterId',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: "Name",
          type: "alphaNumericInput",
          required: true,
          maxLength: 20,
          dataIndex: 'name',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: "Initials",
          type: "alphaNumericInput",
          maxLength: 2,
          dataIndex: 'initials',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: "Password",
          type: "alphaNumericInput",
          maxLength: 6,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'password'
        }
      ]
    },
    {
      columns: [
        {
          label: "Employee Number",
          type: "alphaNumericInput",
          maxLength: 9,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          dataIndex: 'employeeNumber'
        }
      ]
    }
  ]
}

