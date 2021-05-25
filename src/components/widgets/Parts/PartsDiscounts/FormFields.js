import React from 'react';
import partsDiscountTranslate from '../../../../translation/parts/partsDiscount.json'
import RadioFormInput from '../../../reusable/RadioFormInput'

export function generateForm(handleInputOnChange, data, percentage, flatAmount, errorFields) {
  const pFieldOptions = [
    {
      label: 'Discount',
      type: 'percentageInput',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: percentage == true ? 'percentage' : '',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      isDisabled: percentage == true ? false : true,
      defaultValue: '0',
      size: 9,
      allowDecimal: true
    },
    {
      label: 'Up to',
      type: 'amountInput',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: 'limit',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      isDisabled: percentage == true ? false : true,
      defaultValue: '0',
      size: 10,
      allowDecimal: true
    }
  ],
  fFieldOptopns = [
    {
      label: 'Amount',
      type: 'amountInput',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: flatAmount == true ? 'amount' : '',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      isDisabled: flatAmount == true ? false : true,
      defaultValue: '0',
      size: 9,
      allowDecimal: true
    },
  ]

  return [
    {
      columns: [
        {
          label: partsDiscountTranslate.description,
          type: "alphaNumericInputH",
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 2,
          InputColSize: 7,
          mdColSize:8,
          size: 20,
          required: true,
          dataIndex: "description"
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
          className: 'radioFormGroup',
          label: 'Discount Type',
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'discountType',
          onChange: handleInputOnChange,
          // labelColSize: 4,
          // InputColSize: 8,
          mdColSize:12,
          size: 20,
          options:[
            {
              value: 'P',
              label:  <RadioFormInput
                        title={'Percentage'}
                        inputFields={pFieldOptions}
                        data={data}
                        maxLength={8}
                      />
            },
            {
              value: 'F',
              label:  <RadioFormInput
                        title={'Flat Amount'}
                        inputFields={fFieldOptopns}
                        data={data}
                        maxLength={9}
                      />,
            }
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
          label: partsDiscountTranslate.glAccount,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 2,
          InputColSize: 7,
          mdColSize:8,
          required: true,
          dataIndex: "accountNumber"
        }
      ]
    },
  ]
}
