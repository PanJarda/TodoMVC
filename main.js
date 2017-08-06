
function main(body) {

	function listItem(item) {
		return new Tag('li', tag('label')(item))
	}

<<<<<<< HEAD
	var componentA = {
	  value: new List('ul', listItem, [1,2,3]),
	  render: function() {
	    return h('div', {},
	            h('button', {onmousedown: e => this.value.push('ahoj')}, 'push one item'),
	            h('button', {onmousedown: e => this.value.mod(1, 'ahoj')}, 'modify 2nd item'),
	            this.value.dom)
	  }
	}

	body.appendChild(componentA.render())
	console.log(componentA.value.get())
=======
	render() {
		return h('div', {class: 'wrapper'},
				h('input', {
						placeholder: 'What are you gonna do?',
						onkeydown: this.handleKeydown.bind(this)
					}),
				h('ul',
					Object.keys(this.state.values).map(k => h('li',
													h('input', {type: 'checkbox', key: k, onchange: this.handleToggle.bind(this)}),
													h('label', this.state.values[k]),
													h('button', {key: k, onmousedown: this.handleClick.bind(this)}, 'X')))))
	}
}

function main(body) {
	var button = new Square()
	var list = new List()
	button.mount(body)
	list.mount(body)
>>>>>>> parent of c6a9fd3... state machines
}
