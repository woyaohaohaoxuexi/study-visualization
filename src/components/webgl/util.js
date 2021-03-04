export const createShader = (gl, type, source) => {
  // 创建着色器对象
  const shader = gl.createShader(type)

  // 给着色器对象提供数据源
  gl.shaderSource(shader, source)

  // 编译 -> 生成着色器
  gl.compileShader(shader)
  // 获取着色器是否编译成功信息
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  console.log('着色器是否创建成功', success)
  if (success) {
    return shader
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader)
}

export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  gl.linkProgram(program)

  // 验证是否连接成功
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program)
  
}

export const randomInt = range => Math.floor(Math.random() * range)

// 用参数生成矩形顶点并写进缓冲
export const setRectangle = (gl, x, y, width, height) => {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y + height

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2
  ]), gl.STATIC_DRAW)
}