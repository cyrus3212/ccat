export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: 'Counterperson ID',
          dataIndex: 'key',
          type: "alphaNumericInput",
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
          label: "Name",
          type: "alphaNumericInput",
          dataIndex: 'name',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 20
        }
      ]
    },
    {
      columns: [
        {
          label: "Password",
          type: "alphaNumericInput",
          dataIndex: 'password',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Employee #",
          type: "alphaNumericInput",
          dataIndex: 'employeeNumber',
          required: true,
          onChange: handleInputOnChange,
          validationResult: errorFields,
          maxLength: 9
        }
      ]
    },
  ]
}
