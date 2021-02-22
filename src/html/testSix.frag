#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

// step() 插值函数需要输入两个参数。第一个是极限或阈值，第二个是我们想要检测或通过的值
// 对任何小于阈值的值，返回 0.0，大于阈值，则返回 1.0。

// smoothstep()函数。当给定一个范围的上下限和一个数值，这个函数会在已有的范围内给出插值
// 前两个参数规定转换的开始和结束点，第三个是给出一个值用来插值
void main() {
    vec3 color = vec3(0.0);
    float t = u_time * 0.1;
    float pct = abs(sin(t));

    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);
}