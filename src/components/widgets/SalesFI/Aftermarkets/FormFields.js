import React from 'react';
// import "../_accountingWidget.scss";
import aftermarketsTranslate from '../../../../translation/salesfi/aftermarkets.json'

export function generateForm(handleInputOnChange, assignGrossOptions, tableTypeOptions, taxCodeOptions, validationResult) {
  return [
    {
      columns: [
        {
          label: aftermarketsTranslate.options,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.aName,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          required: true,
          maxLength: 20,
          dataIndex: "description",
          validationResult: validationResult
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
          mdColSize: 12
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.accntng,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.amountNew,
          dataIndex: "amountNew",
          type: "numericInputH",
          allowDecimal: true,
          labelColSize: 6,
          InputColSize: 6,
          defaultValue: '0',
          mdColSize: 5,
          onChange: handleInputOnChange,
          maxLength: 11,
          validationResult: validationResult
        },
        {
          label: aftermarketsTranslate.amountUsed,
          dataIndex: "amountUsed",
          type: "numericInputH",
          allowDecimal: true,
          defaultValue: '0',
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          maxLength: 11,
          validationResult: validationResult
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.cost,
          dataIndex: "cost",
          type: "numericInputH",
          allowDecimal: true,
          defaultValue: '0',
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          maxLength: 11,
          validationResult: validationResult
        },
        {
          label: aftermarketsTranslate.taxCode,
          dataIndex: "taxCode",
          type: "selectInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          options: taxCodeOptions,
          onChange: handleInputOnChange,

        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.included,
          displayLabel: true,
          dataIndex: "include",
          type: "checkboxH",
          labelColSize: 6,
          InputColSize: 3,
          defaultValue: ['Y'],
          mdColSize: 5,
          options: [
            {"value": "Y", "label": "New" },
            {"value": "N", "label": "Used" }
          ],
          onChange: handleInputOnChange
        },
        {
          label: aftermarketsTranslate.addToCapCost,
          dataIndex: "addtoCapCost",
          type: "radioInputH",
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ],
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 6,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.type,
          dataIndex: "type",
          type: "selectInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: "A",
          options: tableTypeOptions,
          onChange: handleInputOnChange
        },
        {
          label: aftermarketsTranslate.vendorNum,
          dataIndex: "vendorNumber",
          type: "alphaNumericInputH",
          maxLength: 9,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          maxLength: 9,
          validationResult: validationResult
        }
      ]
    },
    {
      columns: [
        {
          label: aftermarketsTranslate.assignGross,
          dataIndex: "assignGross",
          type: "selectInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: "F",
          options: assignGrossOptions,
          onChange: handleInputOnChange
        },

      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
        }
      ]
    },
  ]
}
