import React from 'react';
import "../_salesFI.scss";
import acctAssgTranslate from '../../../../translation/salesfi/accountAssignments.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: acctAssgTranslate.cashReceipts,
          refId: 'id',
          dataIndex: 'cashReceiptsAccount',
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          onChange: handleInputOnChange,
          maxLength: 10,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          type: "descriptionLabel",
          label: acctAssgTranslate.cachReceiptsDesc
        }
      ]
    },
    {
      columns: [
        {
          label: acctAssgTranslate.cachReceipts,
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          refId: 'id',
          dataIndex: 'accountsPayable',
          onChange: handleInputOnChange,
          maxLength: 10,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          label: acctAssgTranslate.accntPayableDesc,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: acctAssgTranslate.ovrUnderAllowance,
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'overUnderAllowanceAccount',
          maxLength: 10,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          label: acctAssgTranslate.ovrUnderAllowDesc,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: acctAssgTranslate.tradeLienPayoff,
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'tradeLienPayoffAccount',
          maxLength: 10,
          labelColSize: 4,
          InputColSize: 8,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          label: acctAssgTranslate.tradeLienPayoffDesc,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: acctAssgTranslate.commissionPayable,
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'commissionPayableAccount',
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          label: acctAssgTranslate.commPayableDesc,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: acctAssgTranslate.outSdLienHolder,
          type: "coaTextInputH",
          coaIconPaddingCN: "sfi-coasearch-padding",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'outsideLienHolderAccount',
          labelColSize: 4,
          InputColSize: 8,
          maxLength: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol",
          xsColSize: 12,
          mdColSize: 2
        },
        {
          label: acctAssgTranslate.outSdLienHlderDesc,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    }
  ]
}
