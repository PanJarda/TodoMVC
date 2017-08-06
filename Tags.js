function newTextNode(text) {
	return document.createTextNode(text)
}

class Tag
{
	constructor(tag, text, attr) {
		this.tag = document.createElement(tag)

		if (!text)
			return this

		if (typeof text == 'string')
			this.tag.innerText = text
		else
			attr = text

		for (var key in attr)
			this.tag.setAttribute(key, attr[key])
	}

	append(child) {
		if (child instanceof Tag)
			this.tag.appendChild(child.tag)
		else
			this.tag.appendChild(child)
		return this
	}

	mount(parent, before) {
		parent.insertBefore(this.tag, before)
		return this
	}

	umount() {
		this.tag.parentNode.removeChild(this.tag)
	}

	addClass(className) {
		this.tag.classList.add(className)
	}

	removeClass(className) {
		this.tag.classList.remove(className)
	}

	on(event, callback) {
		this.tag.addEventListener(event, callback.bind(this))
		return this
	}
}

class Div extends Tag
{
	constructor(text, attr) {
	 	super('div', text, attr)
	}
}

class Button extends Tag
{
	constructor(text, attr) {
	 	super('button', text, attr)
	}
}

class Ul extends Tag
{
	constructor(text, attr) {
		super('Ul', text, attr)
	}
}

class Li extends Tag
{
	constructor(text, attr) {
		super('li', text, attr)
	}
}

class Label extends Tag
{
	constructor(text, attr) {
		super('label', text, attr)
	}
}

class Input extends Tag
{
	constructor(attr) {
		super('input', attr)
	}
}

class CheckBox extends Tag
{
	constructor(attr) {
		if (attr)
			attr.type = 'checkbox'
		else
			attr = {type: 'checkbox'}
		super('input', attr)
	}
}

class Section extends Tag
{
	constructor(text, attr) {
		super('section', text, attr)
	}
}

class H1 extends Tag
{
	constructor(text, attr) {
		super('h1', text, attr)
	}
}

class H2 extends Tag
{
	constructor(text, attr) {
		super('h2', text, attr)
	}
}

class H3 extends Tag
{
	constructor(text, attr) {
		super('h3', text, attr)
	}
}

class H4 extends Tag
{
	constructor(text, attr) {
		super('h4', text, attr)
	}
}

class H5 extends Tag
{
	constructor(text, attr) {
		super('h5', text, attr)
	}
}

class H6 extends Tag
{
	constructor(text, attr) {
		super('h6', text, attr)
	}
}

