/*########################################################
 # elm.js
 # 
 # Readable Elm architecture proof-of-concept
 # in plain ES6 without using any libraries, frameworks
 # and transpilers.
 # Main goals: simplicity & readability.
 # 
 ########################################################*/

'use strict'

/*********************************************************
 * HELPERS
 *********************************************************/

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * Functional programming
 */

/*
 * for each object key apply callback
 */
function each (object, callback) {
  Object.keys(object).forEach(callback)
  return object
}

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * DOM manipulation
 */

/*
 * create textNode
 */
function newTextNode (txt) {
  return document.createTextNode(txt)
}

/*
 * set attributes of given node
 */
function setAttrs (node, attrs) {
  each(attrs, a =>
    node.setAttribute(a, attrs[a]))
  return node
}

/*
 * add event listeners to given node
 */
function addEventListeners (node, events) {
  each(events, e =>
    node.addEventListener(e, events[e]))
  return node
}

/*
 * append children to given node
 */
function appendChildren (node, children) {
  children.forEach(ch =>
    node.appendChild(ch))
  return node
}

/*
 * replaceChild wrapper
 */
function replaceChild (parent, oldNode, newNode) {
  parent.replaceChild(newNode, oldNode)
  return parent
}

/*
 * create DOM node
 */
function newDOMNode (type, props, events, children) {
  return appendChildren(
    addEventListeners(
      setAttrs(
        document.createElement(type),
        props),
      events),
    children)
}

/* . . . . . . . . . . . . . . . . . . . . . . . . . . . .
 * Virtual DOM
 */

/*
 * hyperscript - creates virtual DOM tree
 */
function h (tag, props, events, ...children) {
  return { tag, props, events, children }
}

/*
 * VDOM -> DOM
 */
function vdom2dom (node) {
  return typeof node === 'string' || typeof node === 'number' ?
          newTextNode(node) : newDOMNode(
                                node.tag,
                                node.props,
                                node.events,
                                node.children.map(vdom2dom))
}

/*
 * diff two virtual DOM trees
 * return array of actions needed to rebuild DOM
 * for example:
 * [{
 *   node: <oldNode>,
 *   action: 'replace',
 *   param: { parent, newNode }
 * },
 * {
 *   node: <oldNode>,
 *   action: 'update',
 *   param: { props, events }
 * },
 * {
 *   node: <oldNode>,
 *   action: 'remove'
 *   param: <parentNode>
 * }]
 */
function diff (oldNode, newNode) {

}

/*
 * patches DOM - apply differences to DOM
 */
function patch (diff) {
  diff.forEach(({ node, action, param }) => {
    action === 'replace' ?
      replaceChild(
        param.parent,
        node,
        param.newNode) :
    action === 'update' ?
      updateParam(
        node,
        param.props,
        param.events) :
    action === 'remove' ?
      removeChild(
        param.parent,
        node) : false
  })
}

/*********************************************************
 * APP
 *********************************************************/

const initState = {
  text: 'ahoj',
  counter: 0
}

function update (state, action) {
  return action.type == 'inc'
          ? Object.assign({}, state, { counter: state.counter + 1 })
          : state
}

function render (state, handler) {
  return h('div', { class: 'ahoj' }, {},
            h('button', {}, { mousedown: handler }, '+'),
            h('div', {}, {}, state.counter))
}

function main (dom) {
  dom.appendChild(
    vdom2dom(
      render(
        initState,
        ()=>console.log('ahoj'))))
}
