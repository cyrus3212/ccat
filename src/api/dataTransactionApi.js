import api from '../utils/Http';
import { dataTransactionActions, globalActions } from '../actions';

/**
 * Method used to import data
 *
 * @param {*} params
 * @param {*} url
 */
// export function importData(params, url='') {
//   const http = api('data');
//   return dispatch => (
//     new Promise((resolve, reject) => {
//       http.get(url+params)
//         .then(res => {
//           dispatch(dataTransactionActions.fetchImport(res.data));
//           return resolve();
//         })
//         .catch((err) => globalActions.processError(err, reject));
//     })
//   );
// }

export function importData(params, url='') {
  console.log('params', params);
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(dataTransactionActions.fetchImport(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function fetchDataTransaction(params, url='/Stores') {
  const { enterpriseCode, dtid } = params.paramsData;
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+params.storeURL+'?enterpriseCode='+enterpriseCode+'&sourceDTID='+dtid)
        .then(res => {
          dispatch(dataTransactionActions.fetchDataTransaction(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function saveDataTransaction(params, url='/Stores') {
  const { enterpriseCode, dtid } = params.paramsData;
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.put(url+params.storeURL+'?enterpriseCode='+enterpriseCode+'&dtid='+dtid)
        .then(res => {
          dispatch(dataTransactionActions.saveDataTransaction(res.data));
          return resolve(res.data);
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

/**
 * Used this method to copy data or export data to DMS
 *
 * @param {*} params
 * {
 *  "enterpriseCode": "string",
 *  "sourceDTID": "string",
 *  "destinationDTID": "string",
 *  "copyAllWorkbooksAndPages": true,
 *  "workbooks": [
 *    ]
 * }
 */
export function copyOrExportData(params, url='') {
  console.log('params', params);
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(dataTransactionActions.copyData(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
