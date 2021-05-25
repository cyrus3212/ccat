import { workbookSectionActions } from '../actions';

export function getCurrentWorkbookSection() {
  return dispatch => (
    dispatch(workbookSectionActions.fetch())
  );
}

export function addCurrentWorkbookSection(params) {
  return dispatch => (
    dispatch(workbookSectionActions.add(params))
  );
}

export function updateCurrentWorkbookSection(params) {
  return dispatch => (
    dispatch(workbookSectionActions.update(params))
  );
}
