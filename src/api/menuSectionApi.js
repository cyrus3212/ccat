import api from '../utils/Http';
import { menuSectionActions, globalActions } from '../actions';

/**
 * Method used to get the workbook sectionmenus
 *
 * @param {*} EnterpriseCode/DTID/WorkbookName
 * @param {*} Menu/ADAM/store1/SFI
 */
export function getWorkbookSections(params, url='Menu/') {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+params)
        .then(res => {
          dispatch(menuSectionActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
