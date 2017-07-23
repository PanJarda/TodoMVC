function main(body) {
	var div      = new Div({class: 'ahoj'})
	var button   = new Button(' X ')
	var checkbox = new CheckBox()
	var label    = new Label('Ahoj')

	div.append(checkbox)
	   .append(label)
	   .append(button)

	body.appendChild(div.tag)
}