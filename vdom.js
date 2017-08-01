function h(tagName, attributes, events, ...args) {
	let children = args.length ? [].concat(...args) : null
	if (tagName == 'text')
		return {tagName: 'text', value: children[0]}
	return { tagName, attributes, events, children }
}

function render(vnode) {
	if (vnode.tagName == 'text')
		return vnode.DOMNode = document.createTextNode(vnode.value)

	let node = document.createElement(vnode.tagName)

	let a = vnode.attributes
	let e = vnode.events

	for (k in a)
		node.setAttribute(k, a[k])

	for (k in e)
		node.addEventListener(k, e[k])

	vnode.children.forEach(c => node.appendChild(render(c)))

	return vnode.DOMNode = node
}

function diff(oldNode, newNode) {
	if (oldNode.tagName != newNode.tagName) {
		oldNode.DOMNode.parentNode.replaceChild(render(newNode), oldNode.DOMNode)
		return newNode
	}

	if (oldNode.tagName == 'text') {
		if (oldNode.value != newNode.value){
			oldNode.value = newNode.value
			oldNode.DOMNode.nodeValue = oldNode.value
			return oldNode
		} else {
			return oldNode
		}
	}

	var l0 = oldNode.children.length
	var l1 = newNode.children.length

	if (!l0 && !l1)
		return oldNode

	if (l0 == l1) {
		for (var i = 0; i < l0; i++) {
			if (oldNode.children[i] != diff(oldNode.children[i], newNode.children[i])) {
				oldNode.children[i] = newNode.children[i]
			}
		}
		return oldNode
	} else {
		oldNode.DOMNode.parentNode.replaceChild(render(newNode), oldNode.DOMNode)
		return newNode
	}
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