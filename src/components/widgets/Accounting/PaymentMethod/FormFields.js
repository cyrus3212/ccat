import paymentTranslate from '../../../../translation/accounting/paymentMethod.json';

export function generateForm(handleInputOnChange, selectList, data, errorFields) {
  return [
    {
      columns: [
        {
          label: "Payment Type",
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'paymentType',
          options: selectList
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.code,
          type: "alphaNumericInput",
          dataIndex: 'paymentMethods',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength:2
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.description,
          type: "alphaNumericInput",
          dataIndex: 'description',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 15
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.glAccount,
          type: "coaTextInput",
          dataIndex: 'accountNumber',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.transFeePercent,
          type: "percentageInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'transFeePercent',
          defaultValue: 0,
          isDisabled: data.paymentType === "5" ? false : true,
          maxLength: 6
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.transFeeAccount,
          type: "coaTextInput",
          dataIndex: 'transFeeAccount',
          defaultValue: 0,
          maxLength: 10,
          onChange: handleInputOnChange,
          isDisabled: data.paymentType === "5" ? false : true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: paymentTranslate.bankAcc,
          type: "coaTextInput",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          dataIndex: 'bankAccount',
          maxLength: 10
        }
      ]
    }
  ]
}
