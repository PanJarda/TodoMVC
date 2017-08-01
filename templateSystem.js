function h(tagName, attributes, ...args) {
	let children = args.length ? [].concat(...args) : null
	return { tagName, attributes, children }
}

function render(vnode) {
	
}

var ahoj = h('div', {id: 'ahoj'},
				h('ul', {},
					h('li', {}, 'ahoj'),
					h('li', {}, 'jak'),
					h('li', {}, 'se'),
					h('li', {}, 'mas?')))

console.log(ahoj)