import api from '../../utils/Http';
import { salesfiSectionListActions, globalActions } from '../../actions';

const http = api('data');

export function getSalesFIList(url='') {
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(salesfiSectionListActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}
