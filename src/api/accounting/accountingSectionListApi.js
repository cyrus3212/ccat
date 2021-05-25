import api from '../../utils/Http';
import { accountingSectionListActions, globalActions } from '../../actions';

export function getAccountingList(url='') {
  const http = api('data');
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(accountingSectionListActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}
