import commonTranslate from '../../../../translation/common.json';

export function generateAccountList(handleEditBankAccount, handleDisabledDeleteButton, handleShowErrorModal) {
  return [
    {
      title: 'Description',
      dataIndex: 'description',
      type: "label"
    },
    {
      title: 'GL Account Number',
      dataIndex: 'glAccountNumber',
      type: "label"
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      columnSortable: false,
      type: "actionButtons",
      actionButtons: [
        {
          htmlId: "editAccount",
          buttonStyle: "primary",
          className: "btn btn-primary",
          text: commonTranslate.edit,
          type: "button",
          onClick: handleEditBankAccount
        },
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteButton,
          onClick: handleShowErrorModal,
          type: "button",
        }
      ]
    },
  ]
}
