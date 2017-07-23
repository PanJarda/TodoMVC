class TaskModel
{
	constructor(name) {
		this.name     = name
		this.done     = false
	}

	setName(name) {
		this.name = name
	}

	toggle() {
		this.done = !this.done
	}
}

class TaskView
{
	constructor(opts) {
		this.root     = html('<li></li>')
		this.checkbox = this.root.appendChild(html('<input type="checkbox">'))
		this.label    = this.root.appendChild(html('<label>' + opts.name + '</label>'))
		this.button   = this.root.appendChild(html('<button> X </button>'))
		this.input    = this.root.appendChild(html('<input value="' + opts.name + '">'))

		this.checkbox.addEventListener('change', opts.onChecked)
		this.label.addEventListener('dblclick', this.editModeOn.bind(this))
		this.input.addEventListener('keydown', this.editModeOff.bind(this))
		this.input.addEventListener('blur', this.editModeOff.bind(this))

		this.onRename = opts.onRename
	}

	editModeOn() {
		this.root.classList.add('edit')
	}

	editModeOff(e) {
		if (e.keyCode != 13 && e.type != 'blur')
			return false
		this.root.classList.remove('edit')
		this.label.innerHTML = this.input.value
		this.onRename()
	}

	render(parent, before) {
		parent.insertBefore(this.root, before)
	}

	erase() {
		this.root.parentNode.removeChild(this.root)
	}
}

class Task
{
	constructor(name) {
		this.model = new TaskModel(name)
		this.view  = new TaskView({
			name: name,
			onChecked: this.toggle.bind(this),
			onRename: this.rename.bind(this)
		})
	}

	toggle() {
		this.model.toggle()
	}

	rename(name) {
		this.model.setName(name)
	}

	render(parent, before) {
		return this.view.render(parent, before)
	}

	erase() {
		this.view.erase()
	}
}