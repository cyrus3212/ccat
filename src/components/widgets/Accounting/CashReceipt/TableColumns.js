import commonTranslate from '../../../../translation/common.json';
import cashTranslate from '../../../../translation/accounting/cashReceipt.json';

export function generateColumns(handleOnChangeInput, handleOnBlur, handleOnShowErrorModal, defaultOptions) {
  return [
    {
      title: cashTranslate.typeCode,
      dataIndex: 'typeCode',
      refId: 'id',
      maxLength: 3,
      type: "alphaNumericInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: cashTranslate.description,
      dataIndex: 'description',
      refId: 'id',
      maxLength: 20,
      type: "alphaNumericInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: cashTranslate.accountNumberToCredit,
      dataIndex: 'accountNumberToCredit',
      refId: 'id',
      maxLength: 10,
      type: "coaTextInput",
      onChange: handleOnChangeInput,
      columnSortable:false,
      onBlur: handleOnBlur,
      isCheckValidation: true
    },
    {
      title: cashTranslate.vehicleDeposit,
      dataIndex: 'vehicleDeposit',
      refId: 'id',
      type: "selectInput",
      options: defaultOptions,
      onChange: handleOnBlur,
      columnSortable:false,
    },
    {
      title: 'Action',
      dataIndex: 'extraData',
      type: "actionButtons",
      columnSortable: false,
      actionButtons: [
        { htmlId: "deleteButton", buttonStyle: "danger", className: "table-delete-button", text: commonTranslate.delete, onClick: handleOnShowErrorModal, type: "button", }
      ]
    }
  ]
}
