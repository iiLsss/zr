let id = 0

class Dep {
  constructor() {
    this.id = id ++
    this.subs = []
  }
  addSub(watcher) {
    // 我们希望存入的watcher 不能重复，如果重复会造成多此渲染
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
  depend(){
    if (Dep.target) { // 防止直接调用depend方法 先判断一下
      // Dep.targe 是一个渲染watcher
      Dep.target.addDep(this) // 希望可以在watcher中互相记忆
    }
  }
}
// 用来保存当前的watcher 
let stack = []
export function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}


export default Dep // 用来收集依赖， 收益的是一个个watcher