function main(body) {
	var todo = new Todo()
	var task = new Task('ahoj')
	task.render(body, body.firstChild)
	task.rename('fsfs')
}