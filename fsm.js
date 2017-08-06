
class TextNode {
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

class Fragment {
  constructor(dom, init = []) {
    this.value = init
    this.dom = dom
    init.forEach(item => dom.appendChild(item))
  }
  push(item) {
    this.value.push(item)
    this.dom.appendChild(item.dom)
  }
  pop() {
    let last = this.value.pop()
    this.dom.removeChild(last.dom)
  }
  mod(index, val) {
    this.value[index].set(val)
  }
  remove(index) {
    this.dom.removeChild(this.value[index])
    this.value.splice(index, 1)
  }
  insertAt(index, item) {
    this.value.splice(index, 0, item)
    this.dom.insertBefore(item, this.value[index + 1])
  }
}

// hyperscript - it is standard for creating dom nodes
function h(tag, attrs, ...children) {
  var dom = document.createElement(tag)

  for (attr1 in attrs) {
    if (attr1.startsWith('on'))
      dom.addEventListener(attr1.substring(2), attrs[attr1])
    else
      dom.setAttribute(attr1, attrs[attr1])
  }

  if (typeof children[0] === 'string')
    dom.innerText = children[0]
  else 
    children.forEach(ch => dom.appendChild(ch))

  return dom
}