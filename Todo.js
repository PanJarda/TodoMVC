class TodoModel
{
	constructor() {
		this.tasks = []
		this.filter = 'all'
	}

	addTask(task) {
		this.tasks.push(task)
	}

	removeTask(task) {
		this.tasks.splice(this.tasks.indexOf(task), 1)
	}
}

class TodoView
{
	constructor() {
		this.taskList = html('<ul></ul>')
	}

	addTask(task) {
		this.taskList.appendChild(task.render())
	}

	removeTask(task) {
		task.erase()
	}

	render() {
		// drawing dom elements
	}
}

class Todo
{
	constructor() {
		this.view  = new TodoView()
		this.model = new TodoModel()
	}

	addTask(task) {
		var task = new Task({
			taskName: e.value
		})
		this.model.addTask(task)
		this.view.addTask(task)
	}

	removeTask(task) {
		this.model.removeTask(task)
		this.view.removeTask(task)
	}

	toggleTask(task) {
		this.model.toggleTask()
	}
}