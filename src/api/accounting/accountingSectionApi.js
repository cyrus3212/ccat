import api from '../../utils/Http';
import { accountingSectionActions, globalActions } from '../../actions';

export function getAccountingSection(url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(accountingSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function addAccountingSection(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(accountingSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function removeAccounting(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.delete(url, {data: params})
        .then(res => {
          dispatch(accountingSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function updateAccountingSection(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(accountingSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
