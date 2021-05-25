export function generateModalForm(handleInputOnChange, typeOptions, schedList, requiredStockOptions, type, errorFields, handleDisableDan, handleDisableCan) {
  return [
    {
      columns: [
        {
          label: "Sequence Number",
          refId: "cId",
          maxLength: 3,
          isDisabled: true,
          type: "numericInput",
          dataIndex: "sequenceNumber",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Description",
          type: "textInput",
          refId: "cId",
          maxLength: 15,
          dataIndex: "description",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Type",
          type: "selectInput",
          refId: "cId",
          dataIndex: "type",
          onChange: handleInputOnChange,
          options: typeOptions
        }
      ]
    },
    {
      columns: [
        {
          label: "Required w/ Stock In",
          type: "searchableSelect",
          refId: "cId",
          dataIndex: "requiredStockOptionValues",
          onChange: handleInputOnChange,
          options: requiredStockOptions,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Default Value New",
          allowDecimal: true,
          type: "numericInput",
          maxLength: 11,
          refId: "cId",
          dataIndex: "defaultValueNew",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Default Value Used",
          allowDecimal: true,
          type: "numericInput",
          maxLength: 11,
          refId: "cId",
          dataIndex: "defaultValueUsed",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Schedule By",
          type: "selectInput",
          refId: "cId",
          dataIndex: "scheduleBy",
          onChange: handleInputOnChange,
          options: schedList
        }
      ]
    },
    {
      columns: [
        {
          label: "Debit Account",
          allowDecimal: true,
          type: "coaTextInput",
          maxLength: 10,
          isDisabled: handleDisableDan,
          refId: "cId",
          dataIndex: "debitAccount",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Credit Account",
          type: "coaTextInput",
          maxLength: 10,
          isDisabled: handleDisableCan,
          refId: "cId",
          dataIndex: "creditAccount",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Entry required for Trade-Ins",
          type: "radioInput",
          refId: "cId",
          dataIndex: "generalGLEntryforTradeIns",
          onChange: handleInputOnChange,
          options: type
        }
      ]
    }
  ];
}
