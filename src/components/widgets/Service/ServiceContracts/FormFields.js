import React from 'react';
// import "../_accountingWidget.scss";
import sContractsTranslate from '../../../../translation/service/serviceContracts.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: sContractsTranslate.companyName,
          dataIndex: "companyName",
          type: "alphaNumericInputH",
          required: true,
          labelColSize: 2,
          InputColSize: 3,
          mdColSize: 12,
          maxLength: 20,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.receiveableAcct,
          dataIndex: "receivableAccount",
          type: "coaTextInputH",
          defaultValue: "BLANK",
          required: true,
          labelColSize: 2,
          InputColSize: 3,
          mdColSize: 12,
          maxLength: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.customerNum,
          dataIndex: "customerNumber",
          type: "alphaNumericInputH",
          labelColSize: 2,
          InputColSize: 3,
          validationResult: errorFields,
          mdColSize: 12,
          maxLength: 9,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.printCost,
          dataIndex: "printCost",
          type: "radioInputH",
          required: true,
          defaultValue: 'N',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            },
          ],
          labelColSize: 2,
          InputColSize: 7,
          mdColSize: 12,
          onChange: handleInputOnChange
        },
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.printTech,
          dataIndex: "printTechTimeLog",
          type: "radioInputH",
          required: true,
          defaultValue: 'N',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            },
          ],
          labelColSize: 2,
          InputColSize: 7,
          mdColSize: 12,
          onChange: handleInputOnChange
        },
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.active,
          dataIndex: "active",
          type: "radioInputH",
          required: true,
          defaultValue: 'Y',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            },
          ],
          labelColSize: 2,
          InputColSize: 7,
          mdColSize: 12,
          onChange: handleInputOnChange
        },
      ]
    },
    {
      columns: [
        {
          label: sContractsTranslate.taxable,
          dataIndex: "taxable",
          type: "radioInputH",
          required: true,
          defaultValue: 'Y',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            },
          ],
          labelColSize: 2,
          InputColSize: 7,
          mdColSize: 12,
          onChange: handleInputOnChange
        },
      ]
    },
  ]
}
