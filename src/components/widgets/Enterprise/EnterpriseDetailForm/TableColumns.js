import React from "react";
import entepriseTranslate from '../../../../translation/enterprise.json';
import commonTranslate from '../../../../translation/common.json';

export function listTableColumns (handleDisabledField, handleCompanyTable, handleCellOnFocus,
    handleDisabledViewWorkbookBtn, handleDisabledImportBtn, handleDisabledExportBtn, handleDisabledCopyDataBtn, handleDisabledMoveInProgessBtn, handleDisabledDeleteBtn,
    handleOnClickViewWorkbook, handleOnClickImport, handleOnClickExportToDms, handleOnClickCopyData, handleOnClickMoveInProgress, handleShowDeleteModal) {
  return [
    {
      title: entepriseTranslate.dtid,
      dataIndex: 'dtid',
      refId: 'rid',
      isCheckValidation: true,
      maxLength: 6,
      label: entepriseTranslate.dtid,
      isDisabled: handleDisabledField,
      type: 'textInput',
      required: true,
      onChange: handleCompanyTable,
      onFocus: handleCellOnFocus,
      className: 'dtid-table-header'
    },
    {
      title: entepriseTranslate.companyNumber,
      dataIndex: 'companyNumber',
      refId: 'rid',
      isCheckValidation: true,
      maxLength: 3,
      label: entepriseTranslate.companyNumber,
      isDisabled: handleDisabledField,
      type: 'textInput',
      required: true,
      onChange: handleCompanyTable,
      onFocus: handleCellOnFocus
    },
    {
      title: entepriseTranslate.companyName,
      dataIndex: 'name',
      refId: 'rid',
      isCheckValidation: true,
      label: entepriseTranslate.companyName,
      isDisabled: handleDisabledField,
      type: 'textInput',
      required: true,
      onChange: handleCompanyTable,
      onFocus: handleCellOnFocus
    },
    {
      title: commonTranslate.status,
      dataIndex: 'statusText',
      type: 'label'
    },
    {
      title: '',
      dataIndex: 'extraData',
      columnSortable: false,
      type: 'actionButtons',
      actionButtons: [
        {
          htmlId: 'ViewWorkbookButton',
          buttonStyle: 'primary',
          className: 'btn btn-primary',
          text: commonTranslate.viewWorkbooks,
          isDisabled: handleDisabledViewWorkbookBtn,
          // param: 'dtid',
          // exact: true,
          // url: '/dashboard/'+enterpriseCode+'/',
          onClick: handleOnClickViewWorkbook,
          type: 'button',
        },
        {
          htmlId: 'ViewWorkbookButton',
          buttonStyle: 'primary',
          className: 'btn btn-primary',
          text: entepriseTranslate.importData,
          isDisabled: handleDisabledImportBtn,
          onClick: handleOnClickImport,
          // onChange: this.handleImport,
          type: 'button',
        },
        {
          htmlId: 'ViewWorkbookButton',
          buttonStyle: 'primary',
          className: 'btn btn-primary',
          text: entepriseTranslate.exportDMS,
          isDisabled: handleDisabledExportBtn,
          onClick: handleOnClickExportToDms,
          // url: "/workbooks/",
          type: 'button',
        },
        {
          htmlId: 'ViewWorkbookButton',
          buttonStyle: 'primary',
          className: 'btn btn-primary',
          text: entepriseTranslate.copyData,
          isDisabled: handleDisabledCopyDataBtn,
          onClick: handleOnClickCopyData,
          type: 'button',
        },
        {
          htmlId: 'ViewWorkbookButton',
          buttonStyle: 'primary',
          className: 'btn btn-primary',
          text: entepriseTranslate.moveInprogress,
          isDisabled: handleDisabledMoveInProgessBtn,
          onClick: handleOnClickMoveInProgress,
          type: 'button',
        },
        {
          htmlId: 'deleteButton',
          buttonStyle: 'danger',
          className: 'table-delete-button',
          text: commonTranslate.delete,
          isDisabled: handleDisabledDeleteBtn,
          onClick: handleShowDeleteModal,
          type: 'button',
        }
      ]
    },
  ];
}
