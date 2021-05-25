import commonTranslate from '../../../../translation/common.json';

export function generateTableColumns(handleInputOnChange, handleShowErrorModal, descriptionOptions, handleOnClick) {
  return [
    {
      title: 'Price Level',
      dataIndex: 'priceLevel',
      type: "textLabel",
      onChange: handleInputOnChange,
      columnSortable:false
    },
    {
      title: 'Description',
      dataIndex: 'priceKey',
      type: "selectInput",
      onChange: handleInputOnChange,
      columnSortable:false,
      options: descriptionOptions,
      onClick: handleOnClick
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
          onClick: handleShowErrorModal,
          type: "button"
        }
      ]
    },
  ]
}
