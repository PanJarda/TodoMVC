var checkbox = new CheckBox()

var input    = new Input({
	type:  'text',
	value: 'ahoj',
	class: 'ahoj'
})

var button   = new Button(' X ')
var ul       = new Ul({class: 'ahoj'})
var label    = new Label()
var div      = new Div({id: 'ahoj', class: 'fsfsf'})

ul.append(
	li.append(checkbox)
	  .append(label)
	  .append(button))