import React from 'react';
import "../_payroll.scss";
import federalTaxTranslate from '../../../../translation/payroll/federalTax.json';
import CellTextInput from '../../../reusable/CellTextInput';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: federalTaxTranslate.employerIDNum,
          type: "alphaNumericInputH",
          refId: 'id',
          dataIndex: 'federalEmployerNumber',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerIDNumDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employeeFICAAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employeeFicaAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employeeFICAAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employerFICAAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employerFicaAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerFICAAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employeeMedicareAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employeeMedicareAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employeeMedicareAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employerMedicareAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employerMedicareAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerMedicareAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employerUnemploymentAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'federalUnemploymentAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employeeUnemploymentAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employeeFederalTaxAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employeeFederalTaxAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerFederalTaxAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employerAdvancesAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'arEmployeeAdvancesAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerAdvancesAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.payrollBankAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'payrollBankAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.payrollBankAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.clearingAcct,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'directdepositclearIng',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.clearingAcctDescription
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.employerRetirement,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'employerRetirementContributionAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.employerRetirementDesc
        }
      ]
    },
    {
      columns: [
        {
          label: federalTaxTranslate.accruedPayroll,
          type: "coaTextInputH",
          refId: 'id',
          dataIndex: 'accruedPayrollMonthEndClearingAccount',
          // dataIndex: 'ptoAccruedAccount',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 10,
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
          label: federalTaxTranslate.accruedPayrollDesc
        }
      ]
    }
  ]
}
