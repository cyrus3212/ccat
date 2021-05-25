import React from 'react';

export function getTableColumns() {

  return [
      {
        title: "Old Account Number",
        dataIndex: "oldAccountNumber",
        type: "textInput",
        refId: "id",
        isDisabled: true,
        columnSortable: false
      },
      {
        title: "Description",
        dataIndex: 'description',
        type: "textInput",
        refId: "id",
        isDisabled: true,
        columnSortable: false
      },
  ]
}
