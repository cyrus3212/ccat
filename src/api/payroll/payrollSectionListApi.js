import api from '../../utils/Http';
import { payrollSectionListActions, globalActions } from '../../actions';

export function getPayrollList(url='') {
  const http = api('data');
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(payrollSectionListActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}
