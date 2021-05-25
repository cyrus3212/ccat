import api from '../../utils/Http';
import { partsSectionListActions, globalActions } from '../../actions';

export function getPartsList(url='') {
  return dispatch => {
    const http = api('data');
    http.get(url)
      .then((res) => {
        dispatch(partsSectionListActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}
