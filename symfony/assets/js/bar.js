import Foo from './foo'


export default class Bar {

  /**
   * @param {Foo} foo
   */
  constructor(foo) {
    this._foo = foo
  }

  clickFoo() {
    return this._foo.click()
  }
}