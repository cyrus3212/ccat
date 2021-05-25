import React from 'react';
export function listTableColumns(handleInputOnChange) {

  return [
    { title: 'From',     dataIndex: 'priceStart',    type: "textInput", onChange: handleInputOnChange, columnSortable:false},
    { title: 'To',       dataIndex: 'priceRange',      type: "textInput", onChange: handleInputOnChange, columnSortable:false},
    { title: 'Percent',  dataIndex: 'rangePercent', type: "textInput", onChange: handleInputOnChange, columnSortable:false},
  ]
}
