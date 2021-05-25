import _ from 'lodash';

export function compareArray(value1, value2) {
  return _(value1).xorWith(value2, _.isEqual).isEmpty();
}
