import { pushTarget, popTarget } from './dep'
import {util} from '../util'

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
    } else {
      this.getter = function () { // 如果调用此方法，会将zm上对应的表达式取出来
        return util.getValue(zm, exprOrFn)
      }
    }
    if (opts.user) { // 标识用户watch
      this.user = true
    }
    this.cb = cb
    this.deps = []
    this.depsId = new Set()
    this.opts = opts
    // 创建watcherde 时候，先将表达式对应的值 取出来
    this.value = this.get() // 默认创建一个watcher，回调用自身的get方法
  }
  get(){
    pushTarget(this) // 渲染watcher Dep.target = watcher msg变化了，需要让这个watcher重新执行
    // 默认创建wather 会执行这个方法
    let value = this.getter() // 让当前传入的函数执行
    popTarget()
    return value
  }
  addDep(dep){ // 同一个watcher 不应该重复记录
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep) // 就让watcher 记住了当前dep
      dep.addSub(this)
    }
  }
  update() { // 如果立即调用get 会导致页面刷新 异步来跟新
    queryWatcher(this)
  }
  run() {
    let value = this.get() // 新值
    if (this.value !== value) {
      this.cb(value, this.value)
    }

  }
}

let has = {}
let queue = []

function flushQueue() {
  // 等待当前这一轮全部更新后， 在去watcher 一次执行
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}

function queryWatcher(watcher) { 
  let id = watcher.id
  if(!has[id]) {
    has[id] = true
    queue.push(watcher)
    // 延迟清空队列
    nextTick(flushQueue) 
  }
}


// 等待页面更新在去获取dom元素
let callbacks = []
function flushCallbacks() {
  callbacks.forEach(cb => cb())
}
function nextTick(cb) {
  callbacks.push(cb)
  // 异步刷新callback, 获取一个异步的方法

  // 异步是分执行顺序，会先执行 promise mutationObserver setImmediate setTimeout
  let timerFunc = () => {
    flushCallbacks()
  }
  if (Promise) {
    return Promise.resolve().then(timerFunc)
  }
  if (MutationObserver) {
    let observer = new MutationObserver(timerFunc)
    let textNodes = document.createTextNode(1)
    observer.observe(textNodes, {characterData: true})
    textNodes.textContent = 2
    return
  }
  if (setImmediate) {
    return setImmediate(timerFunc)
  }
  setTimeout(timerFunc, 0)
}

// 渲染使用 计算属性使用 watch 也用
export default Watcher

