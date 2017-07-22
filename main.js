////////////////////////////////////////////////////////////////////////////////
/// HELPERS
///
function html(text) {
	var div = document.createElement('div')
	div.innerHTML = text
	return div.removeChild(div.firstChild)
}

////////////////////////////////////////////////////////////////////////////////
/// TODOITEM
///
/**
 * @constructor
 */
function TodoItem(name, onRemove, onUpdate) {
	this.isMounted = false
	this.completed = false
	this.name      = name
	this.onRemove  = onRemove
	this.onUpdate  = onUpdate
	var li      = html('<li>')
	this.check  = li.appendChild(html('<input type="checkbox"' + (this.completed ? 'checked' : '') + '>'))
	this.label  = li.appendChild(html('<label>' + this.name + '</label>'))
	this.btn    = li.appendChild(html('<button>X</button>'))
	this.input  = li.appendChild(html('<input value="' + this.name + '">'))
	this.root   = li

	this.check.addEventListener('change', this.toggle.bind(this))
	this.btn.addEventListener('mouseup', this.onRemove)
	this.label.addEventListener('dblclick', this.mode.bind(this))
	this.input.addEventListener('keydown', this.edit.bind(this))
	this.input.addEventListener('blur', this.edit.bind(this))
	console.log(this)
}

TodoItem.prototype.update = function() {
	this.check.checked = this.root.className = (this.completed ? 'completed' : '')
	this.label.firstChild.nodeValue = this.name
}

TodoItem.prototype.toggle = function(e) {
	this.completed = e.target.checked
	this.update()
	this.onUpdate()
	return false
}

TodoItem.prototype.mount = function(parent, before) {
	this.isMounted = true
	this.root = parent.insertBefore(this.root, before)
}

TodoItem.prototype.umount = function() {
	this.isMounted = false
	this.root.parentNode.removeChild(this.root)
}

TodoItem.prototype.mode = function(e) {
	this.root.className += ' edit'
	return false
}

TodoItem.prototype.edit = function(e) {
	if (e.keyCode == 13 || e.type == 'blur') {
		if (this.input.value == '')
			this.onRemove()
		else {
			this.name = this.input.value
			this.update()
		}
	}
	return false
}

////////////////////////////////////////////////////////////////////////////////
/// TODO
///
/**
 * @constructor
 */
function Todo() {
	this.items = []
	this.filter = 'all'
}

Todo.prototype.onhashchange = function(e) {
	if (location.hash == '#/active')
		this.filter = 'active'
	else if (location.hash == '#/completed')
		this.filter = 'completed'
	else if (location.hash == '#/')
		this.filter = 'all'
	this.update()
	return false
}

Todo.prototype.update = function() {
	var nextNode = this.list.firstChild
	var itemsLeft = 0
	this.items.forEach(function(item) {
		if (!item.completed)
			itemsLeft++

		if (item.isMounted) {
			if ((this.filter == 'active' && item.completed) ||
				 (this.filter == 'completed' && !item.completed)) {
				item.umount()
			}
		} else {
			if (this.filter == 'all' ||
				(this.filter == 'active' && !item.completed) ||
				(this.filter == 'completed' && item.completed)) {
				item.mount(this.list, nextNode)
			}
		}
		nextNode = item.root.nextSibling
	}.bind(this))
	this.itemsLeft.nodeValue = itemsLeft
	this.toggle.checked = !itemsLeft
}

Todo.prototype.remove = function(e) {
	var item = this.items.find(function(item) {
		return item.btn == e.target
	})
	item.umount()
	this.items.splice(this.items.indexOf(item), 1)
	this.update()
	return false
}

Todo.prototype.toggleAll = function(e) {
	this.items.forEach(function(item) {
		item.completed = e.target.checked
		item.update()
	})
	this.update()
	return false
}

Todo.prototype.clearCompleted = function(e) {
	var newItems = []
	this.items.forEach(function(item) {
		if (item.completed)
			item.umount()
		else
			newItems.push(item)
	}.bind(this))
	delete this.items
	this.items = newItems
	this.update()
	return false
}

Todo.prototype.submit = function(e) {
	if (this.input.value != '' && e.keyCode == 13) {
		var text = this.input.value
		this.input.value = ''
		this.items.push(new TodoItem(text, this.remove.bind(this), this.update.bind(this)))
		this.update()
	}
	return false
}

Todo.prototype.addItem = function(text) {
	this.items.push(new TodoItem(text, this.remove.bind(this), this.update.bind(this)))
	this.update()
}

Todo.prototype.render = function() {
	var app = html('<section class="todo-app"></section>')
	this.input = app.appendChild(
		html('<input class="new-todo" placeholder="What needs to be done?" autofocus name="new-todo">')
	)
	this.input.addEventListener('keydown', this.submit.bind(this))

	this.toggle = app.appendChild(html('<input type="checkbox" id="toggle-all">'))
	this.toggle.addEventListener('change', this.toggleAll.bind(this))
	
	app.appendChild(html('<label for="toggle-all">Toggle all</label>'))

	this.list = app.appendChild(html('<ul class="todo-list"></ul>'))

	this.itemsLeft = app.appendChild(html('0'))
	app.appendChild(html('<span> items left</span>'))
	app.appendChild(html(
		'<ul class="filters">' +
			'<li><a href="#/">All</a>' +
		 	'<li><a href="#/active">Active</a>' +
		 	'<li><a href="#/completed">Completed</a>' +
		 '</ul>'))

	app.appendChild(html('<button>Clear completed</button>'))
		.addEventListener('mouseup', this.clearCompleted.bind(this))

	window.onhashchange = this.onhashchange.bind(this)

	return this.root = app
}

////////////////////////////////////////////////////////////////////////////////
/// MAIN
///
function main(node) {
	var todo = new Todo()
	node.appendChild(todo.render())
}
