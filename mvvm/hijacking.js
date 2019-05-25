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
      return s.nodeName.startsWith('q-');
    });
    if (attr) {
      const commandName = attr.nodeName.slice(2);
      const cmd2Apply = command[commandName];

      cmd2Apply && cmd2Apply.call(elem, data[attr.nodeValue]);
    }
  });
}
const updateData = (key, value) => {
  data[key] = value;
}
let currentValue = '';
const defineGetAndSet = function (obj, propName) {
  Object.defineProperty(obj, propName, {
    get: function () {
      return currentValue;
    },
    set: function (newValue) {
      currentValue = newValue;
      scan(); // update data to view
    }
  });
}
elems[0].addEventListener('keyup', (e) => {
  const value = e.target.value;
  updateData('value', value);  // 1 ---> update model
});
defineGetAndSet(data, 'value')
scan();