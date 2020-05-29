
function objdefine(data, key, value) {
  console.log(data, key, value);
  Object.defineProperty(data, key, {
    getter() {
      return value
    },
    setter(newVal) {
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
    console.log(keys);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i]
      let value = data[key]
      objdefine(data, key, value)
    }
  }
}

export default Observer