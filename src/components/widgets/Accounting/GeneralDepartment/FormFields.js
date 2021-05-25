import React from 'react';
import "../_accountingWidget.scss";
import "./_generalDepartment.scss";
import genDeptTranslate from '../../../../translation/accounting/generalDepartment.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: genDeptTranslate.acctDept,
          type: "coaTextInputH",
          required: true,
          dataIndex: "retainedEarningsAccount",
          coaIconPaddingCN: "acn02-coasearch-padding",
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
          validationResult: errorFields,
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
          label: genDeptTranslate.acctDeptDescription
        }
      ]
    },
    {
      columns: [
        {
          label: genDeptTranslate.servDept,
          type: "coaTextInputH",
          coaIconPaddingCN: "acn02-coasearch-padding",
          required: true,
          dataIndex: 'deductibleReceivedAccount',
          onChange: handleInputOnChange,
          // className: "acn02-filtercoasearch",
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
          validationResult: errorFields,
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
          label: genDeptTranslate.servDeptDescription,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: genDeptTranslate.partsDept,
          type: "coaTextInputH",
          coaIconPaddingCN: "acn02-coasearch-padding",
          required: true,
          onChange: handleInputOnChange,
          dataIndex: 'freightAccount',
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
          validationResult: errorFields,
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
          label: genDeptTranslate.partsDeptDescription,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    },
    {
      columns: [
        {
          label: genDeptTranslate.partsDeptFA,
          type: "coaTextInputH",
          coaIconPaddingCN: "acn02-coasearch-padding",
          required: true,
          onChange: handleInputOnChange,
          dataIndex: 'specialOrderAccount',
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
          validationResult: errorFields,
          isCheckValidation: true
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
          label: genDeptTranslate.partsDeptDescriptionFA,
          type: "descriptionLabel",
          xsColSize: 12,
          mdColSize: 8
        }
      ]
    }
  ]
}
