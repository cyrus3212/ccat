import React from 'react';
import serviceFeesTranslate from '../../../../translation/service/serviceFees.json';
import RadioFormInput from '../../../reusable/RadioFormInput';
import feesTranslate from '../../../../translation/parts/partFees.json';

export function generateForm(handleInputOnChange, handleDatePickerOnChange, serviceTypeOptions, data, percentage, dollarAmount, variable, errorFields)
{
  const pFieldOptions = [
    {
      label: 'Percentage',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: 'percentage',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'percentageInput',
      isDisabled: percentage == true ? false : true,
      defaultValue: "0",
      validationResult: errorFields,
      maxLength: 7
    },
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: percentage == true ? 'maximumAmount' : '',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: percentage == true ? false : true,
      defaultValue: "0",
      validationResult: errorFields,
      maxLength: 7
    }
  ],
  dFieldOptopns = [
    {
      label: 'Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: dollarAmount == true ? 'maximumAmount' : '',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: dollarAmount == true ? false : true,
      defaultValue: "0",
      validationResult: errorFields,
      maxLength: 7
    }
  ],
  vFieldOptopns = [
    {
      label: 'Max Amount',
      refId: 'id',
      onChange:handleInputOnChange,
      dataIndex: variable == true ? 'maximumAmount' : '',
      labelColSize: 4,
      InputColSize: 7,
      mdColSize:8,
      type: 'amountInput',
      isDisabled: variable == true ? false : true,
      defaultValue: "0",
      validationResult: errorFields,
      size: 8
    }
  ]

  return [
    {
      columns: [
        {
          label: serviceFeesTranslate.feeCode,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 2,
          mdColSize:8,
          dataIndex: "feesCode",
          required: true,
          validationResult: errorFields,
          size: 3
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.description,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize:8,
          size: 30,
          dataIndex: "feesDescription",
          validationResult: errorFields,
          required: true
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.validFrom,
          dataIndex: "validFrom",
          type: "datePicker",
          // required: true,
          onChange: handleDatePickerOnChange,
          labelColSize: 3,
          InputColSize: 7,
          validationResult: errorFields,
          mdColSize:8,
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.expires,
          dataIndex: "validTill",
          type: "datePicker",
          // required: true,
          onChange: handleDatePickerOnChange,
          labelColSize: 3,
          InputColSize: 7,
          validationResult: errorFields,
          mdColSize:8,
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.serviceType,
          dataIndex: "serviceTypeList",
          type: "searchableSelectH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 7,
          mdColSize: 8,
          // defaultValue: "CIS",
          options: serviceTypeOptions
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.paymentMethods,
          displayLabel: true,
          dataIndex: "paymentMethod",
          type: "checkboxH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 7,
          mdColSize:8,
          options: [
            {
              value: "C",
              label: serviceFeesTranslate.customerPay
            },
            {
              value: "I",
              label: serviceFeesTranslate.internal
            },
            {
              value: "W",
              label: serviceFeesTranslate.warrantyPay
            },
            {
              value: "S",
              label: serviceFeesTranslate.serviceContract
            },
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.autoApply,
          dataIndex: "autoApply",
          defaultValue: "N",
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
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.taxable,
          dataIndex: "taxable",
          defaultValue: "Y",
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
          dataIndex: 'amountType',
          onChange: handleInputOnChange,
          size: 20,
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
          label: serviceFeesTranslate.accounting,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.aLaborAccount,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          size: 10,
          dataIndex: "laborAccount",
          validationResult: errorFields,
          defaultValue: "BLANK"
        },
        {
          label: serviceFeesTranslate.aLaborPercentage,
          type: "percentageInput",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 3,
          mdColSize:4,
          size: 7,
          dataIndex: "laborPercentage",
          defaultValue: "0",
          validationResult: errorFields,
          allowDecimal: true
        },
      ]
    },
    {
      columns: [
        {
          label: serviceFeesTranslate.aPartsAccount,
          type: "coaTextInputH",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          size: 10,
          dataIndex: "partsAccount",
          validationResult: errorFields,
          defaultValue: "BLANK"
        },
        {
          label: serviceFeesTranslate.aPartsPercentage,
          type: "percentageInput",
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 3,
          mdColSize:4,
          size: 7,
          dataIndex: "partsPercentage",
          defaultValue: "0",
          validationResult: errorFields,
          allowDecimal: true
        },
      ]
    },
  ]
}
