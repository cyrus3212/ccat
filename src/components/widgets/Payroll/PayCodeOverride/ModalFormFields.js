import React from 'react';
import payCodeOverrideTranslate from '../../../../translation/payroll/payCodeOverride.json';

export function generateModalForm(handleInputOnChange, errorFields, payCodeOptions, companyNumberOptions, defaultCompanyNumber) {
  return [
    {
      columns: [
        {
          label: payCodeOverrideTranslate.payCode,
          dataIndex: "payCode",
          maxLength: 3,
          // required: true,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          type: "selectInput",
          options: payCodeOptions || [],
        },
        {
          title: payCodeOverrideTranslate.companyNumber,
          dataIndex: "companyNumber",
          maxLength: 3,
          columnSortable:false,
          // required: true,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          type: "selectInput",
          options: companyNumberOptions || [],
          defaultValue: defaultCompanyNumber
        },
        {
          title: payCodeOverrideTranslate.otherPayCode,
          dataIndex: "otherPayCodePercent",
          maxLength: 3,
          type: "percentageInput",
          allowDecimal: true,
          columnSortable:false,
          validationResult: errorFields,
          onChange: handleInputOnChange

        },
        {
          title: payCodeOverrideTranslate.glAccount,
          dataIndex: "glAccount",
          maxLength: 10,
          type: "coaTextInput",
          columnSortable:false,
          // required: true,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    }
  ]
}
