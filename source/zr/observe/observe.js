
function objdefine(data, key, value) {
  Object.defineProperty(data, key, {
    get() {
      console.log('取值')
      return value
    },
    set(newVal) {
      console.log('设置值');
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
    let keys = Object.keys(data)
    for(let i = 0; i < keys.length; i++){
      let key = keys[i]
      let value = data[key]
      objdefine(data, key, value)
    }
  }
}

export default Observer