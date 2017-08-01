class Square extends Component {
	constructor() {
		super()
		this.state = {
			value: 0
		}
	}

	handleClick() {
		this.setState({value: this.state.value + 1})
	}

	render() {
		return h('button', {class: 'square'}, {mousedown: this.handleClick.bind(this)}, [
					h('text', {}, {}, this.state.value.toString())])
	}
}

class List extends Component
{
	constructor() {
		super()
		this.state = {
			values: {},
			iterator: 0
		}
	}

	handleClick(e) {
		var key = e.target.getAttribute('key')
		var newState = Object.assign({}, this.state)
		delete newState.values[key]
		this.setState(newState)
	}

	handleKeydown(e) {
		if (e.target.value == '' || e.keyCode != 13)
			return false

		var newState = this.getState()
		newState.values[this.state.iterator] = e.target.value
		e.target.value = ''
		newState.iterator++
		this.setState(newState)
	}

	handleToggle(e) {
		var key = e.target.getAttribute('key')
		var newState = this.getState()
		//newState.values[key].
		return false
	}

	render() {
		return h('div', {class: 'wrapper'}, {},
				h('input', {placeholder: 'What are you gonna do?'}, {keydown: this.handleKeydown.bind(this)}, []),
				h('ul', {}, {},
					Object.keys(this.state.values).map(k => h('li', {}, {},
													h('input', {type: 'checkbox', key: k}, {change: this.handleToggle.bind(this)}, []),
													h('label', {}, {}, h('text', {}, {}, this.state.values[k])),
													h('button', {key: k}, {mousedown: this.handleClick.bind(this)}, h('text', {}, {}, 'X'))))))
	}
}

function main(body) {
	var button = new Square()
	var list = new List()
	button.mount(body)
	list.mount(body)
}

