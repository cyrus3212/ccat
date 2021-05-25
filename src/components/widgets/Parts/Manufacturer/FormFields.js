import manufacturerTranslate from '../../../../translation/parts/manufacturer.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: manufacturerTranslate.manufacturer,
          type: "alphaNumericInputH",
          size: 3,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          validationResult: errorFields,
          required: true,
          dataIndex: "manufacturerName"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.description,
          type: "alphaNumericInputH",
          size: 20,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          validationResult: errorFields,
          required: true,
          dataIndex: "description"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.preferredStocking,
          type: "alphaNumericInputH",
          size: 3,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 7,
          validationResult: errorFields,
          dataIndex: "preferredStockingGroup"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.counterTicketSale,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.internalSaleAccnt,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "internalSaleAccount"
        }
      ]
    },

    {
      columns: [
        {
          label: manufacturerTranslate.countrSaleTaxable,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "counterSaleTaxable"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.countrSaleNonTax,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "counterSaleNonTax"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.wholesaleIncentve,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "wholesaleCompIncentive"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.wholesaleAccnt,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "wholesaleCompAccount"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.wholesaleTaxable,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "wholesaleTaxable"
        }
      ]
    },
    {
      columns: [
        {
          label: manufacturerTranslate.wholesaleNonTax,
          type: "coaTextInputH",
          size: 10,
          defaultValue: 'BLANK',
          validationResult: errorFields,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 4,
          dataIndex: "wholesaleNonTax"
        }
      ]
    },
  ]
}
