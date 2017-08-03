
'use strict'

function h(tagName, ...args) {
	var res = {tagName}

	if (!args.length)
		return res
	
	if (args[0] instanceof Object && !args[0].tagName)
			res.props = args.shift()

	if (args.length)
		res.children = [].concat(...args)

	return res
}

function render(vnode) {
	var DOMNode = document.createElement(vnode.tagName)

	if (vnode.props) {
		let prop
		for (prop in vnode.props) {
			if (prop.startsWith('on'))
				DOMNode.addEventListener(prop.substring(2), vnode.props[prop])
			else
				DOMNode.setAttribute(prop, vnode.props[prop])
		}
	}

	if (!vnode.children)
		return DOMNode

	if (vnode.children.length && typeof vnode.children[0] === 'string')
		DOMNode.innerText = vnode.children[0]
	else
		vnode.children.forEach(c => DOMNode.appendChild(render(c)))

	return DOMNode
}

function diff(dom, vnode) {
	
}

class Component
{
	constructor() {
		this.state = {}
		this.vdom = null
		this.parent = null
	}

	setState(newState) {
		this.state = newState
		this.update()
	}

	getState() {
		return 	Object.assign({}, this.state)
	}

	mount(parent) {
		this.vdom = this.render()
		var node = render(this.vdom)
		this.parent = parent
		return parent.appendChild(node)
	}

	update() {
		var vdom = this.render()
		this.vdom = diff(this.vdom, vdom)
	}
}