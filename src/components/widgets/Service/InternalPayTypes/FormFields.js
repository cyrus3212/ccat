import React from 'react';
import ipTypesTranslate from "../../../../translation/service/internalPayTypes.json";

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: ipTypesTranslate.typeCode,
          required: true,
          maxLength: 3,
          type: "alphaNumericInput",
          dataIndex: 'typeCode',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: ipTypesTranslate.description,
          required: true,
          maxLength: 20,
          type: "alphaNumericInput",
          dataIndex: 'description',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: ipTypesTranslate.accountNum,
          maxLength: 10,
          defaultValue: "BLANK",
          type: "coaTextInput",
          dataIndex: 'accountNumber',
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    }
  ]
}
