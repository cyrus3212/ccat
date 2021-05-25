import React from 'react';
// import "../_accountingWidget.scss";
import serviceTranslate from '../../../../translation/salesfi/serviceContracts.json';

export function generateForm(handleInputOnChange, typeOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: serviceTranslate.company,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cName,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          required: true,
          labelColSize: 5,
          InputColSize: 7,
          size: 25,
          dataIndex: "svcContName",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cAddress,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          size: 30,
          dataIndex: "svcContAddress",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cCity,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 20,
          dataIndex: "svcContCity",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cState,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 2,
          dataIndex: "svcContStateCode",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cZipCode,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 9,
          defaultValue: "0",
          dataIndex: "svcContZip",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cPhoneNum,
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          size: 10,
          defaultValue: "0",
          dataIndex: "svcContPhone",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cContactName,
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
          label: serviceTranslate.accntng,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.deductable,
          dataIndex: "deductable",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          allowDecimal: true,
          defaultValue: "0",
          mdColSize: 5,
          size: 10,
          validationResult: errorFields
        },
        {
          label: serviceTranslate.retailPrice,
          dataIndex: "retailPrice",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          allowDecimal: true,
          defaultValue: "0",
          mdColSize: 5,
          size: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.cost,
          dataIndex: "cost",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          allowDecimal: true,
          defaultValue: "0",
          mdColSize: 5,
          size: 10,
          validationResult: errorFields
        },
        {
          label: serviceTranslate.miles,
          dataIndex: "milesAllowed",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: "0",
          size: 6,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.months,
          dataIndex: "monthsAllowed",
          type: "numericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          defaultValue: "0",
          size: 3,
          validationResult: errorFields
        },
        {
          label: serviceTranslate.taxable,
          dataIndex: "taxCode",
          type: "radioInputH",
          onChange: handleInputOnChange,
          defaultValue: 'N',
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
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.vendorNum,
          dataIndex: "vendorNumber",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          size: 9,
          validationResult: errorFields
        },
        {
          label: serviceTranslate.addToCapCost,
          dataIndex: "addtoCapCost",
          type: "radioInputH",
          defaultValue: 'N',
          onChange: handleInputOnChange,
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
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.included,
          displayLabel: true,
          dataIndex: "aTaxable",
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
          label: "Payable Account",
          dataIndex: "payableAccount",
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          size: 10,
          defaultValue: "BLANK",
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: serviceTranslate.type,
          dataIndex: "serviceContType",
          type: "selectInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          options: typeOptions
        },
        {
          label: serviceTranslate.dealerNum,
          dataIndex: "dealerNumber",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 5,
          size: 10,
          validationResult: errorFields
        }

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
