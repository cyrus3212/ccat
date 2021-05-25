import {getSectionCode} from './sectionCodeHelper';

export function routePath(component) {
  if (component === 'dashboard') {
    return '/dashboard/:code/:dtid/:name?';
  }

  if (component === 'workbook') {
    return '/workbooks/:name/:code/:dtid/:section?';
  }

  if (component === 'review') {
    return '/reviews/:name/:code/:dtid?';
  }

  if (component === 'complete') {
    return '/complete/:name/:code/:dtid?';
  }

  if (component === 'configure') {
    return '/configure/:code/:dtid?';
  }
}

export function getSectionLink(match, sectionName) {
  if (sectionName === 'dashboard') {
    return `/dashboard/${match.code}/${match.dtid}/${match.name}`;
  } else if (sectionName === 'complete') {
    return `/complete/${match.name}/${match.code}/${match.dtid}`;
  } else if (sectionName === 'review') {
    return `/reviews/${match.name}/${match.code}/${match.dtid}`;
  }
  else {
    if (sectionName === '' || sectionName === null || sectionName === undefined) {
      return `/workbooks/${match.name}/${match.code}/${match.dtid}`;
    }
    else {
      return `/workbooks/${match.name}/${match.code}/${match.dtid}/${getSectionCode(sectionName)}`;
    }

  }
}


export  function getWorkbookUrl(match) {
  return `${match.code}/${match.dtid}/${match.name}/${match.section}`;
}
