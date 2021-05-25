import React from 'react';
// import "../_accountingWidget.scss";
import gapSourcesTranslate from '../../../../translation/salesfi/gapSources.json'

export function generateForm(handleInputOnChange, formulaOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: gapSourcesTranslate.provider,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iCompanyName,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 25,
          dataIndex: "gapName",
          required: true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iAddress,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 30,
          dataIndex: "gapAddress",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iCity,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 20,
          dataIndex: "gapCity",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iState,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 2,
          dataIndex: "stateCode",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iZipCode,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 9,
          defaultValue: '0',
          dataIndex: "intlZipCode",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iPhoneNum,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue:'0',
          dataIndex: "phoneNumber",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.iContactName,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 20,
          dataIndex: "contact",
          validationResult: errorFields
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
          label: gapSourcesTranslate.accting,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.aGapPremium,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          size: 9,
          defaultValue:'0',
          dataIndex: "gapPremium",
          allowDecimal: true,
          validationResult: errorFields
        },
        {
          label: gapSourcesTranslate.aGapCost,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 6,
          size: 9,
          defaultValue:'0',
          dataIndex: "gapCost",
          allowDecimal: true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.aPayableAcct,
          dataIndex: "payableAccount",
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: "BLANK",
          size: 10,
          validationResult: errorFields
        },
        {
          label: gapSourcesTranslate.aPayableVendor,
          dataIndex: "payableVendor",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 6,
          size: 9,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          // label: gapSourcesTranslate.aTaxable,
          displayLabel: true,
          dataIndex: "taxable",
          type: "checkboxH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 3,
          mdColSize: 5,
          options: [
            { value: "T", label: "Taxable"}
          ]
        },
        {
          label: gapSourcesTranslate.aPaymentFormula,
          dataIndex: "paymentFormula",
          type: "selectInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 6,
          options: formulaOptions
        }

      ]
    },
    {
      columns: [
        {
          label: gapSourcesTranslate.aCommRate,
          dataIndex: "commissionRate",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: '0',
          size: 6,
          allowDecimal: true,
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
