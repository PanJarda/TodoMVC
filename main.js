function main(body) {
	var todo = new TodoController()
	body.appendChild(todo.getRoot())
}