
class DoublyLinkedList {
  constructor(value = null) {
    this.value = value
    this.prev = prev
    this.next = next
  }

  insertAfter(item) {
    var node = new DoublyLinkedNode(item)
    node.next = this.next
    if (this.next)
      this.next.prev = node
    this.next = node
    node.prev = this
  }

  insertBefore(item) {
    var node = new DoublyLinkedNode(item)
    node.prev = this.prev
    if (this.prev)
      this.prev.next = node
    this.prev = node
    node.next = this
  }

  delete() {
    if (this.next)
      this.next.prev = this.prev
    if (this.prev)
      this.prev.next = this.next
  }
}