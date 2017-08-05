
function main(body) {

	function listItem(item) {
		return new Tag('li', tag('label')(item))
	}

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
}
