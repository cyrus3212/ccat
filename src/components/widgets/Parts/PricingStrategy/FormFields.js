import pricingTranslate from '../../../../translation/parts/pricingStrategies.json';

export function generateForm(handleInputOnChange, pricingMethod, errorFields) {
  return [
    {
      columns: [
        {
          label: pricingTranslate.description,
          dataIndex: "description",
          type: "textInputH",
          required: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 12,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          validationResult: errorFields,
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.method,
          dataIndex: "pricingMethod",
          type: "radioInputH",
          required: true,
          options: [
            {
              value: "COST",
              label: "Cost",
            },
            {
              value: "LIST",
              label: "List"
            },
            {
              value: "TRADE",
              label: "Trade"
            },
            {
              value: "MATRIX",
              label: "Matrix"
            }
          ],
          labelColSize: 3,
          InputColSize: 7,
          mdColSize: 12,
          onChange: handleInputOnChange,
          validationResult: errorFields,
        },
      ]
    },
    {
      columns: [
        {
          className: pricingMethod === false ? 'hide' : 'visible',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: pricingTranslate.basedOn,
                  dataIndex: "matrixBasedOn",
                  type: "radioInputH",
                  options: [
                    {
                      value: "COST",
                      label: "Cost"
                    },
                    {
                      value: "LIST",
                      label: "List"
                    },
                    {
                      value: "TRADE",
                      label: "Trade"
                    }
                  ],
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 12,
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                },
              ]
            },
            {
              columns: [
                {
                  label: pricingTranslate.percentOf,
                  dataIndex: "matrixPercentOf",
                  type: "radioInputH",
                  options: [
                    {
                      value: "COST",
                      label: "Cost"
                    },
                    {
                      value: "LIST",
                      label: "List"
                    },
                    {
                      value: "TRADE",
                      label: "Trade"
                    }
                  ],
                  labelColSize: 3,
                  InputColSize: 7,
                  mdColSize: 12,
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                },
              ]
            },
          ]
        }
      ]
    },
    {
      columns: [
        {
          className: pricingMethod === true ? 'hide' : 'visible',
          label: pricingTranslate.netPricePercent,
          dataIndex: "netPricePercent",
          type: "percentageInput",
          required: true,
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 12,
          defaultValue: "0",
          size: 8,
          onChange: handleInputOnChange,
          validationResult: errorFields,
        }
      ]
    },
    {
      columns: [
        {
          label: pricingTranslate.minGrossProfit,
          dataIndex: "minGrossProfitPercentage",
          type: "numericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 12,
          defaultValue: "0",
          size: 3,
          onChange: handleInputOnChange,
          validationResult: errorFields,
        }
      ]
    },
    {
      columns: [
        {
          className: pricingMethod === false ? 'hide' : 'visible',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: pricingTranslate.use,
                  dataIndex: "listPricePercentage",
                  type: "numericInputH",
                  required: pricingMethod,
                  inputDescription: pricingTranslate.useDescription,
                  labelColSize: 3,
                  InputColSize: 1,
                  mdColSize: 12,
                  inputDescSize: 8,
                  size:8,
                  defaultValue: "0",
                  allowDecimal: true,
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                }
              ]
            },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: 'spaceCol'
        }
      ]
    }
  ]
}
