import React from 'react';
// import "../_accountingWidget.scss";
import taxWithholdTranslate from '../../../../translation/payroll/taxWithholding.json';

export function generateForm(handleInputOnChange, taxingUnitTypeOptions, errorFields) {
  return [
    {
      columns: [
        {
          label: taxWithholdTranslate.taxWiholdingUnitSetups,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.taxUnitName,
          dataIndex: "taxUnitName",
          type: 'alphaNumericInputH',
          required: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.taxingUnitIDNumber,
          dataIndex: "taxingUnitIdNumber",
          type: 'alphaNumericInputH',
          required: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          size: 5,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.taxingUnitType,
          dataIndex: "taxingUnitType",
          type: "selectInputH",
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          size: 1,
          required: true,
          //defaultValue: "State",
          validationResult: errorFields,
          options: taxingUnitTypeOptions,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.taxRemittanceInformation,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.makeChecksPayableTo,
          dataIndex: "payTo",
          type: "alphaNumericInputH",
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.streetAddressOrPOBox,
          dataIndex: "poBox",
          type: "alphaNumericInputH",
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.city,
          dataIndex: "city",
          type: "alphaNumericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.state,
          dataIndex: "state",
          type: "alphaNumericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 2,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.zipCode,
          dataIndex: "zipCode",
          type: "numericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 9,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.phone,
          dataIndex: "phone",
          type: "numericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.phoneFax,
          dataIndex: "phoneFax",
          type: "numericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: taxWithholdTranslate.taxUnitContact,
          dataIndex: "contact",
          type: "alphaNumericInputH",
          labelColSize: 3,
          InputColSize: 2,
          mdColSize: 10,
          size: 25,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    }
  ]
}
