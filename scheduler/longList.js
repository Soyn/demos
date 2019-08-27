let documentFragment = document.createDocumentFragment();
let display = document.getElementById('display');
let elementsToAdd = [];
let isVisualUpdateScheduled = false;

const appendDocumentFragment = () => {
  display.appendChild(documentFragment);
  documentFragment = null;
  isVisualUpdateScheduled = false;
}
const scheduleElementCreation = () => {
  requestIdleCallback(processPendingElements);
}
// use requestAnimationFrame to schedule dom change
const scheduleVisualUpdateIfNeed = () => {
  if(isVisualUpdateScheduled) return;

  isVisualUpdateScheduled = true;
  requestAnimationFrame(appendDocumentFragment);
}
const appendChildToFragment = (child) => {
  const elementToAdd = document.createElement(child.tag);
  const el = documentFragment.appendChild(elementToAdd);
  el.setAttribute('class', child.classname);
  el.textContent = child.text;
}

const processPendingElements = (dedaline) => {
  if (typeof dedaline === 'undefined') {
    dedaline = {
      timeRemaining: function () {
        return Number.MAX_VALUE;
      }
    }
  }

  if (!documentFragment) documentFragment = document.createDocumentFragment();
  while(dedaline.timeRemaining() > 0 && elementsToAdd.length > 0) {
    const task = elementsToAdd.pop();
    appendChildToFragment(task);
  }
  if (elementsToAdd.length) { // Check if there are more events still to send
    scheduleElementCreation();
  }
  scheduleVisualUpdateIfNeed();
}
const count = 1000;
const useCallback = () => {
  const task = {
    tag: 'div',
    text: 'Div Element From Request Callback',
    classname: 'callback'
  }
  for(let i = 0; i < count; i += 1) {
    elementsToAdd.push(task);
  }
  scheduleElementCreation();
}
const rawAppendElement = () => {
  for(let i = 0; i < count; i += 1) {
    const el = document.createElement('div');
    el.textContent = 'Div Element From Raw';
    el.setAttribute('class', 'raw');
    display.appendChild(el);
  }
}

document.getElementById('callback').addEventListener('click', useCallback)
document.getElementById('raw').addEventListener('click', rawAppendElement)
document.getElementById('clear').addEventListener('click', () => {
  while(display.lastChild) {
    display.removeChild(display.lastChild)
  }
})