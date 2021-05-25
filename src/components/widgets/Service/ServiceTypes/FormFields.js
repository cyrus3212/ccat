import React from 'react';
// import "../_accountingWidget.scss";
import sTypesTranslate from '../../../../translation/service/serviceTypes.json';

export function generateForm(handleInputOnChange, errorFields) {
  return [
    {
      columns: [
        {
          label: sTypesTranslate.serviceType,
          dataIndex: "type",
          type: "alphaNumericInputH",
          required: true,
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 2,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.description,
          dataIndex: "description",
          type: "alphaNumericInputH",
          required: true,
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 30,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.glAccountForSublet,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.carSubletAccount,
          dataIndex: "carSubletAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 5,
          InputColSize: 5,
          mdColSize: 6,
          maxLength: 10,
          onChange: handleInputOnChange
        },
        {
          label: sTypesTranslate.truckSubletAccount,
          dataIndex: "truckSubletAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 5,
          mdColSize: 6,
          maxLength: 10,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.hazardousMaterial,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.hazardousMaterialAccnt,
          dataIndex: "hazardousMaterialAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 10,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.glAccountForPaint,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.paintMaterials,
          dataIndex: "paintMaterialsAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 10,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.miscChargesAccount,
          dataIndex: "miscellaneousChargesAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 10,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.shopSupplies,
          type: 'header'
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.sAccount,
          dataIndex: "shopSuppliesAccount",
          type: "coaTextInputH",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 10,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.sPercentage,
          dataIndex: "shopSuppliesPercent",
          type: "percentageInput",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 4,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.sLimit,
          dataIndex: "shopSuppliesLimitAmount",
          type: "amountInput",
          validationResult: errorFields,
          isCheckValidation: true,
          labelColSize: 3,
          InputColSize: 3,
          mdColSize: 10,
          maxLength: 7,
          onChange: handleInputOnChange
        }
      ]
    },
    {
      columns: [
        {
          type: "spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.salesTax,
          dataIndex: "salesTaxonPaintMaterial",
          type: "radioInputH",
          validationResult: errorFields,
          isCheckValidation: true,
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
          ],
          labelColSize: 3,
          InputColSize: 7,
          mdColSize: 10,
          onChange: handleInputOnChange
        },
      ]
    },
    {
      columns: [
        {
          label: sTypesTranslate.activeFlag,
          dataIndex: "active",
          type: "radioInputH",
          validationResult: errorFields,
          isCheckValidation: true,
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
          ],
          labelColSize: 3,
          InputColSize: 7,
          mdColSize: 10,
          onChange: handleInputOnChange
        },
      ]
    },
    {
      columns: [
        {
          type: "spaceCol"
        }
      ]
    },
    // {
    //   columns: [
    //     {
    //       label: sTypesTranslate.defaultTaxGroup,
    //       dataIndex: "defaultTaxGroup",
    //       type: "numericInputH",
    //       validationResult: errorFields,
    //       isCheckValidation: true,
    //       labelColSize: 3,
    //       InputColSize: 3,
    //       mdColSize: 10,
    //       maxLength: 3,
    //       onChange: handleInputOnChange
    //     }
    //   ]
    // },
  ]
}
