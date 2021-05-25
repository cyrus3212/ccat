import React from 'react';

export function generateModalForm(handleInputOnChange) {
  return [
    {
      columns: [
        {
          label: "Distribution Company",
          type: "alphaNumericInput",
          dataIndex: 'distributionCompany',
          onChange: handleInputOnChange,
          maxLength: 3,
          mdColSize: 12
        }
      ]
    },
    {
      columns: [
        {
          label: "Distribution Percent",
          type: "numericInput",
          dataIndex: 'distributionPercent',
          onChange: handleInputOnChange,
          allowDecimal: true,
          maxLength: 7,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Salary Account",
          type: "coaTextInput",
          dataIndex: 'salaryAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Overtime Account",
          type: "coaTextInput",
          dataIndex: 'overtimeAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Vacation Account",
          type: "coaTextInput",
          dataIndex: 'vacationAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Holiday Account",
          type: "coaTextInput",
          dataIndex: 'holidayAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "PTO Account",
          type: "coaTextInput",
          dataIndex: 'ptoAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Employer Retirement Account",
          type: "coaTextInput",
          dataIndex: 'employerRetirementAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "FICA Account",
          type: "coaTextInput",
          dataIndex: 'ficaAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Medicare Account",
          type: "coaTextInput",
          dataIndex: 'medicareAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "FUTA Account",
          type: "coaTextInput",
          dataIndex: 'futaAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "SUTA Account",
          type: "coaTextInput",
          dataIndex: 'sutaAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Worker's Compensation Account",
          type: "coaTextInput",
          dataIndex: 'workersCompensationAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "SDI Account",
          type: "coaTextInput",
          dataIndex: 'sdiAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
    {
      columns: [
        {
          label: "Employer Contributions Account",
          type: "coaTextInput",
          dataIndex: 'employerContributionsAccount',
          onChange: handleInputOnChange,
          maxLength: 10,
          mdColSize: 6
        }
      ]
    },
  ]
}
