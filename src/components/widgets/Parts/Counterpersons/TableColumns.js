import commonTranslate from '../../../../translation/common.json';

export function generateTableColumns(handleInputOnChange, handleDisabledDeleteButton, handleShowErrorModal, handleChangeModal, handleOnBlur) {
  return [
    {
      title: 'Counterperson ID',
      dataIndex: 'key',
      refId: 'id',
      type: "alphaNumericInput",
      onBlur:handleOnBlur,
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      required: true,
      isDisabled: true,
      maxLength: 3
    },
    {
      title: 'Name',
      dataIndex: 'name',
      refId: 'id',
      type: "alphaNumericInput",
      onBlur:handleOnBlur,
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      required: true,
      maxLength: 20
    },
    {
      title: 'Password',
      dataIndex: 'password',
      refId: 'id',
      type: "alphaNumericInput",
      onBlur:handleOnBlur,
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      required: true,
      maxLength: 6
    },
    {
      title: 'Employee #',
      dataIndex: 'employeeNumber',
      refId: 'id',
      type: "alphaNumericInput",
      onBlur:handleOnBlur,
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      required: true,
      maxLength: 9
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteButton,
          onClick: handleShowErrorModal,
          type: "button", }
      ]
    },
  ]
}
