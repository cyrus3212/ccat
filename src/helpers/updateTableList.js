export function updateTableList(updatedRow, list) {
  let updatedList  = [];
  // let rowId = updatedRow.id || updatedRow.cId || updatedRow.rid;

  list.map(res => updatedList.push(res));

  let selectedRow = updatedList.findIndex(selectedRow => {
    if (selectedRow.id) {
      return selectedRow.id === updatedRow.id;
    }

    if (selectedRow.cId) {
      return selectedRow.cId === updatedRow.cId;
    }

    if (selectedRow.rid) {
      return selectedRow.rid === updatedRow.rid;
    }
  });

  updatedList[selectedRow] = updatedRow;

  if (selectedRow < 0) {
    updatedList.push(updatedRow);
  }

  return updatedList;
}
