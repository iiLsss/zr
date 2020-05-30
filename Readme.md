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



```