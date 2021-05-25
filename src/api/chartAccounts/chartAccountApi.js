import api from '../../utils/Http';
import { chartAccountActions, globalActions } from '../../actions';

/**
 * Save the review account
 *
 * @param {*} params enterpriseCode/dtid/workbook/section
 * @param {*} url http://<api_url>/data
 */
export function addReviewAccount(params, url) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url , params)
        .then(res => {
          dispatch(chartAccountActions.add(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

/**
 * Update review account
 *
 * @param {*} params enterpriseCode/dtid/workbook/section
 * @param {*} url http://<api_url>/data
 */
export function updateReviewAccount(params, url) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(chartAccountActions.update(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
