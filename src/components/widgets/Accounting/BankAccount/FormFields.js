import React from 'react';
import "../_accountingWidget.scss";
import bankAccountTranslate from '../../../../translation/accounting/bankAccount.json';
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: bankAccountTranslate.description,
          dataIndex: 'description',
          type: "alphaNumericInputH",
          required: true,
          onChange: handleInputOnChange,
          maxLength: 30,
          labelColSize: 4,
          InputColSize: 8,
          mdColSize:5,
          validationResult: errorFields,
        }
      ]
    },
    {
      rowClassName: "show-grid",
      columns: [
        {
          label: bankAccountTranslate.bankInformation,
          type: "header",
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.bankContact,
          dataIndex: 'contact',
          type: "alphaNumericInputH",
          maxLength: 25,
          labelColSize: 4,
          InputColSize: 8,
          mdColSize:5,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Address 1",
          dataIndex: "address1",
          type: "alphaNumericInputH",
          maxLength: 45,
          labelColSize: 4,
          InputColSize: 8,
          mdColSize:5,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: "Address 2",
          dataIndex: "address2",
          type: "alphaNumericInputH",
          maxLength: 45,
          labelColSize: 4,
          InputColSize: 8,
          mdColSize:5,
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.city,
          dataIndex: "city",
          maxLength: 20,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.state,
          dataIndex: "stateCode",
          maxLength: 2,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "alphaNumericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.zip,
          dataIndex: "zipCode",
          maxLength: 9,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "numericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.phone,
          dataIndex: "phoneNumber",
          maxLength: 10,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "numericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.phoneExt,
          dataIndex: "phoneExtension",
          maxLength: 4,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "numericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.faxNumber,
          dataIndex: "faxNumber",
          maxLength: 10,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          type: "numericInputH",
          onChange: handleInputOnChange,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.glAccountNumber,
          type: "header",
          mdColSize: 12,
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.glAcctNumField,
          dataIndex: "glAccountNumber",
          maxLength: 10,
          type: "coaTextInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields,
          isCheckValidation: true
        },
        {
          label: bankAccountTranslate.interestEarned,
          dataIndex: "interestEarnedAccountNumber",
          type: "coaTextInputH",
          maxLength: 10,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.serviceCharge,
          dataIndex: "serviceChargeAccountNumber",
          type: "coaTextInputH",
          maxLength: 10,
          onChange: handleInputOnChange,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.otherCharge,
          dataIndex: "otherChargeAccountNumber",
          type: "coaTextInputH",
          maxLength: 10,
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.checkingAccountNumbers,
          type: "header",
          mdColSize: 12,
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.cAccountNumber,
          dataIndex: "bankAccountNo",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.cRoutingNumber,
          dataIndex: "bankRoutingNo",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 4,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.cFractionalNumber,
          dataIndex: "checkingAccountFractional",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          InputColSize: 6,
          labelColSize: 6,
          mdColSize: 4,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.depositAccountNumbers,
          type: "header",
          mdColSize: 12,
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.dAccountNumber,
          dataIndex: "depositAccountNo",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize:4,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.dRoutingNumber,
          dataIndex: "depositRoutingNo",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 4,
          validationResult: errorFields
        },
        {
          label: bankAccountTranslate.dFractionalNumber,
          dataIndex: "depositFractional",
          type: "alphaNumericInputH",
          maxLength: 20,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          mdColSize: 4,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.additionalInformation,
          type: "header",
          mdColSize: 12,
        }
      ]
    },
    {
      columns: [
        {
          label: bankAccountTranslate.positivePay,
          dataIndex: "bankLogo",
          type: "radioInputH",
          onChange: handleInputOnChange,
          defaultValue: 'N',
          options: [
            { value: 'Y', label: 'Yes' },
            { value: 'N',  label: 'No' }
          ]
        }
      ]
    },

  ]
}
