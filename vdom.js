
'use strict'

function h(tag, ...args) {
  var res = {tag}

  if (!args.length)
    return res
  
  if (!Array.isArray(args[0]) && args[0] instanceof Object && !args[0].tag)
      res.attrs = args.shift()

  if (args.length)
    res.children = [].concat(...args)

  return res
}

function render(vnode) {
  var dom = document.createElement(vnode.tag)
  vnode.dom = dom

  if (vnode.attrs) {
    let attr1
    for (attr1 in vnode.attrs) {
      if (attr1.startsWith('on'))
        dom.addEventListener(attr1.substring(2), vnode.attrs[attr1])
      else
        dom.setAttribute(attr1, vnode.attrs[attr1])
    }
  }

  if (!vnode.children)
    return vnode

  if (vnode.children.length && typeof vnode.children[0] === 'string')
    dom.innerText = vnode.children[0]
  else
    vnode.children.forEach(c => dom.appendChild(render(c).dom))

  return vnode
}

function diff(a, b) {
  if (a.tag != b.tag)
    a.dom.parentNode.replaceChild(render(b).dom, a.dom)

  b.dom = a.dom

  var la = a.children.length
  var lb = b.children.length
  for (var i = 0; i < lb || i < la; i++) {
    diff(a.children[i], b.children[i])
  }

  b.dom.appendChild(frg)

  return b
}
