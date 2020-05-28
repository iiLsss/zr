

export function initState(zm) {
// 做不同的初始化操作
  let opts = zm.$options
  if(opts.data){
    initDate()
  }
  if(opts.watch){
    initWatcher()
  }
  if(opts.computed){
    initComputed()
  }
}