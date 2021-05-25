import React from 'react';
// import "../_accountingWidget.scss";
import stateWorkersTranslate from '../../../../translation/payroll/stateWorkers.json';

export function generateForm(handleInputOnChange, errorFields, taxWitholdingOptions) {

  return [
    {
      columns: [
        {
          label: stateWorkersTranslate.taxUnitName,
          dataIndex: "withholdingTaxingUnitType",
          type: "selectInputH",
          size: 7,
          required: true,
          labelColSize: 6,
          InputColSize: 4,
          validationResult: errorFields,
          onChange: handleInputOnChange,
          options: taxWitholdingOptions
        }
      ]
    },
    {
      columns: [
        {
          label: stateWorkersTranslate.workersCompensationLimit,
          dataIndex: "workersCompensationLimit",
          type: "numericInputH",
          size: 7,
          required: true,
          labelColSize: 6,
          InputColSize: 4,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: stateWorkersTranslate.stateWorkersCompAcc,
          dataIndex: "stateWorkersCompAccount",
          type: "coaTextInputH",
          size: 10,
          required: true,
          labelColSize: 6,
          InputColSize: 6,
          validationResult: errorFields,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          type: "headerTextMarkup",
          label: stateWorkersTranslate.workersCompensationClasses,
          mdColSize: 12,
        }
      ]
    }
  ]
}
