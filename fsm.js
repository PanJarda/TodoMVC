
class Text {
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

class Tag {
  constructor(name, init) {
    this.value = init
    this.dom = document.createElement(name)
    this.dom.innerText = init
  }
  set(value) {
    this.vlaue = value
    this.dom.innerText = value
  }
  get() {
    return this.value
  }
}

function tag(tag) {
  return function(value) {
    return new Tag(tag, value)
  }
}

class List {
  constructor(tag, container, init) {
    this.container = container
    this.value = init.map(container)
    this.dom = document.createElement(tag)
    this.value.forEach(item => this.dom.appendChild(item.dom))
  }
  push(item) {
    var node = this.container(item)
    this.value.push(node)
    console.log(this.value)
    this.dom.appendChild(node.dom)
  }
  pop() {
    let last = this.value.pop()
    this.dom.removeChild(last.dom)
  }
}

function h(tag, attrs, ...children) {
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

var fragment = {
  value: new List('ul', tag('li'), [1,2,3]),
  render: function() {
    return h('div', {}, this.value.dom)
  }
}
