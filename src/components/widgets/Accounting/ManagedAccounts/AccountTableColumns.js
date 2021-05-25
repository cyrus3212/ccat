import commonTranslate from '../../../../translation/common.json';
import accountTranslate from '../../../../translation/accounting/managedAccounts.json';

export function generateColumns(handleOnChangeInput, handleOnShowErrorModal) {
  const maxLength = 10;
  return [
    {
      title: accountTranslate.account1,
      dataIndex: 'account1',
      refId:'cId',
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
    },
    {
      title: accountTranslate.account2,
      dataIndex: 'account2',
      refId:'cId',
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
    },
    {
      title: accountTranslate.account3,
      dataIndex: 'account3',
      refId:'cId',
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
    },
    {
      title: accountTranslate.account4,
      dataIndex: 'account4',
      refId:'cId',
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
      // onBlur: handleOnBlur
    },
    {
      title: accountTranslate.account5,
      dataIndex: 'account5',
      refId:'cId',
      maxLength: maxLength,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable: false,
      isCheckValidation: true
      // onBlur: handleOnBlur
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button",
          text: commonTranslate.delete, onClick: handleOnShowErrorModal, type: "button",
        }
      ]
    }
  ]
}
