import React from 'react';
import otherPayCodeTrans from '../../../../translation/payroll/otherPayCode.json';

export function generateForm(handleInputOnChange, errorFields, deductionCodeOptions) {
  return [
    {
      columns: [
        {
          label: "Other Pay Code",
          type: "alphaNumericInputH",
          dataIndex: "dedpayCode",
          onChange: handleInputOnChange,
          required: true,
          labelColSize: 4,
          InputColSize: 8,
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
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 15,
          validationResult: errorFields
        }
      ]
    },
    // {
    //   columns: [
    //     {
    //       label: "Account Number",
    //       type: "coaTextInputH",
    //       dataIndex: "accountNumber",
    //       onChange: handleInputOnChange,
    //       defaultValue: "BLANK",
    //       labelColSize: 4,
    //       InputColSize: 8,
    //       maxLength: 10,
    //       validationResult: errorFields
    //     }
    //   ]
    // },
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
          label: "County",
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
          label: "Payment Amount In Hours",
          dataIndex: "payAmtHours",
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
          label: "Fringe Benefit",
          dataIndex: "fringeBenefit",
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
          label: "Exempt From Gross",
          dataIndex: "exemptFromGross",
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
          label: "Incentive Pay",
          dataIndex: "incentivePay",
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
          label: "Third Party Paycode",
          dataIndex: "thirdPartyPay",
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
          label: "Pay Code In Attendance",
          dataIndex: "payCodeInAttendance",
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
          label: "Exclude from 401K",
          dataIndex: "likeDed401K",
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
          type: "spaceCol",
          xsColSize: 3,
          mdColSize: 3
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
          label: "Linked Deduction Code",
          dataIndex: "deductionCodeLink",
          type: "selectInputH",
          onChange: handleInputOnChange,
          options: deductionCodeOptions,
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 3,
          validationResult: errorFields
        }
      ]
    },
    // {
    //   columns: [
    //     {
    //       label: "",
    //       displayLabel: true,
    //       dataIndex: "saveAndRetain",
    //       type: "checkboxH",
    //       onChange: handleInputOnChange,
    //       labelColSize: 3,
    //       InputColSize: 7,
    //       mdColSize:8,
    //       options: [
    //         { "value": "1", "label": "Save And Retain"}
    //       ]
    //     }
    //   ]
    // },
  ]
}
