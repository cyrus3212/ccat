import poTranslate from '../../../../translation/accounting/purchaseOrder.json';

export function generateForm(handleInputOnChange, options, errorFields) {
  return [
    {
      columns: [
        {
          label: poTranslate.typeCode,
          dataIndex: 'typeCode',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          type: "alphaNumericInput",
          maxLength: 3
        }
      ]
    },
    {
      columns: [
        {
          label: poTranslate.description,
          dataIndex: 'description',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          type: "alphaNumericInput",
          maxLength: 20
        }
      ]
    },
    {
      columns: [
        {
          label: poTranslate.accNumber,
          dataIndex: 'accountNumber',
          onChange: handleInputOnChange,
          validationResult: errorFields,
          type: "coaTextInput",
          maxLength: 10
        }
      ]
    },
    {
      columns: [
        {
          label: poTranslate.partsPO,
          type: "selectInput",
          onChange: handleInputOnChange,
          dataIndex: 'partsPurchaseOrder',
          options
        }
      ]
    }
  ]
}
