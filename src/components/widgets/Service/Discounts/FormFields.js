import React from 'react';
import discountsTranslate from '../../../../translation/service/discounts.json';
import RadioFormInput from '../../../reusable/RadioFormInput'

export function generateForm(handleInputOnChange, handleDatePickerOnChange, data, percentage, dollarAmount, variable, errorFields) {
  const pFieldOptions = [
    {
      label: 'Percentage',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: 'discountPercent',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'percentageInput',
      isDisabled: percentage == true ? false : true,
      maxLength: 7,
      validationResult: errorFields,
      defaultValue: "0"
    },
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: percentage == true ? 'discountMaximum' : '',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: percentage == true ? false : true,
      maxLength: 9,
      validationResult: errorFields,
      defaultValue: "0"
    }
  ],
  dFieldOptopns = [
    {
      label: 'Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: 'discountAmount',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: dollarAmount == true ? false : true,
      maxLength: 9,
      validationResult: errorFields,
      defaultValue: "0"
    }
  ],
  vFieldOptopns = [
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: variable == true ? 'discountMaximumVariable' : '',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: variable == true ? false : true,
      maxLength: 9,
      validationResult: errorFields,
      defaultValue: "0"
    }
  ]

  return [
    {
      columns: [
        {
          label: discountsTranslate.description,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize: 8,
          size: 30,
          dataIndex: "description",
          validationResult: errorFields,
          required: true
        }
      ]
    },
    {
      columns: [
        {
          label: discountsTranslate.taxDiscount,
          dataIndex: "taxDiscount",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 7,
          mdColSize: 8,
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: discountsTranslate.validForm,
          dataIndex: "startDate",
          type: "datePicker",
          // required: true,
          validationResult: errorFields,
          onChange: handleDatePickerOnChange,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize:8
        }
      ]
    },
    {
      columns: [
        {
          label: discountsTranslate.expires,
          dataIndex: "endDate",
          type: "datePicker",
          // required: true,
          validationResult: errorFields,
          onChange: handleDatePickerOnChange,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize:8,
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
          label: "Discount Type",
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'discountBasis',
          onChange: handleInputOnChange,
          options:[
            {
              value: 'P',
              label:  <RadioFormInput
                        title={'Percentage'}
                        inputFields={pFieldOptions}
                        data={data}
                      />
            },
            {
              value: 'D',
              label:  <RadioFormInput
                        title={'Dollar Amount'}
                        inputFields={dFieldOptopns}
                        data={data}
                      />
            },
            {
              value: 'V',
              label:  <RadioFormInput
                        title={'Variable'}
                        inputFields={vFieldOptopns}
                        data={data}
                      />
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
          label: discountsTranslate.discount,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: discountsTranslate.labor,
          dataIndex: "discountLabor",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize:4,
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        },
        {
          label: discountsTranslate.lDiscountAlloc,
          type: "percentageInput",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize:4,
          size: 9,
          dataIndex: "laborDiscntAlloc",
          validationResult: errorFields,
          defaultValue: "0",
        },
        {
          label: discountsTranslate.lChargeAccount,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize:4,
          size: 10,
          dataIndex: "laborChargeAcct",
          validationResult: errorFields,
          defaultValue: "BLANK"
        },
      ]
    },
    {
      columns: [
        {
          label: discountsTranslate.parts,
          dataIndex: "discountParts",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize:4,
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        },
        {
          label: discountsTranslate.pDiscountAlloc,
          type: "percentageInput",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize:4,
          size: 9,
          dataIndex: "partsDiscntAlloc",
          validationResult: errorFields,
          defaultValue: "0",
        },
        {
          label: discountsTranslate.pChargeAccount,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          mdColSize:4,
          size: 10,
          dataIndex: "partsChargeAcct",
          validationResult: errorFields,
          defaultValue: "BLANK"
        },
      ]
    },
  ]
}
