class TodoModel
{
	constructor() {
		this.tasks = []
		this.filter = 'all'
	}

	add(task) {
		this.tasks.push(task)
	}

	remove(task) {
		this.tasks.splice(this.tasks.indexOf(task), 1)
	}
}

class TodoView
{
	constructor() {

	}

	render() {
		// drawing dom elements
	}
}

class TodoController
{
	constructor() {

	}
}

class Todo
{
	constructor() {
		this.model      = new TodoModel()
		this.view       = new TodoView()
		this.controller = new TodoController()
	}
}