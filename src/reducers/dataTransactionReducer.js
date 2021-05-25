import {
  EXPORT_DATA_TRANSACTION,
  IMPORT_DATA_TRANSACTION,
  PROCESS_DATA_TRANSACTION,
  PROCESS_COPY_DATA,
  FETCH_DATA_TRANSACTION
} from '../actionTypes';

const initialState = {
  data: []
};

const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case EXPORT_DATA_TRANSACTION:
      return payload;
    case IMPORT_DATA_TRANSACTION:
      return payload;
    case PROCESS_DATA_TRANSACTION:
      return payload;
    case PROCESS_COPY_DATA:
      return payload;
    case FETCH_DATA_TRANSACTION:
      return payload;
    default:
      return state;
  }
};

export default reducer;
