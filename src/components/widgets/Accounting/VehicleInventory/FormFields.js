import React from 'react';
import "../_accountingWidget.scss";
import TextMarkUp from '../../../reusable/TextMarkUp';
import viTranslate from '../../../../translation/accounting/vehicleInventory.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: viTranslate.vinIntegityCheck,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'requireKeyCodeEntry',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={viTranslate.required} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'vinWarning',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={viTranslate.warning} /> },
          ]
        }
      ]
    },
    {
      columns: [
        {
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'vinIntegrityCheck',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={viTranslate.doNotUse} /> },
          ]
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
          label: viTranslate.journalDesc,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'journalDescription',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'V', label: <TextMarkUp label={viTranslate.vin} /> },
            { value: 'Y', label: <TextMarkUp label={viTranslate.yearMakeModel} /> },
          ]
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
          label: <TextMarkUp label={viTranslate.sysGenerated} />,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'includeOptionsfromInvoice',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={viTranslate.VOYes} /> },
            { value: 'N', label: <TextMarkUp label={viTranslate.VONo} /> },
          ]
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
          label: <TextMarkUp label={viTranslate.compniesVehicles} />,
          type: "radioInputV",
          refId: 'id',
          dataIndex: 'searchAllCompaniesforVehicles',
          onChange: handleInputOnChange,
          labelColSize: 4,
          InputColSize: 8,
          size: 20,
          options:[
            { value: 'Y', label: <TextMarkUp label={viTranslate.CVYes} /> },
            { value: 'N', label: <TextMarkUp label={viTranslate.CVNo} /> },
          ]
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
          type: "headerTextMarkup",
          label: viTranslate.sysGenerated
        }
      ]
    },
    {
      columns: [
        {
          label: viTranslate.newVehicle,
          type: "textInputH",
          refId: 'id',
          dataIndex: 'systemGenereatedStockNumbersNew',
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          maxLength: 15,
          validationResult: errorFields
        }
      ]
    },
    {
      columns: [
        {
          label: viTranslate.usedVehicle,
          type: "textInputH",
          refId: 'id',
          dataIndex: 'systemGenereatedStockNumbersUsed',
          onChange: handleInputOnChange,
          labelColSize: 6,
          InputColSize: 6,
          maxLength: 15,
          validationResult: errorFields
        }
      ]
    },
  ]
}
