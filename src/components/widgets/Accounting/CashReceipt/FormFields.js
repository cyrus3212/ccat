import cashTranslate from '../../../../translation/accounting/cashReceipt.json';

export function generateForm(handleInputOnChange, defaultOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: cashTranslate.typeCode,
          type: "alphaNumericInput",
          dataIndex: 'typeCode',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          required: true,
          maxLength: 3
        }
      ]
    },
    {
      columns: [
        {
          label: cashTranslate.description,
          type: "alphaNumericInput",
          dataIndex: 'description',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          required: true,
          maxLength: 20
        }
      ]
    },
    {
      columns: [
        {
          label: cashTranslate.accountNumberToCredit,
          type: "coaTextInput",
          dataIndex: 'accountNumberToCredit',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: cashTranslate.vehicleDeposit,
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'vehicleDeposit',
          options: defaultOptions
        }
      ]
    }
  ]
}
