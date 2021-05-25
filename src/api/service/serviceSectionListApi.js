import api from '../../utils/Http';
import { serviceSectionListActions } from '../../actions';

export function getServiceList(url='') {
  const http = api('data');
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(serviceSectionListActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}
