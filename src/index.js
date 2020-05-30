import Zr from 'zr'

console.log(Zr);


let zr = new Zr({
  el: '#zr',
  data() {
    return {
      msg: 'smoke',
      arr: [11, 22, 33],
      info: {
        name: 'lsss',
        age: 18
      }
    }
  }
})

// 对原生的方法进行劫持
console.log(zr.arr.push('1231'));