const now = document.querySelector('.now');
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
const body = document.body;

function Horizontal() {
  const style = `
    width: ${clientHeight}px;
    height: ${clientWidth}px;
    -webkit-transform-origin: ${clientWidth / 2}px ${clientWidth / 2}px;
    -webkit-transform: rotate(90deg);
    transform-origin: ${clientWidth / 2}px ${clientWidth / 2}px
    transform: rotate(90deg); 
  `;
  body.setAttribute('style', style);
}

function Vertical() {
  const style = `
    width: 100%;
    height: 100%;
    -webkit-transform-origin: 0px 0px;
    -webkit-transform: rotate(0);
    transform-origin: 0px 0px
    transform: rotate(0); 
  `;
  body.setAttribute('style', style);
}

function handleOrientation(event) {
  const beta = event.beta;
  const gamma = event.gamma;

  const betaBetween = beta >= -30 && beta <= 30;
  const gammaBetween = gamma >= -45 && gamma <= 45;
  if (!gammaBetween && betaBetween) {
    now.innerHTML = '横屏';
    Horizontal();
  } else if (gammaBetween && !betaBetween) {
    now.innerHTML = '竖屏';
    Vertical();
  }
}

window.addEventListener('deviceorientation', handleOrientation);
