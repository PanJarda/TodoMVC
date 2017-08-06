class TodoController
{
	constructor() {
		this.model = new TodoModel()
		this.view  = new TodoView({
			onAddTask:        this.onAddTask.bind(this),
			onToggleAll:      this.onToggleAll,
			onClearCompleted: this.onClearCompleted,
			onToggleTask:     this.onToggleTask.bind(this),
			onRemoveTask:     this.onRemoveTask.bind(this)
		})
	}

	onAddTask(e) {
		if (e.target.value == '' || e.keyCode != 13)
			return false

		var id = this.model.addTask(e.target.value)
		this.view.addTask({id: id, name: e.target.value})
		e.target.value = ''
	}

	onToggleAll(e) {
		this.model.toggleAll()
	}

	onClearCompleted(e) {
	}

	onToggleTask(e) {
		this.model.toggleTask(e.target.value)
	}

	onRemoveTask(e) {
		var id = e.target.getAttribute('data-id')
		this.model.removeTask(id)
		this.view.removeTask(id)
	}

	getRoot() {
		return this.view.getRoot()
	}
}