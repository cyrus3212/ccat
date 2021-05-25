import React from 'react';
import stateWithholdTaxTranslate from '../../../../translation/payroll/stateWithholdingTax.json';

export function generateForm(handleInputOnChange, taxWitholdingOptions, taxingUnitTypeOptions, errorFields, deductionOptions) {
  return [
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.withholdingUnit,
          dataIndex: "withholdingTaxingUnitType",
          type: "selectInputH",
          labelColSize: 3,
          InputColSize: 5,
          mdColSize: 10,
          size: 5,
          required: true,
          validationResult: errorFields,
          options: taxWitholdingOptions,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.taxUnitName,
          dataIndex: "taxUnitName",
          type: "alphaNumericInputH",
          required: true,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize: 10,
          size: 1,
          validationResult: errorFields,
          // placeholder: 'UT - State SDI',
          isDisabled: true
        }
      ]
    },
    // {
    //   columns: [
    //     {
    //       label: stateWithholdTaxTranslate.taxComputeSWS,
    //       dataIndex: "taxComputeSws",
    //       type: "radioInputH",
    //       onChange: handleInputOnChange,
    //       labelColSize: 3,
    //       InputColSize: 3,
    //       mdColSize: 10,
    //       validationResult: errorFields,
    //       defaultValue: 'N',
    //       options: [
    //         {
    //           value: "Y",
    //           label: "Yes"
    //         },
    //         {
    //           value: "N",
    //           label: "No"
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateTaxAccount,
          dataIndex: "stateTaxAccount",
          type: "coaTextInputH",
          size: 10,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateEmployerNumber,
          dataIndex: "stateEmployerNumber",
          type: "alphaNumericInputH",
          size: 15,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateEmployerAccount,
          dataIndex: "stateEmployerAccount",
          type: "coaTextInputH",
          size: 10,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.garnishmentDeductionCode,
          dataIndex: "garnishmentDeductionCode",
          type: "selectInputH",
          size: 3,
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          options: deductionOptions
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateUnemploymentEmployerNumber,
          dataIndex: "stateUnemploymentEmployerNumber",
          type: "alphaNumericInputH",
          size: 15,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateDisabilityEmployerNumber,
          dataIndex: "stateDisabilityEmployerNumber",
          type: "alphaNumericInputH",
          size: 12,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateUIEmployer,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateUIEmployerPercent,
          dataIndex: "stateUIEmployerPercent",
          type: "percentageInput",
          size: 9,
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 5,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.stateUIEmployerLimit,
          dataIndex: "stateUIEmployerLimit",
          type: "numericInputH",
          size: 7,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateDisability,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateDisabilityPercent,
          dataIndex: "stateDisabilityPercent",
          type: "percentageInput",
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 5,
          size: 9,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.stateDisabilityLimit,
          dataIndex: "stateDisabilityLimit",
          type: "numericInputH",
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          size: 11,
          validationResult: errorFields,
          allowDecimal: true,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.stateDisabilityAccount,
          dataIndex: "stateDisabilityAccount",
          type: "coaTextInputH",
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          size: 10,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.maxGarnishment,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.maxGarnishmentPercent,
          dataIndex: "maximumGarnishmentPercent",
          type: "percentageInput",
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 5,
          size: 8,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.maxGarnishmentAmount,
          dataIndex: "maximumGarnishmentAmount",
          type: "amountInput",
          size: 9,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.employerStateDisability,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.employerStateDisabilityPercent,
          dataIndex: "employerStateDisabilityPercent",
          type: "percentageInput",
          size: 9,
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 5,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.employerStateDisabilityLimit,
          dataIndex: "employerStateDisabilityLimit",
          size: 11,
          type: "numericInputH",
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.employerStateDisabilityAccount,
          dataIndex: "employerStateDisabilityAccount",
          type: "coaTextInputH",
          size: 10,
          labelColSize: 5,
          InputColSize: 6,
          mdColSize: 3,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },

    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateDisabilityAnnualized,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: stateWithholdTaxTranslate.stateDisabilityAnnualizedLimitAmount,
          dataIndex: "stateDisabilityAnnualizedLimitAmount",
          type: "amountInput",
          labelColSize: 6,
          InputColSize: 4,
          mdColSize: 5,
          size: 11,
          validationResult: errorFields,
          onChange: handleInputOnChange
        },
        {
          label: stateWithholdTaxTranslate.stateDisabilityAnnualizedLimit,
          dataIndex: "stateDisabilityAnnulizedLimit",
          type: "radioInputH",
          onChange: handleInputOnChange,
          labelColSize: 3,
          InputColSize: 4,
          mdColSize: 5,
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
  ]
}
