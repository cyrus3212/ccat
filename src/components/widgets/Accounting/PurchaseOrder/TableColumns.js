import commonTranslate from '../../../../translation/common.json';
import poTranslate from '../../../../translation/accounting/purchaseOrder.json';

export function generateColumns(handleOnChangeInput, handleOnBlur, handleOnShowErrorModal, options) {
  const maxLength = 50;
  return [
    {
      title: poTranslate.typeCode,
      dataIndex: 'typeCode',
      refId: 'id',
      maxLength: 3,
      required: true,
      type: "alphaNumericInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: poTranslate.description,
      dataIndex: 'description',
      refId: 'id',
      maxLength: 20,
      required: true,
      type: "alphaNumericInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: poTranslate.accNumber,
      dataIndex: 'accountNumber',
      refId: 'id',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: poTranslate.partsPO,
      dataIndex: 'partsPurchaseOrder',  refId: 'id',  maxLength: maxLength, type: "selectInput", options, onChange: handleOnBlur, columnSortable:false},
    { title: 'Action',              dataIndex: 'extraData',           type: "actionButtons",        columnSortable: false,
      actionButtons: [
        { htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete, onClick: handleOnShowErrorModal, type: "button", }
      ]
    }
  ]
}
