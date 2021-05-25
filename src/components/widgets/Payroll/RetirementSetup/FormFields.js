import React from 'react';
import retTranslate from '../../../../translation/payroll/retirementSetup.json';
import RadioFormInput from '../../../reusable/RadioFormInput'
import TextMarkUp from '../../../reusable/TextMarkUp';

export function generateForm(handleInputOnChange, errorFields, deductionOptions) {
  return [
    {
      columns: [
        {
          label: retTranslate.maxEmployer,
          type: "percentageInput",
          refId: 'id',
          dataIndex: 'maximumEmployerMatchingPercent',
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 4,
          allowDecimal: true,
          size: 6,
          validationResult: errorFields
        }
      ]
    },

    {
      columns: [
        {
          label: retTranslate.matchingLimit,
          type: "amountInput",
          refId: 'id',
          dataIndex: 'matchingLimitofTotalEmployeeAmount',
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 4,
          allowDecimal: true,
          size: 6,
          validationResult: errorFields
        }
      ]
    },

    {
      columns: [
        {
          label: retTranslate.deductionCode,
          type: "selectInputH",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'deductionCodefor401KContributions',
          labelColSize: 6,
          InputColSize: 4,
          size: 3,
          validationResult: errorFields,
          options: deductionOptions
        }
      ]
    },

    {
      columns: [
        {
          label: retTranslate.cafeteriaBenefit,
          dataIndex: 'cafeteriaBenefitPlan',
          type: "radioInputH",
          required: true,
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 6,
          validationResult: errorFields,
          defaultValue: 'N',
          options: [
            {
              value: "Y",
              label: "Yes"
            },
            {
              value: "N",
              label: "No"
            }
          ]
        }
      ]
    },
    {
      columns: [
        {
          label: retTranslate.maxYTDEmployer,
          type: "numericInputH",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'maximumYtdEmployerWillContribute',
          labelColSize: 6,
          InputColSize: 4,
          size: 6,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: retTranslate.maxPercentEmployer,
          type: "percentageInput",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'maximumPercentofEmployeeMatch',
          labelColSize: 6,
          InputColSize: 4,
          allowDecimal: true,
          size: 6,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: retTranslate.maxYTDExecutive,
          type: "numericInputH",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'maximumYtdExecutiveEmployeeContribution',
          labelColSize: 6,
          InputColSize: 4,
          size: 10,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: retTranslate.maxYTDEmployee,
          type: "numericInputH",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'maximumYtdEmployeeContribution',
          labelColSize: 6,
          InputColSize: 4,
          size: 7,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: retTranslate.addContribution,
          type: "numericInputH",
          refId: 'id',
          onChange: handleInputOnChange,
          dataIndex: 'additionalContributionfor50AndOver',
          labelColSize: 6,
          InputColSize: 4,
          size: 7,
          validationResult: errorFields
        }
      ]
    }
  ]
}
