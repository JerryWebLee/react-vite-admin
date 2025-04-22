import { useEffect, useRef } from "react";
import { initShaders } from "../lib/cuon-utils.js";

// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

// 片段着色器
const FSHADER_SOURCE = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

export default function SubNav1() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // 初始化画布大小
    const resizeCanvas = () => {
      const DEFAULT_SIZE = 300;
      const pixelRatio = window.devicePixelRatio || 1;
      const wrapper = wrapperRef.current;

      if (wrapper) {
        const width = wrapper.clientWidth || DEFAULT_SIZE;
        const height = wrapper.clientHeight || DEFAULT_SIZE;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.error("Failed to initialize shaders.");
      return;
    }

    const a_position = gl.getAttribLocation(gl.program, "a_Position");
    const a_pointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const drawPoints = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      const points = pointsRef.current;

      for (let i = 0; i < points.length; i += 2) {
        gl.vertexAttrib3f(a_position, points[i], points[i + 1], 0.0);
        gl.vertexAttrib1f(a_pointSize, 30.0);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    };

    const handleMouseDown = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      // 修正坐标转换：
      // 1. 获取相对于canvas的坐标
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      // 2. 考虑设备像素比
      const realX = x * window.devicePixelRatio;
      const realY = y * window.devicePixelRatio;

      // 3. 转换为WebGL坐标系统 (-1到1)
      const webglX = (realX / canvas.width) * 2 - 1;
      const webglY = 1 - (realY / canvas.height) * 2;

      pointsRef.current = [...pointsRef.current, webglX, webglY];
      drawPoints();
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
      }}
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
