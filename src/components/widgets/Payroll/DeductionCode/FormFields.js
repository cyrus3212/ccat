
export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: "Deduction Code",
          type: "alphaNumericInputH",
          dataIndex: "dedpayCode",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          required: true,
          maxLength: 3,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Description",
          type: "alphaNumericInputH",
          dataIndex: "description",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          required: true,
          maxLength: 15,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Account Number",
          type: "coaTextInputH",
          dataIndex: "accountNumber",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          defaultValue: "BLANK",
          maxLength: 10,
          required: true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 12
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 12
        },
        {
          type: "descriptionLabel",
          label: "EXEMPT FROM: Select Y or N in each of these fields to indicate if the pay code is exempt from each tax."
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 12
        }
      ]
    },
    {
      columns: [
        {
          label: "Federal",
          dataIndex: "exempt1FedTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "FICA",
          dataIndex: "exempt2Fica",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "FUTA",
          dataIndex: "exempt3Futa",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: "State",
          dataIndex: "exempt4StateTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "City",
          dataIndex: "exempt5CityTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "Medicare",
          dataIndex: "exempt6MedcTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: "SUTA",
          dataIndex: "exempt7Suta",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "Worker's Compensation",
          dataIndex: "exempt8WorkmenComp",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "Country",
          dataIndex: "exempt9CountyTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: "State Disability",
          dataIndex: "exempt10SdiTax",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "Fixed Ded",
          dataIndex: "exemptFixedDed",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
        {
          label: "Garnishment Ded",
          dataIndex: "garnishmentDed",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: "Defered Comp Ded",
          dataIndex: "deferredCompDed",
          defaultValue: "N",
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 5,
          mdColSize: 3,
          options: [
            { value: "Y", label: "Yes" },
            { value: "N", label: "No" }
          ]
        },
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 12
        }
      ]
    },
    {
      columns: [
        {
          label: "Ded Control Number",
          type: "alphaNumericInputH",
          dataIndex: "dedControlNumber",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 7,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "W2 Code",
          type: "alphaNumericInputH",
          dataIndex: "w2Code",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 2,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "W2 Box",
          type: "alphaNumericInputH",
          dataIndex: "w2Box",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 2,
          validationResult: errorFields
        }
      ]
    },
  ]
}
