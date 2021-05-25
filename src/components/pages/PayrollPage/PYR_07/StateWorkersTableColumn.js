import commonTranslate from '../../../../translation/common.json';

export function stateWorkersTableColumn(handleDisabledDeleteButton, handleShowErrorModal, handleEdit) {
  return [{
      title: 'State Workers Comp Account',
      dataIndex: 'stateWorkersCompAccount',
      type: "label",
      refId: 'id',
      columnSortable: false
    },
    {
      title: 'Workers Compensation Limit',
      dataIndex: 'workersCompensationLimit',
      type: "label",
      refId: 'id',
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
