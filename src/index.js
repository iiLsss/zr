import Zr from 'zr'



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



// console.log(zr._data);
// console.log(zr.msg);
// console.log(zr);
// console.log(zr.info);
// console.log(zr.info.name, '123');
// console.log(zr.info.name);