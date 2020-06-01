// 主要做的就是拦截用户调用 数组方法 push shift unshift pop reverse sort slice  改变原数组

// concat ... 不会改变原数组

// 获取老的数组方法， 只改写7个方法
let oldArrayProtoMethods = Array.prototype

// 拷贝一个新对象，可以找到老方法
export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'reverse',
  'sort',
  'slice'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) { // 函数劫持 切片编程
    console.log(args)
    let r = oldArrayProtoMethods[method].apply(this, args)
    // todo

    console.log('调用了 数组劫持')
    return r
  }
})