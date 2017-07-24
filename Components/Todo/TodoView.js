class TodoView
{
	constructor(opts) {
		this.root  = new Section({class: 'todo-app'})
		this.input = new Input({
			class:       'new-todo',
			placeholder: 'What needs to be done?',
			autofocus:   'on',
			name:        'new-todo'
		})
		this.toggle = new CheckBox({id: 'toggle-all'})
		this.list   = new Ul({class: 'todo-list'})
		this.itemsLeft = newTextNode('0')
		this.clearButton = new Button('Clear completed')

		this.input.on('keydown', opts.onAddTask)
		this.toggle.on('change', opts.onToggleAll)
		this.clearButton.on('mouseup', opts.onClearCompleted)

		this.root.append(this.input)
		         .append(this.toggle)
		         .append(new Label('Toggle all', {for: 'toggle-all'}))
		         .append(this.list)
		         .append(this.itemsLeft)
		         .append(new Tag('span', 'items left'))
		         .append(html('<ul class="filters">' +
								'<li><a href="#/">All</a>' +
								'<li><a href="#/active">Active</a>' +
								'<li><a href="#/completed">Completed</a>' +
							'</ul>'))
		         .append(this.clearButton)
	}

	getRoot() {
		return this.root.tag
	}
}