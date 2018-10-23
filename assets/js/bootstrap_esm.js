import {Popper} from 'popper.js'
import 'bootstrap'
import 'jquery-ui-bundle'

import Foo from './foo'
import Bar from './bar'

const foo = new Foo('Hello foo!')
const bar = new Bar(foo)

const fooButton = document.getElementById('foo')
fooButton.addEventListener('click', event => {
  foo.click()
})

const barButton = document.getElementById('bar')
barButton.addEventListener('click', event => {
  bar.clickFoo()
})

$(() => {
  $('[data-toggle="popover"]').popover()

  $("#datepicker").datepicker({
    altField: "#alternate",
    altFormat: "DD, d MM, yy"
  })

  $("#sortable").sortable({
    placeholder: "ui-state-highlight"
  })
  $("#sortable").disableSelection()
})