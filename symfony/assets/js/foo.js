export default class Foo {
  constructor (foo) {
    this._foo = foo
  }

  click() {
    return window.alert(this._foo)
  }
}