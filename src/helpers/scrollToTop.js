function currentYPosition () {
  if (self.pageYOffset) return self.pageYOffset;
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function scrollToTop() {
  let startY = currentYPosition()
  let stopY = 0;
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  let speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
      for ( let i=startY; i<stopY; i+=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
  }
  for ( let i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
  return false;
}

export default scrollToTop;
