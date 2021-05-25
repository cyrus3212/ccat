import commonTranslate from '../../../../translation/common.json';

export function pricingTableColumn(handleDisabledDeleteButton, handleShowErrorModal, handleEdit) {
  return [
    {
      title: 'Description',
      dataIndex: 'description',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Method',
      dataIndex: 'pricingMethod',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Net Price Percent',
      dataIndex: 'netPricePercent',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "editAccount",
          buttonStyle: "primary",
          className: "btn btn-primary",
          text: commonTranslate.edit,
          type: "button",
          onClick: handleEdit
        },
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteButton,
          onClick: handleShowErrorModal,
          type: "button"
        }
      ]
    },
  ]
}
