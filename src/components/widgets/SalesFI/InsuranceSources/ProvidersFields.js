import React from 'react';
import iSourcesTranslate from '../../../../translation/salesfi/insuranceSources.json';

export function generateProviderForm(handleInputOnChange, tabContents, errorFields ) {
  return [
    {
      columns: [
        {
          label: iSourcesTranslate.providers,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iCompanyName,
          dataIndex: 'insuranceCoName',
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 25,
          required: true,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iAddress,
          dataIndex: 'address',
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 30,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iCounty,
          dataIndex: 'city',
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iStateCode,
          dataIndex: "stateCode",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 2,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iPhoneNumber,
          dataIndex: "phoneNumber",
          type: "numericInputH",
          defaultValue: '0',
          onChange: handleInputOnChange,
          size: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.iContactName,
          dataIndex: "contact",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 20,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: iSourcesTranslate.payableAccount,
          dataIndex: "payableAccount",
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          size: 10,
          validationResult: errorFields,
          defaultValue: "BLANK"
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
          label: iSourcesTranslate.acctng,
          type: "header"
        }
      ]
    },
    {
      columns: [
        {
          type: 'tabs',
          title: 'Credit Life',
          defaultActiveKey: '1',
          xsColSize: 12,
          mdColSize: 12,
          tabView: [
            {
              dataIndex: 'creditLife',
              key: '1',
              title: 'Credit Life',
              content: tabContents.creditLifeForm
            },
            {
              dataIndex: 'accidentHealth',
              key: '2',
              title: 'Accident & Health',
              content: tabContents.accidentHealthForm
            }
          ]
        }
      ]
    }

  ]
}
