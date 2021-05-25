import React from 'react';
import "../_payroll.scss";
import generalTranslate from '../../../../translation/payroll/generalSetup.json';
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateForm(handleInputOnChange, workWeekOptions, errorFields, dba) {
  return [
    {
      columns: [
        {
          label: generalTranslate.firstDay,
          type: "selectInputH",
          refId: 'id',
          dataIndex: 'firstDayoftheWorkWeek',
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          validationResult: errorFields,
          options: workWeekOptions,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: generalTranslate.firstDayDesc,
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        }
      ]
    },
    {
      columns: [
        {
          label: generalTranslate.printHours,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'printHoursonChecksforAllEmployees',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields,
          options:[
            { value: 'Y', label: <TextMarkUp label={generalTranslate.printHoursYes} /> },
            { value: 'N', label: <TextMarkUp label={generalTranslate.printHoursNo} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
        }
      ]
    },
    {
      columns: [
        {
          label: generalTranslate.printMatching,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'printMatchingAmountsonChecks',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields,
          defaultValue: 'Y',
          options:[
            { value: 'Y', label: <TextMarkUp label={generalTranslate.printMatchingYes} /> },
            { value: 'N', label: <TextMarkUp label={generalTranslate.printMatchingNo} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
        }
      ]
    },
    {
      columns: [
        {
          label: generalTranslate.useDirectDep,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'useDirectDeposit',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields,
          options:[
            { value: 'Y', label: <TextMarkUp label={generalTranslate.useDirectDepYes} /> },
            { value: 'N', label: <TextMarkUp label={generalTranslate.useDirectDepNo} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
        }
      ]
    },
    {
      columns: [
        {
          label: <TextMarkUp label={generalTranslate.timeRounding} />,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'timeRoundingOptions',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 1,
          validationResult: errorFields,
          options:[
            { value: 'Y', label: <TextMarkUp label={generalTranslate.timeRoundingNearest} /> },
            { value: 'N', label: <TextMarkUp label={generalTranslate.timeRoundingDoNot} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: generalTranslate.timeRoundingLabel,
          type: "descriptionLabel",
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
        }
      ]
    },
    {
      columns: [
        {
          // label: 'Doing Business As',
          displayLabel: true,
          dataIndex: "isAddressType",
          type: "checkboxH",
          onChange: handleInputOnChange,
          labelColSize: 0,
          InputColSize: 9,
          mdColSize:6,
          options: [
            {
              value: "DBA",
              label: "Doing Business As"
            },
          ]
        }
      ]
    },
    {
      columns: [
        {
          className: dba === false ? 'hide' : 'visible' + ' custom-form-group',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: 'Company Name',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'companyName',
                  onChange: handleInputOnChange,
                  labelColSize: 2,
                  InputColSize: 8,
                  maxLength: 50,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Address 1',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'address1',
                  onChange: handleInputOnChange,
                  labelColSize: 2,
                  InputColSize: 8,
                  maxLength: 60,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Address 2',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'address2',
                  onChange: handleInputOnChange,
                  labelColSize: 2,
                  InputColSize: 8,
                  maxLength: 60,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: 'City',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'city',
                  onChange: handleInputOnChange,
                  labelColSize: 4,
                  InputColSize: 8,
                  mdColSize: 3,
                  maxLength: 30,
                  validationResult: errorFields
                },
              ]
            },
            {
              columns: [
                {
                  label: 'State',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'stateCode',
                  onChange: handleInputOnChange,
                  labelColSize: 4,
                  InputColSize: 8,
                  mdColSize: 3,
                  maxLength: 2,
                  validationResult: errorFields
                },
              ]
            },
            {
              columns: [
                {
                  label: 'Zip Code',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'zipCode',
                  onChange: handleInputOnChange,
                  labelColSize: 4,
                  InputColSize: 8,
                  mdColSize: 3,
                  maxLength: 10,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Business Phone',
                  type: "alphaNumericInputH",
                  refId: 'id',
                  dataIndex: 'businessPhone',
                  onChange: handleInputOnChange,
                  labelColSize: 2,
                  InputColSize: 8,
                  maxLength: 12,
                  validationResult: errorFields
                }
              ]
            }
          ]
        }
      ]
    },
    // {
    //   columns: [
    //     {
    //       type: "spaceCol",
    //       xsColSize: 12,
    //       mdColSize: 2
    //     },
    //     {
    //       type: "descriptionLabel",
    //       label: generalTranslate.doingBusinessAsDesc,
    //     }
    //   ]
    // }
  ]
}
