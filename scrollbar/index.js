const ctrButton = document.getElementById('ctr-start');
const psScrollbar = document.getElementById('use-perfect-scrollbar');
const useSmooth = document.getElementsByName('use-smooth')[0];
const box = document.getElementById('box');

let ps;
let autoScroll = false;
let timer;

const startScroll = () => {
  let scrollLeft = box.scrollLeft;
  if (scrollLeft < 402) {
    scrollLeft += 100
  } else {
    scrollLeft = 0;
  }
  box.scrollLeft = scrollLeft;
}
ctrButton.addEventListener('click', () => {
  if (autoScroll) {
    autoScroll = false;
    clearInterval(timer);
    ctrButton.innerText = "Start";
  } else {
    autoScroll = true;
    timer = setInterval(startScroll, 1 * 1000)
    ctrButton.innerText = "Stop";
  }
});

psScrollbar.addEventListener('click', () => {
  const disablePSScroll = box.classList.contains('use-perfect-scroll');
  let text = 'Enable Perfect Scrollbar';
  if (disablePSScroll) {
    box.classList.remove('use-perfect-scroll');
    ps && ps.destroy();
    ps = null;
  } else {
    box.classList.add('use-perfect-scroll');
    text = 'Disable Perfect Scrollbar';
    ps = new PerfectScrollbar(box);
  }
  psScrollbar.innerText = text;
})

useSmooth.addEventListener('change', (e) => {
  e.target.checked ? box.classList.add('use-smooth') : box.classList.remove('use-smooth');
})