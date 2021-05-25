import commonTranslate from '../../../../translation/common.json';

export function listTableColumns(handleInputOnChange, handleDisabledDeleteButton, handleOnShowErrorModal, handleChangeModal) {
  return [
    {
      title: 'Part Number',
      dataIndex: 'partNumber',
      type: "alphaNumericInput",
      refId: 'cId',
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      maxLength: 25
    },
    {
      title: 'Manufacturer',
      dataIndex: 'partManufacturer',
      type: "alphaNumericInput",
      refId: 'cId',
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      maxLength: 3
    },
    {
      title: 'Quantity',
      dataIndex: 'partQuantity',
      type: "numericInput",
      refId: 'cId',
      onChange: handleInputOnChange,
      onChangeField:handleChangeModal,
      columnSortable:false,
      maxLength: 3,
      defaultValue: "0"
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      refId: 'cId',
      columnSortable: false,
      actionButtons: [
        {
          htmlId: "deleteButton",
          buttonStyle: "danger",
          className: "table-delete-button",
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteButton,
          onClick: handleOnShowErrorModal,
          type: "button",
        }
      ]
    },
  ]
}
