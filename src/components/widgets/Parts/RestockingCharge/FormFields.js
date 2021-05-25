import React from 'react';
import TextMarkUp from '../../../reusable/TextMarkUp';
import rcTranslate from '../../../../translation/parts/restockingCharge.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: rcTranslate.automaticallyAllReturn,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'included',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={rcTranslate.autoYes} /> },
            { value: 'N', label: <TextMarkUp label={rcTranslate.autoNo} /> },
          ]
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
          label: rcTranslate.includeCoreReturns,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'includeCoreParts',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={rcTranslate.coreReturnYes} /> },
            { value: 'N', label: <TextMarkUp label={rcTranslate.coreReturnNo} /> },
          ]
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
          label: rcTranslate.percent,
          type: "percentageInput",
          refId: 'id',
          className: 'text-right',
          dataIndex: 'percentage',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 5,
          size: 8,
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: rcTranslate.percentText
        }
      ]
    },
    {
      columns: [
        {
          label: rcTranslate.amount,
          type: "amountInput",
          refId: 'id',
          className: 'text-right',
          dataIndex: 'amount',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 5,
          size: 10,
          allowDecimal: true,
          defaultValue: '0'
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: rcTranslate.amountText
        }
      ]
    },
    {
      columns: [
        {
          label: rcTranslate.maxRestockingCharge,
          type: "amountInput",
          refId: 'id',
          className: 'text-right',
          dataIndex: 'limit',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 5,
          size: 9,
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: rcTranslate.maxRestockingChargeText
        }
      ]
    },
    {
      columns: [
        {
          label: rcTranslate.account,
          type: "coaTextInputH",
          refId: 'id',
          className: 'text-right',
          dataIndex: 'accountNumber',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 5,
          size: 10,
          defaultValue: '0'
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: rcTranslate.accountText
        }
      ]
    },
  ]
}
