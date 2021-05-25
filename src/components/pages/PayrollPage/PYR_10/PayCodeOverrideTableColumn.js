import commonTranslate from '../../../../translation/common.json';
import payCodeOverrideTranslate from '../../../../translation/payroll/payCodeOverride.json';

export function payCodeOverrideTableColumn(handleShowErrorModal, handleEdit) {
  return [
    {
      title: payCodeOverrideTranslate.distCode,
      dataIndex: 'distributionCode',
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
