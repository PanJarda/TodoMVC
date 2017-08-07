/*********************************************************
 * HELPERS
 *********************************************************/

// create textNode
function txtNode(txt) {
  return document.createTextNode(txt)
}

function setAttrs(node, attrs) {
  Object.keys(attrs).forEach(a => node.setAttribute(a, attrs[a]))
  return node
}

function addEventListeners(node, events) {
  Object.keys(events).forEach(e => dom.addEventListener(e, events[e]))
  return node
}

function appendChildren(node, children) {
  children.forEach(dom.appendChild)
  return node
}

// createElement
function domElement(type, props, events, children) {
  return appendChildren(
    addEventListeners(
      setAttrs(
        document.createElement(type),
        props),
      events),
    children)
}

// hyperscript - creates virtual dom tree
function h(tag, props, ...children) {
  return {tag, props, children}
}

// vdom -> dom
function vdom2dom({tag, props, events, children}) {
    return typeof node === 'string' || typeof node = 'number' ?
            txtNode(node) :
            domElement(tag, props, events, children.map(vdom2dom))
}

/*********************************************************
 * APP
 *********************************************************/

const initState = {
  text: 'ahoj',
  counter: 0
}

function update(state, action) {
  if (action.type == 'inc')
    return Object.assign({}, state, {counter: state.counter + 1})
}

function render(state, handler) {
  return h('div', {}, 
            h('button', {onmousedown: handler}, '+'),
            h('div', {}, state.counter.toString()))
}

function main(dom) {
  dom.appendChild(vdom2dom(render(initState), update.bind(null, {state: initState, action: {type: 'inc'}})))
}