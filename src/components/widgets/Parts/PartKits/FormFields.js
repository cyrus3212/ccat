import kitTranslate from '../../../../translation/parts/partKits.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: kitTranslate.partsKit,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: kitTranslate.kit,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 4,
          InputColSize: 7,
          required: true,
          size: 25,
          dataIndex: "kitNumber"
        }
      ]
    },
    {
      columns: [
        {
          label: kitTranslate.description,
          type: "textInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 4,
          InputColSize: 7,
          size: 30,
          required: true,
          dataIndex: "kitDescription"
        }
      ]
    },
    {
      columns: [
        {
          label: kitTranslate.kitPrice,
          type: "numericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 4,
          InputColSize: 4,
          allowDecimal: true,
          size: 9,
          defaultValue: "0",
          dataIndex: "kitPrice"
        }
      ]
    },
    {
      columns: [
        {
          label: kitTranslate.taxExempt,
          dataIndex: "taxExempt",
          type: "radioInputH",
          onChange: handleInputOnChange,
          defaultValue: 'N',
          labelColSize: 4,
          InputColSize: 4,
          mdColSize:6,
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
          type: "spaceCol"
        }
      ]
    }
  ]
}
