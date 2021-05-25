export function getUid() {
  return (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

export function getCorrelationId() {
  return getUid()+"-"+getUid()+"-"+getUid()+"-"+getUid()+"-"+getUid();
}

export function getUidInteger() {
  return Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
}
