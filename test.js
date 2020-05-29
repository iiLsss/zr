

let obj = {
  data: {
    msg: 123
  },
  wt: {
    aa() {
      return 123
    }
  }
}

let a = obj.data

console.log(a === obj.data);