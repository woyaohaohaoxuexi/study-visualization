export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(x, y)
  }

  set x(v) {
    this[0] = v
  }

  set y(v) {
    this[1] = v
  }

  get x() {
    return this[0]
  }

  get y() {
    return this[1]
  }

  get length() {
    return Math.hypot(this.x, this.y)
  }

  get dir() {
    return Math.atan2(this.y, this.x)
  }

  copy() {
    return new Vector2D(this.x, this.y)
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  scale(a) {
    this.x *= a
    this.y *= a
    return this
  }

  rotate(dir) {
    const c = Math.cos(dir)
    const s = Math.sin(dir)
    const [x, y] = this
    this.x = c * x + -s * y
    this.y = s * x + c * y
    return this
  }
}

export default {
  /**
   * 
   * @param {Object} ctx canvas 对象
   * @param {Array} v0 初始向量
   * @param {Number} length 向量的长度
   * @param {Number} thickness 向量的粗细
   * @param {Number} dir 角度
   * @param {Number} bias 随机因子
   */
  drawBranch(ctx, v0, length, thickness, dir, bias) {
    
  }
}