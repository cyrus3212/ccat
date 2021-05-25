import React from 'react';
import policyAdjTranslate from "../../../../translation/service/policyAdjustment.json";

export function generateForm(handleInputOnChange, partsPricingOptions, linePaymentMethodOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: policyAdjTranslate.policyAdjustmentCode,
          required: true,
          type: "alphaNumericInput",
          maxLength: 1,
          dataIndex: 'policyAdjustmentCode',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: policyAdjTranslate.description,
          required: true,
          type: "alphaNumericInput",
          maxLength: 10,
          dataIndex: 'description',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: policyAdjTranslate.linePaymentMethod,
          type: "selectInput",
          dataIndex: 'linePaymentMethod',
          onChange: handleInputOnChange,
          options: linePaymentMethodOptions
        }
      ]
    },
    {
      columns: [
        {
          label: policyAdjTranslate.policyAdjustment,
          type: "coaTextInput",
          maxLength: 10,
          defaultValue: "BLANK",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'policyAdjustmentAccount'
        }
      ]
    },
    {
      columns: [
        {
          label: policyAdjTranslate.laborRate,
          type: "numericInput",
          maxLength: 7,
          allowDecimal: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'laborRate'
        }
      ]
    },
    {
      columns: [
        {
          label: policyAdjTranslate.partsPricing,
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'partsPricing',
          options: partsPricingOptions
        }
      ]
    }
  ]
}
