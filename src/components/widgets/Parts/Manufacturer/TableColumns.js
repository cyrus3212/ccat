export function listTableColumns(handleInputOnChange) {
  return [
    {
      title: '',
      refId: 'cId',
      dataIndex: 'description',
      type: "textLabel",
      onChange: handleInputOnChange,
      columnSortable:false
    },
    {
      title: 'Service Customer Pay',
      refId: 'cId',
      dataIndex: 'serviceCustomerPay',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable: false,
      isCheckValidation: true,
      maxLength: 10,
      enableBatchUpdate: true
    },
    {
      title: 'Service Internal',
      refId: 'cId',
      dataIndex: 'serviceInternal',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      maxLength: 10,
      enableBatchUpdate: true
    },
    {
      title: 'Service Warranty',
      refId: 'cId',
      dataIndex: 'serviceWarranty',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      maxLength: 10,
      enableBatchUpdate: true
    },
    {
      title: 'Service Contract',
      refId: 'cId',
      dataIndex: 'serviceContract',
      type: "coaTextInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      isCheckValidation: true,
      maxLength: 10,
      enableBatchUpdate: true
    },
  ]
}
