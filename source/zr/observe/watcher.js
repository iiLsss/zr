
// 每次产生一个watcher 都要有唯一的标识
class Watcher {
  /**
   * @param {*} zm  当前组件的实施
   * @param {*} exprOrFn 用户可能传入的是一个表达式，也有可能传入的是一个函数
   * @param {*} cb 用户传入的回调函数 zm.$watch('gsd', cb)
   * @param {*} opts 其他参数
   */
  constructor(zm, exprOrFn, cb = () => {}, opts ={}) {
    this.zm = zm
    this.exprOrFn = exprOrFn
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn  // getter 就是new Watcher 传入的第二个参数
    }
    this.cb = cb
    this.opts = opts
    this.get() // 默认创建一个watcher，回调用自身的get方法
  }
  get(){
    this.getter() // 让当前传入的函数执行
  }

}
// 渲染使用 计算属性使用 watch 也用
export default Watcher