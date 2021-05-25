import commonTranslate from '../../../../translation/common.json';

export function generateSalesGroupList(handleOnEdit, handleDisabledDeleteButton, handleShowErrorModal) {
  return [{
      title: 'Type',
      dataIndex: 'newUsed',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Sale Group',
      dataIndex: 'saleGroup',
      type: "label",
      columnSortable: false
    },
    {
      title: 'Description',
      dataIndex: 'description',
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
          onClick: handleOnEdit
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
