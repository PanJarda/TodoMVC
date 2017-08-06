function html(text) {
	var div = document.createElement('div')
	div.innerHTML = text
	return div.removeChild(div.firstChild)
}