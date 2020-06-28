import Observer from './observe'
import Watcher from './watcher'
import Dep from './dep'

export function observer (data) {
  if (typeof data !== 'object' ||  data == null) {
    return
  }
  if (data.__ob__) {
    return data.__ob__
  }

  return new Observer(data)
} 


export function initState(zm) {
// 做不同的初始化操作
  let opts = zm.$options
  if(opts.data){
    initDate(zm)
  }
  if(opts.watch){
    initWatcher(zm)
  }
  if(opts.computed){
    initComputed(zm, zm.$options.computed)
  }
}
// 代理数据
function proxy (zm, source, key) {
  // zr.msg => zr._data.msg
  // zr.msg = 100 => zr._data.msg = 100
  Object.defineProperty(zm, key, {
    set(val) {
      zm[source][key] = val
    },
    get() {
      return zm[source][key]
    }
  })
}

function initDate(zm) {
  let data = zm.$options.data
  data = zm._data = typeof data === 'function' ? data.call(this) : data || {}

  for (let key in data) {
    proxy(zm, '_data',  key) // 对zm上的取值 赋值操作进行代理
  }

  observer(data)
}

function createWatcher(zm, key, handler, opts) {
  // 内部使用watch
  return zm.$watch(key, handler, opts)
}

function initWatcher(zm) {
  let watch = zm.$options.watch
  for(let key in watch) {
    let userDef = watch[key]
    let handler = userDef
    if (userDef.handler) {
      handler = userDef.handler
    }
    createWatcher(zm, key, handler, {
      immediate: userDef.immediate
    })
  }
}


function createComputedGetter(zm, key) {
  let watcher = zm._watchersComputed[key ]
  return function () { // 用户取值时会执行此方法
    if(watcher) {
      if (watcher.dirty) { // 如果页面取值，而且dirty是true 就会调用 
        watcher.evaluate()
      }
      if(Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function initComputed(zm, computed) {
  console.log(zm, computed)
  // 将计算属性配置 放到zm上
  let watchers = zm._watchersComputed = Object.create(null) // 创建存储计算的watcher对象

  for(let key in computed) { // {fullName: () => {....}}
    let userDef = computed[key]

    // new watcher 此时什么都不会做 配置了lazy dirty
    watchers[key] = new Watcher(zm, userDef, ()=>{}, {lazy:true}) // 计算属性watcher 默认刚开始
    Object.defineProperty(zm, key, {
      get: createComputedGetter(zm, key)
    }) // 将这个属性定义到zm上
  }

}