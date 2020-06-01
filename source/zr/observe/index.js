import Observer from './observe'

export function observer (data) {
  if (typeof data !== 'object' ||  data == null) {
    return
  }
  new Observer(data)
} 


export function initState(zm) {
// 做不同的初始化操作
  let opts = zm.$options
  if(opts.data){
    initDate(zm)
  }
  if(opts.watch){
    initWatcher()
  }
  if(opts.computed){
    initComputed()
  }
}
// 代理数据
function proxy (zm, source, key) {
  // zr.msg => zr._data.msg
  // zr.msg = 100 => zr._data.msg = 100
  console.log(zm, source, key, zm[source][key]);
  Object.defineProperty(zm, key, {
    set(val) {
      zm[source][key] = val
    },
    get() {
      // console.log(zm[source][key]);
      return zm[source][key]
    }
  })
}

function initDate(zm) {
  let data = zm.$options.data
  data = zm._data = typeof data === 'function' ? data.call(this) : data || {}
  // console.log(data === zm._data, data === zm.$options.data)
  for (let key in data) {
    proxy(zm, '_data',  key) // 对zm上的取值 赋值操作进行代理
  }

  observer(data)
}