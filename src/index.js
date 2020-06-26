import Zr from 'zr'

let zr = new Zr({
  el: '#zr',
  data() {
    return {
      msg: 'smoke',
      name: 'zr',
      age: '16',
      arr: [{a:11}, 22, 33],
      info: {
        name: 'lsss',
        age: 18
      }
    }
  },
  watch:{
    msg(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  }
})

// 对原生的方法进行劫持

setTimeout(() => {
  // zr.msg = '嘿嘿嘿'
  // zr.msg = '哈哈哈'
  // zr.msg = '啦啦啦'
  // zr.msg = '擦擦擦'
  // 数组更新， 更数组中的对象是可以的，因为我们拦截对象的get和set
  // zr.arr.push(1000)
  // zr.arr[0].a = '(1000)'

  // watch的使用

  zr.msg = 'wiaawdwadawd'
}, 1000)
window.zr = zr
// console.log(zr.arr[0].a = 100000000);

// observe 不能直接改变索引检测到变化
// [1,2,3].length -- 因为数组的长度 没有检测


// [{a: 'obj}]  内部对数组里的对象进行检测
// 数组的方法 vm.$set 内部调用的数组的splice 方法  
