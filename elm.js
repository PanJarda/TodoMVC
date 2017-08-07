/*********************************************************
 * HELPERS
 *********************************************************/

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * Functional programming
 */

/*
 * for each object key apply callback
 */
function each(object, callback) {
  Object.keys(object).forEach(callback)
  return object
}

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * DOM manipulation
 */

/*
 * create textNode
 */
function txtNode(txt) {
  return document.createTextNode(txt)
}

/*
 * set attributes of given node
 */
function setAttrs(node, attrs) {
  each(attrs,
    a => node.setAttribute(a, attrs[a]))
  return node
}

/*
 * add event listeners to given node
 */
function addEventListeners(node, events) {
  each(events,
    e => node.addEventListener(e, events[e]))
  return node
}

/*
 * append children to given node
 */
function appendChildren(node, children) {
  children.forEach(ch => node.appendChild(ch))
  return node
}

/*
 * create DOM node
 */ 
function domNode(type, props, events, children) {
  return appendChildren(
    addEventListeners(
      setAttrs(
        document.createElement(type),
        props),
      events),
    children)
}

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * Framework
 */

/*
 * hyperscript - creates virtual dom tree
 */
function h(tag, props, events, ...children) {
  return {tag, props, events, children}
}

/*
 * vdom -> dom
 */
function vdom2dom(node) {
  return typeof node === 'string' || typeof node === 'number' ?
          txtNode(node) :
          domNode(
            node.tag,
            node.props,
            node.events,
            node.children.map(vdom2dom))
}

/*********************************************************
 * APP
 *********************************************************/

const initState = {
  text: 'ahoj',
  counter: 0
}

function update(state, action) {
  return action.type == 'inc'
          ? Object.assign({}, state, {counter: state.counter + 1})
          : state
}

function render(state, handler) {
  return h('div', {class: 'ahoj'}, {},
            h('button', {}, {mousedown: handler}, '+'),
            h('div', {}, {}, state.counter))
}

function main(dom) {
  dom.appendChild(
    vdom2dom(
      render(
        initState,
        ()=>console.log('ahoj'))))
}
