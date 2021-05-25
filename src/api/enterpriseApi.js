import api from '../utils/Http';
import { enterpriseActions, globalActions } from '../actions';
// import { importReviewAccount } from './chartAccounts/chartAccountListApi';

export function getEnterprise(url = 'Enterprises') {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(enterpriseActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject)
        );
    })
  );
}

export function getEnterpriseDetail(id, url = 'Enterprises/') {
  const http = api();
  url = url + id;
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(enterpriseActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function addEnterprise(params) {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post('Enterprises', params)
        .then(res => {
          dispatch(enterpriseActions.add(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function removeEnterprise(id) {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.delete(`Enterprises/${id}`)
        .then(res => {
          dispatch(enterpriseActions.remove(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function updateEnterprise(params) {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.put(`Enterprises/${params.enterprise.id}`, params)
        .then(res => {
          dispatch(enterpriseActions.update(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
