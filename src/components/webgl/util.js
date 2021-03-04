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