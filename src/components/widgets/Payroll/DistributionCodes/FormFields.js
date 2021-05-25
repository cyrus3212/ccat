import React from 'react';
import "../_payroll.scss";
import distCodeTranslate from '../../../../translation/payroll/distributionCode.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: distCodeTranslate.distCode,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 4,
          InputColSize: 7,
          required: true,
          maxLength: 4,
          dataIndex: 'code'
        }
      ]
    },
    {
      columns: [
        {
          label: distCodeTranslate.description,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          labelColSize: 4,
          InputColSize: 7,
          maxLength: 25,
          required: true,
          dataIndex: 'description'
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
