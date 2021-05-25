import React from 'react';
import cDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';

export function generateForm(handleInputOnChange, salesPersonTypeOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: "Salesperson ID",
          type: "alphaNumericInput",
          dataIndex: 'salesId',
          maxLength: 3,
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Salesperson Name",
          type: "alphaNumericInput",
          dataIndex: 'name',
          required: true,
          maxLength: 20,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Salesperson Type",
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'type',
          options: salesPersonTypeOptions,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Employee #",
          type: "alphaNumericInput",
          onChange: handleInputOnChange,
          dataIndex: 'employeeNumber',
          maxLength: 9,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Gross Commission",
          type: "percentageInput",
          onChange: handleInputOnChange,
          dataIndex: 'grossRate',
          maxLength: 6,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Gross Spiff Amount",
          type: "amountInput",
          onChange: handleInputOnChange,
          dataIndex: 'grossBonus',
          maxLength: 6,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Gross Minimum",
          type: "amountInput",
          onChange: handleInputOnChange,
          dataIndex: 'grossMinimum',
          maxLength: 8,
          validationResult: errorFields
        }
      ]
    }
  ]
}
