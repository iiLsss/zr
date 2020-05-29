
import { initState } from './observe'

function Zr (options) { //用户传入的数据
  this._init(options)
}

Zr.prototype._init = function (options) {
  let zm = this
  // 挂载到options上
  zm.$options = options
  // 初始化数据 zm传入
  initState(zm)
}

export default Zr