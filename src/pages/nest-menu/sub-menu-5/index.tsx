import { useEffect, useRef } from "react";
import { initShaders } from "../lib/cuon-utils.js";

// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position; // 顶点位置
  attribute float a_PointSize; // 顶点颜色
  void main() {
    gl_Position = a_Position; // 设置顶点坐标
    gl_PointSize = a_PointSize; // 设置点的大小
  }
`;

// 片段着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 设置点的颜色
  }
`;

export default function SubNav1() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // arrribute 变量是顶点着色器中的变量，用于接收顶点数据，传输与顶点相关的数据
  // arrribute被用来从外部传递数据到顶点着色器，只有顶点着色器可以使用它
  // uniform 变量是顶点着色器和片段着色器中的变量，用于接收全局数据，顶点无关数据
  // varying 变量是顶点着色器和片段着色器之间传递数据的变量
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      throw new Error("WebGL not supported");
    }

    const DEFAULT_SIZE = 300;
    const pixelRatio = window.devicePixelRatio || 1;
    const wrapper = wrapperRef.current;

    // 处理高DPI显示器，确保canvas在不同设备上显示清晰
    if (wrapper) {
      const width = wrapper.clientWidth || DEFAULT_SIZE;
      const height = wrapper.clientHeight || DEFAULT_SIZE;

      // 设置canvas的实际渲染分辨率
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      // 设置canvas的CSS显示大小
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // 调整WebGL视口以匹配画布大小
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    console.log("canvas", canvas);
    // 创建着色器和程序
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.error("Failed to initialize shaders.");
      return;
    }

    const a_position = gl.getAttribLocation(gl.program, "a_Position");
    const a_pointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_position < 0 || a_pointSize < 0) {
      console.error("Failed to get attribute location.");
      return;
    }

    gl.vertexAttrib3f(a_position, 0.0, 1.0, 0.0); // 设置顶点位置
    gl.vertexAttrib1f(a_pointSize, 100.0); // 设置点的大小

    // 指定清空缓冲区，可以是颜色缓冲区、深度缓冲区、模板缓冲区等
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1); // 绘制点
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: 600,
      }}
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
