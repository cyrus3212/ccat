import React from 'react';
import techTranslate from "../../../../translation/service/technicians.json";

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: techTranslate.techID,
          dataIndex: 'technicianId',
          required: true,
          type: "alphaNumericInput",
          maxLength: 3,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: techTranslate.techName,
          dataIndex: 'name',
          required: true,
          type: "alphaNumericInput",
          maxLength: 20,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: techTranslate.empNum,
          dataIndex: 'employeeNumber',
          type: "alphaNumericInput",
          maxLength: 9,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: techTranslate.techPass,
          type: "alphaNumericInput",
          maxLength: 6,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          dataIndex: 'password'
        }
      ]
    },
    {
      columns: [
        {
          label: techTranslate.customerLabor,
          type: "numericInput",
          maxLength: 7,
          allowDecimal: true,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          dataIndex: 'customerLaborCostA'
        }
      ]
    }
  ]
}
