
import { initState } from './observe'

function Zr (options) {
  this._init(options)
}

Zr.prototype._init = function (options) {
  let zm = this

  zm.$options = options
  initState(zm)
}

export default Zr