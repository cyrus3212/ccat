import commonTranslate from '../../../../translation/common.json';

export function otherPayCodeTableColumn(handleShowErrorModal, handleEdit) {
  return [
    {
      title: "Other Pay Code",
      dataIndex: "dedpayCode",
      type: "label",
      columnSortable: false
    },
    {
      title: "Description",
      dataIndex: "description",
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
          onClick: handleShowErrorModal,
          type: "button"
        }
      ]
    },
  ]
}
