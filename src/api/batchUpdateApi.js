import api from '../utils/Http';
import { batchUpdateActions, globalActions } from '../actions';

export function batchUpdateByField(params) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      // @todo need to update the url, based on the api endpoint when ready
      const url = "";
      // http.post(url, params)
      http.post("UpdateColumnData", params)
        .then(res => {
          dispatch(batchUpdateActions.batchUpdateByField(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
