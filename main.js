function main(body) {
	body.appendChild(fragment.render())
	fragment.value.push('ahoj')
	console.log(fragment.value.get())
	fragment.value.pop()
	console.log(fragment.value.get())
}
