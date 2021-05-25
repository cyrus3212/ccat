import React from 'react';
// import "../_accountingWidget.scss";
import serviceTranslate from '../../../../translation/salesfi/serviceContracts.json';
import accessoriesTranslate from '../../../../translation/salesfi/accessories.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: accessoriesTranslate.description,
          dataIndex: "description",
          type: "alphaNumericInputH",
          required: true,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          size: 20,
          validationResult: errorFields
        },
        {
          label: accessoriesTranslate.amountNew,
          dataIndex: "amountNew",
          type: "numericInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          size: 11,
          allowDecimal: true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: accessoriesTranslate.cost,
          dataIndex: "cost",
          type: "numericInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          size: 11,
          allowDecimal: true,
          validationResult: errorFields
        },
        {
          label: accessoriesTranslate.taxable,
          dataIndex: "taxable",
          defaultValue: 'Y',
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
          InputColSize: 7,
          mdColSize: 6,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: accessoriesTranslate.included,
          displayLabel: true,
          dataIndex: "included",
          type: "checkboxH",
          labelColSize: 6,
          InputColSize: 3,
          defaultValue: ['Y'],
          mdColSize: 5,
          options: [
            {"value": "Y", "label": "New" },
            {"value": "N", "label": "Used" }
          ],
          onChange: handleInputOnChange,
        },
        {
          label: accessoriesTranslate.vendor,
          dataIndex: "vendor",
          type: "alphaNumericInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          size: 9,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: accessoriesTranslate.addToPrice,
          dataIndex: "addtoPrice",
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
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange
        },
        {
          label: accessoriesTranslate.active,
          dataIndex: "active",
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
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: accessoriesTranslate.residual,
          dataIndex: "residual",
          type: "numericInputH",
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          onChange: handleInputOnChange,
          defaultValue: "0",
          size: 11,
          validationResult: errorFields
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
