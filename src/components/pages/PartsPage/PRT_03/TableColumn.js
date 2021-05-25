import commonTranslate from '../../../../translation/common.json';

export function stockingGroupTableColumn(handleDisabledDeleteButton, handleShowErrorModal, handleEdit) {
  return [
    {
      title: 'Stocking Group',
      dataIndex: 'stockGroup',
      type: "label",
      refId:'id',
      columnSortable: false
    },
    {
      title: 'Description',
      dataIndex: 'description',
      type: "label",
      refId:'id',
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
