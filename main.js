
function main(body) {
	
	var componentA = {
	  value: new List('ul', tag('li'), [1,2,3]),
	  render: function() {
	    return h('div', {},
	            h('button', {onmousedown: (e) => this.value.push('ahoj')}, 'push one item'),
	            this.value.dom)
	  }
	}

	body.appendChild(componentA.render())
}
