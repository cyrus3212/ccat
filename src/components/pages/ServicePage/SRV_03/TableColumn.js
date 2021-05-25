import commonTranslate from '../../../../translation/common.json';

export function servicePricingTableColumn(handleDisabledDeleteButton, handleShowErrorModal, onEdit) {
  return [{
      title: 'Service Type',
      dataIndex: 'serviceType',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Line Payment Method',
      dataIndex: 'linePaymentMethod',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [{
          htmlId: "editAccount",
          buttonStyle: "primary",
          className: "btn btn-primary",
          text: commonTranslate.edit,
          type: "button",
          onClick: onEdit
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
