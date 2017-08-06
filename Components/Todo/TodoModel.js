class TodoModel
{
	constructor() {
		this.tasks = {}
		this.key   = 0
	}

	addTask(taskName) {
		var key = this.key
		this.tasks[key] = {name: taskName, completed: false}
		this.key++
		return key
	}

	toggleTask(id) {
		this.tasks[id].completed = !this.tasks[id].completed
	}

	removeTask(id) {
		delete this.tasks[id]
	}
}