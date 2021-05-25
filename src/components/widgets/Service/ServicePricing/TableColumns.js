import React from "react";

export function tableColumns(handleInputOnChange, handleOnChangeInputSave, priceLevelOptions, selectedTab, handleDisableWarrantyFld) {

  let selectedColumn = [];

  let tableData = [
    {
      title: "Service Types",
      dataIndex: "serviceType",
      refId: "rid",
      type: "textInput",
      isDisabled: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      onBlur: handleOnChangeInputSave,
      isCheckValidation: true,
    },
    {
      title: "Payment Methods",
      dataIndex: "linePaymentMethod",
      refId: "rid",
      type: "textInput",
      isDisabled: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      onBlur: handleOnChangeInputSave,
      isCheckValidation: true
    },
    {
      title: "Groups",
      dataIndex: "franchiseCode",
      refId: "rid",
      type: "textInput",
      isDisabled: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      onBlur: handleOnChangeInputSave,
      isCheckValidation: true
    },
    {
      title: "Service Contracts",
      dataIndex: "serviceContractCompany",
      refId: "rid",
      type: "textInput",
      isDisabled: true,
      onChange: handleInputOnChange,
      columnSortable: false,
      onBlur: handleOnChangeInputSave
    },
  ];

  if (selectedTab === 'laborRates') {
    let laborRatesColumns = [
      {
        title: "A",
        label: "A",
        dataIndex: "laborRateA",
        refId: "rid",
        type: "numericInput",
        maxLength: 7,
        allowDecimal: true,
        onChange: handleInputOnChange,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Labor Rates",
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "B",
        dataIndex: "laborRateB",
        type: "numericInput",
        maxLength: 7,
        allowDecimal: true,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        onBlur: handleOnChangeInputSave,
        customHeaderTitle: "Labor Rates",
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "C",
        dataIndex: "laborRateC",
        type: "numericInput",
        maxLength: 7,
        allowDecimal: true,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        onBlur: handleOnChangeInputSave,
        customHeaderTitle: "Labor Rates",
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "D",
        dataIndex: "laborRateD",
        type: "numericInput",
        maxLength: 7,
        allowDecimal: true,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        onBlur: handleOnChangeInputSave,
        customHeaderTitle: "Labor Rates",
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "Price Level",
        dataIndex: "priceLevel",
        type: "selectInput",
        refId: "rid",
        options: priceLevelOptions,
        onChange: handleOnChangeInputSave,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Parts Price Level",
        enableBatchUpdate: true
      }
    ];

    selectedColumn = laborRatesColumns;

  }

  if (selectedTab === 'subletMarkup') {
    let subletMarkupColumns =  [
      {
        title: "Labor",
        dataIndex: "subletMarkupPercentLabor",
        type: "numericInput",
        maxLength: 3,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Sublet Markup",
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "Parts",
        dataIndex: "subletMarkupPercentParts",
        type: "numericInput",
        maxLength: 3,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        customHeaderTitle: "Sublet Markup",
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "Labor",
        dataIndex: "shopSuppliesLabor",
        type: "radioInput",
        refId: "rid",
        onChange: handleOnChangeInputSave,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Accumulate Shop Supplies",
        enableBatchUpdate: true
      },
      {
        title: "Parts",
        dataIndex: "shopSuppliesParts",
        type: "radioInput",
        refId: "rid",
        onChange: handleOnChangeInputSave,
        columnSortable: false,
        customHeaderTitle: "Accumulate Shop Supplies",
        enableBatchUpdate: true
      },
      {
        title: "Sublet",
        dataIndex: "shopSuppliesSublet",
        type: "radioInput",
        refId: "rid",
        onChange: handleOnChangeInputSave,
        columnSortable: false,
        customHeaderTitle: "Accumulate Shop Supplies",
        enableBatchUpdate: true
      }
    ];

    selectedColumn = subletMarkupColumns;

  };

  if (selectedTab === 'accounting') {
    let subletMarkupColumns =  [
      {
        title: "Car",
        dataIndex: "carLaborAccount",
        type: "coaTextInput",
        maxLength: 10,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Labor Accounting",
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "Trucks",
        dataIndex: "truckLaborAccount",
        type: "coaTextInput",
        maxLength: 10,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        customHeaderTitle: "Labor Accounting",
        enableBatchUpdate: true
      },
      {
        title: "Warranty",
        dataIndex: "warrantyReceivableAccount",
        type: "coaTextInput",
        maxLength: 10,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        displayCustomTitle: true,
        customHeaderTitle: "Accounts Receivable",
        onBlur: handleOnChangeInputSave,
        isDisabled: handleDisableWarrantyFld,
        isCheckValidation: true,
        enableBatchUpdate: true
      },
      {
        title: "Inv Warranty",
        dataIndex: "inventoryReceivableAccount",
        isDisabled: handleDisableWarrantyFld,
        type: "coaTextInput",
        maxLength: 10,
        refId: "rid",
        onChange: handleInputOnChange,
        columnSortable: false,
        customHeaderTitle: "Accounts Receivable",
        onBlur: handleOnChangeInputSave,
        isCheckValidation: true,
        enableBatchUpdate: true
      }
    ];

    selectedColumn = subletMarkupColumns;

  };

  selectedColumn.map(col => {
    tableData.push(col);
  })

  return tableData;

}
