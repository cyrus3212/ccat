export function generateModalForm(handleInputOnChange, copyAllTogle, errorFields, coaOptions, acnOptions, sfiOptions, prtOptions, srvOptions, pyrOptions, title) {
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
          dataIndex: 'copyAllTogle',
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
      columns: [
        {
          label:"Add Workbooks and Pages",
          className: "title",
          type: copyAllTogle === false ? "header" : null
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
                  label: "Charts Of Account",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  required: true,
                  maxLength: 3,
                  dataIndex: 'CHR',
                  options:coaOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12
                }
              ]
            },
            {
              columns: [
                {
                  label: "Accounting",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  maxLength: 25,
                  required: true,
                  dataIndex: 'ACN',
                  options:acnOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12,
                }
              ]
            },
            {
              columns: [
                {
                  label: "Sales and F&I",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  maxLength: 25,
                  required: true,
                  dataIndex: 'SFI',
                  options:sfiOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12,
                }
              ]
            },
            {
              columns: [
                {
                  label: "Parts",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  maxLength: 25,
                  required: true,
                  dataIndex: 'PRT',
                  options:prtOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12,
                }
              ]
            },
            {
              columns: [
                {
                  label: "Service",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  maxLength: 25,
                  required: true,
                  dataIndex: 'SRV',
                  options:srvOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12,
                }
              ]
            },
            {
              columns: [
                {
                  label: "Payroll",
                  type: "searchableSelect",
                  onChange: handleInputOnChange,
                  validationResult: errorFields,
                  maxLength: 25,
                  required: true,
                  dataIndex: 'PYR',
                  options:pyrOptions,
                  mdColSize: 12,
                  labelColSize: 12,
                  InputColSize: 12,
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
