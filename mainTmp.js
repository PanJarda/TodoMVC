/*
 * Thin wrapper around native DOM methods
 */
function html( text ) {
	var div = document.createElement( 'div' )
	div.innerHTML = text
	return div.removeChild( div.firstChild )
}

var tag = {
	div:      '<div></div>',
	ul:       '<ul></ul>',
	li:       '<li></li>',
	input:    '<input>',
	checkbox: '<input type="checkbox">',
	label:    '<label></label>',
	button:   '<button></button>'
}

function createTag( name ) {
	return html( tag[name] )
}

function TodoAppControler() {

}

function TodoAppModel() {
	var filters = {
		all: 0,
		completed: 1,
		active: 2
	}
	this.items = []
	this.filter = filters.all
}

function TodoAppView() {

}