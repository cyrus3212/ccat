import commonTranslate from '../../../../translation/common.json';

export function gapSourcesTableColumn(handleDisabledDeleteButton, handleShowErrorModal, handleEdit) {
  return [{
      title: 'Insurance Company Name',
      dataIndex: 'gapName',
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
