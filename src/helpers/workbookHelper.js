export function getParams (model, summary) {
  let params = {
    model: [model],
    summary
  };

  return params;
}

export function generateProps (columns) {
  let data = {};

    columns.map(col => {
      if (col.type !== 'actionButtons') {
        data[col.dataIndex] = '';
      }
    });

  return data;
}
