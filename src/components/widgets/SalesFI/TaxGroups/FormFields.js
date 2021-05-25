import React from 'react';

export function generateForm(handleInputOnChange, Listlease, errorFields) {
  return [
    // {
    //   columns: [
    //     {
    //       label: 'What is your preferred Retail Deal Tax Group?',
    //       dataIndex: 'preferredLease',
    //       type: "alphaNumericInputH",
    //       onChange: handleInputOnChange,
    //       className: 'width_percent_75',
    //       labelColSize: 4,
    //       InputColSize: 5,
    //       maxLength: 1,
    //       mdColSize: 6,
    //       validationResult: errorFields
    //     },
    //     {
    //       label: 'What is your preferred Lease Deal Tax Group?',
    //       dataIndex: 'preferredRetail',
    //       type: "alphaNumericInputH",
    //       onChange: handleInputOnChange,
    //       className: 'width_percent_75',
    //       labelColSize: 4,
    //       InputColSize: 5,
    //       maxLength: 1,
    //       mdColSize: 6,
    //       validationResult: errorFields
    //     }
    //   ]
    // },
    {
      columns: [
        {
          className: "wrap-form-box",
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: 'Tax Group Description',
                  dataIndex: 'taxGroupDescription',
                  type: "alphaNumericInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  labelColSize: 5,
                  InputColSize: 5,
                  maxLength: 20,
                  validationResult: errorFields,
                  className: "tax-group-description"
                },
                {
                  label: 'Is this your preferred Retail Deal Tax Group',
                  dataIndex: "preferredRetail",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  labelColSize: 8,
                  InputColSize: 4,
                  defaultValue: "N",
                  options: [
                    {
                      value: "Y",
                      label: "Yes"
                    },
                    {
                      value: "N",
                      label: "No"
                    }
                  ]
                },
                {
                  label: 'Is this your preferred Lease Tax Group',
                  dataIndex: "preferredLease",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  labelColSize: 8,
                  InputColSize: 4,
                  defaultValue: "N",
                  options: [
                    {
                      value: "Y",
                      label: "Yes"
                    },
                    {
                      value: "N",
                      label: "No"
                    }
                  ]
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Lease Deals',
                  type: "header",
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Tax Cash Capital Reduction',
                  dataIndex: "taxCashReduction",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  defaultValue: 'N',
                  options: [
                    {
                      value: "Y",
                      label: "Yes"
                    },
                    {
                      value: "N",
                      label: "No"
                    }
                  ]
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Tax Net Trade Capital Reduction',
                  dataIndex: "taxNetTradeCapitalReduction",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  defaultValue: 'N',
                  options: [
                    {
                      value: "Y",
                      label: "Yes"
                    },
                    {
                      value: "N",
                      label: "No"
                    }
                  ]
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Lump Sum Tax Default',
                  dataIndex: "lumpSumTaxDefault",
                  type: "radioInputH",
                  onChange: handleInputOnChange,
                  required: true,
                  options: [
                    {
                      value: "Y",
                      label: "Capitalized"
                    },
                    {
                      value: "N",
                      label: "Upfront"
                    }
                  ]
                }
              ]
            },
            {
              columns: [
                {
                  type: "component",
                  component: Listlease,
                  xsColSize: 12,
                  mdColSize: 12
                }
              ]
            },
            {
              columns: [
                {
                  type: "spaceCol",
                }
              ]
            },
            {
              columns: [
                {
                  type: "spaceCol",
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Capitalized Cost Reduction Tax',
                  dataIndex: 'capitalizedCostRate',
                  type: "numericInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 13,
                  allowDecimal: true,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Account',
                  dataIndex: 'capitalizedCostAccount',
                  type: "coaTextInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 10,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Service Contract Tax',
                  dataIndex: 'seviceContractTaxRate',
                  type: "numericInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 12,
                  allowDecimal: true,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Account',
                  dataIndex: 'serviceContractAccount',
                  type: "coaTextInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 10,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                }
              ]
            },
            {
              columns: [
                {
                  label: 'Aftermarkets Tax',
                  dataIndex: 'aftermarketRate',
                  type: "numericInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 13,
                  allowDecimal: true,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Account',
                  dataIndex: 'aftermarketAccount',
                  type: "coaTextInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 10,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Gap Insurance Tax',
                  dataIndex: 'taxRate8',
                  type: "numericInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 13,
                  allowDecimal: true,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                },
                {
                  label: 'Account',
                  dataIndex: 'glNumber8',
                  type: "coaTextInputH",
                  xsColSize: 12,
                  mdColSize: 3,
                  labelColSize: 6,
                  InputColSize: 6,
                  maxLength: 10,
                  onChange: handleInputOnChange,
                  validationResult: errorFields
                }
              ]
            },
          ]

        }
      ]
    }

  ]
}
