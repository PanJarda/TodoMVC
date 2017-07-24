class TodoController
{
	constructor() {
		this.model = new TodoModel()
		this.view  = new TodoView({
			onAddTask:        this.onAddTask,
			onToggleAll:      this.onToggleAll,
			onClearCompleted: this.onClearCompleted
		})
	}

	onAddTask(e) {
	}

	onToggleAll(e) {

	}

	onClearCompleted(e) {

	}

	getRoot() {
		return this.view.getRoot()
	}
}