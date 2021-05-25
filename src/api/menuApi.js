import api from '../utils/Http';
import { menuActions, globalActions } from '../actions';

export function getAdminMenu(url) {
  const http = api('local');
  return dispatch => {
    const response = [{
      "id": 1,
      "code": "administrator",
      "name": "Administrator",
      "label": "Administrator",
      "tooltip": "Administrator"
    }];

    http.get(url)
      .then((res) => {
        dispatch(menuActions.list(response));
      })
      .catch((err) => {
        return err;
      });
  };
}

export function getMenuWorkbooks(params='', url='Menu/') {
  const http = api();
  return dispatch => {
    http.get(url+params)
      .then((res) => {
        dispatch(menuActions.list(res.data));

      })
      .catch((err) => {
        return err;
      });
  };
}

