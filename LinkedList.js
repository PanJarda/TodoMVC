class LinkedList
{
	constructor(value) {
		this.value = value
		this.next  = null
	}

	append(node) {
		this.next = node
	}

	last() {
		if (!this.next)
			return this.value
		this.next.last()
	}
}