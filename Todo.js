class TodoModel
{
	constructor() {
		this.tasks = []
		this.filter = 'all'
	}

	addTask(name) {
		this.tasks.push(name)
	}

	removeTask(name) {
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

class TodoController
{
	constructor() {
		this.view  = new TodoView()
		this.model = new TodoModel()
	}

	addTask(task) {
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