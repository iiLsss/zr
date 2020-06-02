import { observer } from './index'
export function defineReactive(data, key, value) {
  // 如果value 是一个对象的话，需要深度观察  递归处理
  observer(value)
  
  // 不支持ie8及is8以下
  Object.defineProperty(data, key, {
    get() {
      console.log(`对 ${data} 的 ${key} 进行取值 ${value}`)
      return value
    },
    set(newVal) {
      console.log(`对 ${data} 的 ${key} 进行设置新 ${newVal}`)
      if (newVal === value) return
      value = newVal
    }
  })
}

class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk (data) {
    console.log(data, '=====');
    let keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++){
      let key = keys[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }
}

export default Observer