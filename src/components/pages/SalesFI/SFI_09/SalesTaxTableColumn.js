import commonTranslate from '../../../../translation/common.json';

export function salesTaxTableColumn(handleDisabledDeleteButton, handleShowErrorModal, handleEdit) {
  return [{
      title: 'Tax Group Name',
      dataIndex: 'taxGroupDescription',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Preferred Retail Deal Tax Group',
      dataIndex: 'preferredRetail',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Preferred Lease Tax Group',
      dataIndex: 'preferredLease',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Date',
      dataIndex: 'createdDate',
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
