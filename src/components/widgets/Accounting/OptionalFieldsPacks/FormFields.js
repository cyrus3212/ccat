import "../_accountingWidget.scss";
import "./_optionalFields.scss";
import opticalFieldsTranslate from '../../../../translation/accounting/opticalFields.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: opticalFieldsTranslate.defaultHoldbackAcct,
          description: opticalFieldsTranslate.defaultHBtext,
          dataIndex: "defaultHoldbackAccount",
          onChange: handleInputOnChange,
          type: "coaTextInputH",
          coaTextCN: "text-acn13-coasearch",
          labelColSize: 9,
          InputColSize: 3,
          size: 20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
          xs:12,
          md:8
        }
      ]
    },
    {
      columns: [
        {
          label: opticalFieldsTranslate.defaultFlooringAcct,
          description:opticalFieldsTranslate.defaultFAtext,
          dataIndex: "defaultFlooringAccountNewVehicles",
          type: "coaTextInputH",
          coaTextCN: "text-acn13-coasearch",
          onChange: handleInputOnChange,
          labelColSize: 9,
          InputColSize: 3,
          size:20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "hr",
          xs:12,
          md:8
        }
      ]
    },
    {
      columns: [
        {
          label: opticalFieldsTranslate.defaultPayoffAcct,
          description:opticalFieldsTranslate.defaultPAtext,
          dataIndex: "defaultPayoffAccountUsedVehicles",
          type: "coaTextInputH",
          coaTextCN: "text-acn13-coasearch",
          onChange: handleInputOnChange,
          labelColSize: 9,
          InputColSize: 3,
          size:20,
          validationResult: errorFields
        }
      ]
    },
  ]
}
