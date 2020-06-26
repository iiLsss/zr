export function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  } 
  return el
}
// ?: 匹配不捕获  不捕获当前的分组
// + 至少一个
// ? 尽可能少匹配
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
  getValue(zm, expr) {
    let keys = expr.split('.')
    return keys.reduce((memo, current) => { // 具有迭代的功能
      memo = memo[current]
      return memo
    }, zm)
  },
  compilerText(node, zm) { // 编译文本 替换{{}}
    if (!node.expr) {
      node.expr = node.textContent // 给节点增加了自定义属性
    }
    node.textContent = node.expr.replace(defaultRE, (...args) => {
      return JSON.stringify(this.getValue(zm, args[1]))
    })
  }
}

export function compiler(node, zm) { // node 文档碎片
  let childNodes = [...node.childNodes] // 只有儿子 没有孙子
  // 将类数组转换为数组
  childNodes.forEach(child => {
    if(child.nodeType == 1) {// 元素
      compiler(child, zm)
    } else if(child.nodeType == 3){ //文本需要匹配{{}}方式来进行替换
      util.compilerText(child, zm)
    }
  })
}