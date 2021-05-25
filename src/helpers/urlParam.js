export function getParam() {
  return window.location.href.split('/')[window.location.href.split('/').length - 1];
}

export function getUrlWithParams(props, state) {
  const { code, dtid, name, section } = props;
  const { limit, page, sortBy, sortType, searchVal, searchBy } = state;
  let param = [];
  let queryString = '';

  if (limit) {
    param.push('limit=' + limit);
  }

  if (sortBy) {
    param.push('sortBy=' + sortBy);
  }

  if (sortType) {
    param.push('sortType=' + sortType);
  }

  if (page) {
    param.push('page=' + page);
  }

  if (searchVal) {
    param.push('search=' + searchVal);
  }

  if (searchBy) {
    param.push('searchBy=' + searchBy);
  }

  if (param.length) {
    queryString = '?' + param.join('&');
  }

  return `${code}/${dtid}/${name}/${section}${queryString}`;
}
