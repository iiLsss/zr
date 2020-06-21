
import { initState } from './observe'
import Watcher from './observe/watcher'
import { compiler, query } from './util'
function Zr (options) { //用户传入的数据
  this._init(options)
}

Zr.prototype._init = function (options) {
  let zm = this
  // 挂载到options上
  zm.$options = options
  // 初始化数据 zm传入   initState 主要作用拦截数组的方法和对象的属性
  initState(zm)

  // 初始化工作 vue1.0 => 
  if (zm.$options.el) {
    zm.$mount()
  }
}

// 用户传入的数据 去更新视图
Zr.prototype._update = function () {
  let zm = this
  let el = zm.$el
  // 要循环这个元素 将里面的内容 换成我们的数据
  let node = document.createDocumentFragment()
  let firstChild 
  while(firstChild = el.firstChild) { // 每次拿到第一个元素。就讲这个元素放入到文档碎片中
    node.appendChild(firstChild) // appendChild 具有移动的功能
  }
  // 对文本进行替换
  compiler(node, zm)


  el.appendChild(node)
  // 需要匹配{{}}方式来进行替换

}

// 渲染页面 将组建进行挂载
Zr.prototype.$mount = function (options) {
  let zm = this
  let el = zm.$options.el // 获取元素 #app
  el = zm.$el = query(el) // 获取当前挂载的元素
  // 渲染是通过watcher进行渲染的
  // 渲染watcher ---用于渲染的watcher
  // vue2.0 组件级别更新 new Vue 产生的一个组件

  let updateComponent = () => { // 更新组件、渲染组件
    zm._update() // 更新组件
  }
  new Watcher(zm, updateComponent) // 渲染watcher
}
export default Zr