import React from 'react';
import saleGTranslate from '../../../../translation/salesfi/salesGroups.json'

export function generateForm(handleInputOnChange, salesTypeOptions, newUsed, errorFields) {
  return [
    {
      columns: [
        {
          label: saleGTranslate.type,
          dataIndex: "newUsed",
          type: "selectInputH",
          required: true,
          onChange: handleInputOnChange,
          options: salesTypeOptions,
          labelColSize: 5,
          InputColSize: 5,
          mdColSize: 5,
        }
      ]
    },
    {
      columns: [
        {
          label: saleGTranslate.saleGroup,
          dataIndex: "saleGroup",
          type: "alphaNumericInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize: 5,
          size: 3,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: saleGTranslate.description,
          dataIndex: "description",
          type: "alphaNumericInputH",
          required: true,
          onChange: handleInputOnChange,
          mdColSize: 5,
          size: 20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: saleGTranslate.manufacturer,
          dataIndex: "manufacturer",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize: 5,
          size: 3,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          className: newUsed !== 'used' ? 'hide' : 'visible',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: saleGTranslate.usedVehicleSA,
                  dataIndex: "usedSaleAccount",
                  type: "coaTextInputH",
                  onChange: handleInputOnChange,
                  labelColSize: 5,
                  InputColSize: 4,
                  mdColSize: 5,
                  size: 10,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: saleGTranslate.usedVehicleIA,
                  dataIndex: "usedInvAccount",
                  type: "coaTextInputH",
                  onChange: handleInputOnChange,
                  labelColSize: 5,
                  InputColSize: 4,
                  mdColSize: 5,
                  size: 10,
                  validationResult: errorFields
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
