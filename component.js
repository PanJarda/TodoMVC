
class Component
{
  constructor() {
    this.state = {}
    this.vdom = null
  }

  setState(newState) {
    this.state = newState
    this.update()
  }

  getState() {
    return  Object.assign({}, this.state)
  }

  mount(parent) {
    this.vdom = render(this.render())
    console.log(this.vdom)
    return parent.appendChild(this.vdom.dom)
  }

  update() {
    this.vdom = diff(this.vdom, this.render())
  }
}
