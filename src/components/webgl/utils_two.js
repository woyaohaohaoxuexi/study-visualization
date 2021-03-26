/**
 * 创建 webGL 的着色器
 * @param gl
 * @param type
 * @param source
 * @returns {Object}
 */
export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }

  console.log('着色器创建失败', gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

/**
 * 创建 webGL 着色程序
 * @param gl
 * @param vertexShader
 * @param fragmentShader
 * @returns {*}
 */
export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const success = gl.getProgramParameter(program, gl.LINK_STATUS)

  if (success) {
    return program
  }

  console.log('创建着色程序失败', gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}