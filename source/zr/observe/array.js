import { observer } from './index'

// 主要做的就是拦截用户调用 数组方法 push shift unshift pop reverse sort slice  改变原数组

// concat...等，不会改变原数组

// 获取老的数组方法， 只改写7个方法
let oldArrayProtoMethods = Array.prototype

// 拷贝一个新对象，可以找到老方法
export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
  'push',
  'shift',
  'pop',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

export function observerArray (inserted) {// 要循坏数组 依次对数组的每一项进行检测
  for (let i = 0; i < inserted.length; i++) {
    observer(inserted[i])
  }
}

methods.forEach(method => {
  arrayMethods[method] = function (...args) { // 函数劫持 切片编程
    let r = oldArrayProtoMethods[method].apply(this, args)
    //  push() 新增 对象
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2) // [].splice(0, 1, xxx) 获取新增的内容
      default:
        break
    }

    if(inserted) observerArray(inserted)
    return r
  }
})