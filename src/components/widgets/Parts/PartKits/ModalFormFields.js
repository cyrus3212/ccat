export function generateModalForm(handleInputOnChange, isLeinPayoff) {
  return [
    {
      columns: [
        {
          label: "Part Number",
          type: "alphaNumericInput",
          dataIndex: 'partNumber',
          onChange: handleInputOnChange,
          isDisabled: isLeinPayoff,
          maxLength: 25
        }
      ]
    },
    {
      columns: [
        {
          label: "Manufacturer",
          type: "alphaNumericInput",
          dataIndex: 'partManufacturer',
          onChange: handleInputOnChange,
          maxLength: 3
        }
      ]
    },
    {
      columns: [
        {
          label: "Quantity",
          type: "numericInput",
          dataIndex: 'partQuantity',
          onChange: handleInputOnChange,
          maxLength: 3
        }
      ]
    }
  ]
}
