import React from 'react';
import feesTranslate from '../../../../translation/parts/partFees.json'
import RadioFormInput from '../../../reusable/RadioFormInput'

export function generateForm(handleInputOnChange, data, percentage, dollarAmount, variable, errorFields) {
  const pFieldOptions = [
    {
      label: 'Percentage',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: 'percentage',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'percentageInput',
      isDisabled: percentage == true ? false : true,
      defaultValue: '0',
      size: 9
    },
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: percentage == true ? 'limit' : '',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: percentage == true ? false : true,
      defaultValue: '0',
      size: 10
    }
  ],
  dFieldOptopns = [
    {
      label: 'Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: dollarAmount == true ? 'amount' : '',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: dollarAmount == true ? false : true,
      defaultValue: '0',
      size: 10
    }
  ],
  vFieldOptopns = [
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: variable == true ? 'limit' : '',
      validationResult: errorFields,
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: variable == true ? false : true,
      defaultValue: '0',
      size: 10
    }
  ]

  return [
    {
      columns: [
        {
          label: feesTranslate.description,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 2,
          InputColSize: 5,
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
          label: feesTranslate.included,
          dataIndex: "included",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 2,
          InputColSize: 7,
          mdColSize:8,
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
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: feesTranslate.taxable,
          dataIndex: "taxable",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 2,
          InputColSize: 7,
          mdColSize:8,
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
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: feesTranslate.active,
          dataIndex: "active",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          defaultValue: 'Y',
          labelColSize: 2,
          InputColSize: 7,
          mdColSize:8,
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
          type: "spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          className: 'radioFormGroup',
          label: feesTranslate.feeType,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'feeType',
          onChange: handleInputOnChange,
          // labelColSize: 4,
          // InputColSize: 8,
          // mdColSize: 12,
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
              value: 'D',
              label:  <RadioFormInput
                        title={'Dollar Amount'}
                        inputFields={dFieldOptopns}
                        data={data}
                        maxLength={9}
                      />
            },
            {
              value: 'V',
              label:  <RadioFormInput
                        title={'Variable'}
                        inputFields={vFieldOptopns}
                        data={data}
                        maxLength={9}
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
          label: feesTranslate.glAccount,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 2,
          InputColSize: 4,
          mdColSize:8,
          required: true,
          dataIndex: "accountNumber",
        }
      ]
    },
  ]
}
