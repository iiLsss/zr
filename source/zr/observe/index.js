import Observer from './observe'

function observer (data) {
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

function initDate(zm) {
  let { data } = zm.$options
  data = zm._data = typeof data === 'function' ? data.call(this) : data || {}
  console.log(data === zm._data, data === zm.$options.data)

  observer(zm._data)
}