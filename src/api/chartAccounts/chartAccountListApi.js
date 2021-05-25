import api from '../../utils/Http';
import { chartAccountActionsList, globalActions } from '../../actions';

/**
 * Used to get the review accounts data
 *
 * @param {*} params enterpriseCode/dtid/workbook/section
 * @param {*} url http://<api_url>/data
 */
export function getReviewAccount(url) {
  // let url = `data/${enterpriseCode}/${dtid}/${workbook}/${section}`;
  const http = api('data');
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(chartAccountActionsList.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
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
          dispatch(chartAccountActionsList.update(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

/**
 * Used to import review account
 *
 * @param {*} params enterpriseCode/dtid/workbook/section/import
 * @param {*} url http://<api_url>/data
 */
export function importReviewAccount(params, url) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url , params)
        .then(res => {
          dispatch(chartAccountActionsList.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
