import React from 'react';
// import "../_accountingWidget.scss";
import stockingGrpTranslate from '../../../../translation/parts/stockingGroup.json';

export function generateForm(handleInputOnChange, manufacturerOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: stockingGrpTranslate.stockGroup,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 3,
          required: true,
          validationResult: errorFields,
          dataIndex: "stockGroup"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.description,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 25,
          required: true,
          validationResult: errorFields,
          dataIndex: "description"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.manufacturer,
          dataIndex: "manufacturer",
          type: "selectInputH",
          onChange: handleInputOnChange,
          required: true,
          labelColSize: 5,
          InputColSize: 5,
          validationResult: errorFields,
          options: manufacturerOptions
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.tradeDefaultCost,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 3,
          defaultValue: "0",
          validationResult: errorFields,
          dataIndex: "tradeDefaultPct"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.listDefaultCost,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 3,
          defaultValue: "0",
          validationResult: errorFields,
          dataIndex: "listDefaultPct"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.counterTickets,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.internal,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          dataIndex: "intSaleAcct"
        }
      ]
    },

    {
      columns: [
        {
          label: stockingGrpTranslate.retailTaxable,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          dataIndex: "ctrSaleTaxable"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.retailNonTaxble,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          dataIndex: "ctrSaleNontax"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.wholesaleTaxable,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          dataIndex: "wholesaleTaxable"
        }
      ]
    },
    {
      columns: [
        {
          label: stockingGrpTranslate.wholesaleNonTaxable,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          dataIndex: "wholesaleNontax"
        }
      ]
    },
  ]
}
