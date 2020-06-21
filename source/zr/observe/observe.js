import { arrayMethods, observerArray } from './array'
import { observer } from './index'

export function defineReactive(data, key, value) {
  // 如果value 是一个对象的话，需要深度观察  递归处理
  observer(value)
  
  // 不支持ie8及is8以下
  Object.defineProperty(data, key, {
    get() {
      console.log(`对 ${data} 的 ${key} 进行取值 ${JSON.stringify(value)}`)
      return value
    },
    set(newVal) {
      console.log(`对 ${data} 的 ${key} 进行设置新 ${JSON.stringify(newVal)}`)
      if (newVal === value) return
      observer(newVal) // 如果设置的值是一个对象，应该进行监控这个新增的对象
      value = newVal
    }
  })
}

class Observer {
  constructor(data) {
    // 将用户的数据使用object.defineProperty重新定义
    if (Array.isArray(data)) { // 需要重写 数组push 等方法
      data.__proto__ = arrayMethods // 让数组通过链来查找我们自己编写的原型
      //  只能拦截数组的方法，数组的每一项 还需要去观测一下
      observerArray(data)
    } else {
      this.walk(data)
    }
  }
  walk (data) {
    let keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++){
      let key = keys[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }
}

export default Observer