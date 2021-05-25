import api from '../utils/Http';
import { workbookActions, globalActions } from '../actions';

/**
 * Get all the workbook, displayed on the dashboard
 *
 * @param {*} params enterpriseCode/dtid
 * @param {*} url <https://<api_url>/Dashboard/enterpriseCode/dtid
 */
export function getDashboardWorkbook(params='', url='Dashboard/') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+`${params.code}/${params.dtid}`)
        .then(res => {
          dispatch(workbookActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

/**
 * Get all the sections as summary on the specific workbook
 *
 * @param {*} params workbook/enterpriseCode/dtid
 * @param {*} url <https://<api_url>/url/params
 */
export function getReviewWorkbook(params, url='Dashboard/') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+`${params.code}/${params.dtid}?workbook=${params.workbook}`)
        .then(res => {
          dispatch(workbookActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

/**
 * Post the complete workbook
 *
 * @param {*} params /api/Data/CompleteWorkbook
 * @param {*} url <https://<api_url>/url/params
 */
export function postCompleteWorkbook(params) {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post('CompleteWorkbook', params)
        .then(res => {
          dispatch(workbookActions.complete(res.data));
          return resolve();
        })
        .catch((err, reject) => globalActions.processError(err, reject));
    })
  );
}
