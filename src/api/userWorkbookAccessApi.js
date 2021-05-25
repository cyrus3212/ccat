import api from '../utils/Http';
import { userWorkbookAccessActions, globalActions } from '../actions';

/**
 * Get the user workbook access
 *
 * @param {*} params userId/enterpriseCode/dtid/workbook
 * @param {*} url http://<api_url>/EnterpriseUsers/HasAccess?UserId=106&EnterpriseCode=ADAM&DTID=111111&WorkbookCode=BOT
 */
export function getUserWorkbookAccess(params, url='EnterpriseUsers/HasAccess?') {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+params)
        .then(res => {
          dispatch(userWorkbookAccessActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
