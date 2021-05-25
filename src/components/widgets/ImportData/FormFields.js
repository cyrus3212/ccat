export function generateModalForm(handleInputOnChange, copyAllTogle, errorFields, coaOptions, acnOptions, sfiOptions, prtOptions, srvOptions, pyrOptions, title, isWorkbookSections, workbookList) {

  return [
    {
      columns: [
        {
          label: "",
          type: "checkboxH",
          onChange: handleInputOnChange,
          validationResult: errorFields,
          required: false,
          maxLength: 1,
          dataIndex: 'importAllTogle',
          mdColSize: 12,
          labelColSize: 12,
          InputColSize: 12,
          options:[
            { value:'1', label:`${title+' All Workbooks and Pages'}` }
          ]
        }
      ]
    },
    {
      columns:[
        {
          type:"spaceCol"
        }
      ]
    },
    {
      columns: [
        {
          className: copyAllTogle === false ? 'sectionSelectGroup visible' : 'hide',
          type: "section",
          sections: [
            {
              columns: [
                {
                  label: "Workbook List",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  required: true,
                  maxLength: 3,
                  dataIndex: 'workbooks',
                  options:workbookList,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12
                }
              ]
            },
            {
              columns: [
                {
                  type: "spaceCol"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
