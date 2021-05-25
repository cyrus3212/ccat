import api from '../utils/Http';
import { clearDataActions, globalActions } from '../actions';

/**
 * Post the clear data
 *
 * @param {*} params /api/Data/ClearData
 * @param {*} url <https://<api_url>/url/params
 */
export function postClearData(params) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post('ClearData', params)
        .then(res => {
          dispatch(clearDataActions.clearData(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

