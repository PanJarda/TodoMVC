
var component = h('div',
										h('ul', {class: 'unordered_list'},
                      h('li',
                        h('input', {type: 'checkbox', onchange: e => alert('ahoj')}),
                        h('label', 'item 1'),
                        h('button', {onclick: e => console.log(e.target)})),
                      h('li', 'item 2'),
                      h('li', 'item 3')))

console.log(component)