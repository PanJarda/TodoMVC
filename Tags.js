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
		this.tag.appendChild(child.tag)
		return this
	}

	addClass(className) {
		this.tag.classList.add(className)
	}

	removeClass(className) {
		this.tag.classList.remove(className)
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