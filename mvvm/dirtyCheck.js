const elems = [
  document.getElementById('input'),
  document.getElementById('display'),
]
const data = {
  value: "",
};

const command = {
  text: function (display) {
    this.innerText = 'Text from input: ' + display;
  },
  value: function (input) {
    if (typeof input === 'string') {
      this.setAttribute('value', input);
    }
  }
}

const scan = function () {
  elems.forEach(elem => {
    const attrs = elem.attributes;
    const attr = Array.prototype.find.call(attrs, (s) => {
      return s.nodeName === 'q-event';
    });
    if (attr) {
      elem.command = {};
      const commandName = attr.nodeValue;
      const cmd2Apply = command[commandName];
      const dataKey = elem.getAttribute('q-bind');
      cmd2Apply && cmd2Apply.call(elem, data[dataKey]);
      elem.command[commandName] = data[dataKey];
    }
  });
}

// digist is used to dirty check on the element
// which bind to our data binding system
const digist = function (elems) {
  const len = elems.length;
  for(let i = 0; i < len; i += 1) {
    const elem = elems[i];
    const attrs = elem.attributes;
    for(let j = 0; j < attrs.length; j += 1) {
      const attr = attrs[j];
      if (attr.nodeName === 'q-event') {
        const dataKey = elem.getAttribute('q-bind');
        if (elem.command[attr.nodeValue] !== data[dataKey]) {
          command[attr.nodeValue].call(elem, data[dataKey]);
          elem.command[attr.nodeValue] = data[dataKey];
        }
      }
    }
  }
}
const $digist = function (value) {
  const list = document.querySelectorAll(`[q-bind=${value}]`);
  console.log(list);
  digist(list);
}
elems[0].addEventListener('keyup', (e) => {
  const value = e.target.value;
  const dataKey = e.target.getAttribute('q-bind');
  console.log(dataKey);
  data[dataKey] = value;
  $digist(dataKey);
})

scan();