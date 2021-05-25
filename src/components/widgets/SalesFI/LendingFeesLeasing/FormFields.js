import React from 'react';
import cDrawersTranslate from '../../../../translation/accounting/cashDrawers.json';

export function generateForm(handleInputOnChange, recordTypeOptions, radioOptions, fetTaxableOptions, taxCodeOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: "Lending or Leasing",
          type: "selectInput",
          dataIndex: 'recordType',
          required: true,
          onChange: handleInputOnChange,
          options: recordTypeOptions
        }
      ]
    },
    {
      columns: [
        {
          label: "Description",
          type: "alphaNumericInput",
          dataIndex: 'description',
          maxLength: 20,
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Default Amount New",
          type: "amountInput",
          onChange: handleInputOnChange,
          maxLength: 9,
          dataIndex: 'amountNew',
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Default Amount Used",
          type: "amountInput",
          onChange: handleInputOnChange,
          maxLength: 9,
          dataIndex: 'amountUsed',
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Include New",
          type: "radioInput",
          onChange: handleInputOnChange,
          dataIndex: 'includeNew',
          options: radioOptions
        }
      ]
    },
    {
      columns: [
        {
          label: "Include Used",
          type: "radioInput",
          onChange: handleInputOnChange,
          dataIndex: 'includeUsed',
          options: radioOptions
        }
      ]
    },
    {
      columns: [
        {
          label: "Taxable",
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'taxable',
          options: taxCodeOptions

        }
      ]
    },
    {
      columns: [
        {
          label: "G/L Account to Credit (Income/Payable)",
          type: "coaTextInput",
          maxLength: 10,
          onChange: handleInputOnChange,
          dataIndex: 'glAccountNumber',
          options: fetTaxableOptions,
          validationResult: errorFields
        }
      ]
    },
  ]
}
