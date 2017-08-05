
class text {
  constructor(init = '') {
    this.value = init
    this.dom = document.createTextNode(init)
  }
  set(value) {
    this.value = value
    this.dom.nodeValue = value
  }
  get() {
    return this.value
  }
}

class tag {
  constructor(name, init) {
    this.value = init
    this.dom = document.createElement(name)
  }
  set(value) {
    this.vlaue = value
    this.dom.innerText = value
  }
  get() {
    return this.value
  }
}

class fragment {
  constructor(init, container) {
    this.value = init
    this.dom = document.createDocumentFragment()
  }
  push(item) {
    this.value.push(item)
    this.dom.appendChild(item.dom)
  }
  pop() {
    let last = this.value.pop()
    this.dom.removeChild(last.dom)
  }
}

function fp(tag, attrs) {
  return function (item) {
    var dom = document.createElement(tag)
    for (attr1 in attrs) {
      if (attr1.startsWith('on'))
        dom.addEventListener(attr1.substring(2), attrs[attr1])
      else
        dom.setAttribute(attr1, attrs[attr1])
    }
    dom.appendChild(item)
    return dom
  }
}

function f(tag, attrs, ...children) {
  if (typeof tag !== 'string')
    return tag
  var dom = document.createElement(tag)

  for (attr1 in attrs) {
    if (attr1.startsWith('on'))
      dom.addEventListener(attr1.substring(2), attrs[attr1])
    else
      dom.setAttribute(attr1, attrs[attr1])
  }

  children.forEach(ch => dom.appendChild(ch))
  return dom
}

var component = {
  value: text(1),
  render: function() {
    return f('button', {onmousedown: () => this.value.set(this.value.get()+1)}, this.value.dom)
  }
}

var component2 = {
  value: [1, 2, 3, 4],
  render: function() {
    return f('ul', {}, this.value.map(v => f('li', {}, v.toString())))
  }
}
