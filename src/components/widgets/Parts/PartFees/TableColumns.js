export function listTableColumns(handleInputOnChange) {
  return [{
      title: '',
      dataIndex: 'saleAccount',
      type: "textInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: 'Service Customer Pay',
      dataIndex: 'serviceCustomerPay',
      type: "textInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: 'Service Internal',
      dataIndex: 'serviceInternal',
      type: "textInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: 'Service Warranty',
      dataIndex: 'serviceWarranty',
      type: "textInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
    {
      title: 'Service Contract',
      dataIndex: 'serviceContract',
      type: "textInput",
      onChange: handleInputOnChange,
      columnSortable: false
    },
  ]
}
