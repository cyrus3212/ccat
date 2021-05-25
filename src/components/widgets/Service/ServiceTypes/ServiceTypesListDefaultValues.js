import React from 'react';

export function serviceTypesListDefaultValues () {
  return [
    { prFrom: '0.01',   prTo: '1.00',     prPercent: '360', key:'1', id:'1'},
    { prFrom: '1.01',   prTo: '5.00',     prPercent: '300', key:'2', id:'2'},
    { prFrom: '5.01',   prTo: '10.00',    prPercent: '275', key:'3', id:'3'},
    { prFrom: '10.01',  prTo: '15.00',    prPercent: '260', key:'4', id:'4'},
    { prFrom: '15.01',  prTo: '25.00',    prPercent: '200', key:'5', id:'5'},
    { prFrom: '25.01',  prTo: '99999.00', prPercent: '180', key:'6', id:'6'},
  ]
}
