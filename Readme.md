# zr

zr实现响应式数据

```js
let obj = {}

let proxyValue = '我是默认msg'
Object.defineProperty(obj, 'msg', {
  set(newVal) {
    console.log('设置值')
    proxyValue = newVal
  },
  get() {
    console.log('取值')
    return proxyValue
  }
})

console.log(obj.msg) // 取值   我是默认msg
console.log(obj.msg = 123, proxyValue) // 设置值  123
```

zr实现数组的劫持

```js
let oldArrayProtoMethods = Array.prototype

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


```