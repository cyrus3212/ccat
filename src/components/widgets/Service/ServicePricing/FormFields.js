import React from 'react';
// import "../_accountingWidget.scss";
import pricingTranslate from '../../../../translation/service/servicePricing.json';

export function generateForm(handleInputOnChange, priceLevelOptions) {
  return [
    {
      columns: [
        {
          label: pricingTranslate.serviceType,
          type: "selectInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 3,
          size: 20,
          dataIndex: "serviceType",
          defaultValue: "Q",
          options: priceLevelOptions
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.linePaymentMethod,
          type: "selectInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 3,
          size: 20,
          dataIndex: "linePaymentMethod",
          defaultValue: "W",
          options: [
            { value: "W", label: "Warranty" }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.franchiseCode,
          type: "textInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 2,
          size: 20,
          dataIndex: "franchiseCode"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.serviceContractCompany,
          type: "textInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 5,
          size: 20,
          dataIndex: "serviceContractCompany"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.partsPricing,
          type: "textInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 5,
          size: 20,
          dataIndex: "partsPricing"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.warrantyCustomer,
          type: "textInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 5,
          size: 20,
          dataIndex: "warrantyReceivableAccount"
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.subletMarkup,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.sbLabor,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 6,
          InputColSize: 2,
          size: 20,
          dataIndex: "subletMarkupPercentLabor"
        },
        {
          label: pricingTranslate.sbParts,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 4,
          InputColSize: 2,
          size: 20,
          dataIndex: "subletMarkupPercentParts"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.shopSupplies,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.spLabor,
          type: "radioInputH",
          onChange: handleInputOnChange,
          mdColSize:4,
          labelColSize: 7,
          InputColSize: 5,
          size: 20,
          dataIndex: "shopSuppliesLabor",
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: pricingTranslate.spParts,
          type: "radioInputH",
          onChange: handleInputOnChange,
          mdColSize:2,
          labelColSize: 4,
          InputColSize: 2,
          size: 20,
          dataIndex: "shopSuppliesParts",
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: pricingTranslate.spSublet,
          type: "radioInputH",
          onChange: handleInputOnChange,
          mdColSize:2,
          labelColSize: 6,
          InputColSize: 2,
          size: 20,
          dataIndex: "shopSuppliesSublet",
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.laborSaleAccount,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.carLaborAccount,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 6,
          InputColSize: 6,
          size: 20,
          dataIndex: "carLaborAccount"
        },
        {
          label: pricingTranslate.truckLaborAccount,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 5,
          InputColSize: 6,
          size: 20,
          dataIndex: "truckLaborAccount"
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.receivableAccount,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.warrantyReceivable,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 6,
          InputColSize: 6,
          size: 20,
          dataIndex: "warrantyReceivableAccount"
        },
        {
          label: pricingTranslate.inventoryReceivableAccnt,
          type: "textInputH",
          onChange: handleInputOnChange,
          mdColSize:5,
          labelColSize: 6,
          InputColSize: 6,
          size: 20,
          dataIndex: "inventoryReceivableAccount"
        }
      ]
    },
    {
      columns: [
        {
          type: 'spaceCol'
        }
      ]
    },
    {
      columns: [
        {
          type: 'spaceCol'
        }
      ]
    },
  ]
}
