export function generateTableColumns() {
  return [
    {
      title: 'Key',
      dataIndex: 'key',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Lender Name',
      dataIndex: 'name',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      type: "label",
       columnSortable: false,
      },
    {
      title: 'City',
      dataIndex: 'city',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'County',
      dataIndex: 'county',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'State',
      dataIndex: 'stateCode',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Contact Name',
      dataIndex: 'contact',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Buy Rate',
      dataIndex: 'buyRate',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Loan Origination Fee',
      dataIndex: 'loanOriginationFee',
      type: "label",
      columnSortable: false,
    },
    {

      title: 'Finance Reserve Method',
      dataIndex: 'reserveCalculationMethod',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Holdback',
      dataIndex: 'reserveHoldbackPercent',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'A/R Acocunt Number',
      dataIndex: 'receivableAccount',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'New Payable Account',
      dataIndex: 'reserveIncomeAccountNew',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'Used Payable Account',
      dataIndex: 'reserveIncomeAccountUsed',
      type: "label",
      columnSortable: false,
    },
    {
      title: 'VSI FEE',
      dataIndex: 'vsiFee',
      type: "label",
      columnSortable: false,
    },
  ]
}
